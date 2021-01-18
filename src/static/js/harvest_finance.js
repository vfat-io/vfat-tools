$(function() {
  consoleInit();
  start(main);
});

async function loadPool(App, tokens, prices, stakingAddress, ps=false) {

  //Get the staking contract from ethers with the ABI and extract the tokens used 
  const STAKING_POOL = new ethers.Contract(stakingAddress, HARVEST_POOL_ABI, App.provider);
  const vaultAddress = await STAKING_POOL.lpToken();
  const rewardTokenAddress = await STAKING_POOL.rewardToken();
  const VAULT = await getToken(App, vaultAddress, stakingAddress);
  const stakeTokenAddress = vaultAddress;
  

  var newPriceAddresses = VAULT.tokens.filter(x => prices[x] == null);
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
      prices[key] = newPrices[key];
  }
  
  var newTokenAddresses = VAULT.tokens.filter(x => tokens[x] == null);
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakingAddress);
  }

  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  const rewardTokenTicker = rewardToken.symbol;
   
  //Get prices from pools
  const poolPrices = getPoolPrices(tokens, prices, VAULT);

  const stakingTokenTicker = poolPrices.stakeTokenTicker;  
  const stakeTokenPrice =  poolPrices.price;
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
  
  const weeklyRewards = await get_synth_weekly_rewards(STAKING_POOL);
  const staked_tvl = poolPrices.staked_tvl;
  var userStaked;
  var userUnstaked;
  var earned;
  // Find out reward rate
  if(ps) {
    var AutoStaking = new ethers.Contract("0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
    HARVEST_AUTOSTAKE_ABI, App.provider);
    userStaked = await AutoStaking.balanceOf(App.YOUR_ADDRESS) / 10 ** VAULT.decimals;
    userUnstaked = VAULT.unstaked;
    earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  
  } else {
    userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** VAULT.decimals;
    userUnstaked = VAULT.unstaked;
    earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  }

  poolPrices.print_price();

  printApy(rewardTokenTicker, rewardTokenPrice, weeklyRewards, 
    stakingTokenTicker, staked_tvl, userStaked, stakeTokenPrice, null);

  const approveTENDAndStake = async function() {
    return rewardsContract_stake(stakeTokenAddress, stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(stakingAddress, App)
  }
  const etherscanUrl = `<a href='https://etherscan.io/address/${vaultAddress}' target='_blank'>Staking Contract</a>`;
  _print(etherscanUrl);
  _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
  _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
  _print_link(`Exit`, exit)
  _print(`\n`);
}


async function main() {
  const PS = [
    "0x8f5adC58b32D4e5Ca02EAC0E293D35855999436C",
    "0x25550Cccbd68533Fa04bFD3e3AC4D09f9e00Fc50",
  ];
  const CONTRACTS = [
    //FARM_LP
    "0x6555c79a8829b793F332f1535B0eFB1fE4C11958",
    "0x99b0d6641A63Ce173E6EB063b3d3AED9A35Cf9bf",
    "0xe58f0d2956628921cdEd2eA6B195Fc821c3a2b16",
    //MAIN_PAGE
    "0x3DA9D911301f8144bdF5c3c67886e5373DCdff8e",
    "0xAd91695b4BeC2798829ac7a4797E226C78f22Abd",
    "0xf5b221E1d9C3a094Fb6847bC3E241152772BbbF8",
    "0x63e7D3F6e208ccE4967b7a0E6A50A397Af0b0E7A",
    "0x3cddE34C96eCB95A1232c9673e23f2dB5fA72280",
    "0xDB9C2EbA87301e6951d6FBE7a458832eaab2137E",
    "0x7c497298d9576499e17F9564CE4E13faa87A9b33",
    //stables
    "0x6D1b6Ea108AA03c6993d8010690264BA96D349A8",
    "0x72C50e6FD8cC5506E166c273b6E814342Aa0a3c1",
    "0xC0f51a979e762202e9BeF0f62b07F600d0697DE1",
    "0x093C2ae5E6F3D2A897459aa24551289D462449AD",
    "0xef4Da1CE3f487DA2Ed0BE23173F76274E0D47579",
    "0x4F7c28cCb0F1Dbd1388209C67eEc234273C878Bd",
    "0x6ac4a7AB91E6fD098E13B7d347c6d4d1494994a2",
    "0xeC56a21CF0D7FeB93C25587C12bFfe094aa0eCdA",
    "0x15d3A64B2d5ab9E152F16593Cdebc4bB165B5B4A",
    //seignorage
    "0x797F1171DC5001B7A79ff7Dca68c9539329ccE48",
    "0xf330891f02F8182D7D4e1A962ED0F3086D626020",
    "0x98Ba5E432933E2D536e24A2C021deBb8404588C1",
    "0xf4784d07136b5b10c6223134E8B36E1DC190725b",
    /*1inch | It is not yet possible to extract underlying tokens
    "0xDa5E9706274D88bbf1bD1877a9b462fC40cDcfAd",
    "0x9a9A6148f7b0A9767AC1fdC67343D1e3E219FdDf",
    "0x2A80e0B572e7EF61Ef81EF05eC024e1e52Bd70BD",
    "0x747318Cf3171D4E2a1A52bBD3Fcc9f9c690448B4",
    */
    //BTC
    "0x01f9CAaD0f9255b0C0Aa2fBD1c1aA06ad8Af7254",
    "0x91B5cD52fDE8dbAC37C95ECafEF0a70bA4c182fC",
    "0x017eC1772A45d2cf68c429A820eF374f0662C57c",
    "0xA3Cf8D1CEe996253FAD1F8e3d68BDCba7B3A3Db5",
    "0x917d6480Ec60cBddd6CbD0C8EA317Bcc709EA77B",
    "0x7b8Ff8884590f44e10Ea8105730fe637Ce0cb4F6",
    //sushi
    "0x76Aef359a33C02338902aCA543f37de4b01BA1FA",
    "0x6B4e1E0656Dd38F36c318b077134487B9b0cf7a6",
    "0xA56522BCA0A09f57B85C52c0Cc8Ba1B5eDbc64ef",
    "0xE2D9FAe95f1e68afca7907dFb36143781f917194",
  ];

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");
  _print("The APY shown only contains the FARM rewards, the native APY from other protocols is not added.\n")

  var tokens = {};
  var prices = {};

  await loadPool(App, tokens, prices, PS[0], ps=true)
  for (const c of CONTRACTS) {
    await loadPool(App, tokens, prices, c);
  }

  hideLoading();
}