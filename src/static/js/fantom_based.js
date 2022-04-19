$(function () {
  consoleInit(main)
});

const BSHARE_REWARD_POOL_ABI = [{ "inputs": [{ "internalType": "address", "name": "_bshare", "type": "address" }, { "internalType": "address", "name": "_daoFund", "type": "address" }, { "internalType": "uint256", "name": "_poolStartTime", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "TOTAL_REWARDS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" }, { "internalType": "uint256", "name": "_lastRewardTime", "type": "uint256" }], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "bSharePerSecond", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "bshare", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "daoFundAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_fromTime", "type": "uint256" }, { "internalType": "uint256", "name": "_toTime", "type": "uint256" }], "name": "getGeneratedReward", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "contract IERC20", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }], "name": "governanceRecoverUnsupported", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "operator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }], "name": "pendingShare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolEndTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "poolInfo", "outputs": [{ "internalType": "contract IERC20", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTime", "type": "uint256" }, { "internalType": "uint256", "name": "accBSharePerShare", "type": "uint256" }, { "internalType": "bool", "name": "isStarted", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "runningTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_operator", "type": "address" }], "name": "setOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" }], "name": "userInfo", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const BSHARE_REWARD_POOL_ADDR = "0xAc0fa95058616D7539b6Eecb6418A68e7c18A746";
const BASED_ADDR = "0x8D7d3409881b51466B483B11Ea1B8A03cdEd89ae";
const G3CRV_ADDR = "0xd4F94D0aaa640BBb72b5EEc2D85F6D114D81a88E";
const CRV3_ADDR = "0x00702BbDEaD24C40647f235F15971dB0867F6bdB";

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const bShareRewardPoolContract = new ethers.Contract(BSHARE_REWARD_POOL_ADDR, BSHARE_REWARD_POOL_ABI, App.provider);
  const tokens = {};
  const prices = await getFantomPrices();
  prices[G3CRV_ADDR] = { usd: 1.01 }; // Manually add price for g3Crv receipt token
  prices[CRV3_ADDR] = { usd: await getCrv3CryptoPrice(App) }; // Manually add price for CRV3 receipt token
  const startTime = await bShareRewardPoolContract.poolStartTime();
  const currentTime = Date.now() / 1000

  const ACROPOLIS_ADDR = "0xE5009Dd5912a68B0D7C6F874cD0b4492C9F0e5cD";
  const ORACLE_ADDR = "0x8AA7e17f96647E08a54880521b2f3e7F99aa11ca";
  const rewardTokenAddress = "0x8D7d3409881b51466B483B11Ea1B8A03cdEd89ae"; //BASED
  const lptAddress = "0x6F607443DC307DCBe570D0ecFf79d65838630B56"; //BSHARE-FTM-LP
  const stakeTicker = "BSHARE";
  const rewardTicker = "BASED";
  const epochsPerDay = 4;
  const maxSupplyIncrease = await getExpansion(App);
  const decimals = 18;
  const ratio = 0.8;
  const targetMantissa = 12;

  let bShareRewardPool = await loadRewardPoolContract(App, tokens, prices, bShareRewardPoolContract, BSHARE_REWARD_POOL_ADDR, BSHARE_REWARD_POOL_ABI, "BSHARE",
    "bshare", "pendingShare", 6, startTime, currentTime);

  _print('-------------------------------------------------')
  _print('')

  let acropolis = await loadAcropolis(App, prices, ACROPOLIS_ADDR, ORACLE_ADDR, lptAddress, rewardTokenAddress, stakeTicker,
    rewardTicker, epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa);


  _print_bold(`Total Staked: $${formatMoney(bShareRewardPool.totalStaked + acropolis.staked_tvl)}`);

  hideLoading();
}

async function loadRewardPoolContract(
  App,
  tokens,
  prices,
  contract,
  contractAddress,
  contractAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  pendingRewardsFunction,
  poolCount,
  startTime,
  currentTime
) {
  const poolContract = contract ?? new ethers.Contract(contractAddress, contractAbi)

  _print(`<a href='https://ftmscan.com/address/${poolContract.address}' target='_blank'>Marketplace Contract</a>`);
  _print("");

  const totalAllocPoints = await poolContract.totalAllocPoint()

  const rewardTokenAddress = await poolContract.callStatic[rewardTokenFunction]()

  const rewardToken = await getFantomToken(App, rewardTokenAddress, contractAddress)

  let rewardsPerWeek = 0;
  if (currentTime < startTime) {
    _print(`Rewards has not started yet\n`);
  } else {
    rewardsPerWeek = await getTokenRewardPerSecond(poolContract) / 10 ** rewardToken.decimals * 604800;
  }

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getBasedRewardPoolInfo(App, poolContract, contractAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens))

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getFantomToken(App, address, contractAddress);
  }))

  const poolPrices = poolInfos.map(pInfo => pInfo.poolToken ? getPoolPrices(tokens, prices, pInfo.poolToken, "fantom") : undefined);

  let aprs = [];
  for (i = 0; i < poolCount; i++) {
    if (i === 2) continue; // Skip team pool (made for dev allocation)
    const apr = printBasedPool(App, BSHARE_REWARD_POOL_ABI, contractAddress, prices, tokens, poolInfos[i], i,
      poolPrices[i], totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, "fantom")
    aprs.push(apr);
  }
  let totalUserStaked = 0,
    totalStaked = 0,
    averageApr = 0
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd
      averageApr += (a.userStakedUsd * a.yearlyAPR) / 100
    }
  }
  averageApr = averageApr / totalUserStaked
  return { prices, totalUserStaked, totalStaked, averageApr }
}

async function getCrv3CryptoPrice(App) {
  const CRV3_SWAP_CONTRACT_ADDR = "0x3a1659Ddcf2339Be3aeA159cA010979FB49155FF";
  const CRV3_SWAP_CONTRACT_ABI = [{ "name": "TokenExchange", "inputs": [{ "name": "buyer", "type": "address", "indexed": true }, { "name": "sold_id", "type": "uint256", "indexed": false }, { "name": "tokens_sold", "type": "uint256", "indexed": false }, { "name": "bought_id", "type": "uint256", "indexed": false }, { "name": "tokens_bought", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "AddLiquidity", "inputs": [{ "name": "provider", "type": "address", "indexed": true }, { "name": "token_amounts", "type": "uint256[3]", "indexed": false }, { "name": "fee", "type": "uint256", "indexed": false }, { "name": "token_supply", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidity", "inputs": [{ "name": "provider", "type": "address", "indexed": true }, { "name": "token_amounts", "type": "uint256[3]", "indexed": false }, { "name": "token_supply", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RemoveLiquidityOne", "inputs": [{ "name": "provider", "type": "address", "indexed": true }, { "name": "token_amount", "type": "uint256", "indexed": false }, { "name": "coin_index", "type": "uint256", "indexed": false }, { "name": "coin_amount", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "CommitNewAdmin", "inputs": [{ "name": "deadline", "type": "uint256", "indexed": true }, { "name": "admin", "type": "address", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "NewAdmin", "inputs": [{ "name": "admin", "type": "address", "indexed": true }], "anonymous": false, "type": "event" }, { "name": "CommitNewParameters", "inputs": [{ "name": "deadline", "type": "uint256", "indexed": true }, { "name": "admin_fee", "type": "uint256", "indexed": false }, { "name": "mid_fee", "type": "uint256", "indexed": false }, { "name": "out_fee", "type": "uint256", "indexed": false }, { "name": "fee_gamma", "type": "uint256", "indexed": false }, { "name": "allowed_extra_profit", "type": "uint256", "indexed": false }, { "name": "adjustment_step", "type": "uint256", "indexed": false }, { "name": "ma_half_time", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "NewParameters", "inputs": [{ "name": "admin_fee", "type": "uint256", "indexed": false }, { "name": "mid_fee", "type": "uint256", "indexed": false }, { "name": "out_fee", "type": "uint256", "indexed": false }, { "name": "fee_gamma", "type": "uint256", "indexed": false }, { "name": "allowed_extra_profit", "type": "uint256", "indexed": false }, { "name": "adjustment_step", "type": "uint256", "indexed": false }, { "name": "ma_half_time", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "RampAgamma", "inputs": [{ "name": "initial_A", "type": "uint256", "indexed": false }, { "name": "future_A", "type": "uint256", "indexed": false }, { "name": "initial_gamma", "type": "uint256", "indexed": false }, { "name": "future_gamma", "type": "uint256", "indexed": false }, { "name": "initial_time", "type": "uint256", "indexed": false }, { "name": "future_time", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "StopRampA", "inputs": [{ "name": "current_A", "type": "uint256", "indexed": false }, { "name": "current_gamma", "type": "uint256", "indexed": false }, { "name": "time", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "name": "ClaimAdminFee", "inputs": [{ "name": "admin", "type": "address", "indexed": true }, { "name": "tokens", "type": "uint256", "indexed": false }], "anonymous": false, "type": "event" }, { "stateMutability": "nonpayable", "type": "constructor", "inputs": [{ "name": "owner", "type": "address" }, { "name": "admin_fee_receiver", "type": "address" }, { "name": "A", "type": "uint256" }, { "name": "gamma", "type": "uint256" }, { "name": "mid_fee", "type": "uint256" }, { "name": "out_fee", "type": "uint256" }, { "name": "allowed_extra_profit", "type": "uint256" }, { "name": "fee_gamma", "type": "uint256" }, { "name": "adjustment_step", "type": "uint256" }, { "name": "admin_fee", "type": "uint256" }, { "name": "ma_half_time", "type": "uint256" }, { "name": "initial_prices", "type": "uint256[2]" }], "outputs": [] }, { "stateMutability": "payable", "type": "fallback" }, { "stateMutability": "view", "type": "function", "name": "price_oracle", "inputs": [{ "name": "k", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3361 }, { "stateMutability": "view", "type": "function", "name": "price_scale", "inputs": [{ "name": "k", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3391 }, { "stateMutability": "view", "type": "function", "name": "last_prices", "inputs": [{ "name": "k", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3421 }, { "stateMutability": "view", "type": "function", "name": "token", "inputs": [], "outputs": [{ "name": "", "type": "address" }], "gas": 468 }, { "stateMutability": "view", "type": "function", "name": "coins", "inputs": [{ "name": "i", "type": "uint256" }], "outputs": [{ "name": "", "type": "address" }], "gas": 582 }, { "stateMutability": "view", "type": "function", "name": "A", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 597 }, { "stateMutability": "view", "type": "function", "name": "gamma", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 11991 }, { "stateMutability": "view", "type": "function", "name": "fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 21481 }, { "stateMutability": "view", "type": "function", "name": "fee_calc", "inputs": [{ "name": "xp", "type": "uint256[3]" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 11096 }, { "stateMutability": "view", "type": "function", "name": "get_virtual_price", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 11582 }, { "stateMutability": "payable", "type": "function", "name": "exchange", "inputs": [{ "name": "i", "type": "uint256" }, { "name": "j", "type": "uint256" }, { "name": "dx", "type": "uint256" }, { "name": "min_dy", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }] }, { "stateMutability": "payable", "type": "function", "name": "exchange", "inputs": [{ "name": "i", "type": "uint256" }, { "name": "j", "type": "uint256" }, { "name": "dx", "type": "uint256" }, { "name": "min_dy", "type": "uint256" }, { "name": "use_eth", "type": "bool" }], "outputs": [{ "name": "", "type": "uint256" }] }, { "stateMutability": "view", "type": "function", "name": "get_dy", "inputs": [{ "name": "i", "type": "uint256" }, { "name": "j", "type": "uint256" }, { "name": "dx", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3122 }, { "stateMutability": "view", "type": "function", "name": "calc_token_fee", "inputs": [{ "name": "amounts", "type": "uint256[3]" }, { "name": "xp", "type": "uint256[3]" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 26582 }, { "stateMutability": "nonpayable", "type": "function", "name": "add_liquidity", "inputs": [{ "name": "amounts", "type": "uint256[3]" }, { "name": "min_mint_amount", "type": "uint256" }], "outputs": [], "gas": 1400833 }, { "stateMutability": "nonpayable", "type": "function", "name": "remove_liquidity", "inputs": [{ "name": "_amount", "type": "uint256" }, { "name": "min_amounts", "type": "uint256[3]" }], "outputs": [], "gas": 233573 }, { "stateMutability": "view", "type": "function", "name": "calc_token_amount", "inputs": [{ "name": "amounts", "type": "uint256[3]" }, { "name": "deposit", "type": "bool" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3429 }, { "stateMutability": "view", "type": "function", "name": "calc_withdraw_one_coin", "inputs": [{ "name": "token_amount", "type": "uint256" }, { "name": "i", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 13432 }, { "stateMutability": "nonpayable", "type": "function", "name": "remove_liquidity_one_coin", "inputs": [{ "name": "token_amount", "type": "uint256" }, { "name": "i", "type": "uint256" }, { "name": "min_amount", "type": "uint256" }], "outputs": [], "gas": 1310913 }, { "stateMutability": "nonpayable", "type": "function", "name": "claim_admin_fees", "inputs": [], "outputs": [], "gas": 389296 }, { "stateMutability": "nonpayable", "type": "function", "name": "ramp_A_gamma", "inputs": [{ "name": "future_A", "type": "uint256" }, { "name": "future_gamma", "type": "uint256" }, { "name": "future_time", "type": "uint256" }], "outputs": [], "gas": 163102 }, { "stateMutability": "nonpayable", "type": "function", "name": "stop_ramp_A_gamma", "inputs": [], "outputs": [], "gas": 157247 }, { "stateMutability": "nonpayable", "type": "function", "name": "commit_new_parameters", "inputs": [{ "name": "_new_mid_fee", "type": "uint256" }, { "name": "_new_out_fee", "type": "uint256" }, { "name": "_new_admin_fee", "type": "uint256" }, { "name": "_new_fee_gamma", "type": "uint256" }, { "name": "_new_allowed_extra_profit", "type": "uint256" }, { "name": "_new_adjustment_step", "type": "uint256" }, { "name": "_new_ma_half_time", "type": "uint256" }], "outputs": [], "gas": 306190 }, { "stateMutability": "nonpayable", "type": "function", "name": "apply_new_parameters", "inputs": [], "outputs": [], "gas": 682926 }, { "stateMutability": "nonpayable", "type": "function", "name": "revert_new_parameters", "inputs": [], "outputs": [], "gas": 23222 }, { "stateMutability": "nonpayable", "type": "function", "name": "commit_transfer_ownership", "inputs": [{ "name": "_owner", "type": "address" }], "outputs": [], "gas": 77260 }, { "stateMutability": "nonpayable", "type": "function", "name": "apply_transfer_ownership", "inputs": [], "outputs": [], "gas": 65937 }, { "stateMutability": "nonpayable", "type": "function", "name": "revert_transfer_ownership", "inputs": [], "outputs": [], "gas": 23312 }, { "stateMutability": "nonpayable", "type": "function", "name": "kill_me", "inputs": [], "outputs": [], "gas": 40535 }, { "stateMutability": "nonpayable", "type": "function", "name": "unkill_me", "inputs": [], "outputs": [], "gas": 23372 }, { "stateMutability": "nonpayable", "type": "function", "name": "set_admin_fee_receiver", "inputs": [{ "name": "_admin_fee_receiver", "type": "address" }], "outputs": [], "gas": 38505 }, { "stateMutability": "view", "type": "function", "name": "last_prices_timestamp", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3378 }, { "stateMutability": "view", "type": "function", "name": "initial_A_gamma", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3408 }, { "stateMutability": "view", "type": "function", "name": "future_A_gamma", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3438 }, { "stateMutability": "view", "type": "function", "name": "initial_A_gamma_time", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3468 }, { "stateMutability": "view", "type": "function", "name": "future_A_gamma_time", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3498 }, { "stateMutability": "view", "type": "function", "name": "allowed_extra_profit", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3528 }, { "stateMutability": "view", "type": "function", "name": "future_allowed_extra_profit", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3558 }, { "stateMutability": "view", "type": "function", "name": "fee_gamma", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3588 }, { "stateMutability": "view", "type": "function", "name": "future_fee_gamma", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3618 }, { "stateMutability": "view", "type": "function", "name": "adjustment_step", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3648 }, { "stateMutability": "view", "type": "function", "name": "future_adjustment_step", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3678 }, { "stateMutability": "view", "type": "function", "name": "ma_half_time", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3708 }, { "stateMutability": "view", "type": "function", "name": "future_ma_half_time", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3738 }, { "stateMutability": "view", "type": "function", "name": "mid_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3768 }, { "stateMutability": "view", "type": "function", "name": "out_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3798 }, { "stateMutability": "view", "type": "function", "name": "admin_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3828 }, { "stateMutability": "view", "type": "function", "name": "future_mid_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3858 }, { "stateMutability": "view", "type": "function", "name": "future_out_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3888 }, { "stateMutability": "view", "type": "function", "name": "future_admin_fee", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3918 }, { "stateMutability": "view", "type": "function", "name": "balances", "inputs": [{ "name": "arg0", "type": "uint256" }], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3993 }, { "stateMutability": "view", "type": "function", "name": "D", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 3978 }, { "stateMutability": "view", "type": "function", "name": "owner", "inputs": [], "outputs": [{ "name": "", "type": "address" }], "gas": 4008 }, { "stateMutability": "view", "type": "function", "name": "future_owner", "inputs": [], "outputs": [{ "name": "", "type": "address" }], "gas": 4038 }, { "stateMutability": "view", "type": "function", "name": "xcp_profit", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4068 }, { "stateMutability": "view", "type": "function", "name": "xcp_profit_a", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4098 }, { "stateMutability": "view", "type": "function", "name": "virtual_price", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4128 }, { "stateMutability": "view", "type": "function", "name": "is_killed", "inputs": [], "outputs": [{ "name": "", "type": "bool" }], "gas": 4158 }, { "stateMutability": "view", "type": "function", "name": "kill_deadline", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4188 }, { "stateMutability": "view", "type": "function", "name": "transfer_ownership_deadline", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4218 }, { "stateMutability": "view", "type": "function", "name": "admin_actions_deadline", "inputs": [], "outputs": [{ "name": "", "type": "uint256" }], "gas": 4248 }, { "stateMutability": "view", "type": "function", "name": "admin_fee_receiver", "inputs": [], "outputs": [{ "name": "", "type": "address" }], "gas": 4278 }];
  const CRV3_SWAP_CONTRACT = new ethers.Contract(CRV3_SWAP_CONTRACT_ADDR, CRV3_SWAP_CONTRACT_ABI, App.provider);
  const ethPrice = await CRV3_SWAP_CONTRACT.price_oracle(1) / 1e18;
  const ethBalance = await CRV3_SWAP_CONTRACT.balances(2) / 1e18;
  
  const CRV3 = new ethers.Contract(CRV3_ADDR, ERC20_ABI, App.provider);
  const totalSupply = await CRV3.totalSupply() / 1e18;

  return (ethBalance * ethPrice * 3) / totalSupply;
}

async function loadAcropolis(App, prices, boardroomAddress, oracleAddress, lptAddress, rewardTokenAddress, stakeTicker, rewardTicker,
  epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa) {

  _print(`<a href='https://ftmscan.com/address/${boardroomAddress}' target='_blank'>Acropolis Contract</a>`);
  _print("");
  const BOARDROOM = new ethers.Contract(boardroomAddress, BOARDROOM_ABI, App.provider);
  const ORACLE = new ethers.Contract(oracleAddress, BASIS_ORACLE_ABI, App.provider);
  const share = await BOARDROOM.share();
  const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider);
  const userUnstaked = await SHARE.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const sharePrice = getParameterCaseInsensitive(prices, share)?.usd;
  const userStaked = await BOARDROOM.balanceOf(App.YOUR_ADDRESS) / 1e18;
  const userStakedUsd = userStaked * sharePrice;
  const totalStaked = await BOARDROOM.totalSupply() / 1e18;
  const totalStakedUsd = totalStaked * sharePrice;
  const userPct = userStaked / totalStaked * 100;
  const earned = await BOARDROOM.earned(App.YOUR_ADDRESS) / 1e18;
  _print(`Acropolis`);
  _print(`There is a total ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(totalStakedUsd)}) staked in the Acropolis.`)
  _print(`You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const oldTimestamp = await ORACLE.blockTimestampLast();
  const token0 = await ORACLE.token0();
  const token1 = await ORACLE.token1();
  let twap;
  if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
    const oldPrice0 = await ORACLE.price0CumulativeLast();
    const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
    twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
  }
  else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
    const oldPrice1 = await ORACLE.price1CumulativeLast();
    const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
    twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
  }
  if (twap > 1) {
    const circulatingSupply = await getCirculatingSupply(App);
    const newTokens = circulatingSupply * Math.min(twap - 1, maxSupplyIncrease) * ratio;
    _print(`There will be ${newTokens.toFixed(decimals)} ${rewardTicker} issued at next expansion.`);
    const acropolisReturn = newTokens * rewardPrice * 100 * epochsPerDay / totalStakedUsd;
    _print(`Acropolis APR: Day ${(acropolisReturn).toFixed(2)}% Week ${(acropolisReturn * 7).toFixed(2)}% Year ${(acropolisReturn * 365).toFixed(2)}%`)
  }

  const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
  const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
  const claim = async () => boardroom_claim(boardroomAddress, App);
  const exit = async () => rewardsContract_exit(boardroomAddress, App);
  const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

  _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
  _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
  _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker} ($${formatMoney(earned * rewardPrice)})`, claim)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print_link(`Exit`, exit)
  _print(`\n`);

  return { staked_tvl: totalStakedUsd };
}

async function getBasedRewardPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex)
  if (poolInfo.allocPoint == 0) {
    return {
      address: poolInfo.token,
      stakedToken: poolToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked: 0,
      pendingRewardTokens: 0,
    }
  }

  const poolToken = await getFantomToken(app, poolInfo.token, chefAddress)
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
  const staked = userInfo.amount / 10 ** poolToken.decimals
  return {
    address: poolInfo.token,
    stakedToken: poolToken,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: poolToken,
    userStaked: staked,
    pendingRewardTokens: pendingRewardTokens / 10 ** 18,
  }
}

async function getTokenRewardPerSecond(poolContract) {
  return await poolContract.bSharePerSecond()
}

async function getCirculatingSupply(App) {
  const basedContract = new ethers.Contract(BASED_ADDR, ERC20_ABI, App.provider);
  const totalSupply = await basedContract.totalSupply();
  return (totalSupply / 1e18)
}

async function getExpansion(App) {
  const circulatingSupply = await getCirculatingSupply(App);
  if (circulatingSupply < 206000) {
    return 0.06
  } else if (circulatingSupply < 386000) {
    return 0.05
  } else if (circulatingSupply < 530000) {
    return 0.045
  } else if (circulatingSupply < 1300000) {
    return 0.04
  } else if (circulatingSupply < 5000000) {
    return 0.02
  } else if (circulatingSupply < 10000000) {
    return 0.015
  } else {
    return 0.01
  }
}

function printBasedPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
  totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
  pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0) {
  fixedDecimals = fixedDecimals ?? 2;
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, 2);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, 2, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}