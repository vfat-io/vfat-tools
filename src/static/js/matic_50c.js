$(function() {
  consoleInit(main)
  });
  
  async function main() {
      _print(' ')
      _print('-------------------------------------------------')
      _print(`TOKEN INFORMATION`)
      _print('-------------------------------------------------')

      const t50CTokenInfo = await getTokenInfo('50C')
      _print(`50C price $${formatMoney(t50CTokenInfo.price)}`)
      _print(`50C Circulating ${formatMoney(t50CTokenInfo.circulating, 0)}`)
      _print(`50C totalSupply ${formatMoney(t50CTokenInfo.totalSupply, 0)}`)
      _print(`Fully diluted marketcap: $${formatMoney(t50CTokenInfo.price * t50CTokenInfo.totalSupply, 0)}`)
      _print(' ')
  
      const t50KTokenInfo = await getTokenInfo('50K')
      _print(`50K price $${formatMoney(t50KTokenInfo.price)}`)
      _print(`50K Circulating ${formatMoney(t50KTokenInfo.circulating, 2)}`)
      _print(`50K totalSupply ${formatMoney(t50KTokenInfo.totalSupply, 2)}`)
      _print(`Fully diluted marketcap: $${formatMoney(t50KTokenInfo.price * t50KTokenInfo.totalSupply, 0)}`)
      _print(' ')
  
      // const t50BTokenInfo = await getTokenInfo('50B')
      // _print(`50B price $${formatMoney(t50BTokenInfo.price)}`)
      // _print(`50B totalSupply ${formatMoney(t50BTokenInfo.totalSupply, 0) ?? 0}`)
      // _print(' ')

      _print(' ')
      _print('-------------------------------------------------')
      _print(`POOLS INFORMATION`)
      _print('-------------------------------------------------')
      _print(' ')
  
      const App = await init_ethers();
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      const pools = await getPoolsInfo(App, t50CTokenInfo.price, t50KTokenInfo.price)

      for (let i = 0; i < pools.length; i++) {
        const pool = pools[i];

        _print(`${pool.name}:`)
        _print(`--Reward: ${pool.earnTokenName}`)
        _print(`--APR: ${formatMoney(pool.apr)}%`)
        _print(`--TVL: $${formatMoney(pool.valueLocked, 0)}`)
        _print(`--Your deposit: $${formatMoney(pool.yourDeposits, 2)}`)
        _print(' ')
      }

    hideLoading();
  }
  
  const getTokenInfo = async (symbol) => {
    try {
      let raw = await fetch(`https://50cent.network/api/stats/${symbol}`)
      return JSON.parse(await raw.text())
    } catch(e) {}
    return { price: "0", totalSupply: "0", circulating: "0" }
  }

  const getPoolsInfo = async (App, pricet50C, pricet50K) => {
    const ABI = [{name:'Approval',type:'event',anonymous:false,inputs:[{indexed:true,internalType:'address',name:'owner',type:'address'},{indexed:true,internalType:'address',name:'spender',type:'address'},{indexed:false,internalType:'uint256',name:'value',type:'uint256'},],},{anonymous:false,inputs:[{indexed:true,internalType:'address',name:'from',type:'address'},{indexed:true,internalType:'address',name:'to',type:'address'},{indexed:false,internalType:'uint256',name:'value',type:'uint256'},],name:'Transfer',type:'event',},{constant:true,inputs:[],name:'totalSupply',outputs:[{internalType:'uint256',name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',},{constant:true,inputs:[{internalType:'address',name:'account',type:'address'}],name:'balanceOf',outputs:[{internalType:'uint256',name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',},{constant:false,inputs:[{internalType:'address',name:'recipient',type:'address'},{internalType:'uint256',name:'amount',type:'uint256'},],name:'transfer',outputs:[{internalType:'bool',name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',},{constant:true,inputs:[{internalType:'address',name:'owner',type:'address'},{internalType:'address',name:'spender',type:'address'},],name:'allowance',outputs:[{internalType:'uint256',name:'',type:'uint256'}],payable:false,stateMutability:'view',type:'function',},{constant:false,inputs:[{internalType:'address',name:'spender',type:'address'},{internalType:'uint256',name:'amount',type:'uint256'},],name:'approve',outputs:[{internalType:'bool',name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',},{constant:false,inputs:[{internalType:'address',name:'sender',type:'address'},{internalType:'address',name:'recipient',type:'address'},{internalType:'uint256',name:'amount',type:'uint256'},],name:'transferFrom',outputs:[{internalType:'bool',name:'',type:'bool'}],payable:false,stateMutability:'nonpayable',type:'function',}]
    
    const tokens = {
      ['50C']: ['0x0102bbfDdFFBd8d28d3a1b9C47017F62F42768f2', 18, false],
      WMatic: ['0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', 18, false],
      USDC: ['0x2791bca1f2de4661ed88a30c99a7a9449aa84174', 6, false],
      WETH: ['0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, false],
      '50C-USDC': ['0x3f9AB5200e3e46FD31eFBE93A9b7A1Cb1a0a2a59', 18, true],
      '50C-WMatic': ['0xfba2f99e33ecdc7455d5702a8061c171e155a26d', 18, true],
      '50K-USDC': ['0xb9ff3d3470715edc6438f8a9a3c6f8fd4fedb751', 18, true]
    }

    const rewardContracts = {
      "t50CRewardPool": {
        "address": "0x3F8868c5A75Ae03498100774F73B10F80eBF44d4",
        "abi": [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_daoFundAddr","type":"address"},{"internalType":"uint256","name":"_daoFundDivRate","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_periodFinish","type":"uint256"},{"internalType":"uint256","name":"_endLockedBlock","type":"uint256"},{"internalType":"uint256[]","name":"_arrReleaseBlock","type":"uint256[]"},{"internalType":"uint256[]","name":"_arrPeriodReward","type":"uint256[]"},{"internalType":"uint256[]","name":"_arrRewardPerBlock","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_MONTH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_locks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrPeriodReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrReleaseBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"canUnlockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daoFundAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daoFundDivRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endLockedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getGeneratedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"lockOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_daoFundAddr","type":"address"}],"name":"setDAOFundAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      },
      "t50KRewardPool": {
        "address": "0x975601b1f21d3688EC853f25821Ce9DAd62c5E1d",
        "abi": [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_daoFundAddr","type":"address"},{"internalType":"uint256","name":"_daoFundDivRate","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_periodFinish","type":"uint256"},{"internalType":"uint256","name":"_endLockedBlock","type":"uint256"},{"internalType":"uint256[]","name":"_arrReleaseBlock","type":"uint256[]"},{"internalType":"uint256[]","name":"_arrPeriodReward","type":"uint256[]"},{"internalType":"uint256[]","name":"_arrRewardPerBlock","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BLOCKS_PER_MONTH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_locks","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardBlock","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrPeriodReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrReleaseBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"arrRewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"canUnlockAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentPeriod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daoFundAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"daoFundDivRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"endLockedBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getGeneratedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"lockOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockedRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_daoFundAddr","type":"address"}],"name":"setDAOFundAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalTransfer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      }
    }

    const pools = {
      t50CWMaticPool: {
        name: 'WMATIC Pool',
        contract: 't50CRewardPool',
        poolId: 0,
        depositTokenName: 'WMatic',
        depositTokenId: 'matic-network',
        earnTokenName: '50C',
        rewardPerYear: 366000,
      },
      t50CWETHPool: {
        name: 'WETH Pool',
        contract: 't50CRewardPool',
        poolId: 1,
        depositTokenName: 'WETH',
        depositTokenId: 'ethereum',
        earnTokenName: '50C',
        rewardPerYear: 366000,
      },
      t50CUSDCPool: {
        name: 'USDC Pool',
        contract: 't50CRewardPool',
        poolId: 2,
        depositTokenName: 'USDC',
        depositTokenId: 'usd-coin',
        earnTokenName: '50C',
        rewardPerYear: 366000,
      },
      t50CUSDCLPPool: {
        name: '50C-USDC Pool',
        contract: 't50CRewardPool',
        poolId: 3,
        depositTokenName: '50C-USDC',
        depositTokenId: 'usd-coin',
        earnTokenName: '50C',
        rewardPerYear: 3660000,
      },
      t50CWMatic50KPool: {
        name: '50C-WMatic Pool',
        contract: 't50KRewardPool',
        poolId: 0,
        depositTokenName: '50C-WMatic',
        depositTokenId: 'matic-network',
        earnTokenName: '50K',
        rewardPerYear: 120000,
      },
      t50KUSDC50KPool: {
        name: '50K-USDC Pool',
        contract: 't50KRewardPool',
        poolId: 1,
        depositTokenName: '50K-USDC',
        depositTokenId: 'usd-coin',
        earnTokenName: '50K',
        rewardPerYear: 50000,
      },
      t50C50KPool: {
        name: '50C Pool',
        contract: 't50KRewardPool',
        poolId: 2,
        depositTokenName: '50C',
        depositTokenId: '50C',
        earnTokenName: '50K',
        rewardPerYear: 30000,
      },
    }

    var contracts = {}
    var contractsToken = {}

    for (const key of Object.keys(rewardContracts)) {
      const rewardContract = rewardContracts[key];
      contracts[key] = await new ethers.Contract(rewardContract.address, rewardContract.abi, App.provider)
    }

    for (const key of Object.keys(tokens)) {
      const token = tokens[key];
      contractsToken[key] = await new ethers.Contract(token[0], ABI, App.provider)
    }
    
    try {
      const [t50CWMaticPool, t50CWETHPool, t50CUSDCPool, t50CUSDCLPPool, t50CWMatic50KPool, t50KUSDC50KPool, t50C50KPool] = await Promise.all([
        contractsToken.WMatic.balanceOf(rewardContracts.t50CRewardPool.address),
        contractsToken.WETH.balanceOf(rewardContracts.t50CRewardPool.address),
        contractsToken.USDC.balanceOf(rewardContracts.t50CRewardPool.address),
        contractsToken.USDC.balanceOf(tokens['50C-USDC'][0]),
        contractsToken.WMatic.balanceOf(tokens['50C-WMatic'][0]),
        contractsToken.USDC.balanceOf(tokens['50K-USDC'][0]),
        contractsToken['50C'].balanceOf(rewardContracts.t50KRewardPool.address)
      ])

      var poolsArr = []
      for (const key of Object.keys(pools)) {
        poolsArr.push(pools[key])
      }

      const raw = await fetch(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${poolsArr.filter(x => x.depositTokenId).map(x => x.depositTokenId).join(',')}`)
      const pricesRs = JSON.parse(await raw.text())

      if (raw.status !== 200) {
        return []
      }

      var result = []

      for (const key of Object.keys(pools)) {
        const pool = pools[key]
        let totalSupply = 0
        switch (pool.depositTokenName){
          case "50C-USDC":
            totalSupply = Number(t50CUSDCLPPool / 1e6) * 2
            break;
          case "50C-WMatic":
            totalSupply = Number(t50CWMatic50KPool / 1e18) * 2
            break;
          case "50K-USDC":
            totalSupply = Number(t50KUSDC50KPool / 1e6) * 2
            break;
          case "WMatic":
            totalSupply = Number(t50CWMaticPool / 1e18)
            break;
          case "WETH":
            totalSupply = Number(t50CWETHPool / 1e18)
            break;
          case "USDC":
            totalSupply = Number(t50CUSDCPool / 1e6)
            break;
          case "50C":
            totalSupply = Number(t50C50KPool / 1e18)
            break;
        }

        const tokenPriceInUsd = pool.depositTokenId === '50C'
          ? pricet50C
          : pricesRs[pool.depositTokenId] ? pricesRs[pool.depositTokenId].usd : -1

        const valueLocked = totalSupply * tokenPriceInUsd
        let apr = 0
        if (valueLocked > 0) {
          if (['50C', '50K'].includes(pool.earnTokenName)) {
            apr = pool.rewardPerYear * Number(pool.earnTokenName === '50C' ? pricet50C : pricet50K) * 100 / valueLocked
          }
        }

        
        let yourDeposits = 0
        
        const userDepAmountBN = (await contracts[pool.contract].userInfo(pool.poolId, App.YOUR_ADDRESS)).amount

        if (userDepAmountBN.gt(0)) {
          const decimal = tokens[pool.depositTokenName][1]
          const isLPToken = tokens[pool.depositTokenName][2]

          const depositedAmount = ethers.utils.formatUnits(userDepAmountBN, decimal)
          if (isLPToken) {
            const lpSupply = ethers.utils.formatUnits(await contractsToken[pool.depositTokenName].totalSupply(), decimal)
            const lpPrice = valueLocked / Number(lpSupply)
            yourDeposits = lpPrice * Number(depositedAmount)
          } else {
            yourDeposits = pricesRs[pool.depositTokenId]
              ? Number(depositedAmount) * pricesRs[pool.depositTokenId].usd
              : 0
          }
        }
        
        result.push({ 
          name: pool.name,
          earnTokenName: pool.earnTokenName,
          totalSupply: totalSupply,
          tokenPriceInUsd: tokenPriceInUsd,
          valueLocked: valueLocked,
          apr: apr,
          yourDeposits: yourDeposits
        })
      }
      return result
    } catch (e) {}

    return []
  }