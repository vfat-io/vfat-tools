$(function() {
  consoleInit(main)
});

const ARBITRUM_LAUNCHED = false

const REWARD_READER_ABI = [{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address[]","name":"_depositTokens","type":"address[]"},{"internalType":"address[]","name":"_rewardTrackers","type":"address[]"}],"name":"getDepositBalances","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address[]","name":"_rewardTrackers","type":"address[]"}],"name":"getStakingInfo","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"}]

const UNI_POOL_ABI = [{"inputs": [{"internalType": "uint32[]","name": "","type": "uint32[]"}],"name": "observe","outputs": [{"internalType": "int56[]","name": "tickCumulatives","type": "int56[]"},{"internalType": "uint160[]","name": "secondsPerLiquidityCumulativeX128s","type": "uint160[]"}],"stateMutability": "pure","type": "function"},{"inputs": [],"name": "slot0","outputs": [{"internalType": "uint160","name": "sqrtPriceX96","type": "uint160"},{"internalType": "int24","name": "tick","type": "int24"},{"internalType": "uint16","name": "observationIndex","type": "uint16"},{"internalType": "uint16","name": "observationCardinality","type": "uint16"},{"internalType": "uint16","name": "observationCardinalityNext","type": "uint16"},{"internalType": "uint8","name": "feeProtocol","type": "uint8"},{"internalType": "bool","name": "unlocked","type": "bool"}],"stateMutability": "view","type": "function"}]

const REWARD_TRACKER_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BASIS_POINTS_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"averageStakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"claim","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"claimForAccount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimableReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cumulativeRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"depositBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gov","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateClaimingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateStakingMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inPrivateTransferMode","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_depositTokens","type":"address[]"},{"internalType":"address","name":"_distributor","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDepositToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isHandler","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"previousCumulatedRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"bool","name":"_isDepositToken","type":"bool"}],"name":"setDepositToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gov","type":"address"}],"name":"setGov","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_handler","type":"address"},{"internalType":"bool","name":"_isActive","type":"bool"}],"name":"setHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateClaimingMode","type":"bool"}],"name":"setInPrivateClaimingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateStakingMode","type":"bool"}],"name":"setInPrivateStakingMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_inPrivateTransferMode","type":"bool"}],"name":"setInPrivateTransferMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_fundingAccount","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakedAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensPerInterval","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalDepositSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_depositToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"unstakeForAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const GLP_MANAGER_ABI = [{"inputs": [{"internalType": "address","name": "_vault","type": "address"},{"internalType": "address","name": "_usdg","type": "address"},{"internalType": "address","name": "_glp","type": "address"},{"internalType": "uint256","name": "_cooldownDuration","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"},{"indexed": false,"internalType": "address","name": "token","type": "address"},{"indexed": false,"internalType": "uint256","name": "amount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "aumInUsdg","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "glpSupply","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "usdgAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "mintAmount","type": "uint256"}],"name": "AddLiquidity","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "account","type": "address"},{"indexed": false,"internalType": "address","name": "token","type": "address"},{"indexed": false,"internalType": "uint256","name": "glpAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "aumInUsdg","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "glpSupply","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "usdgAmount","type": "uint256"},{"indexed": false,"internalType": "uint256","name": "amountOut","type": "uint256"}],"name": "RemoveLiquidity","type": "event"},{"inputs": [],"name": "MAX_COOLDOWN_DURATION","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "PRICE_PRECISION","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "USDG_DECIMALS","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_token","type": "address"},{"internalType": "uint256","name": "_amount","type": "uint256"},{"internalType": "uint256","name": "_minUsdg","type": "uint256"},{"internalType": "uint256","name": "_minGlp","type": "uint256"}],"name": "addLiquidity","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_fundingAccount","type": "address"},{"internalType": "address","name": "_account","type": "address"},{"internalType": "address","name": "_token","type": "address"},{"internalType": "uint256","name": "_amount","type": "uint256"},{"internalType": "uint256","name": "_minUsdg","type": "uint256"},{"internalType": "uint256","name": "_minGlp","type": "uint256"}],"name": "addLiquidityForAccount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "aumAddition","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "aumDeduction","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "cooldownDuration","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bool","name": "maximise","type": "bool"}],"name": "getAum","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "bool","name": "maximise","type": "bool"}],"name": "getAumInUsdg","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getAums","outputs": [{"internalType": "uint256[]","name": "","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "glp","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "gov","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "inPrivateMode","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "isHandler","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "lastAddedAt","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_tokenOut","type": "address"},{"internalType": "uint256","name": "_glpAmount","type": "uint256"},{"internalType": "uint256","name": "_minOut","type": "uint256"},{"internalType": "address","name": "_receiver","type": "address"}],"name": "removeLiquidity","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_account","type": "address"},{"internalType": "address","name": "_tokenOut","type": "address"},{"internalType": "uint256","name": "_glpAmount","type": "uint256"},{"internalType": "uint256","name": "_minOut","type": "uint256"},{"internalType": "address","name": "_receiver","type": "address"}],"name": "removeLiquidityForAccount","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_aumAddition","type": "uint256"},{"internalType": "uint256","name": "_aumDeduction","type": "uint256"}],"name": "setAumAdjustment","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_cooldownDuration","type": "uint256"}],"name": "setCooldownDuration","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_gov","type": "address"}],"name": "setGov","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_handler","type": "address"},{"internalType": "bool","name": "_isActive","type": "bool"}],"name": "setHandler","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "bool","name": "_inPrivateMode","type": "bool"}],"name": "setInPrivateMode","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "usdg","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "vault","outputs": [{"internalType": "contractIVault","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

const addresses = {
  StakedGmxTracker: '0x908C4D94D34924765f1eDc22A1DD098397c59dD4',
  RewardReader: '0xD6cf2885cdF53868127F0aBefa1CEE40B940FC8f',
  StakedGmxTracker: "0x908C4D94D34924765f1eDc22A1DD098397c59dD4",
  BonusGmxTracker: "0x4d268a7d4C16ceB5a606c173Bd974984343fea13",
  FeeGmxTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
  FeeGlpTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",
  StakedGlpTracker: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
  GMX: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
  WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  ES_GMX: "0xf42Ae1D54fd613C9bb14810b0588FaAa09a426cA",
  GLP: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
  GlpManager: "0x321F653eED006AD1C29D174e17d96351BDe22649",
  UniPool: "0x80A9ae39310abf666A87C743d6ebBD0E8C42158E"
}

function sumArr(arr) {
  return arr.reduce((a, b) => a + b)
}

async function getGmxPriceInEth(provider) {
  const uniPool = new ethers.Contract(addresses.UniPool, UNI_POOL_ABI, provider)
  const uniPoolSlot0 = await uniPool.slot0()

  return uniSqrtPrice([18, 18], uniPoolSlot0.sqrtPriceX96);
}

async function getEthPrice() {
  const data = await lookUpPrices(['ethereum'])
  return data && data.ethereum && data.ethereum.usd || 0
}

const formatUnits = ethers.utils.formatUnits

function getTokenUrl(addr) {
  return `https://arbiscan.io/address/${addr}`
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

  const stakedGmxTracker = new ethers.Contract(addresses.StakedGmxTracker, REWARD_TRACKER_ABI, App.provider);
  const feeGmxTracker = new ethers.Contract(addresses.FeeGmxTracker, REWARD_TRACKER_ABI, App.provider);

  const stakedGlpTracker = new ethers.Contract(addresses.StakedGlpTracker, REWARD_TRACKER_ABI, App.provider);
  const feeGlpTracker = new ethers.Contract(addresses.FeeGlpTracker, REWARD_TRACKER_ABI, App.provider);

  const gmx = new ethers.Contract(addresses.GMX, REWARD_TRACKER_ABI, App.provider)
  const glp = new ethers.Contract(addresses.GLP, REWARD_TRACKER_ABI, App.provider)
  const glpManager = new ethers.Contract(addresses.GlpManager, GLP_MANAGER_ABI, App.provider)

  const [
    gmxPriceInEth,
    ethPrice, 
    gmxSupply,
    glpSupply,
    glpAum
  ] = await Promise.all([
    getGmxPriceInEth(App.provider),
    getEthPrice(),
    gmx.totalSupply().then(v => v / 1e18),
    glp.totalSupply().then(v => v / 1e18),
    glpManager.getAumInUsdg(true).then(v => v / 1e18)
  ])
  const gmxPrice = gmxPriceInEth * ethPrice
  const glpPrice = glpAum / glpSupply

  const poolTokensStr = ['BTC', 'ETH', 'USDC'].map(token => `[${token}]`).join('-')
  _print(
    `<a href="${getTokenUrl(addresses.GLP)}" target="_blank">${poolTokensStr} GMX LP</a>`
    + ` <a href="https://gmx.financial/buy_glp" target="_blank">[+]</a>`
    + ` Price: $${formatMoney(glpPrice)} TVL: $${formatMoney(glpAum)}`
  )
  await loadYieldFarm(App, [
    {tracker: stakedGlpTracker, tokenSymbol: 'Escrowed GMX', tokenPrice: gmxPrice},
    {tracker: feeGlpTracker, tokenSymbol: 'ETH', tokenPrice: ethPrice}
  ], glpPrice, [addresses.FeeGlpTracker], ['GLP'])

  _print(`<a href="${getTokenUrl(addresses.GMX)}" target="_blank">GMX</a> Price: $${formatMoney(gmxPrice)} Market Cap: $${formatMoney(gmxSupply * gmxPrice)}`)
  await loadYieldFarm(App, [
    {tracker: stakedGmxTracker, tokenSymbol: 'Escrowed GMX', tokenPrice: gmxPrice}, 
    {tracker: feeGmxTracker, tokenSymbol: 'ETH', tokenPrice: ethPrice},
  ], gmxPrice, [addresses.GMX, addresses.ES_GMX], ['GMX', 'Escrowed GMX'])

  hideLoading();
}
