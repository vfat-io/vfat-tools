
$(function() {
consoleInit(main)
  });

const TRI_CHEF_ABI = [{"inputs":[{"internalType":"contract Tri","name":"_tri","type":"address"},{"internalType":"uint256","name":"_triPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IERC20","name":"lpToken","type":"address"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"}],"name":"LogPoolAddition","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IRewarder","name":"rewarder","type":"address"},{"indexed":false,"internalType":"bool","name":"overwrite","type":"bool"}],"name":"LogSetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lpSupply","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accSushiPerShare","type":"uint256"}],"name":"LogUpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"harvest","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingTri","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accTriPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewarder","outputs":[{"internalType":"contract IRewarder","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"contract IRewarder","name":"_rewarder","type":"address"},{"internalType":"bool","name":"overwrite","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tri","outputs":[{"internalType":"contract Tri","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"triPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_triPerBlock","type":"uint256"}],"name":"updateTriPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const TRI_CHEF_ABI_V2 = [
  {
  "inputs": [
  {
  "internalType": "contract IMasterChef",
  "name": "_MASTER_CHEF",
  "type": "address"
  },
  {
  "internalType": "contract IERC20",
  "name": "_tri",
  "type": "address"
  },
  {
  "internalType": "uint256",
  "name": "_MASTER_PID",
  "type": "uint256"
  }
  ],
  "stateMutability": "nonpayable",
  "type": "constructor"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "user",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "Deposit",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "user",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "EmergencyWithdraw",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "user",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  }
  ],
  "name": "Harvest",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [],
  "name": "LogInit",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "allocPoint",
  "type": "uint256"
  },
  {
  "indexed": true,
  "internalType": "contract IERC20",
  "name": "lpToken",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "contract IRewarder",
  "name": "rewarder",
  "type": "address"
  }
  ],
  "name": "LogPoolAddition",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "allocPoint",
  "type": "uint256"
  },
  {
  "indexed": true,
  "internalType": "contract IRewarder",
  "name": "rewarder",
  "type": "address"
  },
  {
  "indexed": false,
  "internalType": "bool",
  "name": "overwrite",
  "type": "bool"
  }
  ],
  "name": "LogSetPool",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint64",
  "name": "lastRewardBlock",
  "type": "uint64"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "lpSupply",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "accTriPerShare",
  "type": "uint256"
  }
  ],
  "name": "LogUpdatePool",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "previousOwner",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "newOwner",
  "type": "address"
  }
  ],
  "name": "OwnershipTransferred",
  "type": "event"
  },
  {
  "anonymous": false,
  "inputs": [
  {
  "indexed": true,
  "internalType": "address",
  "name": "user",
  "type": "address"
  },
  {
  "indexed": true,
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "indexed": false,
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "indexed": true,
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "Withdraw",
  "type": "event"
  },
  {
  "inputs": [],
  "name": "MASTER_CHEF",
  "outputs": [
  {
  "internalType": "contract IMasterChef",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "MASTER_PID",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "TRI",
  "outputs": [
  {
  "internalType": "contract IERC20",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "allocPoint",
  "type": "uint256"
  },
  {
  "internalType": "contract IERC20",
  "name": "_lpToken",
  "type": "address"
  },
  {
  "internalType": "contract IRewarder",
  "name": "_rewarder",
  "type": "address"
  }
  ],
  "name": "add",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "deposit",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "emergencyWithdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "harvest",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "harvestFromMasterChef",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "contract IERC20",
  "name": "dummyToken",
  "type": "address"
  }
  ],
  "name": "init",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "lpToken",
  "outputs": [
  {
  "internalType": "contract IERC20",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256[]",
  "name": "pids",
  "type": "uint256[]"
  }
  ],
  "name": "massUpdatePools",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "owner",
  "outputs": [
  {
  "internalType": "address",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "_pid",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "_user",
  "type": "address"
  }
  ],
  "name": "pendingTri",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "pending",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "poolInfo",
  "outputs": [
  {
  "internalType": "uint128",
  "name": "accTriPerShare",
  "type": "uint128"
  },
  {
  "internalType": "uint64",
  "name": "lastRewardBlock",
  "type": "uint64"
  },
  {
  "internalType": "uint64",
  "name": "allocPoint",
  "type": "uint64"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "poolLength",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "pools",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "name": "rewarder",
  "outputs": [
  {
  "internalType": "contract IRewarder",
  "name": "",
  "type": "address"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "_pid",
  "type": "uint256"
  },
  {
  "internalType": "uint256",
  "name": "_allocPoint",
  "type": "uint256"
  },
  {
  "internalType": "contract IRewarder",
  "name": "_rewarder",
  "type": "address"
  },
  {
  "internalType": "bool",
  "name": "overwrite",
  "type": "bool"
  }
  ],
  "name": "set",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "totalAllocPoint",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "address",
  "name": "newOwner",
  "type": "address"
  }
  ],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [],
  "name": "triPerBlock",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  }
  ],
  "name": "updatePool",
  "outputs": [
  {
  "components": [
  {
  "internalType": "uint128",
  "name": "accTriPerShare",
  "type": "uint128"
  },
  {
  "internalType": "uint64",
  "name": "lastRewardBlock",
  "type": "uint64"
  },
  {
  "internalType": "uint64",
  "name": "allocPoint",
  "type": "uint64"
  }
  ],
  "internalType": "struct MasterChefV2.PoolInfo",
  "name": "pool",
  "type": "tuple"
  }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "",
  "type": "address"
  }
  ],
  "name": "userInfo",
  "outputs": [
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "internalType": "int256",
  "name": "rewardDebt",
  "type": "int256"
  }
  ],
  "stateMutability": "view",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  },
  {
  "inputs": [
  {
  "internalType": "uint256",
  "name": "pid",
  "type": "uint256"
  },
  {
  "internalType": "uint256",
  "name": "amount",
  "type": "uint256"
  },
  {
  "internalType": "address",
  "name": "to",
  "type": "address"
  }
  ],
  "name": "withdrawAndHarvest",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
  }
]
async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const TRI_CHEF_ADDR = "0x1f1Ed214bef5E83D8f5d0eB5D7011EB965D0D79B";
   const TRI_CHEF_ADDR_V2 = "0x3838956710bcc9D122Dd23863a0549ca8D5675D6";
   const rewardTokenTicker = "TRI";
   const TRI_CHEF = new ethers.Contract(TRI_CHEF_ADDR, TRI_CHEF_ABI, App.provider);
   const TRI_CHEF_V2 = new ethers.Contract(TRI_CHEF_ADDR_V2, TRI_CHEF_ABI_V2, App.provider);

   const currentBlock = await App.provider.getBlockNumber();

   const multiplier = await TRI_CHEF.getMultiplier(currentBlock, currentBlock+1)

   const rewardsPerWeek = await TRI_CHEF.triPerBlock() /1e18
        * multiplier * 604800 / 1.1;
   const rewardsPerWeekV2 = await TRI_CHEF_V2.triPerBlock() /1e18
        * 604800 / 1.1;

    const tokens = {};
    const prices = await getAuroraPrices();

    await loadTriV2ChefContract(App, tokens, prices, TRI_CHEF_V2, TRI_CHEF_ADDR_V2, TRI_CHEF_ABI_V2, rewardTokenTicker,
       "TRI", null, rewardsPerWeekV2, "pendingTri");

    _print("");

    await loadTriChefContract(App, tokens, prices, TRI_CHEF, TRI_CHEF_ADDR, TRI_CHEF_ABI, rewardTokenTicker,
        null, rewardsPerWeek, "pendingTri");

    hideLoading();
  }

async function loadTriV2ChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
      rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://aurorascan.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    _print(`Showing incentivized pools only.\n`);
  
    const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
    const rewardToken = await getAuroraToken(App, rewardTokenAddress, chefAddress);
    const rewardsPerWeek = rewardsPerWeekFixed ??
      await chefContract.callStatic[rewardsPerBlockFunction]()
      / 10 ** rewardToken.decimals * 604800 / 13.5
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
      try {
        return await getTriV2PoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction);
      }
      catch (ex) {
        console.log(`Error loading pool ${x}: ${ex}`);
        return null;
      }
    }));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens).concat([rewardTokenAddress]));
  
    await Promise.all(tokenAddresses.map(async (address) => {
        tokens[address] = await getAuroraToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
                       .map(poolInfo =>
        poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        if(!poolInfos[i].rewarderRewardsPerWeek){
          const apr = printTriV2NormalPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, "eth", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
          aprs.push(apr);
        }else{
          const apr = printRewarderPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
            totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
            pendingRewardsFunction, null, "eth", poolInfos[i].rewarderRewardsPerWeek,
            poolInfos[i].rewarderTicker, poolInfos[i].rewarderTokenAddress, poolInfos[i].pendingRewarderTokens)
          aprs.push(apr);
        }
      }
    }
    let totalUserStaked=0, totalStaked=0, averageApr=0;
    for (const a of aprs) {
      if (a && !isNaN(a.totalStakedUsd)) {
        totalStaked += a.totalStakedUsd;
      }
      if (a && a.userStakedUsd > 0) {
        totalUserStaked += a.userStakedUsd;
        averageApr += a.userStakedUsd * a.yearlyAPR / 100;
      }
    }
    averageApr = averageApr / totalUserStaked;
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
      _print(`Estimated earnings:`
          + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
          + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
          + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  }
  
  async function getTriV2PoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    const lpToken = await chefContract.lpToken(poolIndex);
    if (poolInfo.allocPoint == 0) {
      return {
        address: lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
      };
    }
    const rewarder = await chefContract.rewarder(poolIndex);
    if(rewarder == "0x0000000000000000000000000000000000000000"){
      const poolToken = await getAuroraToken(app, lpToken, chefAddress);
      const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
      const pendingRewardTokens = await chefContract.pendingTri(poolIndex, app.YOUR_ADDRESS);
      const staked = userInfo.amount / 10 ** poolToken.decimals;
      return {
          address : lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: poolToken,
          userStaked : staked,
          pendingRewardTokens : pendingRewardTokens / 10 ** 18,
          depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
          withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
      };
    }else{
      const poolToken = await getAuroraToken(app, lpToken, chefAddress);
      const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
      const pendingRewardTokens = await chefContract.pendingTri(poolIndex, app.YOUR_ADDRESS);
      const staked = userInfo.amount / 10 ** poolToken.decimals;
      const REWARDER_TRIV2_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"},{"internalType":"contract IMasterChefV2","name":"_mcv2","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldAllocPoint","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newAllocPoint","type":"uint256"}],"name":"AllocPointUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OnReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newRate","type":"uint256"}],"name":"RewardRateUpdated","type":"event"},{"inputs":[],"name":"MCV2","outputs":[{"internalType":"contract IMasterChefV2","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"_lpAmount","type":"uint256"}],"name":"onTriReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingTokens","outputs":[{"internalType":"contract IERC20[]","name":"rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"rewardAmounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"to","type":"address"}],"name":"reclaimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenPerBlock","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[{"components":[{"internalType":"uint256","name":"accTokenPerShare","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"}],"internalType":"struct ComplexRewarder.PoolInfo","name":"pool","type":"tuple"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]
      const rewarderContract = new ethers.Contract(rewarder, REWARDER_TRIV2_CHEF_ABI, app.provider);
      const rewarderTokenAddress = await rewarderContract.rewardToken();
      const rewarderToken = await getAuroraToken(app, rewarderTokenAddress, chefAddress);
      const pendingRewarderTokens = await rewarderContract.pendingTokens(poolIndex, app.YOUR_ADDRESS, pendingRewardTokens / 1e18)
      const rewarderRewardsPerSecond = await rewarderContract.tokenPerBlock() / 10 ** rewarderToken.decimals;
      const rewarderRewardsPerWeek = rewarderRewardsPerSecond * 604800;
      return {
          address : lpToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: poolToken,
          userStaked : staked,
          pendingRewardTokens : pendingRewardTokens / 10 ** 18,
          depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
          withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100,
          pendingRewarderTokens : pendingRewarderTokens.rewardAmounts[0] / 10 ** rewarderToken.decimals,
          rewarderTokenAddress,
          rewarderToken,
          rewarderRewardsPerWeek,
          rewarderTicker : rewarderToken.symbol
      };
    }
  }
  
  function printRewarderPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                           totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                           pendingRewardsFunction, fixedDecimals, chain="aurora",
                           rewarderRewardsPerWeek, rewardRewarderTicker, rewarderTokenAddress, pendingRewarderTokens) {
      fixedDecimals = fixedDecimals ?? 2;
      const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken);
      var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
      let poolRewarderRewardsPerWeek = rewarderRewardsPerWeek;
      if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
      const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
      const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      const rewardRewarderPrice = getParameterCaseInsensitive(prices, rewarderTokenAddress)?.usd;
      const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
      poolPrices.print_price(chain);
      sp?.print_price(chain);
      const apr = printRewarderAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
        staked_tvl, userStaked, poolPrices.price, fixedDecimals, poolRewarderRewardsPerWeek, rewardRewarderPrice, rewardRewarderTicker);
      if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
      if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
      printRewarderContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
        rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
        poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, rewardPrice, pendingRewarderTokens, rewardRewarderTicker, rewardRewarderPrice);
      _print("");
      return apr;
    }
    
    function printRewarderAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                      stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                      fixedDecimals, poolRewarderRewardsPerWeek, rewardRewarderPrice, rewarderTicker) {
      var usdPerWeek = poolRewardsPerWeek * rewardPrice;
      var usdRewarderPerWeek = poolRewarderRewardsPerWeek * rewardRewarderPrice;
      fixedDecimals = fixedDecimals ?? 2;
      _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
      _print(`${rewarderTicker} Per Week: ${poolRewarderRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdRewarderPerWeek)})`);
      var weeklyAPR = usdPerWeek / staked_tvl * 100;
      var dailyAPR = weeklyAPR / 7;
      var yearlyAPR = weeklyAPR * 52;
      var weeklyRewarderAPR = usdRewarderPerWeek / staked_tvl * 100;
      var dailyRewarderAPR = weeklyRewarderAPR / 7;
      var yearlyRewarderAPR = weeklyRewarderAPR * 52;
      let totalDailyAPR = dailyAPR + dailyRewarderAPR;
      let totalWeeklyAPR = weeklyAPR + weeklyRewarderAPR;
      let totalYearlyAPR = yearlyRewarderAPR + yearlyAPR;
      let totalUSDPerWeek = usdPerWeek + usdRewarderPerWeek;
      _print(`APR ${rewardTokenTicker}: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      _print(`APR ${rewarderTicker}: Day ${dailyRewarderAPR.toFixed(2)}% Week ${weeklyRewarderAPR.toFixed(2)}% Year ${yearlyRewarderAPR.toFixed(2)}%`);
      var userStakedUsd = userStaked * poolTokenPrice;
      var userStakedPct = userStakedUsd / staked_tvl * 100;
      _print(`Total Per Week: $${formatMoney(totalUSDPerWeek)}`);
      _print(`Total APR: Day ${totalDailyAPR.toFixed(2)}% Week ${totalWeeklyAPR.toFixed(2)}% Year ${totalYearlyAPR.toFixed(2)}%`);
      _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
      var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
      var userRewarderWeeklyRewards = userStakedPct * poolRewarderRewardsPerWeek / 100;
      var userDailyRewards = userWeeklyRewards / 7;
      var userRewarderDailyRewards = userRewarderWeeklyRewards / 7;
      var userYearlyRewards = userWeeklyRewards * 52;
      var userRewarderYearlyRewards = userRewarderWeeklyRewards * 52;
      if (userStaked > 0) {
        _print(`Estimated Total earnings:`
            + ` Day ($${formatMoney(userDailyRewards*rewardPrice+userRewarderDailyRewards*rewardRewarderPrice)})`
            + ` Week ($${formatMoney(userWeeklyRewards*rewardPrice+userRewarderWeeklyRewards*rewardRewarderPrice)})`
            + ` Year ($${formatMoney(userYearlyRewards*rewardPrice+userRewarderYearlyRewards*rewardRewarderPrice)})`);
      }
      return {
        userStakedUsd,
        totalStakedUsd : staked_tvl,
        userStakedPct,
        yearlyAPR : totalYearlyAPR,
        userYearlyUsd : userYearlyRewards * rewardPrice + userRewarderYearlyRewards * rewardRewarderPrice
      }
    }
  
  function printRewarderContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
      rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals, rewardTokenPrice, pendingRewarderTokens,
      rewarderTicker, rewardRewarderPrice) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return triV2Contract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return triV2Contract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return triV2Contract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)}) + ${pendingRewarderTokens.toFixed(fixedDecimals)} ${rewarderTicker} ($${formatMoney(pendingRewarderTokens*rewardRewarderPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
  }
  
  function printTriV2NormalPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                         totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                         pendingRewardsFunction, fixedDecimals, chain="aurora", depositFee=0, withdrawFee=0) {
    fixedDecimals = fixedDecimals ?? 2;
    const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
    var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
    if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
    const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
    _print_inline(`${poolIndex} - `);
    poolPrices.print_price(chain);
    sp?.print_price(chain);
    const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
      staked_tvl, userStaked, poolPrices.price, fixedDecimals);
    if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
    if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
    printTriV2NormalContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
      rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
      poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, rewardPrice, chain, depositFee, withdrawFee);
    return apr;
  }
  
  function printTriV2NormalContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
      rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
      rewardTokenPrice, chain, depositFee, withdrawFee) {
    fixedDecimals = fixedDecimals ?? 2;
    const approveAndStake = async function() {
      return triV2Contract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
    }
    const unstake = async function() {
      return triV2Contract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    const claim = async function() {
      return triV2Contract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
    }
    if(depositFee > 0){
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
    }else{
      _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
    }
    if(withdrawFee > 0){
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
    }else{
      _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
    }
    _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
    _print(`Staking or unstaking also claims rewards.`)
    _print("");
  }
  
  const triV2Contract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
    const signer = App.provider.getSigner()
  
    const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)
  
    let allow = Promise.resolve()
  
    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }
  
    if (currentTokens / 1e18 > 0) {
      showLoading()
      allow
        .then(async function() {
            CHEF_CONTRACT.deposit(poolIndex, currentTokens, App.YOUR_ADDRESS, {gasLimit: 500000})
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(function() {
              hideLoading()
              _print('Something went wrong.')
            })
        })
        .catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }
  
  const triV2Contract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
    const signer = App.provider.getSigner()
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.withdrawAndHarvest(poolIndex, currentStakedAmount, App.YOUR_ADDRESS, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
  
  const triV2Contract_claim = async function(chefAbi, chefAddress, poolIndex, App,
      pendingRewardsFunction) {
    const signer = App.provider.getSigner()
  
    const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)
  
    const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18
  
    if (earnedTokenAmount > 0) {
      showLoading()
      CHEF_CONTRACT.harvest(poolIndex, App.YOUR_ADDRESS, {gasLimit: 500000})
          .then(function(t) {
            return App.provider.waitForTransaction(t.hash)
          })
          .catch(function() {
            hideLoading()
          })
    }
  }

async function loadTriChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://aurorascan.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = "0xFa94348467f64D5A457F75F8bc40495D33c65aBB"
  const rewardToken = await getAuroraToken(App, rewardTokenAddress, chefAddress);

  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getAuroraPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  tokenAddresses.push(rewardTokenAddress);

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getAuroraToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "aurora") : undefined);
  }

  const triLP = await getAuroraToken(App, "0x84b123875F0F36B966d0B6Ca14b31121bd9676AD", chefAddress);
  getPoolPrices(tokens, prices, triLP, "aurora");

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "aurora") : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, claimFunction, "aurora", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
      aprs.push(apr);
    }
  }

  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}