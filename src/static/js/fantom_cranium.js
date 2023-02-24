$(function() {
  consoleInit(main)
});

const REWARD_READER_ABI = [{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address[]","name":"_depositTokens","type":"address[]"},{"internalType":"address[]","name":"_rewardTrackers","type":"address[]"}],"name":"getDepositBalances","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address[]","name":"_rewardTrackers","type":"address[]"}],"name":"getStakingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}]

const UNI_POOL_ABI = [{"inputs": [{"internalType": "uint32[]","name": "","type": "uint32[]"}],"name": "observe","outputs": [{"internalType": "int56[]","name": "tickCumulatives","type": "int56[]"},{"internalType": "uint160[]","name": "secondsPerLiquidityCumulativeX128s","type": "uint160[]"}],"stateMutability": "pure","type": "function"},{"inputs": [],"name": "slot0","outputs": [{"internalType": "uint160","name": "sqrtPriceX96","type": "uint160"},{"internalType": "int24","name": "tick","type": "int24"},{"internalType": "uint16","name": "observationIndex","type": "uint16"},{"internalType": "uint16","name": "observationCardinality","type": "uint16"},{"internalType": "uint16","name": "observationCardinalityNext","type": "uint16"},{"internalType": "uint8","name": "feeProtocol","type": "uint8"},{"internalType": "bool","name": "unlocked","type": "bool"}],"stateMutability": "view","type": "function"}]

const REWARD_TRACKER_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BASIS_POINTS_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"averageStakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"claimForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cumulativeRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"depositBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gov","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateClaimingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateStakingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateTransferMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_depositTokens","type":"address[]"},{"internalType":"address","name":"_distributor","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDepositToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"previousCumulatedRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"bool","name":"_isDepositToken","type":"bool"}],"name":"setDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_handler","type":"address"},{"internalType":"bool","name":"_isActive","type":"bool"}],"name":"setHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateClaimingMode","type":"bool"}],"name":"setInPrivateClaimingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateStakingMode","type":"bool"}],"name":"setInPrivateStakingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateTransferMode","type":"bool"}],"name":"setInPrivateTransferMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundingAccount","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensPerInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalDepositSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"unstakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SLP_MANAGER_ABI = [{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_usds","type":"address"},{"internalType":"address","name":"_slp","type":"address"},{"internalType":"uint256","name":"_cooldownDuration","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aumInUsds","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"mintAmount","type":"uint256"}],"name":"AddLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"slpAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aumInUsds","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"slpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"usdsAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"RemoveLiquidity","type":"event"},{"inputs":[],"name":"MAX_COOLDOWN_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRICE_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"USDS_DECIMALS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minUsds","type":"uint256"},{"internalType":"uint256","name":"_minSlp","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundingAccount","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_minUsds","type":"uint256"},{"internalType":"uint256","name":"_minSlp","type":"uint256"}],"name":"addLiquidityForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"aumAddition","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"aumDeduction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cooldownDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"maximise","type":"bool"}],"name":"getAum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"maximise","type":"bool"}],"name":"getAumInUsds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAums","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gov","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastAddedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenOut","type":"address"},{"internalType":"uint256","name":"_slpAmount","type":"uint256"},{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_tokenOut","type":"address"},{"internalType":"uint256","name":"_slpAmount","type":"uint256"},{"internalType":"uint256","name":"_minOut","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"removeLiquidityForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_aumAddition","type":"uint256"},{"internalType":"uint256","name":"_aumDeduction","type":"uint256"}],"name":"setAumAdjustment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cooldownDuration","type":"uint256"}],"name":"setCooldownDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_handler","type":"address"},{"internalType":"bool","name":"_isActive","type":"bool"}],"name":"setHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateMode","type":"bool"}],"name":"setInPrivateMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slp","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usds","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"contract IVault","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const addresses = {
  StakedSkullTracker: '0x6f0dcE2785241f72f10605b3644983e91D806732',
  RewardReader: '0x096aA9D819e465f5f8Bea83947fa43af67d8ac09',
  StakedSkullTracker: "0x6f0dcE2785241f72f10605b3644983e91D806732",
  BonusSkullTracker: "0x350FD63274e00DD45bc85B2745b24a5047473568",
  FeeSkullTracker: "0xF03C3b4449Cb25611A590566CF7DCe586ad2aedd",
  FeeSlpTracker: "0x821D86F3860acb43bbA46f32231FDD11db2B2b0e",
  StakedSlpTracker: "0x748E9EE6E878Eca5d7d97C7427066aaeF095C7E3",
  SKULL: "0xfa5992A8A47aF7029e04eC6a95203AD3f301460b",
  USDS: "0x9A79f0ebc33c3af0C42E7f17210c6153CF0Ad837", //ftm???
  ES_SKULL: "0x2b402AeDd4ccC193DC2A50c281Fb8945ddaD9760",
  SLP: "0xae904132587Db1c9177ED4755c32811407ebeAb4",
  SlpManager: "0x9A3CF1DF49Ab9A4C8c3C8DC5EEbd0e6A384F1B9d",
}

function sumArr(arr) {
  return arr.reduce((a, b) => a + b)
}

const formatUnits = ethers.utils.formatUnits

function getTokenUrl(addr) {
  return `https://ftmscan.com/address/${addr}`
}

async function loadYieldFarm(App, rewardSources, stakeTokenPrice, stakedTokensAddresses, stakedTokensSymbols) {
  const reader = new ethers.Contract(addresses.RewardReader, REWARD_READER_ABI, App.provider);
  const totalStaked = await rewardSources[0].tracker.totalSupply() / 1e18
  const totalStakedTvl = totalStaked * stakeTokenPrice

  const rewardsPromise = Promise.all(rewardSources.map(async ({ tracker, tokenSymbol, tokenPrice }) => {
    const tokensPerInterval = await tracker.tokensPerInterval()
    return {
      tokensPerInterval: tokensPerInterval / 1e18,
      tokenSymbol,
      tokenPrice
    }
  }))
  const myDepositBalancesPromise = reader.getDepositBalances(
    App.YOUR_ADDRESS,
    stakedTokensAddresses,
    stakedTokensAddresses.map(() => rewardSources[0].tracker.address)
  ).then(balances => balances.map(val => val / 1e18))

  const [
    rewards,
    myDepositBalances
  ] = await Promise.all([rewardsPromise, myDepositBalancesPromise])

  _print(`Staked: ${formatMoney(totalStaked)} ($${formatMoney(totalStakedTvl)})`)

  const DAY = 86400
  const WEEK = DAY * 7
  let totalWeeklyAPR = 0
  for (const { tokensPerInterval, tokenPrice, tokenSymbol } of rewards) {
    const perWeek = tokensPerInterval * WEEK
    const weeklyAPR = perWeek * tokenPrice / totalStakedTvl * 100
    totalWeeklyAPR += weeklyAPR
    _print(`${tokenSymbol} Per Week: ${perWeek.toFixed(2)} ($${formatMoney(perWeek * tokenPrice)})`)
  }

  const totalDailyAPR = totalWeeklyAPR / 7
  const totalYearlyAPR = totalWeeklyAPR * 52
  _print(`APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`)

  const myTotalStakeStr = myDepositBalances.map((value, i) => `${value.toFixed(2)} ${stakedTokensSymbols[i]}`).join(' + ')
  const myTotalStakeUsd = sumArr(myDepositBalances) * stakeTokenPrice
  const myShare = myTotalStakeUsd / totalStakedTvl

  _print(`You are staking ${myTotalStakeStr} ($${formatMoney(myTotalStakeUsd)}), ${(myShare * 100).toFixed(2)}% of the pool.`)

  if (myTotalStakeUsd > 0) {
    for (const { tokensPerInterval, tokenPrice, tokenSymbol } of rewards) {
      const yearlyEarnings = tokensPerInterval * DAY * 365 * myShare
      const weeklyEarnings = yearlyEarnings / 52
      const dailyEarnings = yearlyEarnings / 365
      _print(
        `Estimated ${tokenSymbol} earnings:`
        + ` Day ${dailyEarnings.toFixed(4)} ($${formatMoney(dailyEarnings * tokenPrice)})`
        + ` Week ${weeklyEarnings.toFixed(4)} ($${formatMoney(weeklyEarnings * tokenPrice)})`
        + ` Year ${yearlyEarnings.toFixed(4)} ($${formatMoney(yearlyEarnings * tokenPrice)})`
      )
    }
  }
  _print('')
}

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  const prices = await getFantomPrices();
  const tokens = {};
  await loadSkullLpPrice(App, tokens, prices, "0x4e8F99BBC626449b2715BCbd00438432998Ac4c0", "0x4e8F99BBC626449b2715BCbd00438432998Ac4c0");
  const ftmPrice = getParameterCaseInsensitive(prices, "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83")?.usd;
  const skullPriceInEth = getParameterCaseInsensitive(prices, "0xfa5992a8a47af7029e04ec6a95203ad3f301460b")?.usd;

  const stakedSkullTracker = new ethers.Contract(addresses.StakedSkullTracker, REWARD_TRACKER_ABI, App.provider);
  const feeSkullTracker = new ethers.Contract(addresses.FeeSkullTracker, REWARD_TRACKER_ABI, App.provider);

  const stakedSlpTracker = new ethers.Contract(addresses.StakedSlpTracker, REWARD_TRACKER_ABI, App.provider);
  const feeSlpTracker = new ethers.Contract(addresses.FeeSlpTracker, REWARD_TRACKER_ABI, App.provider);

  const skull = new ethers.Contract(addresses.SKULL, REWARD_TRACKER_ABI, App.provider)
  const slp = new ethers.Contract(addresses.SLP, REWARD_TRACKER_ABI, App.provider)
  const slpManager = new ethers.Contract(addresses.SlpManager, SLP_MANAGER_ABI, App.provider)

  const [
    skullSupply,
    slpSupply,
    slpAum
  ] = await Promise.all([
    skull.totalSupply().then(v => v / 1e18),
    slp.totalSupply().then(v => v / 1e18),
    slpManager.getAumInUsds(true).then(v => v / 1e18)
  ])
  const skullPrice = skullPriceInEth * ftmPrice
  const slpPrice = slpAum / slpSupply

  const poolTokensStr = ['SLP'].map(token => `[${token}]`).join('-')
  _print(
    `<a href="${getTokenUrl(addresses.SLP)}" target="_blank">${poolTokensStr} SKULL LP</a>`
    + ` <a href="https://cranium.exchange/buy_slp" target="_blank">[+]</a>`
    + ` Price: $${formatMoney(slpPrice)} TVL: $${formatMoney(slpAum)}`
  )
  await loadYieldFarm(App, [
    {tracker: stakedSlpTracker, tokenSymbol: 'SKULL', tokenPrice: skullPriceInEth},
    {tracker: feeSlpTracker, tokenSymbol: 'FTM', tokenPrice: ftmPrice},
    {tracker: feeSkullTracker, tokenSymbol: 'Escrowed SKULL', tokenPrice: skullPrice}
  ], slpPrice, [addresses.FeeSlpTracker], ['SLP'])

  _print(`<a href="${getTokenUrl(addresses.SKULL)}" target="_blank">SKULL</a> Price: $${formatMoney(skullPriceInEth)} Market Cap: $${formatMoney(skullSupply * skullPriceInEth)}`)
  await loadYieldFarm(App, [
    {tracker: stakedSkullTracker, tokenSymbol: 'Escrowed SKULL', tokenPrice: skullPrice}, 
    {tracker: feeSkullTracker, tokenSymbol: 'FTM', tokenPrice: ftmPrice},
  ], skullPrice, [addresses.SKULL, addresses.ES_SKULL], ['SKULL', 'Escrowed SKULL'])

  hideLoading();
}

async function loadSkullLpPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
  var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
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
      tokens[address] = await getToken(App, address, stakingAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimism");

  if (!poolPrices)
  {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
  }
}