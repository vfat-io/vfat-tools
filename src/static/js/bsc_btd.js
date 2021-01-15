$(function() {
    consoleInit();
    start(main);
});


async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const params = Contracts.BATDOLLAR.Parameters

    const BTDToken = new ethers.Contract(params['BTD'].address, params.BEPToken.abi, App.provider.getSigner())
    const BTD_balance = (await BTDToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const BTD_totalSupply = (await BTDToken.totalSupply()) / 1e18;
    const BTD_price = await getTokenPrice(params['BTD'].coingecko)

    const BTSToken = new ethers.Contract(params['BTS'].address, params.BEPToken.abi, App.provider.getSigner())
    const BTS_balance = (await BTSToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const BTS_totalSupply = (await BTSToken.totalSupply()) / 1e18;
    const BTS_price = await getTokenPrice(params['BTS'].coingecko)

    const BTBToken = new ethers.Contract(params['BTB'].address, params.BEPToken.abi, App.provider.getSigner())
    const BTB_balance = (await BTBToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const BTB_totalSupply = (await BTBToken.totalSupply()) / 1e18;
    const BTB_price = BTD_price*BTD_price;

    let table = `<table><tbody><tr>`
    +`<td style="width:40px"><img src="https://batdollar.fi/static/media/btd.2d4f5bd1.png"/></td>`
    +`<td>Total Supply: ${parseFloat(BTD_totalSupply).toFixed(0)} BTD`
    +`<br>Fully diluted marketcap: $${formatMoney(BTD_price * BTD_totalSupply)}`
    +`<br><b>Price: 1 BTD = $${parseFloat(BTD_price).toFixed(4)}</b>`
    +`<br>Your balance: <b>${parseFloat(BTD_balance).toFixed(2)} BTD = $${formatMoney(BTD_balance*BTD_price)}</b>`
    +`</td></tr></tbody></table>`;
    _print(table)

    table = `<table><tbody><tr>`
    +`<td style="width:40px"><img src="https://batdollar.fi/static/media/bts.e00e1ef9.png"/></td>`
    +`<td>Total Supply: ${parseFloat(BTS_totalSupply).toFixed(0)} BTS`
    +`<br>Fully diluted marketcap: $${formatMoney(BTS_price * BTS_totalSupply)}`
    +`<br><b>Price: 1 BTS = $${parseFloat(BTS_price).toFixed(4)}</b>`
    +`<br>Your balance: <b>${parseFloat(BTS_balance).toFixed(2)} BTS =  $${formatMoney(BTS_balance*BTS_price)}</b>`
    +`</td></tr></tbody></table>`
    _print(table)

    table = `<table><tbody><tr>`
    +`<td style="width:40px"><img src="https://batdollar.fi/static/media/btb.4beb344c.png"/></td>`
    +`<td>Total Supply: ${parseFloat(BTB_totalSupply).toFixed(0)} BTB`
    +`<br>Fully diluted marketcap: $${formatMoney(BTB_price * BTB_totalSupply)}`
    +`<br><b>Price: 1 BTB = $${parseFloat(BTB_price).toFixed(4)}</b>`
    +`<br>Your balance: <b>${parseFloat(BTB_balance).toFixed(2)} BTB =  $${formatMoney(BTB_balance*BTB_price)}</b>`
    +`</td></tr></tbody></table>`
    _print(table)

    _print('-------------------------------------------------')
    _print('')


    const prices = {
        BTD: BTD_price,
        BTS: BTS_price,
        BTB: BTD_price*BTD_price
    }

    // TREASURY
    const treasuryContract = new ethers.Contract(Contracts.BATDOLLAR['TREASURY'].address, Contracts.BATDOLLAR['TREASURY'].abi, App.provider.getSigner())
    const period = (await treasuryContract.PERIOD()) / 3600;
    const current_epoch = await treasuryContract.epoch();
    const bootstrap_epochs = await treasuryContract.bdoip01BootstrapEpochs();
    const next_epoch = await treasuryContract.nextEpochPoint();
    const now = Math.floor(Date.now() / 1000);
    var seconds_until_next_epoch = next_epoch - now;
    var hours_until_next_epoch = Math.floor(seconds_until_next_epoch / 3600); seconds_until_next_epoch = seconds_until_next_epoch - hours_until_next_epoch * 3600;
    var minutes_until_next_epoch = Math.floor(seconds_until_next_epoch / 60); seconds_until_next_epoch = seconds_until_next_epoch - minutes_until_next_epoch * 60;
    const bonds_left = await treasuryContract.epochSupplyContractionLeft();
    const maxDebtRatioPercent = await treasuryContract.maxDeptRatioPercent();
    const bonds_available_for_purchase = Math.round((BTD_totalSupply * maxDebtRatioPercent /10000) - BTB_totalSupply);
    
    _print(`TREASURY INFORMATION`)
    _print(`Epoch duration = ${period} hours`)
    _print(`Fixed expansion during bootstrap of ${bootstrap_epochs} epochs`)
    _print(`Current epoch = ${current_epoch}`)
    _print(`Next epoch in ${hours_until_next_epoch}h ${minutes_until_next_epoch}m ${seconds_until_next_epoch}s`)
    _print('')
    _print('BONDS')
    _print(`Bonds left this epoch: ${parseFloat(bonds_left/1e18).toFixed(0)} (without taking max debt ratio into account)`)
    _print(`Current debt ratio: ${parseFloat(BTB_totalSupply*100/BTD_totalSupply).toFixed(2)}% (Max debt ratio: ${parseFloat(maxDebtRatioPercent/100).toFixed(2)}%)`)    
    _print(`Bonds available for purchase this epoch: ${parseFloat(bonds_available_for_purchase/1e18).toFixed(0)}`)
    _print('-------------------------------------------------')
    _print('')

    let pools = ['BTDBUSDPool','BTSBUSDPool'];
    for (const pool_nr in pools) {
        let key = pools[pool_nr];
        showLoading()

        // calculations
        const rewardToken = Contracts.BATDOLLAR[key].reward
        const stakingAddress = params[rewardToken].address
        const stakingAbi = params[rewardToken].abi
        const poolId = Contracts.BATDOLLAR[key].index
        
        const STAKING_POOL = new ethers.Contract(Contracts.BATDOLLAR[key].address, Contracts.BATDOLLAR[key].abi, App.provider.getSigner());
        const total_supply = await STAKING_POOL.totalCirculating()/1e18;
        const blocks_per_week = await STAKING_POOL.BLOCKS_PER_WEEK();
        const share_per_block = await STAKING_POOL.sharePerBlock()/1e18;
        const share_per_year = share_per_block * blocks_per_week * 52;
//        const decrease_yield_at_block = await STAKING_POOL.periodFinish();
        const pool_info = await STAKING_POOL.poolInfo(poolId);
        const accSharePerShare = pool_info[3];
        const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS);
        var userAmount = userInfo[0] / 1e18;
        var userRewardDebt = userInfo[1] / 1e18;
        var pendingReward = (userAmount * accSharePerShare/1e18) - userRewardDebt;
        
        const stakedTokenKey = Contracts.BATDOLLAR[key].deposit
        const stakedTokenAddress = Contracts.BATDOLLAR[stakedTokenKey].address
        const stakedToken = new ethers.Contract(stakedTokenAddress, Contracts.BATDOLLAR[stakedTokenKey].abi, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = Contracts.BATDOLLAR[key].symbol
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let pendingHarvest = await STAKING_POOL.pendingShare(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        const claimFunc = async function() {
            return harvest(STAKING_POOL, poolId, App)
        }
        //const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
        const userStaked = userInfo.amount / 10 ** decimal
        //const tokenInfo = await getTokenInfo(stakingTokenTicker)

///////////////////////////
        var tokensInPool = userStaked / decimal;
        var pair_address = stakedTokenAddress;
        var pairContract = stakedToken;
        console.log('tokens in pancakeswap pool = '+tokensInPool);
        const busdContract = new ethers.Contract(params['BUSD'].address, params['BUSD'].abi, App.provider.getSigner())
        var busdInPool = (await busdContract.balanceOf(pair_address)) / 1e18;
        console.log('BUSD in pancakeswap pool = '+busdInPool);
        var totalLPtokens = (await pairContract.totalSupply()) / 1e18;
        console.log('total LP tokens in pancakeswap pool = '+totalLPtokens);
        // figure out balances and price per PANCAKESWAP LP token
        var tokenPerLP = tokensInPool / totalLPtokens;
                 console.log('tokens per pancakeswap LP token = '+tokenPerLP);
                 var busdPerLP = busdInPool / totalLPtokens;
                 console.log('BUSD per pancakeswap LP token = '+busdPerLP);
                 var token_price = await getTokenPrice(params[Contracts.BATDOLLAR[key].token0].coingecko);
                 var busd_price = await getTokenPrice(params['BUSD'].coingecko);
                 var pricePerLP = tokenPerLP * token_price + busdPerLP * busd_price;
                 console.log('price per pancakeswap LP token = '+pricePerLP);
        const tokenPrice = pricePerLP;
///////////////////////////

        const userStakedUsd = tokenPrice * userStaked

        const exitFunc = async function() {
            return exitFarming(STAKING_POOL, poolId, userInfo.amount, App)
        }
        const approveFunc = async function() {
            return approve(stakedToken, Contracts.BATDOLLAR[key].address, stakedTokenBalance, App)
        }
        const revokeFunc = async function() {
            return revoke(stakedToken, Contracts.BATDOLLAR[key].address, App)
        }
        const stakeFunc = async function() {
            return stake(STAKING_POOL, poolId, stakedTokenBalance, App)
        }
        const unstakeFunc = async function() {
            return unstake(STAKING_POOL, poolId, userInfo.amount, App)
        }

        // DISPLAY POOL INFORMATION

        _print(`${key}`)
        _print(`Total supply: ${parseFloat(total_supply).toFixed(0)} liquidity pool tokens`)
        _print(`(Total Value Locked $${formatMoney(total_supply*tokenPrice)})`)
        _print(`Price: <b>1 LP token = $${parseFloat(tokenPrice).toFixed(4)}</b> = ${parseFloat(tokenPerLP).toFixed(7)} ${Contracts.BATDOLLAR[key].token0} * $${formatMoney(token_price)} + ${parseFloat(busdPerLP).toFixed(4)} BUSD * $${formatMoney(busd_price)}`)
/*
        _print(`Total shares distributed per year = ${parseFloat(share_per_year).toFixed(0)} ($${formatMoney(share_per_year*BTS_price)})`)
        _print(`Total shares distributed per month = ${parseFloat(share_per_year/12).toFixed(0)} ($${formatMoney(share_per_year/12*BTS_price)})`)
        _print(`Total shares distributed per week = ${parseFloat(share_per_year/52).toFixed(0)} ($${formatMoney(share_per_year/52*BTS_price)})`)
        _print(`Total shares distributed per day = ${parseFloat(share_per_year/365).toFixed(0)} ($${formatMoney(share_per_year/365*BTS_price)})`)
        _print(`Total shares distributed per epoch = ${parseFloat(share_per_year/365/(24/period)).toFixed(0)} ($${formatMoney(share_per_year/365/(24/period)*BTS_price)})`)
*/        
        let epochRewardsPerLP = share_per_year/365/(24/period)/total_supply;
        let yourRewardPerEpoch = epochRewardsPerLP * userStaked;
        
        let apr = epochRewardsPerLP*(24/period)*365*BTS_price *100 / tokenPrice;
        table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
        +`<tbody>`
        
        +`<tr><td>APR</td>`
        +`<td>${parseFloat(apr/365/(24/period)).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/365).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/52).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/12).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr).toFixed(2)}%</td>`
        +`</tr>`
        
        +`<tr><td>BTS/LP</td>`
        +`<td>${parseFloat(epochRewardsPerLP).toFixed(2)} BTS/LP</td>`
        +`<td>${parseFloat(epochRewardsPerLP*(24/period)).toFixed(2)} BTS/LP</td>`
        +`<td>${parseFloat(epochRewardsPerLP*(24/period)*7).toFixed(2)} BTS/LP</td>`
        +`<td>${parseFloat(epochRewardsPerLP*(24/period)*365/12).toFixed(2)} BTS/LP</td>`
        +`<td>${parseFloat(epochRewardsPerLP*(24/period)*365).toFixed(2)} BTS/LP</td>`
        +`</tr>`

        +`<tr><td>Bank Yield for<br> <b>${userStaked.toFixed(4)} LP staked</b></td>`
        +`<td>${parseFloat(userStaked*epochRewardsPerLP).toFixed(2)} BTS ($${formatMoney(BTS_price*userStaked*epochRewardsPerLP)})</td>`
        +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)).toFixed(2)} BTS ($${formatMoney(BTS_price*userStaked*epochRewardsPerLP*(24/period))})</td>`
        +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*7).toFixed(2)} BTS ($${formatMoney(BTS_price*userStaked*epochRewardsPerLP*(24/period)*7)})</td>`
        +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*365/12).toFixed(2)} BTS ($${formatMoney(BTS_price*userStaked*epochRewardsPerLP*(24/period)*365/12)})</td>`
        +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*365).toFixed(2)} BTS ($${formatMoney(BTS_price*userStaked*epochRewardsPerLP*(24/period)*365)})</td>`
        +`</tr>`

        +`</tbody></table>`;
        _print(table);

        _print(`You have staked <b>${parseFloat(userStaked).toFixed(4)} ${stakedTokenKey} ($${formatMoney(userStakedUsd)})</b> = ${parseFloat(tokenPerLP*userStaked).toFixed(6)} ${Contracts.BATDOLLAR[key].token0} ($${parseFloat(tokenPerLP*userStaked*token_price).toFixed(5)}) + ${parseFloat(userStaked*busdPerLP).toFixed(4)} BUSD ($${parseFloat(userStaked*busdPerLP*busd_price).toFixed(5)})`)
        _print(`You can claim <b>${pendingHarvest.toFixed(4)} ${rewardToken} ($${formatMoney(pendingHarvest*BTS_price)})</b>`)
        
       
        _print('')
        _print_link(`Approve ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(4)}  ${Contracts.BATDOLLAR[stakingTokenTicker].symbol}`, approveFunc)
        _print_link(`Stake ${parseFloat(stakedTokenBalance / 10 ** decimal).toFixed(4)}  ${Contracts.BATDOLLAR[stakingTokenTicker].symbol}`, stakeFunc)
        _print_link(`Unstake ${parseFloat(userStaked).toFixed(4)}  ${Contracts.BATDOLLAR[stakingTokenTicker].symbol}`, unstakeFunc)
        _print_link(`Claim ${pendingHarvest.toFixed(4)} ${rewardToken}`, claimFunc)
        _print_link(`Revoke approval`, revokeFunc)
        _print_link(`Exit`, exitFunc)
        _print('-------------------------------------------------')
        _print('')
        hideLoading();
    }

    // BOARDROOM
    const boardRoomKey = 'Boardroom'
    const boardRoomContract = new ethers.Contract(Contracts.BATDOLLAR[boardRoomKey].address, Contracts.BATDOLLAR[boardRoomKey].abi, App.provider.getSigner())
    const inRoomBalance = await boardRoomContract.balanceOf(App.YOUR_ADDRESS)
    const inBoardRoom = (inRoomBalance) / 10 ** 18
    const inBoardRoomUsd = parseFloat(BTS_price) * parseFloat(inBoardRoom)
    const boardRoomEarned = (await boardRoomContract.earned(App.YOUR_ADDRESS)) / 10 ** 18
    const boardRoomTotalSupply = (await boardRoomContract.totalSupply()) / 10 ** 18
    const boardRoomRewardPerShare = (await boardRoomContract.rewardPerShare()) / 10 ** 18
    const latestSnapshotIndex = (await boardRoomContract.latestSnapshotIndex())
    const directors = await boardRoomContract.directors(App.YOUR_ADDRESS)
    const last_action_epoch = directors[0];
    const epochs_since_last_action = current_epoch - last_action_epoch;
    const lastHistory = (await boardRoomContract.boardHistory(latestSnapshotIndex));
    const lastRewardsPerShare = lastHistory[2];
    const lastRewardsReceived = lastHistory[1];
    const prevHistory = (await boardRoomContract.boardHistory(latestSnapshotIndex-1));
    const prevRewardsPerShare = prevHistory[2];
    const epochRewardsPerShare = (lastRewardsPerShare - prevRewardsPerShare) / 1e18;
    const apr = epochRewardsPerShare*(24/period)*365*BTD_price *100 / BTS_price;

    const claimBoardRoomReward = async function() {
        return harvestBTDFromBoardRoom(boardRoomContract, App)
    }
    const exitBR = async function() {
        return exitBoardRoom(boardRoomContract, App)
    }
    const approveFunc = async function() {
        return approve(BTSToken, Contracts.BATDOLLAR[boardRoomKey].address, Math.floor(BTS_balance * 1e18), App)
    }
    const revokeFunc = async function() {
        return revoke(BTSToken, Contracts.BATDOLLAR[boardRoomKey].address, App)
    }
    const stakeFunc = async function() {
        return stakeBR(boardRoomContract, Math.floor(BTS_balance * 1e18), App)
    }
    const unstakeFunc = async function() {
        return unstakeBR(boardRoomContract, inRoomBalance, App)
    }

    _print(`BOARD ROOM INFORMATION`)
    _print(`There are ${parseFloat(boardRoomTotalSupply).toFixed(0)} BTS staked in the boardroom`);
    _print(`(Total Value Locked: $${formatMoney(boardRoomTotalSupply * BTS_price)})`)
    
    table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
    +`<tbody>`
    
    +`<tr><td>APR</td>`
    +`<td>${parseFloat(apr/365/(24/period)).toFixed(2)}%</td>`
    +`<td>${parseFloat(apr/365).toFixed(2)}%</td>`
    +`<td>${parseFloat(apr/52).toFixed(2)}%</td>`
    +`<td>${parseFloat(apr/12).toFixed(2)}%</td>`
    +`<td>${parseFloat(apr).toFixed(2)}%</td>`
    +`</tr>`
    
    +`<tr><td>BTD/BTS</td>`
    +`<td>${parseFloat(epochRewardsPerShare).toFixed(2)} BTD/BTS</td>`
    +`<td>${parseFloat(epochRewardsPerShare*(24/period)).toFixed(2)} BTD/BTS</td>`
    +`<td>${parseFloat(epochRewardsPerShare*(24/period)*7).toFixed(2)} BTD/BTS</td>`
    +`<td>${parseFloat(epochRewardsPerShare*(24/period)*365/12).toFixed(2)} BTD/BTS</td>`
    +`<td>${parseFloat(epochRewardsPerShare*(24/period)*365).toFixed(2)} BTD/BTS</td>`
    +`</tr>`

    +`<tr><td>Boardroom Yield for<br> <b>${inBoardRoom.toFixed(2)} BTS staked</b></td>`
    +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare).toFixed(2)} BTD ($${formatMoney(BTD_price*inBoardRoom*epochRewardsPerShare)})</td>`
    +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)).toFixed(2)} BTD ($${formatMoney(BTD_price*inBoardRoom*epochRewardsPerShare*(24/period))})</td>`
    +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*7).toFixed(2)} BTD ($${formatMoney(BTD_price*inBoardRoom*epochRewardsPerShare*(24/period)*7)})</td>`
    +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*365/12).toFixed(2)} BTD ($${formatMoney(BTD_price*inBoardRoom*epochRewardsPerShare*(24/period)*365/12)})</td>`
    +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*365).toFixed(2)} BTD ($${formatMoney(BTD_price*inBoardRoom*epochRewardsPerShare*(24/period)*365)})</td>`
    +`</tr>`

    +`</tbody></table>`;
    _print(table);
    
    if (epochs_since_last_action<3) {
       _print(`You have to wait ${3-epochs_since_last_action} more epochs to be able to claim rewards!`)
    }
    _print(`Your claimable rewards: <b>${parseFloat(boardRoomEarned).toFixed(2)} BTD ($${formatMoney(boardRoomEarned * BTD_price)})</b>`)
    if (epochs_since_last_action<6) {
       _print(`You have to wait ${6-epochs_since_last_action} more epochs to be able to unstake from boardroom!`)
    }
    _print('')
    
    _print_link(`Approve ${parseFloat(BTS_balance).toFixed(2)} BTS`, approveFunc)
    _print_link(`Stake ${parseFloat(BTS_balance).toFixed(2)} BTS`, stakeFunc)
    _print_link(`Unstake ${parseFloat(inBoardRoom).toFixed(2)}  BTS`, unstakeFunc)
    _print_link(`Claim ${boardRoomEarned.toFixed(2)} BTD`, claimBoardRoomReward)
    _print_link(`Revoke approval`, revokeFunc)
    _print_link(`Exit`, exitBR)
    hideLoading();
}

const getTokenPrice = async (symbol) => {
    let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd');
    let json = await raw.text();
    return JSON.parse(json)[symbol]['usd']
}

const getCoinGeckoPrice = async function(tokenAddress) {
    let raw = await fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + tokenAddress + '&vs_currencies=usd');
    let json = await raw.text();
    return JSON.parse(json)[0]['usd']
}
   
const getTokenInfo = async (symbol) => {
    let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd');
    let json = await raw.text();
    return JSON.parse(json)[symbol]
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
const harvestBTDFromBoardRoom = async (contract, App) => {
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
    contract.stake(amount, {
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
