$(function() {
  consoleInit(main)
  });
  
  const V3_MASTERCHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_CAKE","type":"address"},{"internalType":"contract INonfungiblePositionManager","name":"_nonfungiblePositionManager","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"pid","type":"uint256"}],"name":"DuplicatedPool","type":"error"},{"inputs":[],"name":"InconsistentAmount","type":"error"},{"inputs":[],"name":"InsufficientAmount","type":"error"},{"inputs":[],"name":"InvalidNFT","type":"error"},{"inputs":[],"name":"InvalidPeriodDuration","type":"error"},{"inputs":[],"name":"InvalidPid","type":"error"},{"inputs":[],"name":"NoBalance","type":"error"},{"inputs":[],"name":"NoLMPool","type":"error"},{"inputs":[],"name":"NoLiquidity","type":"error"},{"inputs":[],"name":"NotEmpty","type":"error"},{"inputs":[],"name":"NotOwner","type":"error"},{"inputs":[],"name":"NotOwnerOrOperator","type":"error"},{"inputs":[],"name":"NotPancakeNFT","type":"error"},{"inputs":[],"name":"WrongReceiver","type":"error"},{"inputs":[],"name":"ZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"},{"indexed":true,"internalType":"contract IPancakeV3Pool","name":"v3Pool","type":"address"},{"indexed":true,"internalType":"contract ILMPool","name":"lmPool","type":"address"}],"name":"AddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"liquidity","type":"uint256"},{"indexed":false,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":false,"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"deployer","type":"address"}],"name":"NewLMPoolDeployerAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"}],"name":"NewOperatorAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"periodDuration","type":"uint256"}],"name":"NewPeriodDuration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"NewReceiver","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"periodNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cakeAmount","type":"uint256"}],"name":"NewUpkeepPeriod","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"emergency","type":"bool"}],"name":"SetEmergency","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"allocPoint","type":"uint256"}],"name":"SetPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"farmBoostContract","type":"address"}],"name":"UpdateFarmBoostContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"int128","name":"liquidity","type":"int128"},{"indexed":false,"internalType":"int24","name":"tickLower","type":"int24"},{"indexed":false,"internalType":"int24","name":"tickUpper","type":"int24"}],"name":"UpdateLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"periodNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"oldEndTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newEndTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"remainingCake","type":"uint256"}],"name":"UpdateUpkeepPeriod","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"FARM_BOOSTER","outputs":[{"internalType":"contract IFarmBooster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"LMPoolDeployer","outputs":[{"internalType":"contract ILMPoolDeployer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_BOOST_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MIN_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERIOD_DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IPancakeV3Pool","name":"_v3Pool","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cakeAmountBelongToMC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManagerStruct.CollectParams","name":"params","type":"tuple"}],"name":"collect","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount0Max","type":"uint128"},{"internalType":"uint128","name":"amount1Max","type":"uint128"}],"internalType":"struct INonfungiblePositionManagerStruct.CollectParams","name":"params","type":"tuple"},{"internalType":"address","name":"to","type":"address"}],"name":"collectTo","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams","name":"params","type":"tuple"}],"name":"decreaseLiquidity","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergency","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_v3Pool","type":"address"}],"name":"getLatestPeriodInfo","outputs":[{"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getLatestPeriodInfoByPid","outputs":[{"internalType":"uint256","name":"cakePerSecond","type":"uint256"},{"internalType":"uint256","name":"endTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"harvest","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Desired","type":"uint256"},{"internalType":"uint256","name":"amount1Desired","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"latestPeriodCakePerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestPeriodStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"nonfungiblePositionManager","outputs":[{"internalType":"contract INonfungiblePositionManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operatorAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"pendingCake","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"contract IPancakeV3Pool","name":"v3Pool","type":"address"},{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint256","name":"totalLiquidity","type":"uint256"},{"internalType":"uint256","name":"totalBoostLiquidity","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"receiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_emergency","type":"bool"}],"name":"setEmergency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract ILMPoolDeployer","name":"_LMPoolDeployer","type":"address"}],"name":"setLMPoolDeployer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operatorAddress","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_periodDuration","type":"uint256"}],"name":"setPeriodDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"setReceiver","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"uint256","name":"_newMultiplier","type":"uint256"}],"name":"updateBoostMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newFarmBoostContract","type":"address"}],"name":"updateFarmBoostContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"updateLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"pids","type":"uint256[]"}],"name":"updatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"upkeep","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userPositionInfos","outputs":[{"internalType":"uint128","name":"liquidity","type":"uint128"},{"internalType":"uint128","name":"boostLiquidity","type":"uint128"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"rewardGrowthInside","type":"uint256"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"pid","type":"uint256"},{"internalType":"uint256","name":"boostMultiplier","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"v3PoolAddressPid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"withdraw","outputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
  const V3_MASTERCHEF_ADDRESS = "0x556B9306565093C855AEA9AE92A594704c2Cd59e";
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Loading pancake cl pools...\n");

    const V3_MASTERCHEF = new ethcall.Contract(V3_MASTERCHEF_ADDRESS, V3_MASTERCHEF_ABI);
  
    const [_poolLength] = await App.ethcallProvider.all([V3_MASTERCHEF.poolLength()]);
    const poolLength = _poolLength / 1;
    const calls = [...Array(poolLength).keys()].map(i => V3_MASTERCHEF.poolInfo(i));
    const cl_pool_infos = await App.ethcallProvider.all(calls);

    let cl_pools = [], _cl_list = [];

    for(const cl_pool_info of cl_pool_infos){
      if(cl_pool_info.allocPoint > 0){
        cl_pools.push({
          pool: cl_pool_info.v3Pool,
          token0: cl_pool_info.token0,
          token1: cl_pool_info.token1
        })
      }
    }

    const cl_pools_to_lowercase = cl_pools.map(c => {
      return {
        address: c.pool.toLowerCase(),
        token0: c.token0.toLowerCase(),
        token1: c.token1.toLowerCase()
      }
    });

  // starting second part of the script

    // http request to vfat-api
    const response = await $.ajax({
      url: 'https://api.vfat.io/v1/farms',
      type: 'GET',
    });

    const response2 = await $.ajax({
      url: 'https://api.vfat.io/v1/tokens?chainId=56&pageSize=999',
      type: 'GET',
    });

    const vfat_io_tokens = response2.tokens.map(t => t.address.toLowerCase());

    const vfat_io_pools = response.filter(d => d.chainId == 56 && d.protocol.id === "pancakeSwap").map(ob => ob.pool.address.toLowerCase());

    let missing_cl_pools = [];

    for(const pool of cl_pools_to_lowercase){
      const is_in_list = vfat_io_pools.includes(pool.address);
      if(!is_in_list){
        missing_cl_pools.push(pool);
      }
  }

  _print_bold("CL POOLS");
  _print_bold("Missing cl pools count " + missing_cl_pools.length);
  _print(``);

  for(const pool of missing_cl_pools){
    const data = await getData(App, pool.address, pool.token0, pool.token1, vfat_io_tokens);
    _cl_list.push(data);
  }

  _print(``);
  const cl_list = _cl_list.flat();
  const cl_list_no_dublicates = remove_dublicates(cl_list, ob => ob.symbol);
  for(const cl of cl_list_no_dublicates){
      _print(cl);
  }

  _print(``);
  
  hideLoading();
}

function remove_dublicates(arr, key){
  return [
      ...new Map(
          arr.map(x => [key(x), x])
      ).values()
  ]
}

async function getData(App, pool, token0, token1, vfat_io_tokens) {
  
    const token0Contract = new ethcall.Contract(token0, ERC20_ABI);
    const [token0Symbol, token0Decimals] = await App.ethcallProvider.all([token0Contract.symbol(), token0Contract.decimals()])

    const token1Contract = new ethcall.Contract(token1, ERC20_ABI);
    const [token1Symbol, token1Decimals] = await App.ethcallProvider.all([token1Contract.symbol(), token1Contract.decimals()])

    _print(`${token0Symbol} - ${token1Symbol}`);
    _print(`MASTERCHEF ADDRESS - ${V3_MASTERCHEF_ADDRESS}`);
    _print(`CLP ADDRESS - ${pool}`);
    _print(`TOKEN 0 ADDRESS  - ${token0}`);
    _print(`TOKEN 0 SYMBOL  - ${token0Symbol}`);
    _print(`TOKEN 0 DECIMALS  - ${token0Decimals}`);
    _print(`TOKEN 1 ADDRESS  - ${token1}`);
    _print(`TOKEN 1 SYMBOL  - ${token1Symbol}`);
    _print(`TOKEN 1 DECIMALS  - ${token1Decimals}`);
    _print(``);

    if(vfat_io_tokens.includes(token0.toLowerCase()) && vfat_io_tokens.includes(token1.toLowerCase())){
      return []
    }else if(vfat_io_tokens.includes(token0.toLowerCase()) && !vfat_io_tokens.includes(token1.toLowerCase())){
      return [
            {
              address: token1,
              symbol: token1Symbol,
              decimals: Number(token1Decimals),
              chainId: 56
            }
      ]
    }else if(!vfat_io_tokens.includes(token0.toLowerCase()) && vfat_io_tokens.includes(token1.toLowerCase())){
      return [
            {
              address: token0,
              symbol: token0Symbol,
              decimals: Number(token0Decimals),
              chainId: 56
            }
      ]
    }else{
      return [
        {
            address: token0,
            symbol: token0Symbol,
            decimals: Number(token0Decimals),
            chainId: 56
        },
        {
            address: token1,
            symbol: token1Symbol,
            decimals: Number(token1Decimals),
            chainId: 56
        }
      ]
    }
}