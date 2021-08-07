
$(function() {
consoleInit(main)
  });

//const PCAKE_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_Pcake","internalType":"contract PolyCake"},{"type":"address","name":"_devaddr","internalType":"address"},{"type":"address","name":"_feeAddress","internalType":"address"},{"type":"uint256","name":"_PcakePerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract PolyCake"}],"name":"Pcake","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"PcakePerBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IBEP20"},{"type":"uint16","name":"_depositFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"feeAddress","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingPcake","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IBEP20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"acccakePerShare","internalType":"uint256"},{"type":"uint16","name":"depositFeeBP","internalType":"uint16"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"uint16","name":"_depositFeeBP","internalType":"uint16"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeAddress","inputs":[{"type":"address","name":"_feeAddress","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_PcakePerBlock","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

const POLYWAVE_ABI = [{"inputs":[{"internalType":"uint256","name":"_distributorEndTimestamp","type":"uint256"},{"internalType":"uint256","name":"_farmingStartTimestamp","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"depositFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawFee","type":"uint256"},{"indexed":false,"internalType":"address","name":"extraSwapPath","type":"address"}],"name":"PoolCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PoolReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Reinvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_shares","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"},{"internalType":"uint256","name":"_withdrawFee","type":"uint256"},{"internalType":"address","name":"_extraSwapPath","type":"address"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allInfoFor","outputs":[{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"totalRewardsDistributed","type":"uint256"},{"internalType":"uint256","name":"rewardsRatePerDay","type":"uint256"},{"internalType":"uint256","name":"userMATIC","type":"uint256"},{"internalType":"address[]","name":"tokenAddresses","type":"address[]"},{"internalType":"address[]","name":"extraSwapPaths","type":"address[]"},{"internalType":"uint256[11][]","name":"compressedInfos","type":"uint256[11][]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimEverything","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentRatePerDay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositMATIC","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"indexOfToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"isUserInPool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"poolInfoFor","outputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"extraSwapPath","type":"address"},{"internalType":"uint256[11]","name":"compressedInfo","type":"uint256[11]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"reinvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reinvestEverything","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"rewardsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDistributed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateAllPools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"updateOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEverything","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const faketokenabi = [{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]



async function loadlinks(_address, _app, _index, _userdeposited, _deposittokensymbol, _deposittokenaddress, _userrewards, _depfee, _withdrawfee) {
  
  const exit = async () => contractExit(_address, _app, _index)
  const stake = async () => contractStake(_address, _app, _index, _deposittokenaddress)
  const claim = async () => contractClaim(_address, _app, _index)
  const reinvest = async () => contractReinvest(_address, _app, _index)

  const _signer = _app.provider.getSigner()
  const deptoken = new ethers.Contract(_deposittokenaddress, faketokenabi, _signer)
  const deptokenbalance = await deptoken.balanceOf(_app.YOUR_ADDRESS)


  if (_deposittokenaddress.toLowerCase() == '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' || _deposittokenaddress.toLowerCase() == '0xc2132d05d31c914a87c6611c10748aeb04b58e8f') {
    _print_link(`Stake ${deptokenbalance / 1e6} ${_deposittokensymbol} - Fee ${(_depfee / 1e18).toFixed(2)}%`, stake)
    _print_link(`Unstake ${_userdeposited / 1e6} ${_deposittokensymbol} - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, exit)
    _print_link(`Claim ${_userrewards / 1e18} WAVE - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, claim)
    _print_link(`Reinvest ${_userrewards / 1e18} WAVE`, reinvest)
    _print(`Note: Reinvesting will deposit your rewards to WAVE staking pool and the WAVE pool deposit fee is applied.`)
  }
  else if (_deposittokenaddress.toLowerCase() == '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' || _deposittokenaddress.toLowerCase() == '0xf84bd51eab957c2e7b7d646a3427c5a50848281d') {   
    _print_link(`Stake ${deptokenbalance / 1e8} ${_deposittokensymbol} - Fee ${(_depfee / 1e18).toFixed(2)}%`, stake)
    _print_link(`Unstake ${_userdeposited / 1e8} ${_deposittokensymbol} - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, exit)
    _print_link(`Claim ${_userrewards / 1e18} WAVE - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, claim)
    _print_link(`Reinvest ${_userrewards / 1e18} WAVE`, reinvest)
    _print(`Note: Reinvesting will deposit your rewards to WAVE staking pool and the WAVE pool deposit fee is applied.`)
  }
  else {
    _print_link(`Stake ${deptokenbalance / 1e18} ${_deposittokensymbol} - Fee ${(_depfee / 1e18).toFixed(2)}%`, stake)
    _print_link(`Unstake ${_userdeposited / 1e18} ${_deposittokensymbol} - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, exit)
    _print_link(`Claim ${_userrewards / 1e18} WAVE - Fee ${(_withdrawfee / 1e18).toFixed(2)}%`, claim)
    _print_link(`Reinvest ${_userrewards / 1e18} WAVE`, reinvest)
    _print(`Note: Reinvesting will deposit your rewards to WAVE staking pool and the WAVE pool deposit fee is applied.`)
  }

  
}


async function main() {
    const App = await init_ethers();
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const POLYWAVE_ADDRESS = '0x8896B0E97D0BA384029FA0bDd8e35df6AC20803D'
    const rewardTokenTicker = 'WAVE'
    const waveContract = new ethers.Contract(POLYWAVE_ADDRESS, POLYWAVE_ABI, App.provider)

    let theindex = 0
    

    const prices = await getMaticPrices();
    Object.keys(prices).map(key => {
      if(key.toLowerCase() != key){
        prices[key.toLowerCase()] = prices[key];
        delete prices[key];
      }
    });
    const waveprice = prices['0x4de7fea447b837d7e77848a4b6c0662a64a84e14'.toLocaleLowerCase()]
    //console.log(waveprice)
    const totalwaveperday = await waveContract.currentRatePerDay()

    const waveCustomFarmBigBrainz = async () => {
      const allInfo = await waveContract.allInfoFor(App.YOUR_ADDRESS)
      let totalShares = 0
      for (let i of allInfo.compressedInfos) { totalShares = totalShares + parseInt(i[0]) }
      //console.log(allInfo)
      const poolinfo = []
      //allInfo.tokenAddresses.forEach(async (address, index) => {
      for (let i=0; i < allInfo.tokenAddresses.length; i++) {
        const deptokenContract = new ethers.Contract(allInfo.tokenAddresses[i], faketokenabi, App.provider)
        const deptokensymbol = await deptokenContract.symbol()
        //console.log(allInfo.tokenAddresses[i])
        //console.log(deptokensymbol)
        //console.log(totalShares)
        poolinfo.push({
          deptokencontract: deptokenContract,
          poolshares: allInfo.compressedInfos[i][0],
          deposittokenaddress: allInfo.tokenAddresses[i].toLowerCase(),
          deposittokensymbol: deptokensymbol,
          deptokenprice: allInfo.compressedInfos[i][5] * 1e18 / allInfo.compressedInfos[4][5],  //allInfo.compressedInfos[i][5],
          waveperday: totalwaveperday * parseInt(allInfo.compressedInfos[i][0]) / parseInt(totalShares),
          totaldeposited: allInfo.compressedInfos[i][3],
          rewardtokensymbol: "WAVE",
          userdeposited: allInfo.compressedInfos[i][7],
          userrewards: allInfo.compressedInfos[i][8],
          decimals: parseInt(allInfo.compressedInfos[I][6]),
          depfee: allInfo.compressedInfos[i][1],
          withdrawfee: allInfo.compressedInfos[i][2],
        })
      } //)
      //console.log(poolinfo)
//      let theindex = 0
      for (const i of poolinfo) {
        if (i.deposittokensymbol.includes("UNI-V2")) {
          const token0 = await i.deptokencontract.token0()
          const token1 = await i.deptokencontract.token1()
          const t0 = new ethers.Contract(token0, faketokenabi, App.provider)
          const t1 = new ethers.Contract(token1, faketokenabi, App.provider)
          const t0symbol = await t0.symbol()
          const t1symbol = await t1.symbol()
          _print(`${theindex} - <a href="https://info.quickswap.exchange/pair/${i.deposittokenaddress}">[${t0symbol}-[${t1symbol}] Quickswap LP</a> <a href="https://quickswap.exchange/#/add/${token0}/${token1}">[+]</a> <a href="https://quickswap.exchange/#/remove/${token0}/${token1}">[-]</a> <a href="https://quickswap.exchange/#/swap?inputCurrency=${token0}&outputCurrency=${token1}">[<=>]</a> Price: $${ (i.deptokenprice / 1e18).toFixed(2) } TVL: $${ ((i.deptokenprice / 1e18) * (i.totaldeposited / 1e18)).toFixed(2) } `)
        } else {
          _print(`${theindex} - <a href="https://polygonscan.com/address/${i.deposittokenaddress}">${i.deposittokensymbol}</a>  Price: $${ (i.deptokenprice / 1e18).toFixed(2) } TVL: $${ ((i.deptokenprice / 1e18) * (i.totaldeposited / 1e18) * 10 ** (18 - i.decimals)).toFixed(2) }`)
        }
        _print(`${i.deposittokensymbol} Price: $${(i.deptokenprice / 1e18).toFixed(2) }`)
        _print(`WAVE Price: $${waveprice.usd}`)


        if (i.deposittokenaddress.toLowerCase() == '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' || i.deposittokenaddress.toLowerCase() == '0xc2132d05d31c914a87c6611c10748aeb04b58e8f') {
          _print(`Staked: ${(i.totaldeposited / 1e6).toFixed(2)} ${i.deposittokensymbol}`)
        }
        else if (i.deposittokenaddress.toLowerCase() == '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' || i.deposittokenaddress.toLowerCase() == '0xf84bd51eab957c2e7b7d646a3427c5a50848281d') {   
          _print(`Staked: ${(i.totaldeposited / 1e8).toFixed(2)} ${i.deposittokensymbol}`)
        }
        else {
          _print(`Staked: ${(i.totaldeposited / 1e18).toFixed(2)} ${i.deposittokensymbol}`)
        }
        
        
        _print(`WAVE Per Day: ${ (i.waveperday / 1e18).toFixed(2) }`)
        
        if (i.deposittokenaddress.toLowerCase() == '0x2791bca1f2de4661ed88a30c99a7a9449aa84174' || i.deposittokenaddress.toLowerCase() == '0xc2132d05d31c914a87c6611c10748aeb04b58e8f') {
          const apr = (36500 * (i.waveperday / 1e18) * waveprice.usd) / ((i.totaldeposited / 1e6 ) * (i.deptokenprice / 1e18))
          _print(`APR: Day ${(apr / 365).toFixed(2)}% Week ${(apr / 52).toFixed(2)}% Year ${apr.toFixed(2)}%`)
        }
        else if (i.deposittokenaddress.toLowerCase() == '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6' || i.deposittokenaddress.toLowerCase() == '0xf84bd51eab957c2e7b7d646a3427c5a50848281d') {   
        const apr = (36500 * (i.waveperday / 1e18) * waveprice.usd) / ((i.totaldeposited / 1e8 ) * (i.deptokenprice / 1e18))
          _print(`APR: Day ${(apr / 365).toFixed(2)}% Week ${(apr / 52).toFixed(2)}% Year ${apr.toFixed(2)}%`)
        }
        else {
          const apr = (36500 * (i.waveperday / 1e18) * waveprice.usd) / ((i.totaldeposited / 1e18 ) * (i.deptokenprice / 1e18))
          _print(`APR: Day ${(apr / 365).toFixed(2)}% Week ${(apr / 52).toFixed(2)}% Year ${apr.toFixed(2)}%`)
        }
        

        
        await loadlinks(POLYWAVE_ADDRESS, App, theindex, i.userdeposited, i.deposittokensymbol, i.deposittokenaddress, i.userrewards, i.depfee, i.withdrawfee)

        _print('') 
        theindex++
      }
      
    }
    await waveCustomFarmBigBrainz()


    hideLoading();
  }



const contractExit = async (_address, _app, _index) => {
  const signer = _app.provider.getSigner()
  const REWARD_POOL = new ethers.Contract(_address, POLYWAVE_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.rewardsOf(_app.YOUR_ADDRESS, _index)
  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.withdrawAll(_index, {gasLimit: 250000})
      .then(function(t) {
        return _app.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}



const contractStake = async (_address, _app, _index, _deptokenaddress) => {
  const signer = _app.provider.getSigner()
  const REWARD_POOL = new ethers.Contract(_address, POLYWAVE_ABI, signer)
  const deptoken = new ethers.Contract(_deptokenaddress, faketokenabi, signer)
  const currentBalance = await deptoken.balanceOf(_app.YOUR_ADDRESS)

  const allowance = await deptoken.allowance(_app.YOUR_ADDRESS, _address)

  if (currentBalance > 0) {
    if ( (allowance - currentBalance) <= 0 ) {
      showLoading()
      const tx = await deptoken.connect(signer).approve(_address, ethers.constants.MaxUint256)
      await tx.wait();
    }

    showLoading()
    REWARD_POOL.deposit(_index, currentBalance, {gasLimit: 1000000})
      .then(function(t) {
        return _app.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}


const contractClaim = async (_address, _app, _index) => {
  const signer = _app.provider.getSigner()
  const REWARD_POOL = new ethers.Contract(_address, POLYWAVE_ABI, signer)
  if (currentBalance > 0) {
    showLoading()
    REWARD_POOL.claim(_index, {gasLimit: 250000})
      .then(function(t) {
        return _app.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}


const contractReinvest = async (_address, _app, _index) => {
  const signer = _app.provider.getSigner()
  const REWARD_POOL = new ethers.Contract(_address, POLYWAVE_ABI, signer)
  if (currentBalance > 0) {
    showLoading()
    REWARD_POOL.reinvest(_index, {gasLimit: 250000})
      .then(function(t) {
        return _app.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}
