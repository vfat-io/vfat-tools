$(function () {
consoleInit(main)
});


const ATOM_CHEF_ABI = [{"inputs":[{"internalType":"contract Electron","name":"electron_","type":"address"},{"internalType":"address","name":"devAddress_","type":"address"},{"internalType":"address","name":"feeAddress_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"SetFeeAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"ElectronPerBlock","type":"uint256"}],"name":"UpdateEmissionRate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"_devAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_electron","outputs":[{"internalType":"contract Electron","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_electronPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"name":"_poolExistence","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accElectronPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"_userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"allocPoint_","type":"uint256"},{"internalType":"contract IBEP20","name":"lpToken_","type":"address"},{"internalType":"uint16","name":"depositFeeBP_","type":"uint16"},{"internalType":"bool","name":"withUpdate_","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"feeArray","outputs":[{"internalType":"address","name":"feeAddress","type":"address"},{"internalType":"uint16","name":"feeAddressShare","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"from_","type":"uint256"},{"internalType":"uint256","name":"to_","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"},{"internalType":"address","name":"user_","type":"address"}],"name":"pendingElectron","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"token_","type":"address"}],"name":"retrieveErrorTokensOnElectronAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"},{"internalType":"uint256","name":"allocPoint_","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP_","type":"uint16"},{"internalType":"bool","name":"withUpdate_","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"devAddress_","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"exclude","type":"address"},{"internalType":"bool","name":"state","type":"bool"}],"name":"setExcludeMaxTransactionAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"feeAddress_","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"feeAddress","type":"address"},{"internalType":"uint16","name":"feeAddressShare","type":"uint16"}],"internalType":"struct MasterAtom.FeeInfo[]","name":"fiarray_","type":"tuple[]"}],"name":"setFeeAddressArray","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint16","name":"newPercentage","type":"uint16"}],"name":"setMaxTxPercentage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"electronPerBlock_","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startBlock_","type":"uint256"}],"name":"updateStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"pid_","type":"uint256"},{"internalType":"uint256","name":"amount_","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const ATOM_CHEF_ADDR = "0xAb51623097b02E0FD96da235ba405A864fbbb5C0";
    const rewardTokenTicker = "ELECTRON";
    const ATOM_CHEF = new ethers.Contract(ATOM_CHEF_ADDR, ATOM_CHEF_ABI, App.provider);

    const startBlock = await ATOM_CHEF._startBlock();
    const currentBlock = await App.provider.getBlockNumber();

    let rewardsPerWeek = 0
    if (currentBlock < startBlock) {
        _print(`Rewards start at block ${startBlock}\n`);
    } else {
        rewardsPerWeek = await ATOM_CHEF._electronPerBlock() / 1e18 *
            604800 / 2.1;
    }

    const tokens = {};
    const prices = await getMaticPrices();

    await loadAtomChefContract(App, tokens, prices, ATOM_CHEF, ATOM_CHEF_ADDR, ATOM_CHEF_ABI, rewardTokenTicker,
        "_electron", null, rewardsPerWeek, "pendingElectron");

    hideLoading();

    async function loadAtomChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
        rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
        deathPoolIndices) {
        const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);
      
        const poolCount = parseInt(await chefContract.poolLength(), 10);
        const totalAllocPoints = await chefContract._totalAllocPoint();
      
        _print(`Found ${poolCount} pools.\n`)
      
        _print(`Showing incentivized pools only.\n`);
      
        var tokens = {};
      
        const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
        const rewardToken = await getMaticToken(App, rewardTokenAddress, chefAddress);
        const rewardsPerWeek = rewardsPerWeekFixed ?? 
          await chefContract.callStatic[rewardsPerBlockFunction]() 
          / 10 ** rewardToken.decimals * 604800 / 3
      
        const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
          await getAtomPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction)));
      
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
              totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
              pendingRewardsFunction, null, null, "matic", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

    async function getAtomPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction) {  
    const poolInfo = await chefContract._poolInfo(poolIndex);
    if (poolInfo.allocPoint == 0) {
        return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: null,
        userStaked : 0,
        pendingRewardTokens : 0,
        };
    }
    const poolToken = await getMaticToken(app, poolInfo.lpToken, chefAddress);
    const userInfo = await chefContract._userInfo(poolIndex, app.YOUR_ADDRESS);
    const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
    const staked = userInfo.amount / 10 ** poolToken.decimals;
    return {
        address: poolInfo.lpToken,
        allocPoints: poolInfo.allocPoint ?? 1,
        poolToken: poolToken,
        userStaked : staked,
        pendingRewardTokens : pendingRewardTokens / 10 ** 18,
        depositFee : (poolInfo.depositFeeBP ?? 0) / 100,
        withdrawFee : (poolInfo.withdrawFeeBP ?? 0) / 100
    };
    }
}
