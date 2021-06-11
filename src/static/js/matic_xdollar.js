
$(function() {
consoleInit(main)
});

const XDO_STAKING_ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newActivePoolAddress","type":"address"}],"name":"ActivePoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newBorrowerOperationsAddress","type":"address"}],"name":"BorrowerOperationsAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newCommunityIssuanceAddress","type":"address"}],"name":"CommunityIssuanceAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newDefaultPoolAddress","type":"address"}],"name":"DefaultPoolAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_S","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"}],"name":"DepositSnapshotUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_ETH","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_LUSDLoss","type":"uint256"}],"name":"ETHGainWithdrawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"_currentEpoch","type":"uint128"}],"name":"EpochUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"EtherSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_kickbackRate","type":"uint256"}],"name":"FrontEndRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"}],"name":"FrontEndSnapshotUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newFrontEndStake","type":"uint256"},{"indexed":false,"internalType":"address","name":"_depositor","type":"address"}],"name":"FrontEndStakeChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"}],"name":"FrontEndTagSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_G","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"_epoch","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"_scale","type":"uint128"}],"name":"G_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LQTY","type":"uint256"}],"name":"LQTYPaidToDepositor","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_frontEnd","type":"address"},{"indexed":false,"internalType":"uint256","name":"_LQTY","type":"uint256"}],"name":"LQTYPaidToFrontEnd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newLUSDTokenAddress","type":"address"}],"name":"LUSDTokenAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_P","type":"uint256"}],"name":"P_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newPriceFeedAddress","type":"address"}],"name":"PriceFeedAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_S","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"_epoch","type":"uint128"},{"indexed":false,"internalType":"uint128","name":"_scale","type":"uint128"}],"name":"S_Updated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint128","name":"_currentScale","type":"uint128"}],"name":"ScaleUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newSortedTrovesAddress","type":"address"}],"name":"SortedTrovesAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newBalance","type":"uint256"}],"name":"StabilityPoolETHBalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_newBalance","type":"uint256"}],"name":"StabilityPoolLUSDBalanceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_newTroveManagerAddress","type":"address"}],"name":"TroveManagerAddressChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_depositor","type":"address"},{"indexed":false,"internalType":"uint256","name":"_newDeposit","type":"uint256"}],"name":"UserDepositChanged","type":"event"},{"inputs":[],"name":"BORROWING_FEE_FLOOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DECIMAL_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LUSD_GAS_COMPENSATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MCR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_NET_DEBT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"P","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERCENT_DIVISOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SCALE_FACTOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_100pct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"activePool","outputs":[{"internalType":"contract IActivePool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"borrowerOperations","outputs":[{"internalType":"contract IBorrowerOperations","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"communityIssuance","outputs":[{"internalType":"contract ICommunityIssuance","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentEpoch","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentScale","outputs":[{"internalType":"uint128","name":"","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"defaultPool","outputs":[{"internalType":"contract IDefaultPool","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"depositSnapshots","outputs":[{"internalType":"uint256","name":"S","type":"uint256"},{"internalType":"uint256","name":"P","type":"uint256"},{"internalType":"uint256","name":"G","type":"uint256"},{"internalType":"uint128","name":"scale","type":"uint128"},{"internalType":"uint128","name":"epoch","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"initialValue","type":"uint256"},{"internalType":"address","name":"frontEndTag","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint128","name":"","type":"uint128"}],"name":"epochToScaleToG","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint128","name":"","type":"uint128"},{"internalType":"uint128","name":"","type":"uint128"}],"name":"epochToScaleToSum","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEndSnapshots","outputs":[{"internalType":"uint256","name":"S","type":"uint256"},{"internalType":"uint256","name":"P","type":"uint256"},{"internalType":"uint256","name":"G","type":"uint256"},{"internalType":"uint128","name":"scale","type":"uint128"},{"internalType":"uint128","name":"epoch","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEndStakes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"frontEnds","outputs":[{"internalType":"uint256","name":"kickbackRate","type":"uint256"},{"internalType":"bool","name":"registered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_frontEnd","type":"address"}],"name":"getCompoundedFrontEndStake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getCompoundedLUSDDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getDepositorETHGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_depositor","type":"address"}],"name":"getDepositorLQTYGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemColl","outputs":[{"internalType":"uint256","name":"entireSystemColl","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntireSystemDebt","outputs":[{"internalType":"uint256","name":"entireSystemDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_frontEnd","type":"address"}],"name":"getFrontEndLQTYGain","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalLUSDDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastETHError_Offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastLQTYError","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastLUSDLossError_Offset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lusdToken","outputs":[{"internalType":"contract ILUSDToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_debtToOffset","type":"uint256"},{"internalType":"uint256","name":"_collToAdd","type":"uint256"}],"name":"offset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceFeed","outputs":[{"internalType":"contract IPriceFeed","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_frontEndTag","type":"address"}],"name":"provideToSP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_kickbackRate","type":"uint256"}],"name":"registerFrontEnd","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_borrowerOperationsAddress","type":"address"},{"internalType":"address","name":"_troveManagerAddress","type":"address"},{"internalType":"address","name":"_activePoolAddress","type":"address"},{"internalType":"address","name":"_lusdTokenAddress","type":"address"},{"internalType":"address","name":"_sortedTrovesAddress","type":"address"},{"internalType":"address","name":"_priceFeedAddress","type":"address"},{"internalType":"address","name":"_communityIssuanceAddress","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"sortedTroves","outputs":[{"internalType":"contract ISortedTroves","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"troveManager","outputs":[{"internalType":"contract ITroveManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_upperHint","type":"address"},{"internalType":"address","name":"_lowerHint","type":"address"}],"name":"withdrawETHGainToTrove","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawFromSP","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const Addresses = [
  "0x449c42BE87Bb77533c749964fD7C3b1145Cac151"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const rewardTokenAddresses = [
    "0x3Dc7B06dD0B1f08ef9AcBbD2564f8605b4868EEA",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  ]

  const pools = Addresses.map(a => { return {
    address: a,
    abi: XDO_STAKING_ABI,
    stakeTokenFunction: "lusdToken",
    rewardTokenAddresses: rewardTokenAddresses
  }})

  let p = await loadXDollarSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }

  hideLoading();
}

async function loadXDollarSynthetixPools(App, tokens, prices, pools, customURLs) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p => 
      loadXDollarPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenAddresses, p.stakeTokenFunction)));
  for (const i of infos.filter(i => i?.poolPrices)) {
    let p = await printXDollarPool(App, i, "matic", customURLs);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadXDollarPoolInfo(App, tokens, prices, stakingAbi, stakingAddress, rewardTokenAddresses,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let stakeToken = await getMaticToken(App, stakeTokenAddress, stakeTokenAddress);
    stakeToken.staked = await STAKING_POOL.getTotalLUSDDeposits() / 10 ** stakeToken.decimals;

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getMaticToken(App, address, stakingAddress);
    }
    for(rewardTokenAddress of rewardTokenAddresses){
      if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getMaticToken(App, rewardTokenAddress, stakingAddress);
      }
    }
    let rewardTokens = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
      rewardTokens.push(rewardToken);
    }

    let rewardTokenTickers = [];
    for(rewardToken of rewardTokens){
      const rewardTokenTicker = rewardToken.symbol;
      rewardTokenTickers.push(rewardTokenTicker);
    }

    prices["0x3A3e7650f8B9f667dA98F236010fBf44Ee4B2975"] = { usd : 1 };

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "matic");

    if (!poolPrices) 
    {
      console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
      return null;
    }

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    let rewardTokenPrices = [];
    for(rewardTokenAddress of rewardTokenAddresses){
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      rewardTokenPrices.push(rewardTokenPrice);
    }

    const staked_tvl = poolPrices.staked_tvl;

    const usersStakeInfo = await STAKING_POOL.deposits(App.YOUR_ADDRESS);
    const userStaked = usersStakeInfo.initialValue / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    let earnings = [];
    const earned0 = await STAKING_POOL.getDepositorLQTYGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    const earned1 = await STAKING_POOL.getDepositorETHGain(App.YOUR_ADDRESS) / 10 ** rewardToken.decimals;
    earnings.push(earned0);
    earnings.push(earned1);

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddresses,
      stakeTokenTicker,
      rewardTokenTickers,
      stakeTokenPrice,
      rewardTokenPrices,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings
    }
}

async function printXDollarPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  for(rewardTokenTicker of info.rewardTokenTickers){
    _print(`Reward Token : ${rewardTokenTicker}`);
  }
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const approveTENDAndStake = async function() {
    return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  const claim = async function() {
    return rewardsContract_claim(info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print("Please use the official website to stake ETH.");
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${info.earnings[0].toFixed(6)} ${info.rewardTokenTickers[0]} ($${formatMoney(info.earnings[0]*info.rewardTokenPrices[0])}) + ${info.earnings[1].toFixed(6)} ${info.rewardTokenTickers[1]} ($${formatMoney(info.earnings[1]*info.rewardTokenPrices[1])})`, claim)
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd
  }
}