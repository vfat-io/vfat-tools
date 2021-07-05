$(function() {
    consoleInit(main)
  });
  
  const MATIC_STACK_USDC_LP_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"STACKClaimed","inputs":[{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"STACK","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"acceptToken","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"},{"type":"uint256","name":"tokensAccrued","internalType":"uint256"}],"name":"balances","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"claimSTACK","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"deposited","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"emissionRate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"endBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address payable"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"lastBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"rescue","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEmissionRate","inputs":[{"type":"uint256","name":"_new","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setEndBlock","inputs":[{"type":"uint256","name":"_block","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_new","internalType":"address payable"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokensAccrued","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]}];
  const STACKERS=  [{
    token1: "stackUSDC",
    poolAddress: "0x07E24879DB1Ed47B1691721D4EDE42Cbe3E8cabC",
  }]
  
  const Pools = STACKERS.map(a => {
    return {
      address: a.poolAddress,
      abi: MATIC_STACK_USDC_LP_ABI,
      stakeTokenFunction: "acceptToken",
      rewardTokenFunction: "STACK"
    }; }
  )
  
  async function main() {
  
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");
  
    var tokens = {};
    const prices = await getMaticPrices();

  
    // async function loadMaticSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {

    let p = await loadMaticSynthetixPool(App, tokens, prices, Pools[0].abi, Pools[0].address, Pools[0].rewardTokenFunction, Pools[0].stakeTokenFunction);
        
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  
    hideLoading();
  }

  const getClaimableAmount = async function(stakePool, App) {
    const tokensAccrued = await stakePool.tokensAccrued()
    const userState = await stakePool.balances(App.YOUR_ADDRESS)
    const userTokensAccured = userState[1]
    const userBalance = userState[0]
    const _tokensAccruedDiff = tokensAccrued.sub(userTokensAccured)
    const _tokensGive = _tokensAccruedDiff.mul(userBalance)
    return _tokensGive.toString() / 1e36
  }

  const maticSLPContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
    const signer = App.provider.getSigner()
  
    const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, MATIC_STACK_USDC_LP_ABI, signer)
  
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

  const maticSLPContract_claim = async function(rewardPoolAddr, App) {
    const signer = App.provider.getSigner()
  
    const REWARD_POOL = new ethers.Contract(rewardPoolAddr, MATIC_STACK_USDC_LP_ABI, signer)
  
    console.log(App.YOUR_ADDRESS)
 
    const earnedYFFI = await getClaimableAmount(REWARD_POOL, App)
  
    if (earnedYFFI > 0) {
      showLoading()
      REWARD_POOL.claimSTACK({gasLimit: 250000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  async function printSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return maticSLPContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return maticSLPContract_claim(info.stakingAddress, App)
    }

    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    switch (chain) {
      case "eth":
        _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
        break;
      case "avax":
        _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
        break;
      case "bsc":
        _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
        break;
      case "heco":
        _print(`<a target="_blank" href="https://hecoinfo.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
        break;
      case "matic":
        _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
        break;
      case "fantom":
        _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
        break;
    }
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
  }
  
  async function loadMaticSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
  
      var stakeToken = await getMaticToken(App, stakeTokenAddress, stakingAddress);
  
      if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
      }
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, stakingAddress);
      }
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
      const rewardTokenTicker = rewardToken.symbol;
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

      if (!poolPrices) 
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
      const endBlock = await STAKING_POOL.endBlock();
      const emissionRate = await STAKING_POOL.emissionRate();
      const rewardRate = emissionRate.toString() / 1e18 * 38400; // rewardRate per day
      const currentBlockNumber = await App.provider.getBlockNumber();
      const weeklyRewards = (currentBlockNumber > endBlock) ? 0 : rewardRate * 7;
  
      const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
      const staked_tvl = poolPrices.staked_tvl;
  
      let stakingPoolBalances = await STAKING_POOL.balances(App.YOUR_ADDRESS);

      let userStaked = stakingPoolBalances[0].toString() / 10 ** stakeToken.decimals;

      if(Number.isNaN(userStaked)) userStaked = 0;

      const userUnstaked = stakeToken.unstaked;

      let earned = await getClaimableAmount(STAKING_POOL, App);

      if(Number.isNaN(earned)) earned = 0;

      return  {
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddress,
        stakeTokenTicker,
        rewardTokenTicker,
        stakeTokenPrice,
        rewardTokenPrice,
        weeklyRewards,
        usdPerWeek,
        staked_tvl,
        userStaked,
        userUnstaked,
        earned
      }
  }

  async function loadMaticSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
    const info = await loadMaticSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
    if (!info) return null;
    return await printSynthetixPool(App, info, "matic");
  }
