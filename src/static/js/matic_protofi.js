
$(function () {
    consoleInit(main)
  });
  
  const PROTOFI_CHEF_ABI = [ { "inputs": [ { "internalType": "contract ProtonToken", "name": "_proton", "type": "address" }, { "internalType": "contract ElectronToken", "name": "_electron", "type": "address" }, { "internalType": "uint256", "name": "_startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "_protonPerBlock", "type": "uint256" }, { "internalType": "address", "name": "_devaddr", "type": "address" }, { "internalType": "address", "name": "_feeAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amountLockedUp", "type": "uint256" } ], "name": "RewardLockedUp", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "protonPerBlock", "type": "uint256" } ], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousDevAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newDevAddress", "type": "address" } ], "name": "UpdatedDevAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousFeeAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newFeeAddress", "type": "address" } ], "name": "UpdatedFeeAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "BURN_ADDRESS", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_DEPOSIT_FEES", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MAXIMUM_HARVEST_INTERVAL", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "devAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "electron", "outputs": [ { "internalType": "contract ElectronToken", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "feeAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "poolInfo", "outputs": [ { "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "lpSupply", "type": "uint256" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accProtonPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }, { "internalType": "bool", "name": "isElectronRewards", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proton", "outputs": [ { "internalType": "contract ProtonToken", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protonPerBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalLockedUpRewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "userInfo", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" }, { "internalType": "uint256", "name": "rewardLockedUp", "type": "uint256" }, { "internalType": "uint256", "name": "nextHarvestUntil", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }, { "internalType": "bool", "name": "_isElectronRewards", "type": "bool" } ], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_depositFeeBP", "type": "uint16" }, { "internalType": "uint256", "name": "_harvestInterval", "type": "uint256" }, { "internalType": "bool", "name": "_isElectronRewards", "type": "bool" } ], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" } ], "name": "getMultiplier", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingProton", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "canHarvest", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "getPoolInfo", "outputs": [ { "internalType": "address", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardBlock", "type": "uint256" }, { "internalType": "uint256", "name": "accProtonPerShare", "type": "uint256" }, { "internalType": "uint256", "name": "depositFeeBP", "type": "uint256" }, { "internalType": "uint256", "name": "harvestInterval", "type": "uint256" }, { "internalType": "bool", "name": "isElectronRewards", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_devAddress", "type": "address" } ], "name": "setDevAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeAddress", "type": "address" } ], "name": "setFeeAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_protonPerBlock", "type": "uint256" } ], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];
  
  async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    // ProtoFi MasterChef address and get the contract
    const PROTOFI_CHEF_ADDR = "0x17E765Cf71700A558228e709f6162933B9eD0e8C";
    const PROTOFI_CHEF = new ethers.Contract(PROTOFI_CHEF_ADDR, PROTOFI_CHEF_ABI, App.provider);
  
    const tokens = {};
    const prices = await getMaticPrices();
  
    await loadProtofiChefContract(App, tokens, prices, PROTOFI_CHEF, PROTOFI_CHEF_ADDR, PROTOFI_CHEF_ABI, "pendingProton", [1]);
  
    hideLoading();
  }
  
  async function loadProtofiChefContract(App, tokens, prices, chef, chefAddress, chefAbi,
    pendingRewardsFunction, deathPoolIndices) {
    const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
  
    const poolCount = parseInt(await chefContract.poolLength(), 10);
    const totalAllocPoints = await chefContract.totalAllocPoint();
  
    _print(`<a href='https://polygonscan.com/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
    _print(`Found ${poolCount} pools.\n`)
  
    const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
      await getProtofiPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
  
    var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));
  
    await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getMaticToken(App, address, chefAddress);
    }));
  
    if (deathPoolIndices) {   //load prices for the deathpool assets
      deathPoolIndices.map(i => poolInfos[i])
        .map(poolInfo =>
          poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
    }
  
    const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "matic") : undefined);
  
    _print("Finished reading smart contracts.\n");
  
    let aprs = []
    for (i = 0; i < poolCount; i++) {
      if (poolPrices[i]) {
        const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
          totalAllocPoints, poolInfos[i].rewardsPerWeek, poolInfos[i].rewardTokenTicker, poolInfos[i].rewardTokenAddress,
          pendingRewardsFunction, null, null, "matic")
  
        const hours = poolInfos[i].harvestInterval / 3600
        let harvestInterval = ''
        if (hours >= 1) {
          harvestInterval = `${hours} Hours`
        } else {
          const minutes = hours * 60
          harvestInterval = `${minutes} Minutes`
        }
  
        // Displays also deposit fees, harvest lockup and if the user can harvest rewards
  
        _print(`Deposit fees: ${poolInfos[i].depositFeeBP / 100}%`)
        _print(`Harvest Lockup: ${harvestInterval}`)
  
        if (poolInfos[i].userCanHarvest == true) {
          _print(`You can harvest your rewards\n`);
        } else {
          const lockuptimeBigNumber = ethers.BigNumber.from(poolInfos[i].userNextHarvestUntil)
          const lockuptimeUnix = lockuptimeBigNumber.toNumber()
          const dateEndLockup = new Date(lockuptimeUnix * 1000)
          const actualTime = new Date(Date.now())
          const timeLeftSeconds = dateEndLockup.getTime() - actualTime.getTime()
          if (timeLeftSeconds > 0) {
            timeLeftString = new Date(timeLeftSeconds).toISOString().substr(11, 8)
            _print(`Your rewards are still locked up until ${dateEndLockup}\n`);
          }
        }
  
        aprs.push(apr);
      }
    }
    let totalUserStaked = 0, totalStaked = 0, averageApr = 0;
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
        + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
        + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
        + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
    }
    return { prices, totalUserStaked, totalStaked, averageApr }
  
  }
  
  async function getProtofiPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {
    const poolInfo = await chefContract.poolInfo(poolIndex);
    let rewardTokenAddress = await chefContract.proton();
    let rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
    const poolToken = await getMaticToken(App, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract.userInfo(poolIndex, App.YOUR_ADDRESS);
    const userCanHarvest = await chefContract.canHarvest(poolIndex, App.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    const rewardsPerWeek = await chefContract.protonPerBlock() / 10 ** rewardToken.decimals * 604800 / 2.3
    if (poolInfo.isElectronRewards == false) {
      rewardTokenAddress = await chefContract.proton();
      rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
      return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked: staked,
        pendingRewardTokens: pendingRewardTokens / 10 ** 18,
        rewardTokenTicker: "PROTO",
        rewardTokenAddress: rewardTokenAddress,
        rewardToken: rewardToken,
        rewardsPerWeek: rewardsPerWeek,
        userCanHarvest: userCanHarvest,
        userNextHarvestUntil: userInfo.nextHarvestUntil._hex,
        depositFeeBP: poolInfo.depositFeeBP,
        harvestInterval: poolInfo.harvestInterval
      };
    }
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked: staked,
      pendingRewardTokens: pendingRewardTokens / 10 ** 18,
      rewardTokenTicker: "ELCT",
      rewardTokenAddress: rewardTokenAddress,
      rewardToken: rewardToken,
      rewardsPerWeek: rewardsPerWeek,
      userCanHarvest: userCanHarvest,
      userNextHarvestUntil: userInfo.nextHarvestUntil._hex,
      depositFeeBP: poolInfo.depositFeeBP,
      harvestInterval: poolInfo.harvestInterval
    };
  }  