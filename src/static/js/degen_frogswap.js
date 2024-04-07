
$(function() {
  consoleInit(main)
    });

  const Frog_CHEF_ABI = [
      {
          "inputs": [
              {
                  "internalType": "contract FrogToken",
                  "name": "_Frog",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "_devaddr",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "_feeAddress1",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "_FrogPerBlock",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_startBlock",
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
              }
          ],
          "name": "Withdraw",
          "type": "event"
      },
      {
          "inputs": [],
          "name": "BONUS_MULTIPLIER",
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
          "name": "Frog",
          "outputs": [
              {
                  "internalType": "contract FrogToken",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "FrogPerBlock",
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
                  "internalType": "uint256",
                  "name": "_allocPoint",
                  "type": "uint256"
              },
              {
                  "internalType": "contract IERC20",
                  "name": "_lpToken",
                  "type": "address"
              },
              {
                  "internalType": "uint16",
                  "name": "_depositFeeBP",
                  "type": "uint16"
              },
              {
                  "internalType": "bool",
                  "name": "_withUpdate",
                  "type": "bool"
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
                  "name": "_pid",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
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
                  "name": "_pid",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              },
              {
                  "internalType": "address",
                  "name": "referral",
                  "type": "address"
              }
          ],
          "name": "depositReferral",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "_devaddr",
                  "type": "address"
              }
          ],
          "name": "dev",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "devaddr",
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
              }
          ],
          "name": "emergencyWithdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "feeAddress",
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
                  "name": "_from",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_to",
                  "type": "uint256"
              }
          ],
          "name": "getMultiplier",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "pure",
          "type": "function"
      },
      {
          "inputs": [],
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
          "name": "pendingFrog",
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
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "poolInfo",
          "outputs": [
              {
                  "internalType": "contract IERC20",
                  "name": "lpToken",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "allocPoint",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "lastRewardBlock",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "accFrogPerShare",
                  "type": "uint256"
              },
              {
                  "internalType": "uint16",
                  "name": "depositFeeBP",
                  "type": "uint16"
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
                  "name": "",
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
                  "name": "_pid",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_allocPoint",
                  "type": "uint256"
              },
              {
                  "internalType": "uint16",
                  "name": "_depositFeeBP",
                  "type": "uint16"
              },
              {
                  "internalType": "bool",
                  "name": "_withUpdate",
                  "type": "bool"
              }
          ],
          "name": "set",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "_feeAddress1",
                  "type": "address"
              }
          ],
          "name": "setFeeAddress1",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_startBlock",
                  "type": "uint256"
              }
          ],
          "name": "setStartBlock",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "startBlock",
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
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_FrogPerBlock",
                  "type": "uint256"
              }
          ],
          "name": "updateEmissionRate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_pid",
                  "type": "uint256"
              }
          ],
          "name": "updatePool",
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
                  "internalType": "uint256",
                  "name": "rewardDebt",
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
                  "name": "_pid",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "_amount",
                  "type": "uint256"
              }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      }
  ]


  async function main() {
      const App = await init_ethers();

      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");

     const Frog_CHEF_ADDR = "0xaB42EE05ceb48AC8f4d5782E4512D987694802b9";
     const rewardTokenTicker = "Frog";
     const Frog_CHEF = new ethers.Contract(Frog_CHEF_ADDR, Frog_CHEF_ABI, App.provider);

     const blocksPerSeconds = await getAverageBlockTime(App);

     const rewardsPerWeek = await Frog_CHEF.FrogPerBlock() /1e18 * 604800 / blocksPerSeconds;

      const tokens = {};
      const prices = await getDegenPrices();

      await loadFrogChefContract(App, tokens, prices, Frog_CHEF, Frog_CHEF_ADDR, Frog_CHEF_ABI, rewardTokenTicker,
          "Frog", null, rewardsPerWeek, "pendingFrog", [0, 1, 2], "degen");

      hideLoading();
    }

async function loadFrogChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, chain) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();
  _print(`<a href='https://explorer.degen.tips/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getGeneralToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 3

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
    await getFrogPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getGeneralToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, chain) : undefined);


  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printFrogPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction, null, null, chain, poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

function printFrogPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
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
  printFrogContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

function printFrogContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const emergencyWithdraw = async function() {
    return FrogContract_emergencyWithdraw(chefAbi, chefAddr, poolIndex, App)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
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
  _print_link(`Emergency Withdraw ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, emergencyWithdraw)
  _print("");
}

const FrogContract_emergencyWithdraw = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
    showLoading()
    CHEF_CONTRACT.emergencyWithdraw(poolIndex, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getFrogPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0 || poolIndex == 8) {
    return {
      address: poolInfo.lpToken ?? poolInfo.stakingToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
    };
  }
  const poolToken = await getGeneralToken(app, poolInfo.lpToken ?? poolInfo.stakingToken ?? poolInfo.token, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  return {
      address: poolInfo.lpToken ?? poolInfo.stakingToken ?? poolInfo.token,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      depositFee : (poolInfo.depositFeeBP ?? poolInfo.depositFee ?? 0) / 100,
      withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
  };
}
