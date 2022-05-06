$(function () {
  consoleInit(main)
});

const LENDLY_ABI = {
  comptroller: [
      {
          inputs: [],
          name: 'getAllMarkets',
          outputs: [{ internalType: 'contract PToken[]', name: '', type: 'address[]' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{"internalType":"address","name":"","type":"address"}],
          name: 'compSpeeds',
          outputs: [{"internalType":"uint256","name":"","type":"uint256"}],
          stateMutability: 'view',
          type: 'function',
      }
  ],
  pToken: [
      {
          inputs: [],
          name: 'totalReserves',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'totalSupply',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'exchangeRateStored',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'supplyRatePerBlock',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'totalBorrows',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'borrowBalanceStored',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'borrowRatePerBlock',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'getCash',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'interestRateModel',
          outputs: [{ internalType: 'contract IInterestRateModel', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
      },
      {
          inputs: [],
          name: 'underlying',
          outputs: [{ internalType: 'address', name: '', type: 'address' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
  erc20: [
      {
          constant: true,
          inputs: [],
          name: 'symbol',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
      },
      {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
      },
  ],
  oracle: [
      {
          inputs: [{ internalType: 'address', name: '_pToken', type: 'address' }],
          name: 'getUnderlyingPrice',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
  rate: [
      {
          inputs: [],
          name: 'blocksPerYear',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
      },
  ],
}

const HND_GAUGE_ABI = [{"name":"Deposit","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"name":"provider","type":"address","indexed":true},{"name":"value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"name":"user","type":"address","indexed":false},{"name":"original_balance","type":"uint256","indexed":false},{"name":"original_supply","type":"uint256","indexed":false},{"name":"working_balance","type":"uint256","indexed":false},{"name":"working_supply","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"CommitOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"name":"Transfer","inputs":[{"name":"_from","type":"address","indexed":true},{"name":"_to","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"name":"_owner","type":"address","indexed":true},{"name":"_spender","type":"address","indexed":true},{"name":"_value","type":"uint256","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_lp_token","type":"address"},{"name":"_minter","type":"address"},{"name":"_admin","type":"address"},{"name":"_reward_policy_maker","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"decimals","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":288},{"stateMutability":"view","type":"function","name":"integrate_checkpoint","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":4624},{"stateMutability":"nonpayable","type":"function","name":"user_checkpoint","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":9161388},{"stateMutability":"view","type":"function","name":"claimable_tokens","inputs":[{"name":"addr","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":9074455},{"stateMutability":"view","type":"function","name":"reward_contract","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2718},{"stateMutability":"view","type":"function","name":"last_claim","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2544},{"stateMutability":"view","type":"function","name":"claimed_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3066},{"stateMutability":"view","type":"function","name":"claimable_reward","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3034},{"stateMutability":"nonpayable","type":"function","name":"claimable_reward_write","inputs":[{"name":"_addr","type":"address"},{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1211018},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_receiver","inputs":[{"name":"_receiver","type":"address"}],"outputs":[],"gas":35733},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"claim_rewards","inputs":[{"name":"_addr","type":"address"},{"name":"_receiver","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"kick","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":9175979},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"deposit","inputs":[{"name":"_value","type":"uint256"},{"name":"_addr","type":"address"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"withdraw","inputs":[{"name":"_value","type":"uint256"},{"name":"_claim_rewards","type":"bool"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"transfer","inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41283316},{"stateMutability":"nonpayable","type":"function","name":"transferFrom","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":41321266},{"stateMutability":"nonpayable","type":"function","name":"approve","inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":38211},{"stateMutability":"nonpayable","type":"function","name":"increaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_added_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40755},{"stateMutability":"nonpayable","type":"function","name":"decreaseAllowance","inputs":[{"name":"_spender","type":"address"},{"name":"_subtracted_value","type":"uint256"}],"outputs":[{"name":"","type":"bool"}],"gas":40779},{"stateMutability":"nonpayable","type":"function","name":"set_rewards","inputs":[{"name":"_reward_contract","type":"address"},{"name":"_sigs","type":"bytes32"},{"name":"_reward_tokens","type":"address[8]"}],"outputs":[],"gas":2743591},{"stateMutability":"nonpayable","type":"function","name":"set_killed","inputs":[{"name":"_is_killed","type":"bool"}],"outputs":[],"gas":38145},{"stateMutability":"nonpayable","type":"function","name":"commit_transfer_ownership","inputs":[{"name":"addr","type":"address"}],"outputs":[],"gas":39525},{"stateMutability":"nonpayable","type":"function","name":"accept_transfer_ownership","inputs":[],"outputs":[],"gas":39470},{"stateMutability":"view","type":"function","name":"minter","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3078},{"stateMutability":"view","type":"function","name":"reward_policy_maker","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3108},{"stateMutability":"view","type":"function","name":"lp_token","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3138},{"stateMutability":"view","type":"function","name":"controller","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3168},{"stateMutability":"view","type":"function","name":"voting_escrow","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3198},{"stateMutability":"view","type":"function","name":"balanceOf","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3443},{"stateMutability":"view","type":"function","name":"totalSupply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3258},{"stateMutability":"view","type":"function","name":"allowance","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3718},{"stateMutability":"view","type":"function","name":"name","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":13620},{"stateMutability":"view","type":"function","name":"symbol","inputs":[],"outputs":[{"name":"","type":"string"}],"gas":11373},{"stateMutability":"view","type":"function","name":"working_balances","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3593},{"stateMutability":"view","type":"function","name":"working_supply","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":3408},{"stateMutability":"view","type":"function","name":"period","inputs":[],"outputs":[{"name":"","type":"int128"}],"gas":3438},{"stateMutability":"view","type":"function","name":"period_timestamp","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3577},{"stateMutability":"view","type":"function","name":"integrate_inv_supply","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":3607},{"stateMutability":"view","type":"function","name":"integrate_inv_supply_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3743},{"stateMutability":"view","type":"function","name":"integrate_checkpoint_of","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3773},{"stateMutability":"view","type":"function","name":"integrate_fraction","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3803},{"stateMutability":"view","type":"function","name":"reward_tokens","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":3727},{"stateMutability":"view","type":"function","name":"rewards_receiver","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":3863},{"stateMutability":"view","type":"function","name":"reward_integral","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":3893},{"stateMutability":"view","type":"function","name":"reward_integral_for","inputs":[{"name":"arg0","type":"address"},{"name":"arg1","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":4138},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3738},{"stateMutability":"view","type":"function","name":"future_admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":3768},{"stateMutability":"view","type":"function","name":"is_killed","inputs":[],"outputs":[{"name":"","type":"bool"}],"gas":3798}]
const REWARDS_POLICY_ABI = [{"name":"SetAdmin","inputs":[{"name":"admin","type":"address","indexed":false}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_epoch_length","type":"uint256"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"epoch_at","inputs":[{"name":"_timestamp","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":7475},{"stateMutability":"view","type":"function","name":"epoch_start_time","inputs":[{"name":"_epoch","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":4918},{"stateMutability":"view","type":"function","name":"rate_at","inputs":[{"name":"_timestamp","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":14134},{"stateMutability":"view","type":"function","name":"current_epoch","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":14997},{"stateMutability":"view","type":"function","name":"future_epoch_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":36854},{"stateMutability":"view","type":"function","name":"future_epoch_rate","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":19623},{"stateMutability":"nonpayable","type":"function","name":"set_admin","inputs":[{"name":"_admin","type":"address"}],"outputs":[],"gas":39075},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_at","inputs":[{"name":"_epoch","type":"uint256"},{"name":"_reward","type":"uint256"}],"outputs":[],"gas":52480},{"stateMutability":"nonpayable","type":"function","name":"set_rewards_starting_at","inputs":[{"name":"_epoch","type":"uint256"},{"name":"_rewards","type":"uint256[10]"}],"outputs":[],"gas":371612},{"stateMutability":"view","type":"function","name":"admin","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2658},{"stateMutability":"view","type":"function","name":"first_epoch_time","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2688},{"stateMutability":"view","type":"function","name":"epoch_length","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2718},{"stateMutability":"view","type":"function","name":"rewards","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"uint256"}],"gas":2857}]

const contracts = {
  comptroller: '0xeea62ed232ff4ccb6425d41afb1b0b41d34f3114',
  oracle: '0xB9960251609e5b545416E87Abb375303B1162C3E',
  gas: {
      p_address: '0xfCD8570AD81e6c77b8D252bEbEBA62ed980BD64D',
      symbol: 'FTM',
      decimals: 18,
  },
};

const contractsWeve = {
  comptroller: '0x612DCAaF5B20774F2EbBED49bC82442d642B7082',
  oracle: '0x4dCd0BF94E3b02fda9E3ca6d023E777392Cd5C63',
  gas: {
      p_address: '0xfCD8570AD81e6c77b8D252bEbEBA62ed980BD64D',
      symbol: 'FTM',
      decimals: 18,
  },
};

async function main() {
  const App = await init_ethers();
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  _print_bold(`Hundred (HND)`)
  _print_bold(`---------------\n`)

  const tokens = {};
  const prices = await getFantomPrices();

  //HND reward token
  const rewardToken = await getFantomToken(App, "0x10010078a54396f62c96df8532dc2b4847d47ed3", App.YOUR_ADDRESS);
  const rewardTokenPrice = getParameterCaseInsensitive(prices, "0x10010078a54396f62c96df8532dc2b4847d47ed3")?.usd;
  //WeVE reward token
  const rewardTokenWeve = await getFantomToken(App, "0x911da02c1232a3c3e1418b834a311921143b04d7", App.YOUR_ADDRESS);
  const rewardTokenPriceWeve = getParameterCaseInsensitive(prices, "0x911da02c1232a3c3e1418b834a311921143b04d7")?.usd;

  const COMPTROLLER = new ethcall.Contract(contracts.comptroller, LENDLY_ABI.comptroller, App.provider);

  const [allMarkets] = await App.ethcallProvider.all([COMPTROLLER.getAllMarkets()]);

  const data = await Promise.all(allMarkets.map(token => loadData(App, token, COMPTROLLER, prices, contracts)));

  let [totalSupply, totalBorrow, totalCash] = [0, 0, 0];

  for (const market of data) {
      totalSupply += market.totalSupply * market.underlyingPrice;
      totalBorrow += market.totalBorrows * market.underlyingPrice;
      totalCash += market.cash * market.underlyingPrice;
  }
  _print_bold(`Deposit Market Size : $${formatMoney(totalSupply)}`);
  _print_bold(`Borrow Market Size : $${formatMoney(totalBorrow)}`);
  _print_bold(`TVL : $${formatMoney(totalCash)}`);
  _print("");

  for (const market of data) {
      printData(market);
  }

  _print("");
  _print_bold(`veDAO (WEVE)`)
  _print_bold(`--------------\n`)

  const COMPTROLLER_WEVE = new ethcall.Contract(contractsWeve.comptroller, LENDLY_ABI.comptroller, App.provider);

  const [allMarketsWeve] = await App.ethcallProvider.all([COMPTROLLER_WEVE.getAllMarkets()]);

  const dataWeve = await Promise.all(allMarketsWeve.map(token => loadData(App, token, COMPTROLLER_WEVE, prices, contractsWeve)));

  let [totalSupplyWeve, totalBorrowWeve, totalCashWeve] = [0, 0, 0];

  for (const market of dataWeve) {
      totalSupplyWeve += market.totalSupply * market.underlyingPrice;
      totalBorrowWeve += market.totalBorrows * market.underlyingPrice;
      totalCashWeve += market.cash * market.underlyingPrice;
  }
  _print_bold(`Deposit Market Size : $${formatMoney(totalSupplyWeve)}`);
  _print_bold(`Borrow Market Size : $${formatMoney(totalBorrowWeve)}`);
  _print_bold(`TVL : $${formatMoney(totalCashWeve)}`);
  _print("");

  for (const market of dataWeve) {
      printData(market);
  }
  _print("");
  _print_bold("Gauges");
  _print_bold("---------\n");

  const gaugeAddresses = ["0x1A61A72F5Cf5e857f15ee502210b81f8B3a66263", "0x35594E4992DFefcB0C20EC487d7af22a30bDec60"];

  const gaugeContracts = gaugeAddresses.map(a => new ethcall.Contract(a, HND_GAUGE_ABI));
  const gaugeCalls = gaugeContracts.map(c => [c.lp_token(), c.totalSupply(), c.balanceOf(App.YOUR_ADDRESS), c.reward_policy_maker(), c.working_balances(App.YOUR_ADDRESS), c.working_supply()]).flat();
  const gaugeValues = await App.ethcallProvider.all(gaugeCalls);

  let gageInfos = []
  for(let i = 0; i < gaugeValues.length; i++){
    const gageInfo = {
      lpTokenAddress   : gaugeValues[i],
      totalSupply      : gaugeValues[i+1],
      balance          : gaugeValues[i+2],
      rewardsAddress   : gaugeValues[i+3],
      working_balances : gaugeValues[i+4],
      working_supply   : gaugeValues[i+5]
    }
    gageInfos.push(gageInfo);
    i=i+5
  }

  let staked_tvl = 0;
  let userTvl = 0;
  for(let i = 0; i < gageInfos.length; i++){
    const lpToken = await getFantomToken(App, gageInfos[i].lpTokenAddress, gaugeAddresses[i]);
      const totalSupply = gageInfos[i].totalSupply / 10 ** lpToken.decimals;
      const usersStaked = gageInfos[i].balance / 10 ** lpToken.decimals;
      const working_balances = gageInfos[i].working_balances / 10 ** lpToken.decimals;
      const working_supply = gageInfos[i].working_supply / 10 ** lpToken.decimals;
      const _claimableRewards = await App.ethcallProvider.all([gaugeContracts[i].claimable_tokens(App.YOUR_ADDRESS)]);
      const claimableTokens = _claimableRewards / 10 ** rewardToken.decimals;
      const poolPrice = getPoolPrices(tokens, prices, lpToken, "fantom")
      staked_tvl += totalSupply * poolPrice.price;
      const staked_tvlForCurrentPool = totalSupply * poolPrice.price;
      userTvl += usersStaked * poolPrice.price;
      const timestampNow_ = Date.now() / 1000;
      const timestampNow = parseInt(timestampNow_);
      const rewardsContract = new ethcall.Contract(gageInfos[i].rewardsAddress, REWARDS_POLICY_ABI);
      const rewardsPerWeek_ = await App.ethcallProvider.all([rewardsContract.rate_at(timestampNow)]);
      const rewardsPerWeek = rewardsPerWeek_ / 10 ** rewardToken.decimals * 604800;
      await printHndGaugeContract(App, lpToken, poolPrice, gageInfos[i], gaugeAddresses[i], claimableTokens, rewardToken, rewardTokenPrice, rewardsPerWeek, staked_tvlForCurrentPool, working_balances, working_supply);
  }
  _print_bold(`\nTotal Value Staked: $${formatMoney(staked_tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function printHndGaugeContract(App, lpToken, poolPrice, gaugeResult, gauge, claimableTokens, rewardToken, rewardTokenPrice, rewardsPerWeek, staked_tvl, working_balances, working_supply) {
  poolPrice.print_price();
  const usdPerWeek = rewardsPerWeek * rewardTokenPrice;
  _print(`${rewardToken.symbol} Per Week: ${rewardsPerWeek.toFixed(2)} ($${formatMoney(usdPerWeek)})`);
  const weeklyAPR = usdPerWeek / staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  const userStaked = gaugeResult.balance / 10 ** lpToken.decimals;
  var userStakedUsd = userStaked * poolPrice.price;
  var userStakedPct = userStakedUsd / poolPrice.tvl * 100;
  const usersDailyAPR = dailyAPR * (working_balances / working_supply) / userStakedPct * 100
  const usersWeeklyAPR = weeklyAPR * (working_balances / working_supply) / userStakedPct * 100
  const usersYearlyAPR = yearlyAPR * (working_balances / working_supply) / userStakedPct * 100
  if(working_balances <= 0){
    _print(`Your APR: Day 0% Week 0% Year 0%`);
  }else{
    _print(`Your APR: Day ${usersDailyAPR.toFixed(4)}% Week ${usersWeeklyAPR.toFixed(2)}% Year ${usersYearlyAPR.toFixed(2)}%`);
  }
  _print(`You are staking ${userStaked.toFixed(4)} ${poolPrice.stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (userStaked > 0) {
    poolPrice.print_contained_price(userStaked);
      const userWeeklyRewards = userStakedPct * rewardsPerWeek / 100;
      const userDailyRewards = userWeeklyRewards / 7;
      const userYearlyRewards = userWeeklyRewards * 52;
      _print(`Estimated ${rewardToken.symbol} earnings:`
          + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*rewardTokenPrice)})`
          + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*rewardTokenPrice)})`
          + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*rewardTokenPrice)})`);
  }
  const deposit = async function() {
    return hndGaugetDeposit(App, gauge, lpToken)
  }
  const withdraw = async function() {
    return hndGaugeWithdraw(App, gauge, lpToken)
  }
  const claim = async function() {
    return hndGaugeClaim(App, gauge, rewardToken)
  }
  _print_link(`Deposit ${lpToken.unstaked.toFixed(6)} ${lpToken.symbol}`, deposit);
  _print_link(`Withdraw ${userStaked.toFixed(6)} ${lpToken.symbol}`, withdraw);
  _print_link(`Claim ${claimableTokens.toFixed(6)} ${rewardToken.symbol} ($${formatMoney(claimableTokens*rewardTokenPrice)})`, claim);
  _print("");
}

async function hndGaugetDeposit(App, gauge, token){
  const signer = await App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(token.address, ERC20_ABI, signer)
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const balanceToStake = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, gauge)

  const decimals = await STAKING_TOKEN.decimals();
  let allow = Promise.resolve()

  if (allowedTokens / 10 ** decimals < balanceToStake / 10 ** decimals) {
    showLoading()
    allow = STAKING_TOKEN.approve(gauge, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (balanceToStake / 10 ** decimals > 0) {
    showLoading()
    allow
      .then(async function() {
        GAUGE_CONTRACT["deposit(uint256)"](balanceToStake, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.\n')
          })
      })
      .catch(function(ex) {
        hideLoading()
        _print('Something went wrong.')
        _print(ex)
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

async function hndGaugeWithdraw(App, gauge, token){
  const signer = App.provider.getSigner()
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const currentStakedAmount = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);

  if (currentStakedAmount / 10 ** token.decimals > 0) {
    showLoading()
    GAUGE_CONTRACT["withdraw(uint256,bool)"](currentStakedAmount, true, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function hndGaugeClaim(App, gauge, rewardToken) {
  const signer = App.provider.getSigner()
  const GAUGE_CONTRACT = new ethers.Contract(gauge, HND_GAUGE_ABI, signer)

  const earnedTokenAmount = await GAUGE_CONTRACT.claimable_reward(App.YOUR_ADDRESS, rewardToken.address) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    GAUGE_CONTRACT["claim_rewards()"]({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
  }
}

async function loadData(App, token, comptroller, prices, contractsObj) {

  const PTOKEN_CONTRACT = new ethcall.Contract(token, LENDLY_ABI.pToken, App.provider);

  const [
      totalReserves_,
      totalSupply_,
      supply_,
      exchangeRate_,
      supplyRatePerBlock_,
      totalBorrows_,
      borrowBalanceOf_,
      borrowRatePerBlock_,
      cash_,
      interestRateModel,
  ] = await App.ethcallProvider.all([
      PTOKEN_CONTRACT.totalReserves(),
      PTOKEN_CONTRACT.totalSupply(),
      PTOKEN_CONTRACT.balanceOf(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.exchangeRateStored(),
      PTOKEN_CONTRACT.supplyRatePerBlock(),
      PTOKEN_CONTRACT.totalBorrows(),
      PTOKEN_CONTRACT.borrowBalanceStored(App.YOUR_ADDRESS),
      PTOKEN_CONTRACT.borrowRatePerBlock(),
      PTOKEN_CONTRACT.getCash(),
      PTOKEN_CONTRACT.interestRateModel(),
  ]);

  let underlyingSymbol, underlyingDecimals;

  if (token.toLowerCase() === contractsObj.gas.p_address.toLowerCase()) {
      underlyingSymbol = contractsObj.gas.symbol;
      underlyingDecimals = contractsObj.gas.decimals;
  } else {
      const [underlying] = await App.ethcallProvider.all([PTOKEN_CONTRACT.underlying()]);
      const UNDERLYING_CONTRACT = new ethcall.Contract(underlying, LENDLY_ABI.erc20, App.provider);
      [underlyingSymbol, underlyingDecimals] = await App.ethcallProvider.all([UNDERLYING_CONTRACT.symbol(), UNDERLYING_CONTRACT.decimals()]);
  }

  const ORACLE_CONTRACT = new ethcall.Contract(contractsObj.oracle, LENDLY_ABI.oracle, App.provider);
  const [underlyingPrice_] = await App.ethcallProvider.all([ORACLE_CONTRACT.getUnderlyingPrice(token)]);
  const underlyingPrice = underlyingPrice_ / 10 ** (18 + 18 - underlyingDecimals);

  const totalReserves = totalReserves_ / 10 ** underlyingDecimals;

  const exchangeRate = exchangeRate_ / 1e18;
  const totalSupply = totalSupply_ * exchangeRate / 10 ** underlyingDecimals;
  const supply = supply_ * exchangeRate / 10 ** underlyingDecimals;
  const supplyPct = supply / totalSupply * 100;

  const totalBorrows = totalBorrows_ / 10 ** underlyingDecimals;
  const borrow = borrowBalanceOf_ / 10 ** underlyingDecimals;
  const borrowPct = borrow / totalBorrows * 100;

  const cash = cash_ / 10 ** underlyingDecimals;

  const RATE_CONTRACT = new ethcall.Contract(interestRateModel, LENDLY_ABI.rate, App.provider);
  const [blocksPerYear] = await App.ethcallProvider.all([RATE_CONTRACT.blocksPerYear()]);

  const supplyAPY = ((1 + supplyRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;
  const borrowAPY = ((1 + borrowRatePerBlock_ / 1e18) ** blocksPerYear - 1) * 100;

  let supplyFarmingAPY = 0;
  const [farmingRewards_] = await App.ethcallProvider.all([comptroller.compSpeeds(token)])
  const farmingRewards = farmingRewards_ / 1e18;
  const blocksPerYear_ = blocksPerYear * 1
  const tvl = totalSupply * underlyingPrice;
  const rewardPrice = getParameterCaseInsensitive(prices, "0x10010078a54396f62c96df8532dc2b4847d47ed3")?.usd;
  if(farmingRewards > 0){
    supplyFarmingAPY = farmingRewards * blocksPerYear_ * rewardPrice / tvl * 100
  }
  const borrowFarmingAPY = 0;

  const supplyNetAPY = supplyAPY + supplyFarmingAPY
  const borrowNetAPY = borrowFarmingAPY - borrowAPY

  const supplyUsdPerYear = supply * underlyingPrice * supplyNetAPY / 100;
  const supplyUsdPerWeek = supplyUsdPerYear / 52;
  const supplyUsdPerDay = supplyUsdPerYear / 365;

  const borrowUsdPerYear = borrow * underlyingPrice * borrowNetAPY / 100;
  const borrowUsdPerWeek = borrowUsdPerYear / 52;
  const borrowUsdPerDay = borrowUsdPerYear / 365;


  return {
      underlyingSymbol,
      underlyingPrice,
      totalSupply,
      totalBorrows,
      totalReserves,
      cash,
      supplyAPY,
      borrowAPY,
      supplyFarmingAPY,
      borrowFarmingAPY,
      supplyNetAPY,
      borrowNetAPY,
      supply,
      supplyUsdPerDay,
      supplyUsdPerWeek,
      supplyUsdPerYear,
      borrow,
      borrowUsdPerDay,
      borrowUsdPerWeek,
      borrowUsdPerYear,
      supplyPct,
      borrowPct
  }
}

async function printData(data) {
  _print_bold(`${data.underlyingSymbol} ($${formatMoney(data.underlyingPrice)})`);
  _print(`Supplied : ${formatMoney(data.totalSupply)} ($${formatMoney(data.totalSupply * data.underlyingPrice)}) at ${data.supplyAPY.toFixed(2)}% APY`)
  _print(`Borrowed : ${formatMoney(data.totalBorrows)} ($${formatMoney(data.totalBorrows * data.underlyingPrice)}) at ${data.borrowAPY.toFixed(2)}% APY`)
  _print(`Reserves : ${formatMoney(data.totalReserves)} ($${formatMoney(data.totalReserves * data.underlyingPrice)})`);
  _print(`Farming APR Supply ${data.supplyFarmingAPY.toFixed(2)}% Borrow ${data.borrowFarmingAPY.toFixed(2)}%`);
  _print(`Net APY Supply ${data.supplyNetAPY.toFixed(2)}% Borrow ${data.borrowNetAPY.toFixed(2)}%`);
  if (data.supply > 0) {
      _print(`You are supplying ${formatMoney(data.supply)} ${data.underlyingSymbol} ($${formatMoney(data.supply * data.underlyingPrice)}), ${(data.supplyPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Supply earnings: Day ($${formatMoney(data.supplyUsdPerDay)}) Week ($${formatMoney(data.supplyUsdPerWeek)}) Year: ($${formatMoney(data.supplyUsdPerYear)})`);
  }
  if (data.borrow > 0) {
      _print(`You are borrowing ${formatMoney(data.borrow)} ${data.underlyingSymbol} ($${formatMoney(data.borrow * data.underlyingPrice)}), ${(data.borrowPct).toFixed(2)}% of the pool.`)
      _print(`Estimated Borrow earnings: Day ($${formatMoney(data.borrowUsdPerDay)}) Week ($${formatMoney(data.borrowUsdPerWeek)}) Year: ($${formatMoney(data.borrowUsdPerYear)})`);
  }
  _print("");
}
