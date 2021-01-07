$(function() {
    consoleInit();
    start(main);
});

async function main() {
    _print(`TOKEN INFORMATION`)
    const BDOTokenInfo = await getTokenInfo('BDO')
    _print(`BDO price $${formatMoney(BDOTokenInfo.price)}`)
    _print(`BDO totalSupply ${BDOTokenInfo.totalSupply}`)
    _print(`Fully diluted marketcap: $${formatMoney(BDOTokenInfo.price * BDOTokenInfo.totalSupply)}`)
    _print(' ')

    const sBDOTokenInfo = await getTokenInfo('sBDO')
    _print(`sBDO price $${formatMoney(sBDOTokenInfo.price)}`)
    _print(`sBDO totalSupply ${sBDOTokenInfo.totalSupply}`)
    _print(`Fully diluted marketcap: $${formatMoney(sBDOTokenInfo.price * sBDOTokenInfo.totalSupply)}`)
    _print(' ')

    const bBDOTokenInfo = await getTokenInfo('bBDO')
    _print(`bBDO price $${formatMoney(bBDOTokenInfo.price)}`)
    _print(`bBDO totalSupply ${bBDOTokenInfo.totalSupply ?? 0}`)
    _print('-------------------------------------------------')
    _print('')

    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const prices = {
        BDO: BDOTokenInfo.price,
        sBDO: sBDOTokenInfo.price,
        bBDO: bBDOTokenInfo.price
    }
    let raw = await fetch('https://api.bdollar.fi/api/bdollar/get-pool-infos')
    let data = JSON.parse(await raw.text()).data

    const params = Contracts.BDOLLAR.Parameters

    for (const key in data.poolInfos) {
        if (key == 'Boardroom') {
            continue
        }
        showLoading()

        // calculations
        const rewardToken = Contracts.BDOLLAR[key].reward
        const stakingAddress = params[rewardToken].address
        const stakingAbi = params[rewardToken].abi
        const poolId = Contracts.BDOLLAR[key].index
        const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider.getSigner());
        const stakedTokenAddress = Contracts.BDOLLAR[key].address
        const stakedToken = new ethers.Contract(stakedTokenAddress, params.BEPToken.abi, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = Contracts.BDOLLAR[key].symbol
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let pendingHarvest
        if (rewardToken == 'BDO') {
            pendingHarvest = await STAKING_POOL.pendingBDO(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        } else if (rewardToken == 'sBDO') {
            pendingHarvest = await STAKING_POOL.pendingShare(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        }
        const claimFunc = async function() {
            return harvest(STAKING_POOL, poolId, App)
        }
        const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
        const userStaked = userInfo.amount / 10 ** decimal
        const tokenInfo = await getTokenInfo(stakingTokenTicker)
        const tokenPrice = tokenInfo.price
        const userStakedUsd = tokenPrice * userStaked
        const userStakedPct = userStakedUsd * 100 / parseFloat(data.poolInfos[key].tvl)

        const exitFunc = async function() {
            return exitFarming(STAKING_POOL, poolId, userInfo.amount, App)
        }
        const approveFunc = async function() {
            return approve(stakedToken, Contracts.BDOLLAR[key].address, stakedTokenBalance, App)
        }
        const revokeFunc = async function() {
            return revoke(stakedToken, Contracts.BDOLLAR[key].address, App)
        }
        const stakeFunc = async function() {
            return stake(STAKING_POOL, poolId, stakedTokenBalance, App)
        }
        const unstakeFunc = async function() {
            return unstake(STAKING_POOL, poolId, userInfo.amount, App)
        }

        // DISPLAY POOL INFORMATION

        _print(`${key}`)
        _print(`Total Value Locked: $${formatMoney(data.poolInfos[key].tvl)}`)
        _print(`${stakingTokenTicker} Price: $${parseFloat(tokenPrice).toFixed(2)}`)
        _print(`APY ${parseFloat(data.poolInfos[key].apy).toFixed(2)} %`)
        _print(`You are staking ${parseFloat(userStaked).toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
        if (userStaked > 0) {
            let dailyReward = parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 365),
                monthlyReward = parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 12),
                yearlyReward = parseFloat(userStakedUsd * data.poolInfos[key].apy / 100)
            _print(`Est earning: ` +
                `Daily ${parseFloat(dailyReward/ prices[rewardToken]).toFixed(2)} ${rewardToken}  ($${formatMoney(dailyReward)})  ` +
                `Monthly: ${parseFloat(monthlyReward / prices[rewardToken]).toFixed(2)} ${rewardToken} ($${formatMoney(monthlyReward)})  ` +
                `Yearly: ${parseFloat(yearlyReward / prices[rewardToken]).toFixed(2)} ${rewardToken} ($${formatMoney(yearlyReward)}) `)
        }
        _print_link(`Approve ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${Contracts.BDOLLAR[key].symbol}`, approveFunc)
        _print_link(`Stake ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(8)}  ${Contracts.BDOLLAR[key].symbol}`, stakeFunc)
        _print_link(`Unstake ${parseFloat(userStaked).toFixed(8)}  ${Contracts.BDOLLAR[key].symbol}`, unstakeFunc)
        _print_link(`Claim ${pendingHarvest.toFixed(8)} ${rewardToken}`, claimFunc)
        _print_link(`Revoke approval`, revokeFunc)
        _print_link(`Exit`, exitFunc)
        _print('-------------------------------------------------')
        _print('')
        hideLoading();
    }


    // BOARDROOM
    const sBDOAddress = '0x0d9319565be7f53CeFE84Ad201Be3f40feAE2740'
    const boardRoomKey = 'Boardroom'
    const boardRoomContract = new ethers.Contract(Contracts.BDOLLAR[boardRoomKey].address, Contracts.BDOLLAR[boardRoomKey].abi, App.provider.getSigner())
    const inRoomBalance = await boardRoomContract.balanceOf(App.YOUR_ADDRESS)
    const inBoardRoom = (inRoomBalance) / 10 ** 18
    const inBoardRoomUsd = parseFloat(sBDOTokenInfo.price) * parseFloat(inBoardRoom)
    const b = data.poolInfos[boardRoomKey]
    const boardRoomEarned = (await boardRoomContract.earned(App.YOUR_ADDRESS)) / 10 ** 18
    const sBDOContract = new ethers.Contract(sBDOAddress, Contracts.BDOLLAR.Parameters.BEPToken.abi, App.provider.getSigner())
    const sBDOBalance = await sBDOContract.balanceOf(App.YOUR_ADDRESS)

    const claimBoardRoomReward = async function() {
        return harvestBDOFromBoardRoom(boardRoomContract, App)
    }
    const exitBR = async function() {
        return exitBoardRoom(boardRoomContract, App)
    }
    const approveFunc = async function() {
        return approve(sBDOContract, Contracts.BDOLLAR[boardRoomKey].address, sBDOBalance, App)
    }
    const revokeFunc = async function() {
        return revoke(sBDOContract, Contracts.BDOLLAR[boardRoomKey].address, App)
    }
    const stakeFunc = async function() {
        return stakeBR(boardRoomContract, sBDOBalance, App)
    }
    const unstakeFunc = async function() {
        return unstakeBR(boardRoomContract, inBoardRoomBalance, App)
    }

    _print(`BOARD ROOM INFORMATION`)
    _print(`There are ${b.bsdsLocked} sBDO in boardroom`)
    _print(`Total Value Locked: $${formatMoney(b.tvl)}`)
    const apy = parseInt(parseFloat(b.apy) * 100)
    _print(`APY ${apy} %`)
    _print(`You are staking ${inBoardRoom.toFixed(2)} sBDO ($${formatMoney(inBoardRoomUsd)}) in boardroom, ${parseFloat(inBoardRoom*100/b.bsdsLocked).toFixed(2)}% of the pool`)
    if (inBoardRoom > 0) {
        let dailyReward = parseFloat(inBoardRoomUsd * apy / 100 / 365),
            monthlyReward = parseFloat(inBoardRoomUsd * apy / 100 / 12),
            yearlyReward = parseFloat(inBoardRoomUsd * apy / 100)

        _print(`Est earning: ` +
            `Daily ${parseFloat(dailyReward / prices['BDO']).toFixed(2)} BDO ($${formatMoney(dailyReward)})  ` +
            `Monthly:  ${parseFloat(monthlyReward / prices['BDO']).toFixed(2)} BDO ($${formatMoney(monthlyReward)})  ` +
            `Yearly: ${parseFloat(yearlyReward / prices['BDO']).toFixed(2)} BDO ($${formatMoney(yearlyReward)}) `)
    }

    _print_link(`Approve ${parseFloat(sBDOBalance / 10 ** 18).toFixed(2)} sBDO`, approveFunc)
    _print_link(`Stake ${parseFloat(sBDOBalance / 10 ** 18).toFixed(2)} sBDO`, stakeFunc)
    _print_link(`Unstake ${parseFloat(inBoardRoom).toFixed(2)}  sBDO`, unstakeFunc)
    _print_link(`Claim ${boardRoomEarned.toFixed(2)} BDO`, claimBoardRoomReward)
    _print_link(`Revoke approval`, revokeFunc)
    _print_link(`Exit`, exitBR)
}

const getTokenInfo = async (symbol) => {
    let raw = await fetch('https://api.bdollar.fi/api/bdollar/get-token-info?token=' + symbol)
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
const harvestBDOFromBoardRoom = async (contract, App) => {
    contract.claimReward({
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const exitBoardRoom = async (contract, App) => {
    contract.exit({
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

const stakeBR = async (contract, amount, App) => {
    contract.deposit(amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}

const unstakeBR = async (contract, amount, App) => {
    contract.withdraw(amount, {
            gasLimit: 250000
        })
        .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
            hideLoading();
        })
}
