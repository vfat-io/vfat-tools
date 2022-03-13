
const MetisTokens = [
    { "id": "metis-token", "symbol": "METIS", "contract": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000"},
    { "id": "tether", "symbol": "USDT", "contract": "0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc"},
    { "id": "weth", "symbol": "WETH", "contract": "0x420000000000000000000000000000000000000a"},
    { "id": "dai", "symbol": "DAI", "contract": "0x4651b38e7ec14bb3db731369bfe5b08f2466bd0a"},
    { "id": "usd-coin", "symbol": "USDC", "contract": "0xea32a96608495e54156ae48931a7c20f0dcc1a21"},
    { "id": "maia", "symbol": "MAIA", "contract": "0x72c232d56542ba082592dee7c77b1c6cfa758bcd"},
    { "id": "tethys-finance", "symbol": "TETHYS", "contract": "0x69fdb77064ec5c84fa2f21072973eb28441f43f3"},
    { "id": "binance-usd", "symbol": "BUSD", "contract": "0x12d84f1cfe870ca9c9df9785f8954341d7fbb249"},
    { "id": "magic-internet-money", "symbol": "MIM", "contract": "0x44dd7c98885cd3086e723b8554a90c9cc4089c4c"},
  ];

  async function getMetisPrices() {
      const idPrices = await lookUpPrices(MetisTokens.map(x => x.id));
      const prices = {}
      for (const bt of MetisTokens)
          if (idPrices[bt.id])
              prices[bt.contract] = idPrices[bt.id];
      return prices;
  }

  async function getMetisUniPool(App, pool, poolAddress, stakingAddress) {
    const calls = [
      pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
      pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(App.YOUR_ADDRESS)
    ];
    const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked]
      = await App.ethcallProvider.all(calls);
    let q0, q1, is1inch;
    try {
      const [reserves] = await App.ethcallProvider.all([pool.getReserves()]);
      q0 = reserves._reserve0;
      q1 = reserves._reserve1;
      is1inch = false;
    }
    catch { //for 1inch
      if (token0 == "0x0000000000000000000000000000000000000000") {
        q0 = await App.provider.getBalance(poolAddress);
      }
      else {
        const c0 = new ethers.Contract(token0, ERC20_ABI, App.provider);
        q0 = await c0.balanceOf(poolAddress);
      }
      if (token1 == "0x0000000000000000000000000000000000000000") {
        q1 = await App.provider.getBalance(poolAddress);
      }
      else {
        const c1 = new ethers.Contract(token1, ERC20_ABI, App.provider);
        q1 = await c1.balanceOf(poolAddress);
      }
      is1inch = true;
    }
    return {
        symbol,
        name,
        address: poolAddress,
        token0: token0,
        q0,
        token1: token1,
        q1,
        totalSupply: totalSupply / 10 ** decimals,
        stakingAddress: stakingAddress,
        staked: staked / 10 ** decimals,
        decimals: decimals,
        unstaked: unstaked / 10 ** decimals,
        contract: pool,
        tokens : [token0, token1],
        is1inch
    };
  }

  async function getMetisErc20(App, token, address, stakingAddress) {
      if (address == "0x0000000000000000000000000000000000000000") {
        return {
          address,
          name : "Metis",
          symbol : "METIS",
          totalSupply: 1e8,
          decimals: 18,
          staked: 0,
          unstaked: 0,
          contract: null,
          tokens:[address]
        }
      }
      const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(App.YOUR_ADDRESS),
        token.name(), token.symbol(), token.totalSupply()];
      const [decimals, staked, unstaked, name, symbol, totalSupply] = await App.ethcallProvider.all(calls);
      return {
          address,
          name,
          symbol,
          totalSupply,
          decimals : decimals,
          staked:  staked / 10 ** decimals,
          unstaked: unstaked  / 10 ** decimals,
          contract: token,
          tokens : [address]
      };
  }

  async function getMetisBasicVault(App, vault, address, stakingAddress) {
    const calls = [vault.decimals(), vault.underlying(), vault.name(), vault.symbol(),
      vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(App.YOUR_ADDRESS),
      vault.underlyingBalanceWithInvestment()];
    const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked, balance] =
      await App.ethcallProvider.all(calls);
    const token = await getMetisToken(App, underlying, address);
    return {
      address,
      name,
      symbol,
      totalSupply,
      decimals,
      staked: staked / 10 ** decimals,
      unstaked: unstaked / 10 ** decimals,
      token: token,
      balance,
      contract: vault,
      tokens : token.tokens
    }
  }

  async function getMetisCurveToken(App, curve, address, stakingAddress, minterAddress) {
    const minter = new ethcall.Contract(minterAddress, MINTER_ABI)
    const [virtualPrice, coin0] = await App.ethcallProvider.all([minter.get_virtual_price(), minter.coins(0)]);
    const token = await getMetisToken(App, coin0, address);
    const calls = [curve.decimals(), curve.balanceOf(stakingAddress), curve.balanceOf(App.YOUR_ADDRESS),
      curve.name(), curve.symbol(), curve.totalSupply()];
    const [decimals, staked, unstaked, name, symbol, totalSupply] = await App.ethcallProvider.all(calls);
    return {
        address,
        name,
        symbol,
        totalSupply,
        decimals : decimals,
        staked:  staked / 10 ** decimals,
        unstaked: unstaked  / 10 ** decimals,
        contract: curve,
        tokens : [address, coin0],
        token,
        virtualPrice : virtualPrice / 1e18
    };
  }

  async function getMetisStableswapToken(App, stable, address, stakingAddress) {
    const calls = [stable.decimals(), stable.balanceOf(stakingAddress), stable.balanceOf(App.YOUR_ADDRESS),
      stable.name(), stable.symbol(), stable.totalSupply(), stable.get_virtual_price(), stable.coins(0)];
    const [decimals, staked, unstaked, name, symbol, totalSupply, virtualPrice, coin0]
      = await App.ethcallProvider.all(calls);
    const token = await getMetisToken(App, coin0, address);
    return {
        address,
        name,
        symbol,
        totalSupply,
        decimals : decimals,
        staked:  staked / 10 ** decimals,
        unstaked: unstaked  / 10 ** decimals,
        contract: stable,
        tokens : [address, coin0],
        token,
        virtualPrice : virtualPrice / 1e18
    };
  }

  async function getMetisStoredToken(App, tokenAddress, stakingAddress, type) {
    switch (type) {
      case "curve":
        const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
        const [minter] = await App.ethcallProvider.all([crv.minter()]);
        return await getMetisCurveToken(App, crv, tokenAddress, stakingAddress, minter);
      case "stableswap":
        const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
        return await getMetisStableswapToken(App, stable, tokenAddress, stakingAddress);
      case "uniswap":
        const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
        return await getMetisUniPool(App, pool, tokenAddress, stakingAddress);
      case "basicMetisVault":
        const basicMetisVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
        return await getMetisBasicVault(App, basicMetisVault, tokenAddress, stakingAddress);
      case "erc20":
        const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
        return await getMetisErc20(App, erc20, tokenAddress, stakingAddress);
    }
  }

  async function getMetisToken(App, tokenAddress, stakingAddress) {
      if (tokenAddress == "0x0000000000000000000000000000000000000000") {
        return getMetisErc20(App, null, tokenAddress, "")
      }
      const type = window.localStorage.getItem(tokenAddress);
      if (type) return getMetisStoredToken(App, tokenAddress, stakingAddress, type);
      try {
        const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
        const [minter] = await App.ethcallProvider.all([crv.minter()]);
        const res = await getMetisCurveToken(App, crv, tokenAddress, stakingAddress, minter);
        window.localStorage.setItem(tokenAddress, "curve");
        return res;
      }
      catch(err) {
      }
      try {
        const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
        const _coin0 = await App.ethcallProvider.all([stable.coins(0)]);
        window.localStorage.setItem(tokenAddress, "stableswap");
        return await getMetisStableswapToken(App, stable, tokenAddress, stakingAddress);
      }
      catch (err) {
      }
      try {
        const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
        const _token0 = await App.ethcallProvider.all([pool.token0()]);
        const uniPool = await getMetisUniPool(App, pool, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "uniswap");
        return uniPool;
      }
      catch(err) {
      }
      try {
        const basicVault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
        const _token = await App.ethcallProvider.all([basicVault.underlying()]);
        const res = await getMetisBasicVault(App, basicVault, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "basicMetisVault");
        return res;
      }
      catch(err) {
      }
      try {
        const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
        const _name = await App.ethcallProvider.all([erc20.name()]);
        const erc20tok = await getMetisErc20(App, erc20, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "erc20");
        return erc20tok;
      }
      catch(err) {
        console.log(err);
        console.log(`Couldn't match ${tokenAddress} to any known token type.`);
      }
    }

  async function loadMetisSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
      rewardTokenFunction, stakeTokenFunction) {
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
        const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

        if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
          console.log("Couldn't find stake function ", stakeTokenFunction);
        }
        const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

        const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

        var stakeToken = await getMetisToken(App, stakeTokenAddress, stakingAddress);

        if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
          stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
        }

        var newPriceAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(prices, x));
        var newPrices = await lookUpTokenPrices(newPriceAddresses);
        for (const key in newPrices) {
          if (newPrices[key]?.usd)
              prices[key] = newPrices[key];
        }
        var newTokenAddresses = stakeToken.tokens.filter(x =>
          !getParameterCaseInsensitive(tokens,x));
        for (const address of newTokenAddresses) {
            tokens[address] = await getMetisToken(App, address, stakingAddress);
        }
        if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
            tokens[rewardTokenAddress] = await getMetisToken(App, rewardTokenAddress, stakingAddress);
        }
        const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

        const rewardTokenTicker = rewardToken.symbol;

        const poolPrices = getPoolPrices(tokens, prices, stakeToken, "metis");

        if (!poolPrices)
        {
          console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
          return null;
        }

        const stakeTokenTicker = poolPrices.stakeTokenTicker;

        const stakeTokenPrice =
            prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
        const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

        const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(),
          STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
        const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);

        const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 10 ** rewardToken.decimals * 604800;

        const usdPerWeek = weeklyRewards * rewardTokenPrice;

        const staked_tvl = poolPrices.staked_tvl;

        const userStaked = balance / 10 ** stakeToken.decimals;

        const userUnstaked = stakeToken.unstaked;

        const earned = earned_ / 10 ** rewardToken.decimals;

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

  async function loadMetisSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
      const info = await loadMetisSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
      if (!info) return null;
      return await printSynthetixPool(App, info, "metis");
  }

  async function loadMetisBasisFork(data) {
      const App = await init_ethers();

      _print(`Initialized ${App.YOUR_ADDRESS}`);
      _print("Reading smart contracts...\n");

      var tokens = {};
      var prices = {};
      var totalStaked = 0;

      let p1 = await loadMetisSynthetixPool(App, tokens, prices, data.PoolABI,
          data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
      totalStaked += p1.staked_tvl;

      if (data.SharePool2) {
        let p3 = await loadMetisSynthetixPool(App, tokens, prices, data.PoolABI,
            data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
        totalStaked += p3.staked_tvl;
      }

      let p2 = await loadMetisSynthetixPool(App, tokens, prices, data.PoolABI,
          data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
      totalStaked += p2.staked_tvl;

      if (data.SeedBanks) {
        let p = await loadMultipleMetisSynthetixPools(App, tokens, prices, data.SeedBanks)
        totalStaked += p.staked_tvl;
        if (p.totalUserStaked > 0) {
          _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
        }
      }

      if (!data.SeedBanks)
      {
        if (data.Boardrooms) {
          for (const boardroom of data.Boardrooms) {
            let br = await loadBoardroom(App, prices, boardroom.address, data.Oracle, data.UniswapLP, data.Cash,
                data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
                data.Decimals, boardroom.ratio, data.TargetMantissa);
            totalStaked += br.staked_tvl;
          }
        }
        else {
          let br = await loadBoardroom(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
              data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
              data.Decimals, 1, data.TargetMantissa);
          totalStaked += br.staked_tvl;
        }
      }

      _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

      hideLoading();
  }

  async function getMetisPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0) {
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const poolToken = await getMetisToken(app, poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address : poolInfo.lpToken ?? poolInfo.token ?? poolInfo.stakingToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
  }

  async function loadMetisChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, claimFunction) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();

    _print(`<a href='http://andromeda-explorer.metis.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)

    _print(`Showing incentivized pools only.\n`);

    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getMetisToken(App, rewardTokenAddress, chefAddress);

    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3

    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getMetisPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getMetisToken(App, address, chefAddress);
    }));

    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "metis") : undefined);
    }

    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "metis") : undefined);


    _print("Finished reading smart contracts.\n");

    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, claimFunction, "metis", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
        aprs.push(apr);
      }
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

  async function loadMultipleMetisSynthetixPools(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
        loadMetisSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
    for (const i of infos) {
      let p = await printSynthetixPool(App, i, "metis");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }

  async function loadMultipleMetisSynthetixPoolsSequential(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    for (const p of pools) {
      let res = await loadMetisSynthetixPool(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction);
      if (!res) continue;
      totalStaked += res.staked_tvl || 0;
      totalUserStaked += res.userStaked || 0;
      if (res.userStaked > 0) {
        individualAPRs.push(res.userStaked * res.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }
