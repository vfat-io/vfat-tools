$(function() {
    consoleInit();
    start(main);
});
const stakingAddress = '0x8f0A813D39F019a2A98958eDbf5150d3a06Cd20f'

const BEP20_ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const stakingAbi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"executor","type":"address"},{"indexed":false,"internalType":"uint256","name":"at","type":"uint256"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_DAY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BLOCKS_PER_WEEK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bcash","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bcashPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"burnPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getRewardBlocks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_mdg","type":"address"},{"internalType":"address","name":"_mdo","type":"address"},{"internalType":"address","name":"_bcash","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_lockUntilBlock","type":"uint256"},{"internalType":"address","name":"_mdgLocker","type":"address"},{"internalType":"address","name":"_reserveFund","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockUntilBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mdg","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdo","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mdoPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract ILiquidityMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextHalvingBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBcash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingMdo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accMdgPerShare","type":"uint256"},{"internalType":"uint256","name":"accMdoPerShare","type":"uint256"},{"internalType":"uint256","name":"accBcashPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reserveFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"reservePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bcashPerBlock","type":"uint256"}],"name":"setBcashPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_mdoPerBlock","type":"uint256"}],"name":"setMdoPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILiquidityMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_reserveFund","type":"address"}],"name":"setReserveFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"mdoDebt","type":"uint256"},{"internalType":"uint256","name":"bcashDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
 


async function main() {
    const midasGoldStats = await getStats()
    _print('-------------------------------------------------')
    _print(`MidasGold price: $${formatMoney(midasGoldStats.mdg.price)}`)
    _print(`TotalSupply: $${formatMoney(midasGoldStats.mdg.totalSupply)}`)
    _print(`Marketcap: $${formatMoney(midasGoldStats.mdg.marketcap)}`)
    _print(`TVL: $${formatMoney(midasGoldStats.tvl)}`)
    _print('-------------------------------------------------')
    _print(' ')


    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    let data = midasGoldStats.pools
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider.getSigner());

    for (const pool of data) {
	try {
        showLoading()
        
	// calculations
        const poolId = pool.pid
        const stakedTokenAddress = pool.wantTokenAddress
        const stakedToken = new ethers.Contract(stakedTokenAddress, BEP20_ABI, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = pool.wantTokenName
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let pendingHarvest
	pendingHarvest = await STAKING_POOL.pendingReward(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        const claimFunc = async function() {
            return harvest(STAKING_POOL, poolId, App)
        }
        const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
        const userStaked = userInfo.amount / 10 ** decimal
        const tokenPrice = parseFloat(pool.tvl / pool.wantTokenLocked)
        const userStakedUsd = tokenPrice * userStaked
        const userStakedPct = userStaked * 100 / parseFloat(pool.wantTokenLocked)

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

        // DISPLAY POOL INFORMATION

        _print(`Pool: ${stakingTokenTicker}`)
        _print(' ')
        _print(`Total Value Locked: $${formatMoney(pool.tvl)}`)
        _print(`${stakingTokenTicker} Price: $${parseFloat(tokenPrice).toFixed(2)}`)
        _print(`APY ${parseFloat(pool.apy).toFixed(2)} %`)
        _print(`You are staking ${parseFloat(userStaked).toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (userStaked > 0) {
            let dailyReward = parseFloat(userStakedUsd * pool.dailyApy / 100 ),
                yearlyReward = parseFloat(userStakedUsd * pool.apy / 100)
            _print(`Est earning: ` +
                `Daily:  $${formatMoney(dailyReward)}  ` +
                `Yearly: $${formatMoney(yearlyReward)} `)
        }
        _print_link(`Approve ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, approveFunc)
        _print_link(`Stake ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${stakingTokenTicker}`, stakeFunc)
        _print_link(`Unstake ${parseFloat(userStaked).toFixed(8)}  ${stakingTokenTicker}`, unstakeFunc)
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

}

const getStats = async () => {
    let raw = await fetch('https://api.midasdollar.fi/api/public/midasGoldStats')
    return JSON.parse(await raw.text()).status[1]
}
const harvest = async (stakingContract, poolId, App) => {
    stakingContract.withdraw(poolId, 0, {
            gasLimit: 1000000
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
            gasLimit: 1000000
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
            gasLimit: 1000000
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
            gasLimit: 1000000
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
            gasLimit: 1000000
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
            gasLimit: 1000000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}
