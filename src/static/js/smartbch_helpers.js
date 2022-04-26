const SmartbchTokens = [
    { "id": "bitcoin-cash","symbol": "WBCH", "contract": "0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04" }
  ];
  
  async function getSmartbchPrices() {
      const idPrices = await lookUpPrices(SmartbchTokens.map(x => x.id));
      const prices = {}
      for (const bt of SmartbchTokens)
          if (idPrices[bt.id])
              prices[bt.contract] = idPrices[bt.id];
      return prices;
  }
  
  async function getSmartbchUniPool(App, pool, poolAddress, stakingAddress) {
      let q0, q1;
      const reserves = await pool.getReserves();
      q0 = reserves._reserve0;
      q1 = reserves._reserve1;
      const decimals = await pool.decimals();
      const token0 = await pool.token0();
      const token1 = await pool.token1();
      return {
          symbol : await pool.symbol(),
          name : await pool.name(),
          address: poolAddress,
          token0,
          q0,
          token1,
          q1,
          totalSupply: await pool.totalSupply() / 10 ** decimals,
          stakingAddress: stakingAddress,
          staked: await pool.balanceOf(stakingAddress) / 10 ** decimals,
          decimals: decimals,
          unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
          contract: pool,
          tokens : [token0, token1],
          is1inch : false
      };
  }
  
  async function getSmartbchErc20(App, token, address, stakingAddress) {
    if (address == "0x0000000000000000000000000000000000000000") {
      return {
        address,
        name : "bitcoin-cash",
        symbol : "BCH",
        totalSupply: 1e8,
        decimals: 18,
        staked: 0,
        unstaked: 0,
        contract: null,
        tokens:[address]
      }
    }
    const decimals = await token.decimals();
    const staked = await token.balanceOf(stakingAddress);
    const unstaked = await token.balanceOf(App.YOUR_ADDRESS);
    const name = await token.name();
    const symbol = await token.symbol();
    const totalSupply = await token.totalSupply();
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
  
  async function getSmartbchStoredToken(App, tokenAddress, stakingAddress, type) {
    switch (type) {
      case "uniswap":
        const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
        return await getSmartbchUniPool(App, pool, tokenAddress, stakingAddress);
      case "erc20":
        const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
        return await getSmartbchErc20(App, erc20, tokenAddress, stakingAddress);
    }
  }
  
  async function getSmartbchToken(App, tokenAddress, stakingAddress) {
      if (tokenAddress == "0x0000000000000000000000000000000000000000") {
        return getSmartbchErc20(App, null, tokenAddress, stakingAddress)
      }
      const type = window.localStorage.getItem(tokenAddress);
      if (type) return getSmartbchStoredToken(App, tokenAddress, stakingAddress, type);
      try {
        const pool = new ethers.Contract(tokenAddress, UNI_ABI, App.provider);
        const _token0 = await pool.token0();
        const uniPool = await getSmartbchUniPool(App, pool, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "uniswap");
        return uniPool;
      }
      catch(err) {
      }
      try {
        const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, App.provider);
        const _name = await erc20.name();
        const erc20tok = await getSmartbchErc20(App, erc20, tokenAddress, stakingAddress);
        window.localStorage.setItem(tokenAddress, "erc20");
        return erc20tok;
      }
      catch(err) {
        console.log(err);
        console.log(`Couldn't match ${tokenAddress} to any known token type.`);
      }
    }

async function loadSmartbchSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
    rewardTokenFunction, stakeTokenFunction) {
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
  
      if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
        console.log("Couldn't find stake function ", stakeTokenFunction);
      }
      const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();
  
      const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();
  
      var stakeToken = await getSmartbchToken(App, stakeTokenAddress, stakingAddress);
  
      if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
        stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
      }
  
      var newTokenAddresses = stakeToken.tokens.filter(x =>
        !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getSmartbchToken(App, address, stakingAddress);
      }
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
          tokens[rewardTokenAddress] = await getSmartbchToken(App, rewardTokenAddress, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
  
      const rewardTokenTicker = rewardToken.symbol;
  
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "smartbch");

      if (!poolPrices) 
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
  
      const stakeTokenTicker = poolPrices.stakeTokenTicker;
  
      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  
      const periodFinish = await STAKING_POOL.periodFinish();
      const rewardRate = await STAKING_POOL.rewardRate();
      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;
  
      const usdPerWeek = weeklyRewards * rewardTokenPrice;
  
      const staked_tvl = poolPrices.staked_tvl;
  
      const userStaked = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS) / 10 ** stakeToken.decimals;
  
      const userUnstaked = stakeToken.unstaked;
  
      const earned = await STAKING_POOL.earned(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
  
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
  
  async function loadSmartbchSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
      const info = await loadSmartbchSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
      if (!info) return null;
      return await printSynthetixPool(App, info, "smartbch");
  }
  
  async function loadSmartbchBasisFork(data) {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}`);
      _print("Reading smart contracts...\n");
  
      var tokens = {};
      var prices = {};
      var totalStaked = 0;
  
      let p1 = await loadSmartbchSynthetixPool(App, tokens, prices, data.PoolABI,
          data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
      totalStaked += p1.staked_tvl;
  
      if (data.SharePool2) {
        let p3 = await loadSmartbchSynthetixPool(App, tokens, prices, data.PoolABI,
            data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
        totalStaked += p3.staked_tvl;
      }
  
      let p2 = await loadSmartbchSynthetixPool(App, tokens, prices, data.PoolABI,
          data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
      totalStaked += p2.staked_tvl;
  
      if (data.SeedBanks) {
        let p = await loadMultipleSmartbchSynthetixPools(App, tokens, prices, data.SeedBanks)
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
  
  
  async function getSmartbchPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
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
    const poolToken = await getSmartbchToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
    };
  }
  
  async function loadSmartbchChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    deathPoolIndices, hideFooter, showTable, xSushiInfo) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    var tokens = {};
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getSmartbchToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 3
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getSmartbchPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getSmartbchToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "smartbch") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "smartbch") : undefined);
  
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []

    let xSushiTableData;
    if (xSushiInfo) {
      const {sushiAddress, xSushiAddress, xSushiAbi, xSushiRatio, exchangeGraph, barGraph} = xSushiInfo

      const xSushiContract = new ethers.Contract(xSushiAddress, xSushiAbi, App.provider);
      const xSushiDecimals = await xSushiContract.decimals();
      const [xSushiSymbol, totalSupply, balance ] =
        await Promise.all([
          xSushiContract.symbol(),
          xSushiContract.totalSupply(),
          xSushiContract.balanceOf(App.YOUR_ADDRESS)
        ]);
      const xSushiTotalSupply = totalSupply / 10 ** xSushiDecimals
      const xSushiBalance = await balance / 10 ** xSushiDecimals;
      const sushiPools = poolPrices.filter(val => val && (val.t0.address === sushiAddress || val.t1.address === sushiAddress))
      const sushiPrices = sushiPools.map(val => val.t0.address === sushiAddress ? val.p0 : val.p1)
      const average = (array) => {
        if (!array.length)
          return 0;
        return array.reduce((a, b) => a + b) / array.length;
      }
      const sushiPrice = average(sushiPrices);

      // get sushi/xsushi ratio from bar graph
      const barResponse = await fetch(barGraph, {
        "headers": {
          "accept": "application/json",
          "content-type": "application/json",
        },
        "body": `{\"query\":\"{bar(id: \\\"${xSushiAddress.toLowerCase()}\\\") {ratio}}\"}`,
        "method": "POST",
      });
      const barJson = await barResponse.json();
      const ratio = barJson.data.bar.ratio;

      // derive xsushi price
      const xSushiPrice = sushiPrice * ratio;
      const tvl = xSushiTotalSupply * xSushiPrice;

      // get last day volume from exchange graph
      const volumeResponse = await fetch(exchangeGraph, {
        "headers": {
          "accept": "application/json",
          "content-type": "application/json",
        },
        "body": "{\"query\":\"query volume {\\n  dayDatas(first: 100, skip: 1, orderBy: date, orderDirection: desc) {\\n     volumeUSD\\n  }\\n}\",\"variables\":null,\"operationName\":\"volume\"}",
        "method": "POST",
      });
      const volumeJson = await volumeResponse.json();
      const volumes = volumeJson.data.dayDatas.map(val => val.volumeUSD);
      const apr = ((volumes[0] * xSushiRatio / xSushiTotalSupply) * 365) / xSushiPrice;

      _print(`----------------------------------------------------------------`);
      _print(`Bar Staking Contract: ${xSushiSymbol} (${xSushiAddress})`);
      _print(`Price: $${formatMoney(xSushiPrice, 3)} TVL: $${formatMoney(tvl)} Total Supply: ${xSushiTotalSupply.toFixed(2)}`);
      _print(`APR: Day ${(apr / 364).toFixed(3)}% Week ${(apr / 52).toFixed(2)}% Year ${(apr).toFixed(2)}%`);
      _print(`You are staking ${xSushiBalance.toFixed(2)} ${xSushiSymbol} ($${formatMoney(xSushiBalance * xSushiPrice)}), ${(100 * xSushiBalance/xSushiTotalSupply).toFixed(2)}% of the pool.`);
      _print(`----------------------------------------------------------------`);
      _print(``);

      aprs.push({
        userStakedUsd: xSushiBalance * xSushiPrice,
        totalStakedUsd: xSushiTotalSupply * xSushiPrice,
        userStakedPct: xSushiBalance / xSushiTotalSupply,
        yearlyAPR: apr,
        userYearlyUsd: xSushiBalance * xSushiPrice * apr
      });

      xSushiTableData = [
        "",
        xSushiSymbol,
        xSushiTotalSupply.toFixed(2),
        `$${formatMoney(xSushiTotalSupply * xSushiPrice)}`,
        xSushiSymbol,
        `${(apr).toFixed(2)}%`,
        `${xSushiBalance.toFixed(2)} ($${formatMoney(xSushiBalance * xSushiPrice)}), ${(100 * xSushiBalance/xSushiTotalSupply).toFixed(2)}%`,
      ]
    }

    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
          pendingRewardsFunction, null, null, "smartbch")
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
  
    if (!hideFooter) {
      _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
      if (totalUserStaked > 0) {
        _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
        _print(`Estimated earnings:`
            + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
            + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
            + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
      }
    }

    if (showTable) {
      let tableData = {
        "title": rewardTokenTicker,
        "heading": [
          "#",
          "Pair",
          "Total Staked",
          "Total $ Staked",
          "Reward",
          "APR",
          "My Stake",
        ],
        "rows": []
      }

      if (xSushiTableData) {
        tableData.rows.push(xSushiTableData)
      }

      for (let i = 0; i < poolCount; i++) {
        if (poolPrices[i]) {
          let pool = buildChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction)

          if (pool) {
            tableData.rows.push([
              _build_link(`${i}`, () => {
                document.getElementById("pool-details-modal").style.display = 'block'

                let table = new AsciiTable();

                let tableData = {
                  "title": pool.pair_link,
                  "rows": []
                }
                table.addRow(["Pair", pool.pair_link])
                table.addRow(["TVL", pool.tvl])

                if (pool.add_liquidity_link) {
                  table.addRow(["Add Liquidity", pool.add_liquidity_link])
                  table.addRow(["Remove Liquidity", pool.remove_liquidity_link])
                  table.addRow(["Swap", pool.swap_link])
                  table.addRow([`${pool.token0} Price`, pool.price0])
                  table.addRow([`${pool.token1} Price`, pool.price1])
                }

                table.addRow([`${pool.reward_token} Weekly rewards`, pool.weekly_rewards])
                table.addRow(["Total staked", `${pool.total_staked} (${pool.total_staked_dollars})`])
                table.addRow(["My stake", pool.user_stake])
                table.addRow(["DPR", pool.dpr])
                table.addRow(["WPR", pool.wpr])
                table.addRow(["APR", pool.apr])
                table.addRow(["Stake", pool.stake])
                table.addRow(["Unstake", pool.unstake])
                table.addRow(["Claim", pool.claim])

                document.getElementById('pool-details-content').innerHTML += table + '<br />';

              }),
              _truncate_link(pool.pair_link.replace(/\u0000/g,""), 30),
              pool.total_staked,
              pool.total_staked_dollars,
              pool.reward_token,
              pool.apr,
              pool.user_stake,
            ])
          }
        }
      }

      let table = new AsciiTable().fromJSON(tableData);
      table
        .setAlign(0, AsciiTable.RIGHT)
        .setAlign(2, AsciiTable.RIGHT)
        .setAlign(3, AsciiTable.RIGHT)
        .setAlign(5, AsciiTable.RIGHT)

      document.getElementById('log').innerHTML += table + '<br />';
    }

    return { prices, totalUserStaked, totalStaked, averageApr }
  }

  async function loadMultipleSmartbchSynthetixPools(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    const infos = await Promise.all(pools.map(p =>
        loadSmartbchSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
    for (const i of infos) {
      let p = await printSynthetixPool(App, i, "smartbch");
      totalStaked += p.staked_tvl || 0;
      totalUserStaked += p.userStaked || 0;
      if (p.userStaked > 0) {
        individualAPRs.push(p.userStaked * p.apr / 100);
      }
    }
    let totalApr = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
    return { staked_tvl : totalStaked, totalUserStaked, totalApr };
  }
  
  async function loadMultipleSmartbchSynthetixPoolsSequential(App, tokens, prices, pools) {
    let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
    for (const p of pools) {
      let res = await loadSmartbchSynthetixPool(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction);
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
