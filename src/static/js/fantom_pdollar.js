$(function() {
  consoleInit(main)
    });
  
  const PDO_REWARD_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_pdo","type":"address"},{"internalType":"uint256","name":"_poolStartTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardTime","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochEndTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochPdoPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"epochTotalRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fromTime","type":"uint256"},{"internalType":"uint256","name":"_toTime","type":"uint256"}],"name":"getGeneratedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pdo","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingPdo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accPdoPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const SPDO_REWARD_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_sPdo","type":"address"},{"internalType":"uint256","name":"_poolStartTime","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"TOTAL_REWARDS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"},{"internalType":"uint256","name":"_lastRewardTime","type":"uint256"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fromTime","type":"uint256"},{"internalType":"uint256","name":"_toTime","type":"uint256"}],"name":"getGeneratedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"to","type":"address"}],"name":"governanceRecoverUnsupported","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolEndTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardTime","type":"uint256"},{"internalType":"uint256","name":"accsPdoPerShare","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"runningTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sPdo","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sPdoPerSecond","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_operator","type":"address"}],"name":"setOperator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const PDO_REWARD_POOL_ADDR = "0xEA41CdA018774b0A2beDE0e6ad961A1395E1E75F";
  const SPDO_REWARD_POOL_ADDR = "0xe8E0f521433028718baa338467151A3D43974292";
  const PDO_ADDR = "0xb9D62c829fbF7eAff1EbA4E50F3D0480b66c1748";
  
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

      const pdoRewardPoolContract = new ethers.Contract(PDO_REWARD_POOL_ADDR, PDO_REWARD_POOL_ABI, App.provider);
      const sPdoRewardPoolContract = new ethers.Contract(SPDO_REWARD_POOL_ADDR, SPDO_REWARD_POOL_ABI, App.provider);
      const tokens = {};
      const prices = await getFantomPrices();
      const startTime0 = await pdoRewardPoolContract.poolStartTime();
      const startTime1 = await sPdoRewardPoolContract.poolStartTime();
      const currentTime = Date.now() / 1000

      const BOARDROOM_ADDR = "0x82D868D99747fbF9FDff367Bb9f1c55112B05c7F";
      const ORACLE_ADDR = "0x88A63f5c2fC503Cca1A473c8b8af0587cBfc5baE";
      const rewardTokenAddress = "0xb9D62c829fbF7eAff1EbA4E50F3D0480b66c1748"; //PDO
      const lppAddress = "0xd339d12C6096Cb8E16a2BcCB5ACacA362bE78EA7";
      const stakeTicker = "sPDO";
      const rewardTicker = "PDO";
      const epochsPerDay = 4;
      const maxSupplyIncrease =await getExpansion(App);
      const decimals = 18;
      const ratio = 1.0;
      const targetMantissa = 12;
      
      let boardroom = await loadBoardroom(App, prices, BOARDROOM_ADDR, ORACLE_ADDR,  lppAddress, rewardTokenAddress, stakeTicker,
        rewardTicker, epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa)
      
      _print('-------------------------------------------------')
      _print('')
      
      let sPdoRewardPool = await loadRewardPoolContract(App, tokens, prices, sPdoRewardPoolContract, SPDO_REWARD_POOL_ADDR, SPDO_REWARD_POOL_ABI, "sPDO",
      "sPdo", "pendingShare", 4, startTime1, currentTime);
      

      _print_bold(`Total Staked: $${formatMoney(sPdoRewardPool.totalStaked + boardroom.staked_tvl)}`);
      _print('')      
      _print('')
      _print('-------------------------------------------------')
      // Genesis ended, no longer required to calculate the TVL
      // _print('')
      // _print_bold("Below pools are now closed, please unstake your funds. There are no more rewards to be received.")
      // _print("")
      // let pdoRewardPool = await loadRewardPoolContract(App, tokens, prices, pdoRewardPoolContract, PDO_REWARD_POOL_ADDR, PDO_REWARD_POOL_ABI, "PDO",
      // "pdo", "pendingPdo", 5, startTime0, currentTime);
      // _print_bold(`Total Staked: $${formatMoney(pdoRewardPool.totalStaked + pdoRewardPool.staked_tvl)}`);

      hideLoading();
    }

    async function loadRewardPoolContract(
      App,
      tokens,
      prices,
      contract,
      contractAddress,
      contractAbi,
      rewardTokenTicker,
      rewardTokenFunction,
      pendingRewardsFunction,
      poolCount,
      startTime,
      currentTime
    ) {
      const poolContract = contract ?? new ethers.Contract(contractAddress, contractAbi)

      _print(`<a href='https://ftmscan.com/address/${poolContract.address}' target='_blank'>Staking Contract</a>`);
      _print("");

      const totalAllocPoints = await poolContract.totalAllocPoint()
      
      const rewardTokenAddress = await poolContract.callStatic[rewardTokenFunction]()
      
      const rewardToken = await getFantomToken(App, rewardTokenAddress, contractAddress)
      
      let rewardsPerWeek = 0;
      if(currentTime < startTime){
        _print(`Rewards has not started yet\n`);
      }else{
       rewardsPerWeek = await getTokenRewardPerSecond(poolContract) / 10 ** rewardToken.decimals * 604800;
      }

      const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => 
      await getPdoRewardPoolInfo(App, poolContract, contractAddress, x, pendingRewardsFunction)));

      var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens))

      await Promise.all(tokenAddresses.map(async (address) => {
          tokens[address] = await getFantomToken(App, address, contractAddress);
      }))

      const poolPrices = poolInfos.map( pInfo => pInfo.poolToken ? getPoolPrices(tokens, prices, pInfo.poolToken, "fantom") : undefined);

      let aprs = [];
      for (i = 0; i < poolCount; i++){
      const apr = printPdoPool(App,PDO_REWARD_POOL_ABI, contractAddress, prices, tokens, poolInfos[i], i,
           poolPrices[i], totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress, pendingRewardsFunction, "fantom")
      aprs.push(apr);
      }
        let totalUserStaked = 0,
          totalStaked = 0,
          averageApr = 0
        for (const a of aprs) {
          if (!isNaN(a.totalStakedUsd)) {
            totalStaked += a.totalStakedUsd
          }
          if (a.userStakedUsd > 0) {
            totalUserStaked += a.userStakedUsd
            averageApr += (a.userStakedUsd * a.yearlyAPR) / 100
          }
        }
        averageApr = averageApr / totalUserStaked
        return {prices, totalUserStaked, totalStaked, averageApr}
    }

  async function loadBoardroom(App, prices, boardroomAddress, oracleAddress, lppAddress, rewardTokenAddress, stakeTicker, rewardTicker,
        epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa) {

      _print(`<a href='https://ftmscan.com/address/${boardroomAddress}' target='_blank'>Boardroom Contract</a>`);
      _print("");
      const BOARDROOM = new ethers.Contract(boardroomAddress, BOARDROOM_ABI, App.provider);
      const ORACLE = new ethers.Contract(oracleAddress, BASIS_ORACLE_ABI, App.provider);
      const share = await BOARDROOM.share();
      const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider);
      const userUnstaked = await SHARE.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const sharePrice = getParameterCaseInsensitive(prices, share)?.usd;
      const userStaked = await BOARDROOM.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const userStakedUsd = userStaked * sharePrice;
      const totalStaked = await BOARDROOM.totalSupply() / 1e18;
      const totalStakedUsd = totalStaked * sharePrice;
      const userPct = userStaked / totalStaked * 100;
      const earned = await BOARDROOM.earned(App.YOUR_ADDRESS) / 1e18;
      _print(`Boardroom`);
      _print(`There is a total ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
      _print(`You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

      const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
      const oldTimestamp = await ORACLE.blockTimestampLast();
      const token0 = await ORACLE.token0();
      const token1 = await ORACLE.token1();
      let twap;
      if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
          const oldPrice0 = await ORACLE.price0CumulativeLast();
          const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lppAddress);
          twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
      }
      else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
          const oldPrice1 = await ORACLE.price1CumulativeLast();
          const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lppAddress);
          twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
      }
      
      if (twap > 0.505) {
          const circulatingSupply = await getCirculatingSupply(App);
          const newTokens = circulatingSupply *  Math.min(twap - 1, maxSupplyIncrease)  * ratio;
          _print(`There will be ${newTokens.toFixed(decimals)} ${rewardTicker} issued at next expansion.`);
          const boardroomReturn = newTokens * rewardPrice * 100 * epochsPerDay / totalStakedUsd;
          _print(`Boardroom APR: Day ${(boardroomReturn).toFixed(2)}% Week ${(boardroomReturn * 7).toFixed(2)}% Year ${(boardroomReturn * 365).toFixed(2)}%`)
      }

      const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
      const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
      const claim = async () => boardroom_claim(boardroomAddress, App);
      const exit = async () =>  rewardsContract_exit(boardroomAddress, App);
      const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

      _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
      _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
      _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker} ($${formatMoney(earned*rewardPrice)})`, claim)
      _print_link(`Revoke (set approval to 0)`, revoke)
      _print_link(`Exit`, exit)
      _print(`\n`);

      return { staked_tvl : totalStakedUsd };
  }

    async function getPdoRewardPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
      const poolInfo = await chefContract.poolInfo(poolIndex)
      if (poolInfo.allocPoint == 0) {
        return {
          address: poolInfo.token,
          stakedToken: poolToken,
          allocPoints: poolInfo.allocPoint ?? 1,
          poolToken: null,
          userStaked: 0,
          pendingRewardTokens: 0,
        }
      }

      const poolToken = await getFantomToken(app, poolInfo.token, chefAddress)
      const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS)
      const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS)
      const staked = userInfo.amount / 10 ** poolToken.decimals
      return {
        address: poolInfo.token,
        stakedToken: poolToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
      }
    }
    
    async function getTokenRewardPerSecond(poolContract) {
      if (poolContract.address == PDO_REWARD_POOL_ADDR) {
        const poolStartTime = await poolContract.poolStartTime()
        const startDateTime = new Date(poolStartTime.toNumber() * 1000)
        const TWO_DAYS = 2 * 24 * 60 * 60 * 1000
        if (Date.now() - startDateTime.getTime() > TWO_DAYS) {
          return await poolContract.epochPdoPerSecond(1)
        }
        return await poolContract.epochPdoPerSecond(0)
      } else {
          return await poolContract.sPdoPerSecond()
      }
    }

async function getCirculatingSupply(App) {
  const pdoContract = new ethers.Contract(PDO_ADDR, ERC20_ABI, App.provider);
  const totalSupply = await pdoContract.totalSupply();
  const pdoRewardPoolBalanceOf = await pdoContract.balanceOf(PDO_REWARD_POOL_ADDR);
  return (totalSupply / 1e18) - (pdoRewardPoolBalanceOf / 1e18)
}    

async function getExpansion(App) {
  const circulatingSupply =await getCirculatingSupply(App);
  if (circulatingSupply < 500000) {
    return 0.045
  } else if (circulatingSupply < 1000000) {
    return 0.035
  } else if (circulatingSupply < 1500000) {
    return 0.03
  } else if (circulatingSupply < 2000000) {
    return 0.025
  } else if (circulatingSupply < 5000000) {
    return 0.02
  } else if (circulatingSupply < 10000000) {
    return 0.015
  } else if (circulatingSupply < 20000000) {
    return 0.0125
  } else {
    return 0.01
  }
}
  
function printPdoPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                     totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                     pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
fixedDecimals = fixedDecimals ?? 2;
var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
const staked_tvl =  poolPrices.staked_tvl;
_print_inline(`${poolIndex} - `);
poolPrices.print_price(chain);
const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
  staked_tvl, userStaked, poolPrices.price, 2);
if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
  rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
  poolInfo.userStaked, poolInfo.pendingRewardTokens, 2, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
return apr;
}