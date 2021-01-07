$(function() {
    consoleInit();
    start(main);
});

async function main() {
    _print(`TOKEN INFORMATION`)
     const BDOTokenInfo = await getTokenInfo('BDO')  
    _print(`BDO price ${formatMoney(BDOTokenInfo.price)}`)
    _print(`BDO totalSupply ${BDOTokenInfo.totalSupply}`)
    _print(' ')

    const sBDOTokenInfo = await getTokenInfo('sBDO')
    _print(`sBDO price ${formatMoney(sBDOTokenInfo.price)}`)
    _print(`sBDO totalSupply ${sBDOTokenInfo.totalSupply}`)
    _print(' ')

    const bBDOTokenInfo = await getTokenInfo('bBDO')
    _print(`bBDO price ${formatMoney(bBDOTokenInfo.price)}`)
    _print(`bBDO totalSupply ${bBDOTokenInfo.totalSupply}`)
    _print('=======================')

    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
    
    const prices = {BDO: BDOTokenInfo.price, sBDO: sBDOTokenInfo.price, bBDO: bBDOTokenInfo.price}
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
	const stakedToken = new ethers.Contract(stakedTokenAddress, params.BEPToken.abi, App.provider)
	const decimal = await stakedToken.decimals()
	const stakingTokenTicker = Contracts.BDOLLAR[key].symbol
	let pendingHarvest
	if (rewardToken == 'BDO') { 
		pendingHarvest = await STAKING_POOL.pendingBDO(poolId, App.YOUR_ADDRESS) / 10 ** decimal
	} else if  (rewardToken == 'sBDO') {
		pendingHarvest = await STAKING_POOL.pendingShare(poolId, App.YOUR_ADDRESS) / 10 ** decimal
	}
	const claim = async function() {
        	return harvest(STAKING_POOL, poolId, App)
	}
	const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
	const userStaked = userInfo.amount / 10 ** decimal
	const exit = async function() {
                return exitFarming(STAKING_POOL, poolId, userInfo.amount, App)
        }
	const tokenInfo = await getTokenInfo(stakingTokenTicker)
	const tokenPrice = tokenInfo.price
	const userStakedUsd = tokenPrice * userStaked
	const userStakedPct = userStakedUsd * 100 / parseFloat(data.poolInfos[key].tvl)

	// DISPLAY POOL INFORMATION

	_print('Pool: ' + key)
	_print(`Total Value Locked: $${formatMoney(data.poolInfos[key].tvl)}`)
	_print(`${stakingTokenTicker} Price: $${parseFloat(tokenPrice).toFixed(2)}`)
	_print(`APY ${parseFloat(data.poolInfos[key].apy).toFixed(2)} %`)
	_print(`You are staking ${parseFloat(userStaked).toFixed(2)} ${stakingTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
   	if (userStaked > 0) {
                _print(`Est earning: Daily ${parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 365/ prices[rewardToken]).toFixed(2)} ${rewardToken}  ($${formatMoney(parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 365))})  Monthly: ${parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 12 / prices[rewardToken]).toFixed(2)} ${rewardToken} ($${formatMoney(parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / 12))})  Yearly: ${parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 / prices[rewardToken]).toFixed(2)} ${rewardToken} ($${formatMoney(parseFloat(userStakedUsd * data.poolInfos[key].apy / 100 ))}) `)
        }
	_print_link(`Claim ${pendingHarvest.toFixed(6)} ${rewardToken}`, claim)
    	_print_link(`Exit`, exit)
	_print(' ')
	hideLoading();
    }


	// BOARDROOM

	const boardRoomKey = 'Boardroom'
	const proxyBoardRoomContract = new ethers.Contract(Contracts.BDOLLAR[boardRoomKey].address, Contracts.BDOLLAR[boardRoomKey].abi, App.provider.getSigner())
	const inBoardRoom = (await proxyBoardRoomContract.balanceOf(App.YOUR_ADDRESS)) / 10 ** 18
	const inBoardRoomUsd = parseFloat(sBDOTokenInfo.price) * parseFloat(inBoardRoom)
	const b = data.poolInfos[boardRoomKey]
	const boardRoomEarned = (await proxyBoardRoomContract.earned(App.YOUR_ADDRESS)) / 10 ** 18
	const claimBoardRoomReward = async function() {
                return harvestBDO(proxyBoardRoomContract, App)
        }
	const exitBR = async function() {
                return exitBoardRoom(proxyBoardRoomContract, App)
        }


	_print(`Boardroom information`)
	_print(`There are ${b.bsdsLocked} sBDO in boardroom`)
	 _print(`Total Value Locked: $${formatMoney(b.tvl)}`)
	const apy = parseInt(parseFloat(b.apy)*100)
	_print(`APY ${apy} %`)
	_print(`You are staking ${inBoardRoom.toFixed(2)} sBDO ($${formatMoney(inBoardRoomUsd)}) in boardroom, ${parseFloat(inBoardRoom*100/b.bsdsLocked).toFixed(2)}% of the pool`)
	if (inBoardRoom > 0) {
                _print(`Est earning: Daily ${parseFloat(inBoardRoomUsd * apy / 100 / 365/ prices['BDO']).toFixed(2)} BDO ($${formatMoney(parseFloat(inBoardRoomUsd * apy / 100 / 365))})  Monthly:  ${parseFloat(inBoardRoomUsd * apy / 100 / 12 / prices['BDO']).toFixed(2)} BDO ($${formatMoney(parseFloat(inBoardRoomUsd * apy / 100 / 12))})  Yearly: ${parseFloat(inBoardRoomUsd * apy / 100 / prices['BDO']).toFixed(2)} BDO ($${formatMoney(parseFloat(inBoardRoomUsd * apy / 100 ))}) `)
        }
	_print_link(`Claim ${boardRoomEarned.toFixed(6)} BDO`, claimBoardRoomReward)
	_print_link(`Exit`, exitBR)
}

const getTokenInfo = async(symbol) => {
	let raw = await fetch('https://api.bdollar.fi/api/bdollar/get-token-info?token='+symbol)
	return JSON.parse(await raw.text()).data
}
const harvest = async(stakingContract, poolId, App) => {
	stakingContract.withdraw(poolId, 0, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading();
      })	
}

const exitFarming = async(stakingContract, poolId, amount, App) => {
        stakingContract.withdraw(poolId, amount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading();
      })
}
const harvestBDO = async(contract, App) => {
      contract.claimReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading();
      })
}

const exitBoardRoom = async(contract, App) => {
      contract.exit({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading();
      })
}
