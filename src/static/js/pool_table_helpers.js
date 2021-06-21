

async function printChefContractPoolsTable(title, App, chef, chefAddress, chefAbi, rewardTokenTicker,
                                rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
                                extraPrices, deathPoolIndices, showAll) {

  let tableData = {
    "title": title,
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

  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {
    deathPoolIndices.map(i => poolInfos[i])
      .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

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
          _truncate_link(pool.pair_link.replace(/\u0000/g,""), 20),
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

function buildChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth") {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek === 0 && rewardsPerWeek !== 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;

  let priceLinks = poolPrices.pair_links(chain);

  let apr = buildAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);

  let actions =
    buildChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain);

  return {
    reward_token: apr.reward_token,
    pair_link: priceLinks.pair_link,
    add_liquidity_link: priceLinks.add_liquidity_link,
    remove_liquidity_link: priceLinks.remove_liquidity_link,
    swap_link: priceLinks.swap_link,
    token0: priceLinks.token0,
    price0: priceLinks.price0,
    token1: priceLinks.token1,
    price1: priceLinks.price1,
    total_staked: priceLinks.total_staked,
    total_staked_dollars: priceLinks.total_staked_dollars,
    tvl: priceLinks.tvl,
    weekly_rewards: apr.weekly_rewards,
    dpr: apr.dpr,
    wpr: apr.wpr,
    apr: apr.apr,
    user_stake: apr.user_stake,
    stake: actions.stake,
    unstake: actions.unstake,
    claim: actions.claim,
  };
}

function buildAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;

  return {
    reward_token: rewardTokenTicker,
    weekly_rewards: `${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`,
    dpr: `${dailyAPR.toFixed(2)}%`,
    wpr: `${weeklyAPR.toFixed(2)}%`,
    apr: `${yearlyAPR.toFixed(2)}%`,
    user_stake: `${userStaked.toFixed(fixedDecimals)} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}%`
  }
}

function buildChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
                                rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
                                claimFunction, rewardTokenPrice) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  let stakeLink = _build_link(`${unstaked.toFixed(fixedDecimals)}`, approveAndStake)
  let unstakeLink = _build_link(`${userStaked.toFixed(fixedDecimals)}`, unstake)
  let claimLink = _build_link(`${pendingRewardTokens.toFixed(fixedDecimals)} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)

  return { stake: stakeLink, unstake: unstakeLink, claim: claimLink }
}

const _build_link = function(message, onclickFunction, uuid = ID()) {

  let link = '<a href="#" id=' + uuid + '>' + message + '</a>'

  $(document).on('click', '#' + uuid, function() {
    onclickFunction()
    return false
  })

  return link
}

const _truncate_link = function (link, maxLength) {
    let text = link.match(/<a href.*?>(.*)<\/a>/i)[1]

    if (text.length > maxLength) {
      let replacementText = text.substr(0, maxLength - 3) + "..."
      return link.slice().replace(text, replacementText)
    }

    return link
}
