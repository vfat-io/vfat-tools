$(function() {
    consoleInit(main)
    });
    
    const BUNI_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardDistributor","type":"address"},{"internalType":"address","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"},{"internalType":"uint256","name":"_rewardDuration","type":"uint256"},{"internalType":"uint256","name":"_vestingPeriod","type":"uint256"},{"internalType":"uint256","name":"_splits","type":"uint256"},{"internalType":"uint256","name":"_claimable","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"userAddress","type":"address"},{"indexed":false,"internalType":"address payable","name":"relayerAddress","type":"address"},{"indexed":false,"internalType":"bytes","name":"functionSignature","type":"bytes"}],"name":"MetaTransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"ERC712_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"availableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimedSplits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bytes","name":"functionSignature","type":"bytes"},{"internalType":"bytes32","name":"sigR","type":"bytes32"},{"internalType":"bytes32","name":"sigS","type":"bytes32"},{"internalType":"uint8","name":"sigV","type":"uint8"}],"name":"executeMetaTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getDomainSeperator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"nonce","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"receiver","type":"address"}],"name":"rescueFunds","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardDistributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"splitWindow","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"splits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalEarnedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalVestedRewardForUser","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    const Pools = [
      "0x08c19bdA7964A5a953765e7CC6E04FEF504C5389",
      "0xe02877C2914983E16e96418Cd29109e3B027D095",
      "0x936ed835E72B7F9B0DD908F46344B89EC4e23058",
      "0x9f2515135453f9485b2aE91ef48e92e0fEd0D2AE",
      "0x772759eEa5111286B3Fc2c808FB3DE6F73c37050",
      "0x3FD9017D28fDbb6E429bCC6AAeE2a0Fa991159Fc",
      "0x621Cb28f4719AcB815E35dd2BF804A9Be2307548",
      "0x71F39E16e3ef8DAf6e85ec30C56CDf0baFD251b2",
      "0xc0B6171ccd2Eb5Cf0dfCAABC5e1BE3ab671BE445",
      "0x9f61780d91F2C125EB3C49fE74df7b40183Fb4df",
      "0xb6c9e17B77257ae7F1cff43D2A02c6bE760A7e9e",
      "0xD0a00bc14C150e6F8F0B0dFfee2e1944C73B8A05"
    ].map(a => {
      return {
        address: a,
        abi: BUNI_STAKING_ABI,
        stakeTokenFunction: "stakingToken",
        rewardTokenFunction: "rewardToken"
      }; })
async function main() {
  const App = await init_ethers();
  var tokens = {};
  var prices = await getBscPrices();
  _print(`Initialized ${App.YOUR_ADDRESS}`);
  _print("Reading smart contracts...\n");
  
  _print_bold('PRE-STAKING\n');

  await loadBscSynthetixPoolInfo(App, tokens, prices,
                                 Pools[0].abi,
                                 Pools[0].address,
                                 Pools[0].rewardTokenFunction,
                                 Pools[0].stakeTokenFunction)

  let p = await loadMultipleBscSynthetixPools(App, tokens, prices, Pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
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

    info.availableEarned = 0;
    if (Pools.indexOf(info.stakeTokenAddress) !== -1) {
        const STAKING_POOL = new ethers.Contract(info.stakeTokenAddress, BUNI_STAKING_ABI, App.provider);
        info.availableEarned = await STAKING_POOL.availableReward(App.YOUR_ADDRESS) / 10 ** 18;
    }

    const approveTENDAndStake = async function() {
        return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
        return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
        if (info.availableEarned === 0) {
            alert('You have no unlock token to harvest!!')
            return;
        }
        return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
        return rewardsContract_exit(info.stakingAddress, App)
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
        case "okex":
            _print(`<a target="_blank" href="https://www.oklink.com/okexchain/address/${info.stakingAddress}#code">Okex Explorer</a>`);
            break;
        case "kcc":
            _print(`<a target="_blank" href="https://explorer.kcc.io/en/address/${info.stakingAddress}#code">KUCOIN Explorer</a>`);
            break;
        case "fantom":
            _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
            break;
        case "fuse":
            _print(`<a target="_blank" href="https://explorer.fuse.io/address/${info.stakingAddress}#code">FUSE Scan</a>`);
            break;
        case "xdai":
            _print(`<a target="_blank" href="https://blockscout.com/xdai/mainnet/address/${info.stakingAddress}/contracts">Explorer</a>`);
            break;
    }
    _print(`Earned ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`)
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`,() => alert('The prestaking closed. You can not stake LP anymore.'))
    }
    else {
        _print("Please use the official website to stake ETH.");
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.availableEarned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.availableEarned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
        _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}

async function getBscBalancerPool(App, pool, poolAddress, stakingAddress, tokens, smartToken) {
    let decimals = await pool.decimals();
    let symbol = await pool.symbol();
    let name = await pool.name();
    let totalSupply = await pool.totalSupply();
    let staked = await pool.balanceOf(stakingAddress);
    const unstaked = await pool.balanceOf(App.YOUR_ADDRESS);
    let poolTokens = [];
    for (const t of tokens) {
        poolTokens.push({ address: t, weight: await pool.getNormalizedWeight(t) / 1e18, balance: await pool.getBalance(t) })
    };
    if (smartToken) {
        totalSupply = await smartToken.totalSupply();
        staked = await smartToken.balanceOf(stakingAddress);
        unstaked = await smartToken.balanceOf(App.YOUR_ADDRESS);
    }
    return {
        symbol,
        name,
        address: poolAddress,
        poolTokens, //address, weight and balance
        totalSupply: totalSupply / 10 ** decimals,
        buniPoolTokens: poolTokens,
        stakingAddress,
        staked: staked / 10 ** decimals,
        decimals: decimals,
        unstaked: unstaked / 10 ** decimals,
        contract: pool,
        tokens
    };
}
