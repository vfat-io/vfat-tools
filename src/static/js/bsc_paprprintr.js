$(function() {
    consoleInit(main)
});


async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const params = Contracts.PAPRPRINTR.Parameters

    const treasuryContract = new ethers.Contract(Contracts.PAPRPRINTR['TREASURY'].address, Contracts.PAPRPRINTR['TREASURY'].abi, App.provider.getSigner())

    const PAPRToken = new ethers.Contract(params['PAPR'].address, params.BEPToken.abi, App.provider.getSigner())
    const PAPR_balance = (await PAPRToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const PAPR_totalSupply = (await PAPRToken.totalSupply()) / 1e18;
    const PAPR_price = (await treasuryContract.getPaprPrice()) / 1e18;

    const PRNTRToken = new ethers.Contract(params['PRNTR'].address, params.BEPToken.abi, App.provider.getSigner())
    const PRNTR_balance = (await PRNTRToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const PRNTR_totalSupply = (await PRNTRToken.totalSupply()) / 1e18;

    const PRNTRPool = new ethers.Contract(Contracts.PAPRPRINTR.CakeLPPRNTRBUSD.address, Contracts.PAPRPRINTR.CakeLPPRNTRBUSD.abi, App.provider.getSigner())
    const PRNTR_reserves = (await PRNTRPool.getReserves());
    const PRNTR_price = (PRNTR_reserves['_reserve1'] / PRNTR_reserves['_reserve0'])

    /*const INKToken = new ethers.Contract(params['INK'].address, params.BEPToken.abi, App.provider.getSigner())
    const INK_balance = (await INKToken.balanceOf(App.YOUR_ADDRESS)) / 1e18;
    const INK_totalSupply = (await INKToken.totalSupply()) / 1e18;
    const INK_price = PAPR_price*PRNTR_price;*/

    let table = `<table style="width:400px"><tbody><tr>`
        +`<td style="width:100px"><img src="https://paprprintr.finance/images/dollarstack.png" style="height:64px"/></td>`
        +`<td style="width:300px">Total Supply: ${parseFloat(PAPR_totalSupply).toFixed(0)} PAPR`
        +`<br>Fully diluted marketcap: $${formatMoney(PAPR_price * PAPR_totalSupply)}`
        +`<br><b>Price: 1 PAPR = $${parseFloat(PAPR_price).toFixed(4)}</b>`
        +`<br>Your balance: <b>${parseFloat(PAPR_balance).toFixed(2)} PAPR = $${formatMoney(PAPR_balance*PAPR_price)}</b>`
        +`</td></tr></tbody></table>`;
    _print(table)

    table = `<table style="width:400px"><tbody><tr>`
        +`<td style="width:100px"><img src="https://paprprintr.finance/images/printer.png" style="height:64px"/></td>`
        +`<td style="width:300px">Total Supply: ${parseFloat(PRNTR_totalSupply).toFixed(0)} PRNTR`
        +`<br>Fully diluted marketcap: $${formatMoney(PRNTR_price * PRNTR_totalSupply)}`
        +`<br><b>Price: 1 PRNTR = $${parseFloat(PRNTR_price).toFixed(4)}</b>`
        +`<br>Your balance: <b>${parseFloat(PRNTR_balance).toFixed(2)} PRNTR =  $${formatMoney(PRNTR_balance*PRNTR_price)}</b>`
        +`</td></tr></tbody></table>`
    _print(table)

    _print('-------------------------------------------------')
    _print('')


    const prices = {
        PAPR: PAPR_price,
        PRNTR: PRNTR_price,
        INK: PAPR_price*PRNTR_price
    }

    // TREASURY
    const period = (await treasuryContract.PERIOD()) / 3600;
    const current_epoch = await treasuryContract.epoch();
    const bootstrap_epochs = await treasuryContract.BootstrapEpochs();
    const next_epoch = await treasuryContract.nextEpochPoint();
    const now = Math.floor(Date.now() / 1000);
    var seconds_until_next_epoch = next_epoch - now;
    var hours_until_next_epoch = Math.floor(seconds_until_next_epoch / 3600); seconds_until_next_epoch = seconds_until_next_epoch - hours_until_next_epoch * 3600;
    var minutes_until_next_epoch = Math.floor(seconds_until_next_epoch / 60); seconds_until_next_epoch = seconds_until_next_epoch - minutes_until_next_epoch * 60;
    const bonds_left = await treasuryContract.epochSupplyContractionLeft();
    const maxDebtRatioPercent = await treasuryContract.maxDeptRatioPercent();
    //const bonds_available_for_purchase = Math.round((PAPR_totalSupply * maxDebtRatioPercent /10000) - INK_totalSupply);

    _print(`TREASURY INFORMATION`)
    _print('')
    _print(`Epoch duration = ${period} hours`)
    _print(`Fixed expansion during bootstrap of ${bootstrap_epochs} epochs`)
    _print(`Current epoch = ${current_epoch}`)
    _print(`Next epoch in ${hours_until_next_epoch}h ${minutes_until_next_epoch}m ${seconds_until_next_epoch}s`)
    _print('-------------------------------------------------')
    _print('')
    _print(`POOLS INFORMATION`)
    _print('')

    let pools = ['PAPRBUSDPool','PRNTRBUSDPool'];
    for (const pool_nr in pools) {
        let key = pools[pool_nr];
        showLoading()

        // calculations
        const rewardToken = Contracts.PAPRPRINTR[key].reward
        const stakingAddress = params[rewardToken].address
        const stakingAbi = params[rewardToken].abi
        const poolId = Contracts.PAPRPRINTR[key].index

        const STAKING_POOL = new ethers.Contract(Contracts.PAPRPRINTR[key].address, Contracts.PAPRPRINTR[key].abi, App.provider.getSigner());
        const total_supply = await STAKING_POOL.totalTokens()/1e18;
        const disburseAmount = await STAKING_POOL.disburseAmount()/1e18;


        const share_per_year = (pool_nr==0) ? 50000 : 35000;
        var userAmount = await STAKING_POOL.depositedTokens(App.YOUR_ADDRESS) / 1e18;
        //var userRewardDebt = await STAKING_POOL.depositedTokens(App.YOUR_ADDRESS) / 1e18;
        var pendingReward = await STAKING_POOL.getEstimatedPendingDivs(App.YOUR_ADDRESS) / 1e18;

        const stakedTokenKey = Contracts.PAPRPRINTR[key].deposit
        const stakedTokenAddress = Contracts.PAPRPRINTR[stakedTokenKey].address
        const stakedToken = new ethers.Contract(stakedTokenAddress, Contracts.PAPRPRINTR[stakedTokenKey].abi, App.provider.getSigner())
        const decimal = await stakedToken.decimals()
        const stakingTokenTicker = Contracts.PAPRPRINTR[key].symbol
        const stakedTokenBalance = await stakedToken.balanceOf(App.YOUR_ADDRESS)
        let pendingHarvest = pendingReward // STAKING_POOL.pendingShare(poolId, App.YOUR_ADDRESS) / 10 ** decimal
        const claimFunc = async function() {
            return harvest(STAKING_POOL, poolId, App)
        }
        //const userInfo = await STAKING_POOL.userInfo(poolId, App.YOUR_ADDRESS)
        let userStaked = userAmount
        //const tokenInfo = await getTokenInfo(stakingTokenTicker)
        ///////////////////////////
        var pair_address = stakedTokenAddress;
        var pairContract = stakedToken;
        var token = (pool_nr==0) ? PAPRToken : PRNTRToken;
        var tokensInPool = (await token.balanceOf(pair_address))/ 1e18;
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
        var token_price = (Contracts.PAPRPRINTR[key].token0.toLowerCase() === rewardToken.toLowerCase()) ? PRNTR_price : PAPR_price;
        var busd_price = await getTokenPrice(params['BUSD'].coingecko);
        var pricePerLP = tokenPerLP * token_price + busdPerLP * busd_price;
        console.log('price per pancakeswap LP token = '+pricePerLP);
        const tokenPrice = pricePerLP;
///////////////////////////
        const userStakedUsd = tokenPrice * userStaked

        // DISPLAY POOL INFORMATION

        _print(`${key}`)
        _print(`Total supply: ${parseFloat(total_supply).toFixed(0)} liquidity pool tokens`)
        _print(`(Total Value Locked $${formatMoney(total_supply*tokenPrice)})`)
        _print(`Price: <b>1 LP token = $${parseFloat(tokenPrice).toFixed(4)}</b> = ${parseFloat(tokenPerLP).toFixed(7)} ${Contracts.PAPRPRINTR[key].token0} * $${formatMoney(token_price)} + ${parseFloat(busdPerLP).toFixed(4)} BUSD * $${formatMoney(busd_price)}`)

        let epochRewardsPerLP = share_per_year/365/4/(24/period)/total_supply;
        let apr = ((PRNTR_price * (disburseAmount * ((Contracts.PAPRPRINTR[key].token0.toLowerCase() === rewardToken.toLowerCase()) ? 1 : 1))) / (tokenPrice * total_supply)) * 100
        table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
            +`<tbody>`

            +`<tr><td>APR</td>`
            +`<td>${parseFloat(apr/365/(24/period)).toFixed(2)}%</td>`
            +`<td>${parseFloat(apr/365).toFixed(2)}%</td>`
            +`<td>${parseFloat(apr/52).toFixed(2)}%</td>`
            +`<td>${parseFloat(apr/12).toFixed(2)}%</td>`
            +`<td>${parseFloat(apr).toFixed(2)}%</td>`
            +`</tr>`
            +`<tr><td>PRNTR/LP</td>`
            +`<td>${parseFloat(epochRewardsPerLP).toFixed(2)} PRNTR/LP</td>`
            +`<td>${parseFloat(epochRewardsPerLP*(24/period)).toFixed(2)} PRNTR/LP</td>`
            +`<td>${parseFloat(epochRewardsPerLP*(24/period)*7).toFixed(2)} PRNTR/LP</td>`
            +`<td>${parseFloat(epochRewardsPerLP*(24/period)*365/12).toFixed(2)} PRNTR/LP</td>`
            +`<td>${parseFloat(epochRewardsPerLP*(24/period)*365).toFixed(2)} PRNTR/LP</td>`
            +`</tr>`

            +`<tr><td>Bank Yield for<br> <b>${userStaked.toFixed(4)} LP staked</b></td>`
            +`<td>${parseFloat(userStaked*epochRewardsPerLP).toFixed(2)} PRNTR ($${formatMoney(PRNTR_price*userStaked*epochRewardsPerLP)})</td>`
            +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)).toFixed(2)} PRNTR ($${formatMoney(PRNTR_price*userStaked*epochRewardsPerLP*(24/period))})</td>`
            +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*7).toFixed(2)} PRNTR ($${formatMoney(PRNTR_price*userStaked*epochRewardsPerLP*(24/period)*7)})</td>`
            +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*365/12).toFixed(2)} PRNTR ($${formatMoney(PRNTR_price*userStaked*epochRewardsPerLP*(24/period)*365/12)})</td>`
            +`<td>${parseFloat(userStaked*epochRewardsPerLP*(24/period)*365).toFixed(2)} PRNTR ($${formatMoney(PRNTR_price*userStaked*epochRewardsPerLP*(24/period)*365)})</td>`
            +`</tr>`
            +`</tbody></table>`;
        _print(table);

        _print(`You have staked <b>${parseFloat(userStaked).toFixed(4)} ${stakedTokenKey} ($${formatMoney(userStakedUsd)})</b> = ${parseFloat(tokenPerLP*userStaked).toFixed(6)} ${Contracts.PAPRPRINTR[key].token0} ($${parseFloat(tokenPerLP*userStaked*token_price).toFixed(5)}) + ${parseFloat(userStaked*busdPerLP).toFixed(4)} BUSD ($${parseFloat(userStaked*busdPerLP*busd_price).toFixed(5)})`)
        _print(`You can claim <b>${pendingHarvest.toFixed(4)} ${rewardToken} ($${formatMoney(pendingHarvest*PRNTR_price)})</b>`)

        _print('-------------------------------------------------')
        _print('')
        hideLoading();
    }

    // BOARDROOM
    const boardRoomKey = 'Boardroom'
    const boardRoomContract = new ethers.Contract(Contracts.PAPRPRINTR[boardRoomKey].address, Contracts.PAPRPRINTR[boardRoomKey].abi, App.provider.getSigner())
    const inRoomBalance = await boardRoomContract.balanceOf(App.YOUR_ADDRESS)
    const inBoardRoom = (inRoomBalance) / 10 ** 18
    const inBoardRoomUsd = parseFloat(PRNTR_price) * parseFloat(inBoardRoom)
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
    const apr = epochRewardsPerShare*(24/period)*365*PAPR_price *100 / PRNTR_price;

    _print(`BOARD ROOM INFORMATION`)
    _print('')
    _print(`There are ${parseFloat(boardRoomTotalSupply).toFixed(0)} PRNTR staked in the boardroom`);
    _print(`(Total Value Locked: $${formatMoney(boardRoomTotalSupply * PRNTR_price)})`)

    table = `<table style="width:800px"><thead><th style="width:30px;text-align:left"></th><th style="width:20px;text-align:left">Epoch (${period} hours)</th><th style="width:20px;text-align:left">Day</th><th style="width:20px;text-align:left">Week</th><th style="width:20px;text-align:left">Month</th><th style="width:20px;text-align:left">Year</th></thead>`
        +`<tbody>`

        +`<tr><td>APR</td>`
        +`<td>${parseFloat(apr/365/(24/period)).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/365).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/52).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr/12).toFixed(2)}%</td>`
        +`<td>${parseFloat(apr).toFixed(2)}%</td>`
        +`</tr>`

        +`<tr><td>PAPR/PRNTR</td>`
        +`<td>${parseFloat(epochRewardsPerShare).toFixed(2)} PAPR/PRNTR</td>`
        +`<td>${parseFloat(epochRewardsPerShare*(24/period)).toFixed(2)} PAPR/PRNTR</td>`
        +`<td>${parseFloat(epochRewardsPerShare*(24/period)*7).toFixed(2)} PAPR/PRNTR</td>`
        +`<td>${parseFloat(epochRewardsPerShare*(24/period)*365/12).toFixed(2)} PAPR/PRNTR</td>`
        +`<td>${parseFloat(epochRewardsPerShare*(24/period)*365).toFixed(2)} PAPR/PRNTR</td>`
        +`</tr>`

        +`<tr><td>Boardroom Yield for<br> <b>${inBoardRoom.toFixed(2)} PRNTR staked</b></td>`
        +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare).toFixed(2)} PAPR ($${formatMoney(PAPR_price*inBoardRoom*epochRewardsPerShare)})</td>`
        +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)).toFixed(2)} PAPR ($${formatMoney(PAPR_price*inBoardRoom*epochRewardsPerShare*(24/period))})</td>`
        +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*7).toFixed(2)} PAPR ($${formatMoney(PAPR_price*inBoardRoom*epochRewardsPerShare*(24/period)*7)})</td>`
        +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*365/12).toFixed(2)} PAPR ($${formatMoney(PAPR_price*inBoardRoom*epochRewardsPerShare*(24/period)*365/12)})</td>`
        +`<td>${parseFloat(inBoardRoom*epochRewardsPerShare*(24/period)*365).toFixed(2)} PAPR ($${formatMoney(PAPR_price*inBoardRoom*epochRewardsPerShare*(24/period)*365)})</td>`
        +`</tr>`

        +`</tbody></table>`;
    _print(table);

    _print(`You have staked <b>${parseFloat(inBoardRoom).toFixed(4)} PRNTR ($${formatMoney(PRNTR_price*inBoardRoom)})</b>`)
    if (epochs_since_last_action<3) {
        _print(`You have to wait ${3-epochs_since_last_action} more epochs to be able to claim rewards!`)
    }
    _print(`Your claimable rewards: <b>${parseFloat(boardRoomEarned).toFixed(2)} PAPR ($${formatMoney(boardRoomEarned * PAPR_price)})</b>`)
    if (epochs_since_last_action<6) {
        _print(`You have to wait ${6-epochs_since_last_action} more epochs to be able to unstake from boardroom!`)
    }
    _print('')
    hideLoading();
}

const getTokenPrice = async (symbol) => {
    let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd');
    let json = await raw.text();
    return JSON.parse(json)[symbol]['usd']
}

