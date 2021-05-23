$(function() {
  consoleInit(main)
});

async function loadPool(App, tokens, prices, stakingAddress, ps=false) {

  //Get the staking contract from ethers with the ABI and extract the tokens used
  const STAKING_POOL = new ethers.Contract(stakingAddress, HARVEST_POOL_ABI, App.provider);
  const vaultAddress = await STAKING_POOL.lpToken();
  const rewardTokenAddress = await STAKING_POOL.rewardToken();
  const VAULT = await getBscToken(App, vaultAddress, stakingAddress);
  const stakeTokenAddress = vaultAddress;

  var newTokenAddresses = VAULT.tokens.filter(x => tokens[x] == null);
  for (const address of newTokenAddresses) {
      tokens[address] = await getBscToken(App, address, stakingAddress);
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
    var AutoStaking = new ethers.Contract("0x27D9adD58F316865a2a8BC03b1a32801472b8102",
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

  printAPR(rewardTokenTicker, rewardTokenPrice, weeklyRewards,
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
  const bscscanUrl = `<a href='https://bscscan.com/address/${vaultAddress}' target='_blank'>Staking Contract</a>`;
  _print(bscscanUrl);
  _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
  _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
  _print_link(`Exit`, exit)
  _print(`\n`);
}

async function loadVault(App, tokens, prices, vaultAddress) {
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, HARVEST_VAULT_ABI, App.provider)
  const VAULT = await getBscToken(App, vaultAddress, vaultAddress);

  var newTokenAddresses = VAULT.tokens.filter(x => tokens[x] == null);
  for (const address of newTokenAddresses) {
      tokens[address] = await getBscToken(App, address, vaultAddress);
  }

  const poolPrices = getPoolPrices(tokens, prices, VAULT);
  const staked_tvl = poolPrices.staked_tvl;
  let vaultName = await VAULT_CONTRACT.name()

  _print(`Name: ${vaultName}`)
  _print(`TVL: ${staked_tvl}`)

  const now = Math.round(Date.now() / 1000);
  const oneDayAgoBlockNumber = parseInt(await getBlockNumberFromTimestamp(now - 60 * 60 * 24));
  const oneWeekAgoBlockNumber = parseInt(await getBlockNumberFromTimestamp(now - 60 * 60 * 24 * 7));

  const currentSharePrice = await VAULT_CONTRACT.getPricePerFullShare()
  let ROI_DAILY = 0
  let ROI_WEEKLY = 0

  try {
      const pastSharePrice = await VAULT_CONTRACT.getPricePerFullShare({blockTag: oneDayAgoBlockNumber})
      ROI_DAILY = (currentSharePrice / pastSharePrice -1) * 100
  } catch (e) {
      console.error(e)
  }

  try {
      const pastSharePrice = await VAULT_CONTRACT.getPricePerFullShare({blockTag: oneWeekAgoBlockNumber})
      ROI_WEEKLY = (currentSharePrice / pastSharePrice -1) * 100
  } catch (e) {
      console.error(e)
  }

  _print(`APY (daily) : ${toFixed(((1 + (ROI_DAILY / 100))**365 - 1) * 100, 4)}%`);
  _print(`APY (weekly) : ${toFixed(((1 + (ROI_WEEKLY / 100))**52 - 1) * 100, 4)}%`);

  const bscscanUrl = `<a href='https://bscscan.com/address/' target='_blank'>Vault Contract</a> \n`;
  _print(bscscanUrl)
}


async function main() {
  const PS = [
    "0x880984872D52709440D505c050523b917a74BB1E",
    "0x27D9adD58F316865a2a8BC03b1a32801472b8102",
  ];
  const CONTRACTS = [
    //BELUGA LP
    "0xEa05b5559cDA06395139c980d8F8D479cD903017",
    "0x2F07e9d0987ea051F291ee39c65bB71D61f59F14",
    "0xA8cd278Ea5ac01Fe958cA12DA11B39099c8A3D30"
  ];

  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");
  _print("The APR shown only contains the APR from BELUGA emissions, the native returns from vaults are not added.\n")

  const tokens = {};
  const vaultTokens = {}
  const prices = await getBscPrices();

  await loadPool(App, tokens, prices, PS[0], ps=true)
  for (const c of CONTRACTS) {
    await loadPool(App, tokens, prices, c);
  }

  hideLoading();
}
