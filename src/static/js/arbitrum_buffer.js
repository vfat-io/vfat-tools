$(function() {
  consoleInit(main)
    });
  
    const BFR_STAKING_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BASIS_POINTS_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"averageStakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"claimForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cumulativeRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"depositBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gov","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateClaimingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateStakingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateTransferMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_depositTokens","type":"address[]"},{"internalType":"address","name":"_distributor","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDepositToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"previousCumulatedRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"bool","name":"_isDepositToken","type":"bool"}],"name":"setDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_handler","type":"address"},{"internalType":"bool","name":"_isActive","type":"bool"}],"name":"setHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateClaimingMode","type":"bool"}],"name":"setInPrivateClaimingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateStakingMode","type":"bool"}],"name":"setInPrivateStakingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateTransferMode","type":"bool"}],"name":"setInPrivateTransferMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundingAccount","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensPerInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalDepositSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"unstakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    const USDC_VAULT_ABI = [{"inputs":[{"internalType":"contract ERC20","name":"_tokenX","type":"address"},{"internalType":"uint32","name":"_lockupPeriod","type":"uint32"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Loss","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Profit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"writeAmount","type":"uint256"}],"name":"Provide","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"maxLiquidity","type":"uint256"}],"name":"UpdateMaxLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"writeAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ACCURACY","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"INITIAL_RATE","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"OPTION_ISSUER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"availableBalance","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getUnlockedLiquidity","outputs":[{"internalType":"uint256","name":"unlockedAmount","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"liquidityPerUser","outputs":[{"internalType":"uint256","name":"unlockedAmount","type":"uint256"},{"internalType":"uint256","name":"nextIndexForUnlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"tokenXAmount","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lockedAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"lockedLiquidity","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"premium","type":"uint256"},{"internalType":"bool","name":"locked","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedPremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockupPeriod","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenXAmount","type":"uint256"},{"internalType":"uint256","name":"minMint","type":"uint256"}],"name":"provide","outputs":[{"internalType":"uint256","name":"mint","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenXAmount","type":"uint256"},{"internalType":"uint256","name":"minMint","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"provideForAccount","outputs":[{"internalType":"uint256","name":"mint","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenXAmount","type":"uint256"}],"name":"send","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_handler","type":"address"},{"internalType":"bool","name":"_isActive","type":"bool"}],"name":"setHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxLiquidity","type":"uint256"}],"name":"setMaxLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"shareOf","outputs":[{"internalType":"uint256","name":"share","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"toTokenX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenX","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTokenXBalance","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenXAmount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenXAmount","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"withdrawForAccount","outputs":[{"internalType":"uint256","name":"burn","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

    async function main() {
  
      const Pool = {
        address : "0x173817f33f1c09bcb0df436c2f327b9504d6e067",
        abi : BFR_STAKING_ABI,
        stakeTokenAddress : "0x1a5b0aaf478bf1fda7b934c76e7692d722982a6d",
        rewardTokenFunction : "rewardToken"
      };

      const Pool2 = {
        address : "0x6ec7b10bf7331794adaaf235cb47a2a292cd9c7e",
        abi : USDC_VAULT_ABI,
        stakeTokenAddress : "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"
      };

      const Pool3 = {
        address : "0xae0628c88ec6c418b3f5c005f804e905f8123833",
        abi : USDC_VAULT_ABI,
        stakeTokenAddress : "0x912ce59144191c1204e64559fe8253a0e49e6548"
      };
  
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}`);
      _print("Reading smart contracts...\n");
  
      const tokens = {};
      const prices = await getArbitrumPrices();
  
      let p = await loadBfrSynthetixPool(App, tokens, prices, Pool.abi, Pool.address, Pool.rewardTokenFunction, Pool.stakeTokenAddress);
      _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
      if (p.userStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.userStaked)}\n`);
    }

    _print(`\nThere is a locking period for the current vault. Please check the site for more information.\n`);

    let p2 = await loadUsdcVaultSynthetixPool(App, tokens, prices, Pool2.abi, Pool2.address, Pool2.stakeTokenAddress);
      _print_bold(`Total staked: $${formatMoney(p2.staked_tvl)}`);

    _print(`\nThere is a locking period for the current vault. Please check the site for more information.\n`);

    let p3 = await loadUsdcVaultSynthetixPool(App, tokens, prices, Pool3.abi, Pool3.address, Pool3.stakeTokenAddress);
      _print_bold(`Total staked: $${formatMoney(p3.staked_tvl)}`);
  
    hideLoading();
  }

  async function loadBfrSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenAddress) {
    const info = await loadBfrSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenAddress);
    if (!info) return null;
    return await printBfrSynthetixPool(App, info, "arbitrum");
  }

  async function loadUsdcVaultSynthetixPool(App, tokens, prices, abi, address, stakeTokenAddress) {
    const info = await loadUsdcVaultSynthetixPoolInfo(App, tokens, prices, abi, address, stakeTokenAddress);
    if (!info) return null;
    return await printUsdcVaultSynthetixPool(App, info, "arbitrum");
  }

async function loadBfrSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenAddress) {
  const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

  var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);

  var newPriceAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
      prices[key] = newPrices[key];
  }
  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens, x));
  for (const address of newTokenAddresses) {
    tokens[address] = await getArbitrumToken(App, address, stakingAddress);
  }
  if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
    tokens[rewardTokenAddress] = await getArbitrumToken(App, rewardTokenAddress, stakingAddress);
  }
  const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

  const rewardTokenTicker = rewardToken.symbol;

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
    prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
  const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

  const calls = [STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.claimableReward(App.YOUR_ADDRESS)]
  const [balance, earned_] = await App.ethcallProvider.all(calls);

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  const earned = earned_ / 10 ** rewardToken.decimals;

  return {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    rewardTokenAddress,
    stakeTokenTicker,
    rewardTokenTicker,
    stakeTokenPrice,
    rewardTokenPrice,
    staked_tvl,
    userStaked,
    userUnstaked,
    earned
  }
}

async function printBfrSynthetixPool(App, info, chain = "eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
    `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const approveTENDAndStake = async function () {
    return rewardsContractArbitrum_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function () {
    return rewardsContractArbitrum_unstake(info.stakingAddress, App)
  }
  const claim = async function () {
    return rewardsContractBFR_claim(info.stakingAddress, App)
  }
  const exit = async function () {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function () {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Explorer</a>`);
  _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned * info.rewardTokenPrice)})`, claim)
  _print_link(`Exit`, exit)
  _print("");

  return {
    staked_tvl: info.poolPrices.staked_tvl,
    userStaked: userStakedUsd
  }
}

const rewardsContractBFR_claim = async function (rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BFR_STAKING_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.claimableReward(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.claim(App.YOUR_ADDRESS)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })
  }
}

async function loadUsdcVaultSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenAddress) {
  const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

  var stakeToken = await getArbitrumToken(App, stakeTokenAddress, stakingAddress);

  var newPriceAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
      prices[key] = newPrices[key];
  }
  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens, x));
  for (const address of newTokenAddresses) {
    tokens[address] = await getArbitrumToken(App, address, stakingAddress);
  }

  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

  if (!poolPrices) {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
    prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const calls = [STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.symbol(),
                 STAKING_MULTI.toTokenX(1000000), STAKING_MULTI.totalTokenXBalance()]
  const [balance, blpSymbol, _blpPrice, totalSupplyUsdc] = await App.ethcallProvider.all(calls);

  const staked_tvl = poolPrices.staked_tvl;

  const userStaked = balance / 10 ** stakeToken.decimals;

  const userUnstaked = stakeToken.unstaked;

  const blpPrice = (_blpPrice / 1e6) * stakeTokenPrice;

  const blpDif = _blpPrice / 1e6

  return {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
    userStaked,
    userUnstaked,
    stakeToken,
    blpSymbol,
    blpPrice,
    totalSupplyUsdc : totalSupplyUsdc / 10 ** stakeToken.decimals,
    blpDif
  }
}

async function printUsdcVaultSynthetixPool(App, info, chain = "eth", customURLs) {
  _print(`${info.stakeToken.symbol} Price: $${formatMoney(info.stakeTokenPrice)} (${info.blpSymbol} Price: $${formatMoney(info.blpPrice)})`);
  const staked_tvl = info.totalSupplyUsdc * info.stakeTokenPrice;
  const totalSupplyBlp = info.totalSupplyUsdc * info.blpDif
  const blp_staked_tvl = totalSupplyBlp * info.blpPrice;
  _print(`Total Supply: ${info.totalSupplyUsdc.toFixed(4)} ${info.stakeToken.symbol} ($${formatMoney(staked_tvl)}) (${totalSupplyBlp.toFixed(4)} ${info.blpSymbol} ($${formatMoney(blp_staked_tvl)}))`);
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Explorer</a>`);
  _print("");

  return {
    staked_tvl
  }
}