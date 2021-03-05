$(function() {
    consoleInit();
    start(main);
});
const stakingAddress = '0xd56339F80586c08B7a4E3a68678d16D37237Bd96'

const BEP20_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const stakingAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochEndBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exchangeProxy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"firstEpochRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getGeneratedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_vbswapToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setEpochEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setEpochRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_exchangeProxy","type":"address"}],"name":"setExchangeProxy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reserveFund","type":"address"}],"name":"setReserveFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_reservePercent","type":"uint256"}],"name":"setReservePercent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vbswapToken","outputs":[{"internalType":"contract vBSWAP","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
 
const vSafeABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"target","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"string","name":"signature","type":"string"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"ExecuteTransaction","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"_input","type":"address"}],"name":"accept","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"acceptContractDepositor","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newCompound","type":"uint256"},{"internalType":"uint256","name":"_blocksToReleaseCompound","type":"uint256"}],"name":"addNewCompound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"basedToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"calc_token_amount_deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"calc_token_amount_withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"converterMap","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_min_mint_amount","type":"uint256"}],"name":"depositFor","outputs":[{"internalType":"uint256","name":"_mint_amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositLimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"earnExtra","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earnLowerlimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"endReleasingCompoundBlk","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"string","name":"signature","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"executeTransaction","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVaultMaster","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"reserve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestAllStrategies","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"harvestStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_basedToken","type":"address"},{"internalType":"contract IVaultMaster","name":"_vaultMaster","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastHarvestAllTimeStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"openHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingCompound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_acceptContractDepositor","type":"bool"}],"name":"setAcceptContractDepositor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cap","type":"uint256"}],"name":"setCap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_converter","type":"address"}],"name":"setConverterMap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_limit","type":"uint256"}],"name":"setDepositLimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_earnLowerlimit","type":"uint256"}],"name":"setEarnLowerlimit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_openHarvest","type":"bool"}],"name":"setOpenHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IVaultMaster","name":"_vaultMaster","type":"address"}],"name":"setVaultMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startReleasingCompoundBlk","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPendingCompound","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"unwhitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_contract","type":"address"}],"name":"whitelistContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"whitelistedContract","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"},{"internalType":"uint256","name":"_min_output_amount","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"},{"internalType":"uint256","name":"_shares","type":"uint256"},{"internalType":"uint256","name":"_min_output_amount","type":"uint256"}],"name":"withdrawFor","outputs":[{"internalType":"uint256","name":"_output_amount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw_fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]


async function main() {
    const vBSWAPTokenInfo = await getTokenInfo('vBSWAP')
    _print('-------------------------------------------------')
    _print(`vBSWAP price $${formatMoney(vBSWAPTokenInfo.price)}`)
    _print('-------------------------------------------------')
    _print(' ')


    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    _print('-------------------------------------------------')
    _print("\nvFARM: https://bsc.valuedefi.io/#/vfarm \n\n");
    _print('-------------------------------------------------')

    let raw = await fetch('https://api.vswap.fi/api/farm/pool-info')
    let data = JSON.parse(await raw.text()).data
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider.getSigner());

    for (const pool of data) {
	try {
        showLoading()
        
	// calculations
        const poolId = pool.pid
        const stakedTokenAddress = pool.lpToken
        const stakedToken = new ethers.Contract(stakedTokenAddress, BEP20_ABI, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = await stakedToken.symbol()
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let pendingHarvest
	pendingHarvest = await STAKING_POOL.pendingReward(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        const claimFunc = async function() {
            return harvest(STAKING_POOL, poolId, App)
        }
        const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
        const userStaked = userInfo.amount / 10 ** decimal
        const tokenPrice = pool.lpPrice
        const userStakedUsd = tokenPrice * userStaked
        const userStakedPct = userStakedUsd * 100 / parseFloat(pool.totalSupplyUSD)

        const exitFunc = async function() {
            return exitFarming(STAKING_POOL, poolId, userInfo.amount, App)
        }
        const approveFunc = async function() {
            return approve(stakedToken, stakingAddress, stakedTokenBalance, App)
        }
        const revokeFunc = async function() {
            return revoke(stakedToken, stakingAddress, App)
        }
        const stakeFunc = async function() {
            return stake(STAKING_POOL, poolId, stakedTokenBalance, App)
        }
        const unstakeFunc = async function() {
            return unstake(STAKING_POOL, poolId, userInfo.amount, App)
        }

	let rewardToken = Object.keys(pool.rewards)[0]
        // DISPLAY POOL INFORMATION

        _print(`Pool: ${stakingTokenTicker}`)
        _print(' ')
        _print(`Total Value Locked: $${formatMoney(pool.totalSupplyUSD)}`)
        _print(`${stakingTokenTicker} Price: $${parseFloat(tokenPrice).toFixed(2)}`)
	_print(`Reward token: ${rewardToken}`)
        _print(`APY ${parseFloat(pool.roi.apy).toFixed(2)} %`)
        _print(`You are staking ${parseFloat(userStaked).toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (userStaked > 0) {
            let dailyReward = parseFloat(userStakedUsd * pool.roi.apy / 100 / 365),
                monthlyReward = parseFloat(userStakedUsd * pool.roi.apy / 100 / 12),
                yearlyReward = parseFloat(userStakedUsd * pool.roi.apy / 100)
            _print(`Est earning: ` +
                `Daily ${parseFloat(dailyReward/ vBSWAPTokenInfo.price).toFixed(8)} ${rewardToken}  ($${formatMoney(dailyReward)})  ` +
                `Monthly: ${parseFloat(monthlyReward / vBSWAPTokenInfo.price).toFixed(8)} ${rewardToken} ($${formatMoney(monthlyReward)})  ` +
                `Yearly: ${parseFloat(yearlyReward / vBSWAPTokenInfo.price).toFixed(8)} ${rewardToken} ($${formatMoney(yearlyReward)}) `)
        }
        _print_link(`Approve ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, approveFunc)
        _print_link(`Stake ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, stakeFunc)
        _print_link(`Unstake ${parseFloat(userStaked).toFixed(8)}  ${stakingTokenTicker}`, unstakeFunc)
        _print_link(`Claim ${pendingHarvest.toFixed(8)} ${rewardToken}`, claimFunc)
        _print_link(`Revoke approval`, revokeFunc)
        _print_link(`Exit`, exitFunc)
        _print('-------------------------------------------------')
        _print('')
        hideLoading();
	} catch(err) {
		console.log(err)
		continue
	}
    }


    _print('-------------------------------------------------')

	// vSafe
    _print("\nvSAFE: https://bsc.valuedefi.io/#/vsafe \n\n");
    _print('-------------------------------------------------')
    raw = await fetch('https://api-vfarm.vswap.fi/api/farming-scan/get-farming-scans?farming_name=vsafe')
    data = JSON.parse(await raw.text()).data
    for (const pool of data) {
        try {
        showLoading()

       // calculations
        const poolAddress = pool.farmingContractAddress
	const vSafeContract = new ethers.Contract(poolAddress, vSafeABI, App.provider.getSigner())
        const stakedTokenAddress = pool.wantTokenAddress
        const stakedToken = new ethers.Contract(stakedTokenAddress, BEP20_ABI, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = pool.wantTokenName
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let userStakedAmount = await vSafeContract.balanceOf(App.YOUR_ADDRESS)
        let userStaked = userStakedAmount / 10 ** decimal
        const tokenPrice = pool.wantTokenPrice
        const userStakedUsd = tokenPrice * userStaked
        const userStakedPct = userStaked * 100 / parseFloat(pool.wantTokenLocked)

        const approveFunc = async function() {
            return approve(stakedToken, poolAddress, stakedTokenBalance, App)
        }
        const revokeFunc = async function() {
            return revoke(stakedToken, poolAddress, App)
        }
        const stakeFunc = async function() {
            return stakeVSafe(vSafeContract, stakedTokenBalance, App)
        }
        const unstakeFunc = async function() {
            return unstakeVSafe(vSafeContract, userStakedAmount, App)
        }

        // DISPLAY POOL INFORMATION

        _print(`Pool: ${stakingTokenTicker}`)
        _print(' ')
        _print(`Total Value Locked: $${formatMoney(pool.tvl)}`)
        _print(`${stakingTokenTicker} Price: $${parseFloat(tokenPrice).toFixed(2)}`)
        _print(`Daily ${parseFloat(pool.dailyApy).toFixed(2)} %. Yearly ${parseFloat(pool.apy).toFixed(2)} %.`)
        _print(`You are staking ${parseFloat(userStaked).toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (userStaked > 0) {
            let dailyReward = parseFloat(userStakedUsd * pool.dailyApy / 100 ),
                yearlyReward = parseFloat(userStakedUsd * pool.apy / 100)
            _print(`Est earning: ` +
		`Daily  $${formatMoney(dailyReward)}  ` +
                `Yearly $${formatMoney(yearlyReward)} `)
        }
        _print_link(`Approve ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, approveFunc)
        _print_link(`Stake ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, stakeFunc)
        _print_link(`Unstake ${parseFloat(userStaked).toFixed(8)}  ${stakingTokenTicker}`, unstakeFunc)
	_print_link(`Revoke approval`, revokeFunc)
        _print('-------------------------------------------------')
        _print('')
        hideLoading();	
        } catch(err) {
                console.log(err)
                continue
        }
    }
}

const getTokenInfo = async (symbol) => {
    let raw = await fetch('https://api.vswap.fi/api/price/get-price?token=' + symbol)
    return JSON.parse(await raw.text()).data
}
const harvest = async (stakingContract, poolId, App) => {
    stakingContract.withdraw(poolId, 0, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const exitFarming = async (stakingContract, poolId, amount, App) => {
    stakingContract.withdraw(poolId, amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}


const approve = async (contract, spender, amount, App) => {
    contract.approve(spender, amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const revoke = async (contract, spender, App) => {
    contract.approve(spender, 0, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const stake = async (contract, poolId, amount, App) => {
    contract.deposit(poolId, amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const unstake = async (contract, poolId, amount, App) => {
    contract.withdraw(poolId, amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const stakeVSafe = async (contract, amount, App) => {
    contract.deposit(amount, 0, {
            gasLimit: 1000000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const unstakeVSafe = async (contract, amount, App) => {
    contract.withdraw(amount, 0,{
            gasLimit: 1000000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}
