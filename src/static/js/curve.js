
$(function() {
  consoleInit(main)
  });

  const GAUGE_CONTRACT_ABI = [{"name":"Deposit","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"type":"address","name":"user","indexed":false},{"type":"uint256","name":"original_balance","indexed":false},{"type":"uint256","name":"original_supply","indexed":false},{"type":"uint256","name":"working_balance","indexed":false},{"type":"uint256","name":"working_supply","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address","name":"lp_addr"},{"type":"address","name":"_minter"}],"stateMutability":"nonpayable","type":"constructor"},{"name":"user_checkpoint","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":2079152},{"name":"claimable_tokens","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":1998318},{"name":"kick","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":2084532},{"name":"set_approve_deposit","outputs":[],"inputs":[{"type":"address","name":"addr"},{"type":"bool","name":"can_deposit"}],"stateMutability":"nonpayable","type":"function","gas":35766},{"name":"deposit","outputs":[],"inputs":[{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[],"inputs":[{"type":"uint256","name":"_value"},{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[],"inputs":[{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":2208318},{"name":"integrate_checkpoint","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2297},{"name":"minter","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1421},{"name":"crv_token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1451},{"name":"lp_token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1481},{"name":"controller","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1511},{"name":"voting_escrow","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1541},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1725},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1601},{"name":"future_epoch_time","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1631},{"name":"approved_to_deposit","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":1969},{"name":"working_balances","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1845},{"name":"working_supply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1721},{"name":"period","outputs":[{"type":"int128","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1751},{"name":"period_timestamp","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1890},{"name":"integrate_inv_supply","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1920},{"name":"integrate_inv_supply_of","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1995},{"name":"integrate_checkpoint_of","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2025},{"name":"integrate_fraction","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2055},{"name":"inflation_rate","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1931}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    _print("This could take more than 5 minutes...\n");

    const ASSETS_CONTRACT_ABI = [{"name":"PoolAdded","inputs":[{"name":"pool","type":"address","indexed":true},{"name":"rate_method_id","type":"bytes","indexed":false}],"anonymous":false,"type":"event"},{"name":"PoolRemoved","inputs":[{"name":"pool","type":"address","indexed":true}],"anonymous":false,"type":"event"},{"stateMutability":"nonpayable","type":"constructor","inputs":[{"name":"_address_provider","type":"address"},{"name":"_gauge_controller","type":"address"}],"outputs":[]},{"stateMutability":"view","type":"function","name":"find_pool_for_coins","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"find_pool_for_coins","inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"i","type":"uint256"}],"outputs":[{"name":"","type":"address"}]},{"stateMutability":"view","type":"function","name":"get_n_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":1521},{"stateMutability":"view","type":"function","name":"get_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[8]"}],"gas":12102},{"stateMutability":"view","type":"function","name":"get_underlying_coins","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[8]"}],"gas":12194},{"stateMutability":"view","type":"function","name":"get_decimals","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":7874},{"stateMutability":"view","type":"function","name":"get_underlying_decimals","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":7966},{"stateMutability":"view","type":"function","name":"get_rates","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":36992},{"stateMutability":"view","type":"function","name":"get_gauges","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"address[10]"},{"name":"","type":"int128[10]"}],"gas":20157},{"stateMutability":"view","type":"function","name":"get_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":16583},{"stateMutability":"view","type":"function","name":"get_underlying_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":162842},{"stateMutability":"view","type":"function","name":"get_virtual_price_from_lp_token","inputs":[{"name":"_token","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1927},{"stateMutability":"view","type":"function","name":"get_A","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1045},{"stateMutability":"view","type":"function","name":"get_parameters","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"A","type":"uint256"},{"name":"future_A","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"admin_fee","type":"uint256"},{"name":"future_fee","type":"uint256"},{"name":"future_admin_fee","type":"uint256"},{"name":"future_owner","type":"address"},{"name":"initial_A","type":"uint256"},{"name":"initial_A_time","type":"uint256"},{"name":"future_A_time","type":"uint256"}],"gas":6305},{"stateMutability":"view","type":"function","name":"get_fees","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[2]"}],"gas":1450},{"stateMutability":"view","type":"function","name":"get_admin_balances","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256[8]"}],"gas":36454},{"stateMutability":"view","type":"function","name":"get_coin_indices","inputs":[{"name":"_pool","type":"address"},{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"int128"},{"name":"","type":"int128"},{"name":"","type":"bool"}],"gas":27131},{"stateMutability":"view","type":"function","name":"estimate_gas_used","inputs":[{"name":"_pool","type":"address"},{"name":"_from","type":"address"},{"name":"_to","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":32004},{"stateMutability":"view","type":"function","name":"is_meta","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"bool"}],"gas":1900},{"stateMutability":"view","type":"function","name":"get_pool_name","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"string"}],"gas":8323},{"stateMutability":"view","type":"function","name":"get_coin_swap_count","inputs":[{"name":"_coin","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":1951},{"stateMutability":"view","type":"function","name":"get_coin_swap_complement","inputs":[{"name":"_coin","type":"address"},{"name":"_index","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":2090},{"stateMutability":"view","type":"function","name":"get_pool_asset_type","inputs":[{"name":"_pool","type":"address"}],"outputs":[{"name":"","type":"uint256"}],"gas":2011},{"stateMutability":"nonpayable","type":"function","name":"add_pool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_rate_info","type":"bytes32"},{"name":"_decimals","type":"uint256"},{"name":"_underlying_decimals","type":"uint256"},{"name":"_has_initial_A","type":"bool"},{"name":"_is_v1","type":"bool"},{"name":"_name","type":"string"}],"outputs":[],"gas":61485845},{"stateMutability":"nonpayable","type":"function","name":"add_pool_without_underlying","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_rate_info","type":"bytes32"},{"name":"_decimals","type":"uint256"},{"name":"_use_rates","type":"uint256"},{"name":"_has_initial_A","type":"bool"},{"name":"_is_v1","type":"bool"},{"name":"_name","type":"string"}],"outputs":[],"gas":31306062},{"stateMutability":"nonpayable","type":"function","name":"add_metapool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_decimals","type":"uint256"},{"name":"_name","type":"string"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"add_metapool","inputs":[{"name":"_pool","type":"address"},{"name":"_n_coins","type":"uint256"},{"name":"_lp_token","type":"address"},{"name":"_decimals","type":"uint256"},{"name":"_name","type":"string"},{"name":"_base_pool","type":"address"}],"outputs":[]},{"stateMutability":"nonpayable","type":"function","name":"remove_pool","inputs":[{"name":"_pool","type":"address"}],"outputs":[],"gas":779731418758},{"stateMutability":"nonpayable","type":"function","name":"set_pool_gas_estimates","inputs":[{"name":"_addr","type":"address[5]"},{"name":"_amount","type":"uint256[2][5]"}],"outputs":[],"gas":390460},{"stateMutability":"nonpayable","type":"function","name":"set_coin_gas_estimates","inputs":[{"name":"_addr","type":"address[10]"},{"name":"_amount","type":"uint256[10]"}],"outputs":[],"gas":392047},{"stateMutability":"nonpayable","type":"function","name":"set_gas_estimate_contract","inputs":[{"name":"_pool","type":"address"},{"name":"_estimator","type":"address"}],"outputs":[],"gas":72629},{"stateMutability":"nonpayable","type":"function","name":"set_liquidity_gauges","inputs":[{"name":"_pool","type":"address"},{"name":"_liquidity_gauges","type":"address[10]"}],"outputs":[],"gas":400675},{"stateMutability":"nonpayable","type":"function","name":"set_pool_asset_type","inputs":[{"name":"_pool","type":"address"},{"name":"_asset_type","type":"uint256"}],"outputs":[],"gas":72667},{"stateMutability":"nonpayable","type":"function","name":"batch_set_pool_asset_type","inputs":[{"name":"_pools","type":"address[32]"},{"name":"_asset_types","type":"uint256[32]"}],"outputs":[],"gas":1173447},{"stateMutability":"view","type":"function","name":"address_provider","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2048},{"stateMutability":"view","type":"function","name":"gauge_controller","inputs":[],"outputs":[{"name":"","type":"address"}],"gas":2078},{"stateMutability":"view","type":"function","name":"pool_list","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":2217},{"stateMutability":"view","type":"function","name":"pool_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2138},{"stateMutability":"view","type":"function","name":"coin_count","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2168},{"stateMutability":"view","type":"function","name":"get_coin","inputs":[{"name":"arg0","type":"uint256"}],"outputs":[{"name":"","type":"address"}],"gas":2307},{"stateMutability":"view","type":"function","name":"get_pool_from_lp_token","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":2443},{"stateMutability":"view","type":"function","name":"get_lp_token","inputs":[{"name":"arg0","type":"address"}],"outputs":[{"name":"","type":"address"}],"gas":2473},{"stateMutability":"view","type":"function","name":"last_updated","inputs":[],"outputs":[{"name":"","type":"uint256"}],"gas":2288}]
    const NEW_GAUGE_CONTROLLER_ABI = [{"name":"CommitOwnership","inputs":[{"type":"address","name":"admin","indexed":false}],"anonymous":false,"type":"event"},{"name":"ApplyOwnership","inputs":[{"type":"address","name":"admin","indexed":false}],"anonymous":false,"type":"event"},{"name":"AddType","inputs":[{"type":"string","name":"name","indexed":false},{"type":"int128","name":"type_id","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewTypeWeight","inputs":[{"type":"int128","name":"type_id","indexed":false},{"type":"uint256","name":"time","indexed":false},{"type":"uint256","name":"weight","indexed":false},{"type":"uint256","name":"total_weight","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewGaugeWeight","inputs":[{"type":"address","name":"gauge_address","indexed":false},{"type":"uint256","name":"time","indexed":false},{"type":"uint256","name":"weight","indexed":false},{"type":"uint256","name":"total_weight","indexed":false}],"anonymous":false,"type":"event"},{"name":"VoteForGauge","inputs":[{"type":"uint256","name":"time","indexed":false},{"type":"address","name":"user","indexed":false},{"type":"address","name":"gauge_addr","indexed":false},{"type":"uint256","name":"weight","indexed":false}],"anonymous":false,"type":"event"},{"name":"NewGauge","inputs":[{"type":"address","name":"addr","indexed":false},{"type":"int128","name":"gauge_type","indexed":false},{"type":"uint256","name":"weight","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address","name":"_token"},{"type":"address","name":"_voting_escrow"}],"stateMutability":"nonpayable","type":"constructor"},{"name":"commit_transfer_ownership","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":37597},{"name":"apply_transfer_ownership","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":38497},{"name":"gauge_types","outputs":[{"type":"int128","name":""}],"inputs":[{"type":"address","name":"_addr"}],"stateMutability":"view","type":"function","gas":1625},{"name":"add_gauge","outputs":[],"inputs":[{"type":"address","name":"addr"},{"type":"int128","name":"gauge_type"}],"stateMutability":"nonpayable","type":"function"},{"name":"add_gauge","outputs":[],"inputs":[{"type":"address","name":"addr"},{"type":"int128","name":"gauge_type"},{"type":"uint256","name":"weight"}],"stateMutability":"nonpayable","type":"function"},{"name":"checkpoint","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":18033784416},{"name":"checkpoint_gauge","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":18087678795},{"name":"gauge_relative_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"view","type":"function"},{"name":"gauge_relative_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"},{"type":"uint256","name":"time"}],"stateMutability":"view","type":"function"},{"name":"gauge_relative_weight_write","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function"},{"name":"gauge_relative_weight_write","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"},{"type":"uint256","name":"time"}],"stateMutability":"nonpayable","type":"function"},{"name":"add_type","outputs":[],"inputs":[{"type":"string","name":"_name"}],"stateMutability":"nonpayable","type":"function"},{"name":"add_type","outputs":[],"inputs":[{"type":"string","name":"_name"},{"type":"uint256","name":"weight"}],"stateMutability":"nonpayable","type":"function"},{"name":"change_type_weight","outputs":[],"inputs":[{"type":"int128","name":"type_id"},{"type":"uint256","name":"weight"}],"stateMutability":"nonpayable","type":"function","gas":36246310050},{"name":"change_gauge_weight","outputs":[],"inputs":[{"type":"address","name":"addr"},{"type":"uint256","name":"weight"}],"stateMutability":"nonpayable","type":"function","gas":36354170809},{"name":"vote_for_gauge_weights","outputs":[],"inputs":[{"type":"address","name":"_gauge_addr"},{"type":"uint256","name":"_user_weight"}],"stateMutability":"nonpayable","type":"function","gas":18142052127},{"name":"get_gauge_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"view","type":"function","gas":2974},{"name":"get_type_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"type_id"}],"stateMutability":"view","type":"function","gas":2977},{"name":"get_total_weight","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2693},{"name":"get_weights_sum_per_type","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"type_id"}],"stateMutability":"view","type":"function","gas":3109},{"name":"admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1841},{"name":"future_admin","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1871},{"name":"token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1901},{"name":"voting_escrow","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1931},{"name":"n_gauge_types","outputs":[{"type":"int128","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1961},{"name":"n_gauges","outputs":[{"type":"int128","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1991},{"name":"gauge_type_names","outputs":[{"type":"string","name":""}],"inputs":[{"type":"int128","name":"arg0"}],"stateMutability":"view","type":"function","gas":8628},{"name":"gauges","outputs":[{"type":"address","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":2160},{"name":"vote_user_slopes","outputs":[{"type":"uint256","name":"slope"},{"type":"uint256","name":"power"},{"type":"uint256","name":"end"}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":5020},{"name":"vote_user_power","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2265},{"name":"last_user_vote","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":2449},{"name":"points_weight","outputs":[{"type":"uint256","name":"bias"},{"type":"uint256","name":"slope"}],"inputs":[{"type":"address","name":"arg0"},{"type":"uint256","name":"arg1"}],"stateMutability":"view","type":"function","gas":3859},{"name":"time_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2355},{"name":"points_sum","outputs":[{"type":"uint256","name":"bias"},{"type":"uint256","name":"slope"}],"inputs":[{"type":"int128","name":"arg0"},{"type":"uint256","name":"arg1"}],"stateMutability":"view","type":"function","gas":3970},{"name":"time_sum","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":2370},{"name":"points_total","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":2406},{"name":"time_total","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2321},{"name":"points_type_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"int128","name":"arg0"},{"type":"uint256","name":"arg1"}],"stateMutability":"view","type":"function","gas":2671},{"name":"time_type_weight","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":2490}]
    const NEW_GAUGE_ABI = [{"name":"Deposit","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Withdraw","inputs":[{"type":"address","name":"provider","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateLiquidityLimit","inputs":[{"type":"address","name":"user","indexed":false},{"type":"uint256","name":"original_balance","indexed":false},{"type":"uint256","name":"original_supply","indexed":false},{"type":"uint256","name":"working_balance","indexed":false},{"type":"uint256","name":"working_supply","indexed":false}],"anonymous":false,"type":"event"},{"outputs":[],"inputs":[{"type":"address","name":"lp_addr"},{"type":"address","name":"_minter"}],"stateMutability":"nonpayable","type":"constructor"},{"name":"user_checkpoint","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":2079152},{"name":"claimable_tokens","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":1998318},{"name":"kick","outputs":[],"inputs":[{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function","gas":2084532},{"name":"set_approve_deposit","outputs":[],"inputs":[{"type":"address","name":"addr"},{"type":"bool","name":"can_deposit"}],"stateMutability":"nonpayable","type":"function","gas":35766},{"name":"deposit","outputs":[],"inputs":[{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[],"inputs":[{"type":"uint256","name":"_value"},{"type":"address","name":"addr"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[],"inputs":[{"type":"uint256","name":"_value"}],"stateMutability":"nonpayable","type":"function","gas":2208318},{"name":"integrate_checkpoint","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2297},{"name":"minter","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1421},{"name":"crv_token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1451},{"name":"lp_token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1481},{"name":"controller","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1511},{"name":"voting_escrow","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1541},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1725},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1601},{"name":"future_epoch_time","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1631},{"name":"approved_to_deposit","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":1969},{"name":"working_balances","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1845},{"name":"working_supply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1721},{"name":"period","outputs":[{"type":"int128","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1751},{"name":"period_timestamp","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1890},{"name":"integrate_inv_supply","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":1920},{"name":"integrate_inv_supply_of","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":1995},{"name":"integrate_checkpoint_of","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2025},{"name":"integrate_fraction","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2055},{"name":"inflation_rate","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":1931}]

    const NEW_GAUGE_CONTROLLER_ADDRESS = "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB"
    const NEW_GAUGE_CONTROLLER = new ethcall.Contract(NEW_GAUGE_CONTROLLER_ADDRESS, NEW_GAUGE_CONTROLLER_ABI);

    const tokens = {};
    let prices = {};

    const [_gauge_count] = await App.ethcallProvider.all([NEW_GAUGE_CONTROLLER.n_gauges()])
    const gauge_count = _gauge_count / 1;
    const gauge_controller_calls = [...Array(gauge_count).keys()].map(i => NEW_GAUGE_CONTROLLER.gauges(i));
    const gauge_controller_addresses = await App.ethcallProvider.all(gauge_controller_calls);
    const new_gauges = gauge_controller_addresses
    .map(a => {
      return {
        address : a,
        abi : NEW_GAUGE_ABI
      }
    })

    const stakeTokens = await tryGetAllNewCurveStakeTokens(App, NEW_GAUGE_ABI, new_gauges)
    await tryGetAllNewCurvePricesAndTokens(App, tokens, prices, stakeTokens.stakeTokens);

    const ASSETS_ADDRESS = "0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5"
    const ASSETS_CONTRACT = new ethcall.Contract(ASSETS_ADDRESS, ASSETS_CONTRACT_ABI);

    const [_poolCount] = await App.ethcallProvider.all([ASSETS_CONTRACT.pool_count()]);
    const poolCount = _poolCount / 1;

    const calls = [...Array(poolCount).keys()].map(i => ASSETS_CONTRACT.pool_list(i));
    const poolAddresses = await App.ethcallProvider.all(calls)        

    const calls2 = poolAddresses.map(a => ASSETS_CONTRACT.get_lp_token(a));
    const lpTokenAddresses = await App.ethcallProvider.all(calls2);
    
    const calls3 = poolAddresses.map(a => ASSETS_CONTRACT.get_gauges(a))
    const allGauges = await App.ethcallProvider.all(calls3);

    const gaugeContracts = allGauges.map(g => g[0])
      .flat()
      .filter(a => a
      .toLowerCase() != "0x0000000000000000000000000000000000000000")
      .map(g => new ethcall.Contract(g, GAUGE_CONTRACT_ABI))
    const gaugeCalls = gaugeContracts.map(c => [c.totalSupply(), c.balanceOf(App.YOUR_ADDRESS)]).flat()
    const gaugeValues = await App.ethcallProvider.all(gaugeCalls);

    let poolInfos = [];
    for(let i = 0; i < poolAddresses.length; i++){
      poolInfos.push({
        poolAddress    : poolAddresses[i],
        lpTokenAddress : lpTokenAddresses[i],
        gauges         : allGauges[i],
      })
    }

    const gaugeResults = {};
    for(let i = 0; i < gaugeContracts.length; i++){
      gaugeResults[gaugeContracts[i].address] = {
        totalSupply  : gaugeValues[i*2],
        usersStaked  : gaugeValues[i*2+1]
      }
    }

    let lpTokens = []
    for(let i = 0; i < lpTokenAddresses.length; i++){
      const lpToken = await getToken(App, lpTokenAddresses[i], App.YOUR_ADDRESS);
      lpTokens.push(lpToken);
    }
    const newTokens = lpTokens.map(t => t.tokens).flat().concat(["0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"]);
    await getNewPricesAndTokens(App, tokens, prices, newTokens, App.YOUR_ADDRESS);
    prices["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"] = getParameterCaseInsensitive(prices,  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
    let staked_tvl = 0, userTvl = 0, tvl = 0;
    for(const poolInfo of poolInfos.filter(p => p.poolAddress.toLowerCase() !== "0x52EA46506B9CC5Ef470C5bf89f17Dc28bB35D85C".toLowerCase())){
      for(const gauge of poolInfo.gauges[0].filter(a => a != "0x0000000000000000000000000000000000000000")){
        const gaugeResult = gaugeResults[gauge];
        const lpToken = getParameterCaseInsensitive(tokens, poolInfo.lpTokenAddress);
        const totalSupply = gaugeResult.totalSupply / 10 ** lpToken.decimals;
        const usersStaked = gaugeResult.usersStaked / 10 ** lpToken.decimals;
        lpToken.staked = totalSupply;
        const poolPrice = tryGetPoolPrices(tokens, prices, lpToken, "eth")
        staked_tvl += totalSupply * poolPrice.price;
        userTvl += usersStaked * poolPrice.price;
        tvl += (lpToken.totalSupply / 10 ** lpToken.decimals) * poolPrice.price;
        await printCurveContract(App, lpToken, poolPrice, gaugeResult, gauge);
      }
    }
    _print_bold(`Total Value Locked: $${formatMoney(tvl.toFixed(2))}`);
    _print_bold(`\nTotal Value Staked: $${formatMoney(staked_tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }
    _print("");
    //NEW POOLS HERE
    let p = await loadMultipleCurveSynthetixPools(App, tokens, prices, new_gauges)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
    }

    hideLoading();
  }
  
  async function printCurveContract(App, lpToken, poolPrice, gaugeResult, gauge) {
    poolPrice.print_price();
    const userStaked = gaugeResult.usersStaked / 10 ** lpToken.decimals;
    var userStakedUsd = userStaked * poolPrice.price;
    var userStakedPct = userStakedUsd / poolPrice.tvl * 100;
    _print(`You are staking ${userStaked.toFixed(4)} ${poolPrice.stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (userStaked > 0) {
      _print(`Your stake comprises of ${userStaked} ${poolPrice.stakeTokenTicker}.`)
    }
    const deposit = async function() {
      return curveGaugetDeposit(App, gauge, lpToken)
    }
    const withdraw = async function() {
      return curveGaugeWithdraw(App, gauge, lpToken)
    }
    _print_link(`Deposit ${lpToken.unstaked.toFixed(6)} ${lpToken.symbol}`, deposit);
    _print_link(`Withdraw ${userStaked.toFixed(6)} ${lpToken.symbol}`, withdraw)
    _print("");
  }

async function curveGaugetDeposit(App, gauge, token){
  const signer = await App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(token.address, ERC20_ABI, signer)
  const GAUGE_CONTRACT = new ethers.Contract(gauge, GAUGE_CONTRACT_ABI, signer)

  const balanceToStake = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, token.address)

  const decimals = await STAKING_TOKEN.decimals();
  let allow = Promise.resolve()

  if (allowedTokens / 10 ** decimals < balanceToStake / 10 ** decimals) {
    showLoading()
    allow = STAKING_TOKEN.approve(token.address, ethers.constants.MaxUint256)
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

async function curveGaugeWithdraw(App, gauge, token){
  const signer = App.provider.getSigner()
  const GAUGE_CONTRACT = new ethers.Contract(gauge, GAUGE_CONTRACT_ABI, signer)

  const currentStakedAmount = await GAUGE_CONTRACT.balanceOf(App.YOUR_ADDRESS);

  if (currentStakedAmount / 10 ** token.decimals > 0) {
    showLoading()
    GAUGE_CONTRACT["withdraw()"]({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

function tryGetPoolPrices(tokens, prices, pool, chain = "eth"){
  try {
    const poolPrice = getPoolPrices(tokens, prices, pool, chain = "eth")
    return poolPrice;
  }catch(err){
    console.log(pool.address, err);
    return null;
  }
}

async function loadMultipleCurveSynthetixPools(App, tokens, prices, gauges) {
  let totalStaked  = 0, totalUserStaked = 0;
  const infos = await Promise.all(gauges.map(p =>
    loadCurveSynthetixPoolInfo(App, tokens, prices, p.abi, p.address)));
  for (const i of infos) {
    let p = await printCurveSynthetixPool(App, i);
    totalStaked += p.staked_tvl && 0;
    totalUserStaked += p.userStaked && 0;
  }
  return { staked_tvl : totalStaked, totalUserStaked };
}

async function loadCurveSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress) {

    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    const [stakeTokenAddress, balance] = await App.ethcallProvider.all([STAKING_MULTI.lp_token(), STAKING_MULTI.balanceOf(App.YOUR_ADDRESS)]);

    //another option is to pass my stakeTokens array as a parameter here and the stakeTokens to tokens like this tokens[address] = await getToken(App, address, App.YOUR_ADDRESS);
    var stakeToken = getParameterCaseInsensitive(tokens, stakeTokenAddress) ?? await getToken(App, stakeTokenAddress, stakingAddress);

    const poolPrices = tryGetPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked
    }
}

async function printCurveSynthetixPool(App, info, chain="eth", customURLs) {
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
         `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const approveTENDAndStake = async function() {
    return newCurveContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
  }
  const unstake = async function() {
    return rewardsContract_unstake(info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
  if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
    _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
  }
  else {
    _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
  }
  _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)

  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd
  }
}

const newCurveContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

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

async function tryGetAllNewCurveStakeTokens(App, stakingAbi, _gauges) {
  let stakeTokens = []
  const gauges = _gauges.filter(g => 
    g.address.toLowerCase() != "0xfDb129ea4b6f557b07BcDCedE54F665b7b6Bc281".toLowerCase() &&
    g.address.toLowerCase() != "0x6C09F6727113543Fd061a721da512B7eFCDD0267".toLowerCase() &&
    g.address.toLowerCase() != "0x060e386eCfBacf42Aa72171Af9EFe17b3993fC4F".toLowerCase() &&
    g.address.toLowerCase() != "0x9044E12fB1732f88ed0c93cfa5E9bB9bD2990cE5".toLowerCase() &&
    g.address.toLowerCase() != "0xFf17560d746F85674FE7629cE986E949602EF948".toLowerCase() &&
    g.address.toLowerCase() != "0x9F86c5142369B1Ffd4223E5A2F2005FC66807894".toLowerCase() &&
    g.address.toLowerCase() != "0x260e4fBb13DD91e187AE992c3435D0cf97172316".toLowerCase() &&
    g.address.toLowerCase() != "0xB504b6EB06760019801a91B451d3f7BD9f027fC9".toLowerCase() &&
    g.address.toLowerCase() != "0xa05E565cA0a103FcD999c7A7b8de7Bd15D5f6505".toLowerCase() &&
    g.address.toLowerCase() != "0xf2Cde8c47C20aCbffC598217Ad5FE6DB9E00b163".toLowerCase() &&
    g.address.toLowerCase() != "0x75D05190f35567e79012c2F0a02330D3Ed8a1F74".toLowerCase() &&
    g.address.toLowerCase() != "0x56eda719d82aE45cBB87B7030D3FB485685Bea45".toLowerCase() &&
    g.address.toLowerCase() != "0xAF78381216a8eCC7Ad5957f3cD12a431500E0B0D".toLowerCase() &&
    g.address.toLowerCase() != "0x279f11F8E2825dbe0b00F6776376601AC948d868".toLowerCase() &&
    g.address.toLowerCase() != "0xF2dDF89C04d702369Ab9eF8399Edb99a76e951Ce".toLowerCase() &&
    g.address.toLowerCase() != "0x95069889DF0BCdf15bc3182c1A4D6B20631F3B46".toLowerCase() &&
    g.address.toLowerCase() != "0xc1c5B8aAfE653592627B54B9527C7E98326e83Ff".toLowerCase() &&
    g.address.toLowerCase() != "0x1c77fB5486545810679D53E325d5bCf6C6A45081".toLowerCase() &&
    g.address.toLowerCase() != "0x9562c4D2E06aAf85efC5367Fb4544ECeB788465E".toLowerCase() &&
    g.address.toLowerCase() != "0xbAF05d7aa4129CA14eC45cC9d4103a9aB9A9fF60".toLowerCase() &&
    g.address.toLowerCase() != "0xfbb5b8f2f9b7a4d21ff44dC724C1Fb7b531A6612".toLowerCase() &&
    g.address.toLowerCase() != "0xc5aE4B5F86332e70f3205a8151Ee9eD9F71e0797".toLowerCase() &&
    g.address.toLowerCase() != "0x18006c6A7955Bf6Db72DE34089B975f733601660".toLowerCase() &&
    g.address.toLowerCase() != "0x34eD182D0812D119c92907852D2B429f095A9b07".toLowerCase() &&
    g.address.toLowerCase() != "0xd0698b2E41C42bcE42B51f977F962Fd127cF82eA".toLowerCase() &&
    g.address.toLowerCase() != "0x1AEAA1b998307217D62E9eeFb6407B10598eF3b8".toLowerCase() &&
    g.address.toLowerCase() != "0x82049b520cAc8b05E703bb35d1691B5005A92848".toLowerCase() &&
    g.address.toLowerCase() != "0xdA690c2EA49a058a9966C69f46a05Bfc225939f4".toLowerCase() &&
    g.address.toLowerCase() != "0x15bB164F9827De760174d3d3dAD6816eF50dE13c".toLowerCase() &&
    g.address.toLowerCase() != "0xA6ff75281eACa4cD5fEEb333e8E15558208295e5".toLowerCase() &&
    g.address.toLowerCase() != "0xF7b9c402c4D6c2eDbA04a7a515b53D11B1E9b2cc".toLowerCase() &&
    g.address.toLowerCase() != "0x20759F567BB3EcDB55c817c9a1d13076aB215EdC".toLowerCase() &&
    g.address.toLowerCase() != "0xbC38bD19227F91424eD4132F630f51C9A42Fa338".toLowerCase() &&
    g.address.toLowerCase() != "0x319E268f0A4C85D404734ee7958857F5891506d7".toLowerCase() &&
    g.address.toLowerCase() != "0xBb1B19495B8FE7C402427479B9aC14886cbbaaeE".toLowerCase() &&
    g.address.toLowerCase() != "0x8D9649e50A0d1da8E939f800fB926cdE8f18B47D".toLowerCase() &&
    g.address.toLowerCase() != "0xCE5F24B7A95e9cBa7df4B54E911B4A3Dc8CDAf6f".toLowerCase() &&
    g.address.toLowerCase() != "0xDB3fd1bfC67b5D4325cb31C04E0Cae52f1787FD6".toLowerCase() &&
    g.address.toLowerCase() != "0x8b397084699Cc64E429F610F81Fac13bf061ef55".toLowerCase() &&
    g.address.toLowerCase() != "0x555766f3da968ecBefa690Ffd49A2Ac02f47aa5f".toLowerCase() &&
    g.address.toLowerCase() != "0x1879075f1c055564CB968905aC404A5A01a1699A".toLowerCase() &&
    g.address.toLowerCase() != "0x94A5E05D66834c6C6961E199D34dA576679fC187".toLowerCase() &&
    g.address.toLowerCase() != "0xB721Cc32160Ab0da2614CC6aB16eD822Aeebc101".toLowerCase() &&
    g.address.toLowerCase() != "0x172a5AF37f69C69CC59E748D090a70615830A5Dd".toLowerCase() &&
    g.address.toLowerCase() != "0xCB8883D1D8c560003489Df43B30612AAbB8013bb".toLowerCase() &&
    g.address.toLowerCase() != "0x15F52286C0FF1d7A7dDbC9E300dd66628D46D4e6".toLowerCase() &&
    g.address.toLowerCase() != "0x6339eF8Df0C2d3d3E7eE697E241666a916B81587".toLowerCase() &&
    g.address.toLowerCase() != "0x4620D46b4db7fB04a01A75fFed228Bc027C9A899".toLowerCase() &&
    g.address.toLowerCase() != "0x00F7d467ef51E44f11f52a0c0Bef2E56C271b264".toLowerCase() &&
    g.address.toLowerCase() != "0xF4eA7617E7999710244e2eAbfC8730d35482EE76".toLowerCase() &&
    g.address.toLowerCase() != "0xD1426C391A7Cbe9DeCd302ac9c44e65C3505d1f0".toLowerCase() &&
    g.address.toLowerCase() != "0x95285Ea6fF14F80A2fD3989a6bAb993Bd6b5fA13".toLowerCase() &&
    g.address.toLowerCase() != "0x4B960396011A914B4ccCC3b33DFEE83A97A9D766".toLowerCase() &&
    g.address.toLowerCase() != "0x488E6ef919C2bB9de535C634a80afb0114DA8F62".toLowerCase() &&
    g.address.toLowerCase() != "0xC48f4653dd6a9509De44c92beb0604BEA3AEe714".toLowerCase() &&
    g.address.toLowerCase() != "0xb9C05B8EE41FDCbd9956114B3aF15834FDEDCb54".toLowerCase() &&
    g.address.toLowerCase() != "0xfE1A3dD8b169fB5BF0D5dbFe813d956F39fF6310".toLowerCase());
  for(let gauge of gauges){
    const STAKING_MULTI = new ethcall.Contract(gauge.address, stakingAbi);

    const [stakeTokenAddress] = await App.ethcallProvider.all([STAKING_MULTI.lp_token()]);

    var stakeToken = await getToken(App, stakeTokenAddress, gauge.address);
    stakeTokens.push(stakeToken);
  }

  return  {
    stakeTokens
  }
}

async function tryGetAllNewCurvePricesAndTokens(App, tokens, prices, stakeTokens){
  let newPriceAddresses = [], newTokenAddresses = [];
  for(let stakeToken of stakeTokens){
    newPriceAddresses.push(stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(prices,x)));
    
    newTokenAddresses.push(stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x)));
  }
  
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
  }
  for (const address of newTokenAddresses) {
    tokens[address[0]] = await getToken(App, address[0], App.YOUR_ADDRESS);
  }
}