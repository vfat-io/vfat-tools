
$(function() {
consoleInit(main)
  });

const NEARPAD_CHEF_ABI = [{'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address'}, {'indexed': true, 'internalType': 'uint256', 'name': 'pid', 'type': 'uint256'}, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}], 'name': 'Deposit', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address'}, {'indexed': true, 'internalType': 'uint256', 'name': 'pid', 'type': 'uint256'}, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}], 'name': 'EmergencyWithdraw', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'previousOwner', 'type': 'address'}, {'indexed': true, 'internalType': 'address', 'name': 'newOwner', 'type': 'address'}], 'name': 'OwnershipTransferred', 'type': 'event'}, {'anonymous': false, 'inputs': [{'indexed': true, 'internalType': 'address', 'name': 'user', 'type': 'address'}, {'indexed': true, 'internalType': 'uint256', 'name': 'pid', 'type': 'uint256'}, {'indexed': false, 'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}], 'name': 'Withdraw', 'type': 'event'}, {'inputs': [], 'name': 'BONUS_MULTIPLIER', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'MINT_COORDINATOR', 'outputs': [{'internalType': 'contract MintCoordinator', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_allocPoint', 'type': 'uint256'}, {'internalType': 'contract IERC20', 'name': '_lpToken', 'type': 'address'}, {'internalType': 'bool', 'name': '_withUpdate', 'type': 'bool'}], 'name': 'add', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'bonusEndBlock', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_amount', 'type': 'uint256'}], 'name': 'deposit', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': '_devaddr', 'type': 'address'}], 'name': 'dev', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'devaddr', 'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}], 'name': 'emergencyWithdraw', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_from', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_to', 'type': 'uint256'}], 'name': 'getMultiplier', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'contract IERC20', 'name': '_sushi', 'type': 'address'}, {'internalType': 'address', 'name': '_devaddr', 'type': 'address'}, {'internalType': 'uint256', 'name': '_sushiPerBlock', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_startBlock', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_bonusEndBlock', 'type': 'uint256'}], 'name': 'initializer', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'massUpdatePools', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}], 'name': 'migrate', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'migrator', 'outputs': [{'internalType': 'contract IMigratorChef', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'owner', 'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}, {'internalType': 'address', 'name': '_user', 'type': 'address'}], 'name': 'pendingSushi', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'poolInfo', 'outputs': [{'internalType': 'contract IERC20', 'name': 'lpToken', 'type': 'address'}, {'internalType': 'uint256', 'name': 'allocPoint', 'type': 'uint256'}, {'internalType': 'uint256', 'name': 'lastRewardBlock', 'type': 'uint256'}, {'internalType': 'uint256', 'name': 'accSushiPerShare', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'poolLength', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'renounceOwnership', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_allocPoint', 'type': 'uint256'}, {'internalType': 'bool', 'name': '_withUpdate', 'type': 'bool'}], 'name': 'set', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'contract IMigratorChef', 'name': '_migrator', 'type': 'address'}], 'name': 'setMigrator', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [], 'name': 'startBlock', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'sushi', 'outputs': [{'internalType': 'contract IERC20', 'name': '', 'type': 'address'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'sushiPerBlock', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [], 'name': 'totalAllocPoint', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'address', 'name': 'newOwner', 'type': 'address'}], 'name': 'transferOwnership', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}], 'name': 'updatePool', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}, {'internalType': 'address', 'name': '', 'type': 'address'}], 'name': 'userInfo', 'outputs': [{'internalType': 'uint256', 'name': 'amount', 'type': 'uint256'}, {'internalType': 'uint256', 'name': 'rewardDebt', 'type': 'uint256'}], 'stateMutability': 'view', 'type': 'function'}, {'inputs': [{'internalType': 'uint256', 'name': '_pid', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_amount', 'type': 'uint256'}], 'name': 'withdraw', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const NEARPAD_CHEF_ADDR = "0x2aeF68F92cfBAFA4b542F60044c7596e65612D20";
   const rewardTokenTicker = "PAD";
   const NEARPAD_CHEF = new ethers.Contract(NEARPAD_CHEF_ADDR, NEARPAD_CHEF_ABI, App.provider);
   
   const rewardsPerWeek = await NEARPAD_CHEF.sushiPerBlock() /1e18
        * 604800 / 1.1;
    const tokens = {};
    const prices = await getAuroraPrices();
 
    await loadNearPadChefContract(App, tokens, prices, NEARPAD_CHEF, NEARPAD_CHEF_ADDR, NEARPAD_CHEF_ABI, rewardTokenTicker,
        null, rewardsPerWeek, "pendingSushi", [3,9,10]);
    hideLoading();
  }

async function loadNearPadChefContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
  rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
  deathPoolIndices, claimFunction) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://aurorascan.dev/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  const rewardTokenAddress = "0x885f8CF6E45bdd3fdcDc644efdcd0AC93880c781"
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

  const NEARPADLP = await getAuroraToken(App, "0x1FD6CBBFC0363AA394bd77FC74F64009BF54A7e9", chefAddress);
  getPoolPrices(tokens, prices, NEARPADLP, "aurora");

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