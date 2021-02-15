$(function() {
    consoleInit();
    start(main);
  });

  async function loadPool(App, tokens, prices, stakingAddress, ps=false) {

    //Get the staking contract from ethers with the ABI and extract the tokens used
    const STAKING_POOL = new ethers.Contract(stakingAddress, HARVEST_POOL_ABI, App.provider);
    const vaultAddress = await STAKING_POOL.lpToken();
    const rewardTokenAddress = await STAKING_POOL.rewardToken();
    const VAULT = await getBscToken(App, vaultAddress, stakingAddress);
    const stakeTokenAddress = vaultAddress;


    var newPriceAddresses = VAULT.tokens.filter(x => prices[x] == null);
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        prices[key] = newPrices[key];
    }

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
    const bscscanUrl = `<a href='https://bscscan.com/address/${vaultAddress}' target='_blank'>Staking Contract</a>`;
    _print(bscscanUrl);
    _print_link(`Stake ${userUnstaked.toFixed(6)} ${stakingTokenTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(6)} ${stakingTokenTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker}`, claim)
    _print_link(`Exit`, exit)
    _print(`\n`);
  }


  async function main() {
    const PS = [
      "0x880984872D52709440D505c050523b917a74BB1E",
      "0x27D9adD58F316865a2a8BC03b1a32801472b8102",
    ];
    const CONTRACTS = [
      //BELUGA LP
      "0xF25E3C74e1BE871471f876CaC5c8e3EC94293879",
      //MAIN_PAGE
      "0xD6dB83d2c3207347709a31C9b1b14F59F4F4ffF7",
    ];

    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
    _print("The APY shown only contains the APY from BELUGA emissions, the native returns from vaults are not added.\n")

    var tokens = {};
    var prices = {};

    await loadPool(App, tokens, prices, PS[0], ps=true)
    for (const c of CONTRACTS) {
      await loadPool(App, tokens, prices, c);
    }

    hideLoading();
  }
