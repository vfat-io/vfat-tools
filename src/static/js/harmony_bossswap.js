$(function () {
  consoleInit(main);
});

async function main() {
  const App = await init_ethers();
  const TOKEN_ADDR = "0xE7bBE0E193FdFe95d2858F5C46d036065f8F735c";
  const CHEF_ADDR = "0x2bBdDd1300be487A0fe4eA7BF0893395819AA3E9";
  const PIT_ADDR = "0xEcAECB026883502caf96C069047c0Ff66B0B7563";
  const REWARD_TOKEN_TICKER = "BOSS";
  const PIT_NAME = "Horde";
  
  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  
  const CHEF_ABI=[{inputs:[{internalType:"contract GovernanceToken",name:"_govToken",type:"address"},{internalType:"address",name:"_devaddr",type:"address"},{internalType:"address",name:"_liquidityaddr",type:"address"},{internalType:"address",name:"_comfundaddr",type:"address"},{internalType:"address",name:"_founderaddr",type:"address"},{internalType:"address",name:"_partnersaddr",type:"address"},{internalType:"uint256",name:"_rewardPerBlock",type:"uint256"},{internalType:"uint256",name:"_startBlock",type:"uint256"},{internalType:"uint256",name:"_halvingAfterBlock",type:"uint256"},{internalType:"uint256[]",name:"_rewardMultiplier",type:"uint256[]"},{internalType:"uint256[]",name:"_blockDeltaStartStage",type:"uint256[]"},{internalType:"uint256[]",name:"_blockDeltaEndStage",type:"uint256[]"},{internalType:"uint256[]",name:"_lockupSchedule",type:"uint256[]"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"addr",type:"address"},{indexed:!1,internalType:"bool",name:"removed",type:"bool"},{indexed:!1,internalType:"uint256",name:"blockNumber",type:"uint256"},{indexed:!1,internalType:"uint256",name:"blockTime",type:"uint256"}],name:"AddressWhitelistDeposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"addr",type:"address"},{indexed:!1,internalType:"bool",name:"removed",type:"bool"},{indexed:!1,internalType:"uint256",name:"blockNumber",type:"uint256"},{indexed:!1,internalType:"uint256",name:"blockTime",type:"uint256"}],name:"AddressWhitelistWithdraw",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Deposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"EmergencyWithdraw",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"previousOwner",type:"address"},{indexed:!0,internalType:"address",name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"},{indexed:!1,internalType:"uint256",name:"lockAmount",type:"uint256"}],name:"SendGovernanceTokenReward",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"user",type:"address"},{indexed:!0,internalType:"uint256",name:"pid",type:"uint256"},{indexed:!1,internalType:"uint256",name:"amount",type:"uint256"}],name:"Withdraw",type:"event"},{inputs:[],name:"FINISH_BONUS_AT_BLOCK",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"HALVING_AT_BLOCK",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"LOCKUP_SCHEDULE",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"PERCENT_FOR_COM",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"PERCENT_FOR_DEV",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"PERCENT_FOR_FOUNDERS",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"PERCENT_FOR_LP",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"PERCENT_FOR_PARTNERS",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"REWARD_MULTIPLIER",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"REWARD_PER_BLOCK",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"START_BLOCK",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_allocPoint",type:"uint256"},{internalType:"contract IERC20",name:"_lpToken",type:"address"},{internalType:"bool",name:"_withUpdate",type:"bool"},{internalType:"uint256",name:"_userDepFee",type:"uint256"},{internalType:"uint256",name:"_devDepFee",type:"uint256"}],name:"add",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_toAdd",type:"address"}],name:"addAuthorized",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"addToWhitelistDeposit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"addToWhitelistWithdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"authorized",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"blockDeltaEndStage",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"blockDeltaStartStage",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_newFinish",type:"uint256"}],name:"bonusFinishUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"claimReward",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_pids",type:"uint256[]"}],name:"claimRewards",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_newCom",type:"address"}],name:"comUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"comfundaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_amount",type:"uint256"},{internalType:"address",name:"_ref",type:"address"}],name:"deposit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_devaddr",type:"address"}],name:"dev",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"devFeeStage",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"devaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"emergencyWithdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_newFounder",type:"address"}],name:"founderUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"founderaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getGlobalAmount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getGlobalRefAmount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_currentBlock",type:"uint256"}],name:"getLockUpPercentage",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_from",type:"uint256"},{internalType:"uint256",name:"_to",type:"uint256"}],name:"getMultiplier",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"pid1",type:"uint256"}],name:"getNewRewardPerBlock",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_from",type:"uint256"},{internalType:"uint256",name:"_to",type:"uint256"},{internalType:"uint256",name:"_allocPoint",type:"uint256"}],name:"getPoolReward",outputs:[{internalType:"uint256",name:"forDev",type:"uint256"},{internalType:"uint256",name:"forFarmer",type:"uint256"},{internalType:"uint256",name:"forLP",type:"uint256"},{internalType:"uint256",name:"forCom",type:"uint256"},{internalType:"uint256",name:"forFounders",type:"uint256"},{internalType:"uint256",name:"forPartners",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"},{internalType:"address",name:"_user2",type:"address"}],name:"getRefValueOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_user",type:"address"}],name:"getTotalRefs",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"govToken",outputs:[{internalType:"contract GovernanceToken",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256[]",name:"_newHalving",type:"uint256[]"}],name:"halvingUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"isWhitelistedDeposit",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"isWhitelistedWithdraw",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[],name:"liquidityaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_newcomlock",type:"uint256"}],name:"lockcomUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newdevlock",type:"uint256"}],name:"lockdevUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newfounderlock",type:"uint256"}],name:"lockfounderUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newlplock",type:"uint256"}],name:"locklpUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newpartnerslock",type:"uint256"}],name:"lockpartnersUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_newLockupAtBlock",type:"uint256[]"}],name:"lockupScheduleUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_newLP",type:"address"}],name:"lpUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"massUpdatePools",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"owner",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_newPartners",type:"address"}],name:"partnersUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"partnersaddr",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"address",name:"_user",type:"address"}],name:"pendingReward",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"contract IERC20",name:"",type:"address"}],name:"poolExistence",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"poolId1",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"poolInfo",outputs:[{internalType:"contract IERC20",name:"lpToken",type:"address"},{internalType:"uint256",name:"allocPoint",type:"uint256"},{internalType:"uint256",name:"lastRewardBlock",type:"uint256"},{internalType:"uint256",name:"accGovTokenPerShare",type:"uint256"},{internalType:"uint256",name:"userDepFee",type:"uint256"},{internalType:"uint256",name:"devDepFee",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"poolLength",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"_newOwner",type:"address"}],name:"reclaimTokenOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_toRemove",type:"address"}],name:"removeAuthorized",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"removeFromWhitelistDeposit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"_addr",type:"address"}],name:"removeFromWhitelistWithdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"renounceOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"address",name:"_user",type:"address"},{internalType:"uint256",name:"_block",type:"uint256"}],name:"reviseDeposit",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"address",name:"_user",type:"address"},{internalType:"uint256",name:"_block",type:"uint256"}],name:"reviseWithdraw",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_newMulReward",type:"uint256[]"}],name:"rewardMulUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newReward",type:"uint256"}],name:"rewardUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_allocPoint",type:"uint256"},{internalType:"bool",name:"_withUpdate",type:"bool"}],name:"set",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_devFees",type:"uint256[]"}],name:"setDevFeeStage",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_userDepFee",type:"uint256"},{internalType:"uint256",name:"_devDepFee",type:"uint256"},{internalType:"bool",name:"_withUpdate",type:"bool"}],name:"setFees",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_blockEnds",type:"uint256[]"}],name:"setStageEnds",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_blockStarts",type:"uint256[]"}],name:"setStageStarts",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256[]",name:"_userFees",type:"uint256[]"}],name:"setUserFeeStage",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_newstarblock",type:"uint256"}],name:"starblockUpdate",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"totalAllocPoint",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"updatePool",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"usdOracle",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"}],name:"userDelta",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"}],name:"userFeeStage",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"",type:"address"}],name:"userGlobalInfo",outputs:[{internalType:"uint256",name:"globalAmount",type:"uint256"},{internalType:"uint256",name:"totalReferals",type:"uint256"},{internalType:"uint256",name:"globalRefAmount",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"",type:"uint256"},{internalType:"address",name:"",type:"address"}],name:"userInfo",outputs:[{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"uint256",name:"rewardDebt",type:"uint256"},{internalType:"uint256",name:"rewardDebtAtBlock",type:"uint256"},{internalType:"uint256",name:"lastWithdrawBlock",type:"uint256"},{internalType:"uint256",name:"firstDepositBlock",type:"uint256"},{internalType:"uint256",name:"blockdelta",type:"uint256"},{internalType:"uint256",name:"lastDepositBlock",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"_pid",type:"uint256"},{internalType:"uint256",name:"_amount",type:"uint256"},{internalType:"address",name:"_ref",type:"address"}],name:"withdraw",outputs:[],stateMutability:"nonpayable",type:"function"}];
  const PIT_ABI=[{inputs:[{internalType:"string",name:"_name",type:"string"},{internalType:"string",name:"_symbol",type:"string"},{internalType:"contract IERC20",name:"_govToken",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"subtractedValue",type:"uint256"}],name:"decreaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_amount",type:"uint256"}],name:"enter",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"govToken",outputs:[{internalType:"contract IERC20",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"addedValue",type:"uint256"}],name:"increaseAllowance",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"_share",type:"uint256"}],name:"leave",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"view",type:"function"},{inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"}];
  
  const CHEF = new ethers.Contract(CHEF_ADDR, CHEF_ABI, App.provider);

  const blockNumber = await App.provider.getBlockNumber();
  const multiplier = await CHEF.getMultiplier(blockNumber, blockNumber + 1);
  const rewardPerBlock = await CHEF.REWARD_PER_BLOCK();
  const rewardsPerWeek = ((rewardPerBlock / 1e18) * multiplier * 604800) / 2;

  const tokens = {};
  const basePrices = await getHarmonyPrices();

  const { prices, totalUserStaked, totalStaked, averageApr } =
    await loadChefContract(
      App,
      tokens,
      basePrices,
      CHEF,
      CHEF_ADDR,
      CHEF_ABI,
      REWARD_TOKEN_TICKER,
      "govToken",
      null,
      rewardsPerWeek,
      "pendingReward",
      [0, 1, 2],
      true
    );

  const BOSS = new ethers.Contract(
    TOKEN_ADDR,
    ERC20_ABI,
    App.provider.getSigner()
  );
  const HORDE_PIT = new ethers.Contract(
    PIT_ADDR,
    PIT_ABI,
    App.provider.getSigner()
  );
  const hordePit = await pitData(BOSS, HORDE_PIT, App, prices, PIT_ADDR, TOKEN_ADDR, PIT_NAME, REWARD_TOKEN_TICKER);

  const totalStakedInclPit = totalStaked + hordePit.totalBalanceUSD;

  _print_bold(`Total Staked: $${formatMoney(totalStakedInclPit)}`);
  if (totalUserStaked > 0) {
    _print_bold(
      `\nYou are staking a total of $${formatMoney(
        totalUserStaked
      )} at an average APR of ${(averageApr * 100).toFixed(
        2
      )}% in LP staking pools.`
    );
    _print(
      `Estimated earnings:` +
        ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
        ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
        ` Year $${formatMoney(totalUserStaked * averageApr)}`
    );
  }

  if (hordePit.userBalanceUSD > 0) {
    _print(
      `You are staking a total of $${formatMoney(
        hordePit.userBalanceUSD
      )} in the ${PIT_NAME} single staking pool.`
    );
  }

  hideLoading();
}

async function loadChefContract(
  App,
  tokens,
  prices,
  chef,
  chefAddress,
  chefAbi,
  rewardTokenTicker,
  rewardTokenFunction,
  rewardsPerBlockFunction,
  rewardsPerWeekFixed,
  pendingRewardsFunction,
  deathPoolIndices,
  hideFooter
) {
  const chefContract =
    chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`Found ${poolCount} pools.\n`);

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[
    rewardTokenFunction
  ]();
  const rewardToken = await getHarmonyToken(
    App,
    rewardTokenAddress,
    chefAddress
  );
  const rewardsPerWeek =
    rewardsPerWeekFixed ??
    (((await chefContract.callStatic[rewardsPerBlockFunction]()) /
      10 ** rewardToken.decimals) *
      604800) /
      3;

  const poolInfos = await Promise.all(
    [...Array(poolCount).keys()].map(
      async (x) =>
        await getHarmonyPoolInfo(
          App,
          chefContract,
          chefAddress,
          x,
          pendingRewardsFunction
        )
    )
  );

  var tokenAddresses = [].concat.apply(
    [],
    poolInfos.filter((x) => x.poolToken).map((x) => x.poolToken.tokens)
  );

  await Promise.all(
    tokenAddresses.map(async (address) => {
      tokens[address] = await getHarmonyToken(App, address, chefAddress);
    })
  );

  if (deathPoolIndices) {
    //load prices for the deathpool assets
    deathPoolIndices
      .map((i) => poolInfos[i])
      .map((poolInfo) =>
        poolInfo.poolToken
          ? getPoolPrices(tokens, prices, poolInfo.poolToken, "Harmony")
          : undefined
      );
  }

  const poolPrices = poolInfos.map((poolInfo) =>
    poolInfo.poolToken
      ? getPoolPrices(tokens, prices, poolInfo.poolToken, "Harmony")
      : undefined
  );

  _print("Finished reading smart contracts.\n");

  let aprs = [];
  for (i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(
        App,
        chefAbi,
        chefAddress,
        prices,
        tokens,
        poolInfos[i],
        i,
        poolPrices[i],
        totalAllocPoints,
        rewardsPerWeek,
        rewardTokenTicker,
        rewardTokenAddress,
        pendingRewardsFunction,
        null,
        null,
        "harmony"
      );
      aprs.push(apr);
    }
  }
  let totalUserStaked = 0,
    totalStaked = 0,
    averageApr = 0;
  for (const a of aprs) {
    if (!isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += (a.userStakedUsd * a.yearlyAPR) / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;

  if (!hideFooter) {
    _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
    if (totalUserStaked > 0) {
      _print_bold(
        `\nYou are staking a total of $${formatMoney(
          totalUserStaked
        )} at an average APR of ${(averageApr * 100).toFixed(2)}%`
      );
      _print(
        `Estimated earnings:` +
          ` Day $${formatMoney((totalUserStaked * averageApr) / 365)}` +
          ` Week $${formatMoney((totalUserStaked * averageApr) / 52)}` +
          ` Year $${formatMoney(totalUserStaked * averageApr)}\n`
      );
    }
  }

  return { prices, totalUserStaked, totalStaked, averageApr };
}

function printChefPool(
  App,
  chefAbi,
  chefAddr,
  prices,
  tokens,
  poolInfo,
  poolIndex,
  poolPrices,
  totalAllocPoints,
  rewardsPerWeek,
  rewardTokenTicker,
  rewardTokenAddress,
  pendingRewardsFunction,
  fixedDecimals,
  claimFunction,
  chain = "harmony",
  depositFee = 0,
  withdrawFee = 0
) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp =
    poolInfo.stakedToken == null
      ? null
      : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek =
    (poolInfo.allocPoints / totalAllocPoints) * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(
    prices,
    rewardTokenAddress
  )?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(
    rewardTokenTicker,
    rewardPrice,
    poolRewardsPerWeek,
    poolPrices.stakeTokenTicker,
    staked_tvl,
    userStaked,
    poolPrices.price,
    fixedDecimals
  );
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(
    App,
    chefAbi,
    chefAddr,
    poolIndex,
    poolInfo.address,
    pendingRewardsFunction,
    rewardTokenTicker,
    poolPrices.stakeTokenTicker,
    poolInfo.poolToken.unstaked,
    poolInfo.userStaked,
    poolInfo.pendingRewardTokens,
    fixedDecimals,
    claimFunction,
    rewardPrice,
    chain,
    depositFee,
    withdrawFee
  );
  return apr;
}

function printChefContractLinks(
  App,
  chefAbi,
  chefAddr,
  poolIndex,
  poolAddress,
  pendingRewardsFunction,
  rewardTokenTicker,
  stakeTokenTicker,
  unstaked,
  userStaked,
  pendingRewardTokens,
  fixedDecimals,
  claimFunction,
  rewardTokenPrice,
  chain,
  depositFee,
  withdrawFee
) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function () {
    return bossContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App);
  };
  const unstake = async function () {
    return bossContract_unstake(
      chefAbi,
      chefAddr,
      poolIndex,
      App,
      pendingRewardsFunction
    );
  };
  const claim = async function () {
    return bossContract_claim(
      chefAbi,
      chefAddr,
      poolIndex,
      App,
      pendingRewardsFunction,
      claimFunction
    );
  };
  if (depositFee > 0) {
    _print_link(
      `Stake ${unstaked.toFixed(
        fixedDecimals
      )} ${stakeTokenTicker} - Fee ${depositFee}%`,
      approveAndStake
    );
  } else {
    _print_link(
      `Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`,
      approveAndStake
    );
  }
  if (withdrawFee > 0) {
    _print_link(
      `Unstake ${userStaked.toFixed(
        fixedDecimals
      )} ${stakeTokenTicker} - Fee ${withdrawFee}%`,
      unstake
    );
  } else {
    _print_link(
      `Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`,
      unstake
    );
  }
  _print_link(
    `Claim ${pendingRewardTokens.toFixed(
      fixedDecimals
    )} ${rewardTokenTicker} ($${formatMoney(
      pendingRewardTokens * rewardTokenPrice
    )})`,
    claim
  );
  _print(`Staking or unstaking also claims rewards.`);
  _print("");
}

const bossContract_stake = async function (
  chefAbi,
  chefAddress,
  poolIndex,
  stakeTokenAddr,
  App
) {
  const signer = App.provider.getSigner();

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer);
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer);

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS);
  const allowedTokens = await STAKING_TOKEN.allowance(
    App.YOUR_ADDRESS,
    chefAddress
  );

  let allow = Promise.resolve();

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading();
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash);
      })
      .catch(function () {
        hideLoading();
        alert("Try resetting your approval to 0 first");
      });
  }

  if (currentTokens / 1e18 > 0) {
    showLoading();
    allow
      .then(async function () {
        CHEF_CONTRACT.deposit(
          poolIndex,
          currentTokens,
          "0x0000000000000000000000000000000000000000",
          { gasLimit: 500000 }
        )
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
            });
          })
          .catch(function () {
            hideLoading();
            _print("Something went wrong.");
          });
      })
      .catch(function () {
        hideLoading();
        _print("Something went wrong.");
      });
  } else {
    alert("You have no tokens to stake!!");
  }
};

const bossContract_unstake = async function (
  chefAbi,
  chefAddress,
  poolIndex,
  App,
  pendingRewardsFunction
) {
  const signer = App.provider.getSigner();
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer);

  const currentStakedAmount = (
    await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)
  ).amount;
  const earnedTokenAmount =
    (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](
      poolIndex,
      App.YOUR_ADDRESS
    )) / 1e18;

  if (earnedTokenAmount > 0) {
    showLoading();
    CHEF_CONTRACT.withdraw(
      poolIndex,
      currentStakedAmount,
      "0x0000000000000000000000000000000000000000",
      { gasLimit: 500000 }
    )
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash);
      })
      .catch(function () {
        hideLoading();
      });
  }
};

const bossContract_claim = async function (
  chefAbi,
  chefAddress,
  poolIndex,
  App,
  pendingRewardsFunction,
  claimFunction
) {
  const signer = App.provider.getSigner();

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer);

  const earnedTokenAmount =
    (await CHEF_CONTRACT.callStatic[pendingRewardsFunction](
      poolIndex,
      App.YOUR_ADDRESS
    )) / 1e18;

  if (earnedTokenAmount > 0) {
    CHEF_CONTRACT.claimReward(poolIndex, { gasLimit: 500000 })
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash);
      })
      .catch(function () {
        hideLoading();
      });
  }
};

async function pitData(BOSS, HORDE_PIT, App, prices, PIT_ADDR, TOKEN_ADDR, PIT_NAME, REWARD_TOKEN_TICKER) {
  const hordePitTotalBalance = (await BOSS.balanceOf(PIT_ADDR)) / 1e18;
  const hordePitTotalSupply = (await HORDE_PIT.totalSupply()) / 1e18;
  const xBossRatio = hordePitTotalBalance / hordePitTotalSupply;

  const hordePitUserBalanceBigNum = await HORDE_PIT.balanceOf(App.YOUR_ADDRESS);
  const hordePitUserBalance = (hordePitUserBalanceBigNum / 1e18) * xBossRatio;
  const hordePitShare = hordePitUserBalance / hordePitTotalBalance;
  const bossBalanceBigNum = await BOSS.balanceOf(App.YOUR_ADDRESS);
  const bossBalance = bossBalanceBigNum / 1e18;

  const bossPrice = prices[TOKEN_ADDR];

  let hordePitTotalBalanceUSD;
  let hordePitUserBalanceUSD;

  if (bossPrice && bossPrice.usd) {
    hordePitTotalBalanceUSD = hordePitTotalBalance * bossPrice.usd;
    hordePitUserBalanceUSD = hordePitUserBalance * bossPrice.usd;

    _print(`${PIT_NAME} TVL: $${formatMoney(hordePitTotalBalanceUSD)}`);
    _print(`${REWARD_TOKEN_TICKER} Price: $${formatMoney(bossPrice.usd)}`);
    _print(
      `Staked: ${hordePitTotalBalance.toFixed(
        2
      )} ${REWARD_TOKEN_TICKER} ($${formatMoney(hordePitTotalBalanceUSD)})`
    );
    _print(
      `You are staking ${hordePitUserBalance.toFixed(
        2
      )} ${REWARD_TOKEN_TICKER} ($${formatMoney(hordePitUserBalanceUSD)}), ${(
        hordePitShare * 100
      ).toFixed(2)}% of the pool.`
    );

    const approveAndEnter = async function () {
      return hordePitApproveAndEnter(BOSS, HORDE_PIT, bossBalanceBigNum, App, PIT_ADDR);
    };

    const leave = async function () {
      return hordePitLeave(HORDE_PIT, hordePitUserBalanceBigNum, App);
    };

    _print_link(
      `Stake ${bossBalance.toFixed(2)} ${REWARD_TOKEN_TICKER}`,
      approveAndEnter
    );

    if (hordePitUserBalance > 0) {
      _print_link(
        `Unstake ${hordePitUserBalance.toFixed(2)} ${REWARD_TOKEN_TICKER}`,
        leave
      );
    }

    _print(
      `${PIT_NAME} rewards are visible after unstaking / exiting the pool.`
    );
    _print("");
  }

  hideLoading();

  return {
    totalBalance: hordePitTotalBalance,
    totalBalanceUSD: hordePitTotalBalanceUSD,
    userBalance: hordePitUserBalance,
    userBalanceUSD: hordePitUserBalanceUSD,
  };
}

async function hordePitApproveAndEnter(BOSS, HORDE_PIT, currentTokens, App, PIT_ADDR) {
  const allowedTokens = await BOSS.allowance(App.YOUR_ADDRESS, PIT_ADDR);
  let allow = Promise.resolve();

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading();
    allow = BOSS.approve(PIT_ADDR, ethers.constants.MaxUint256)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash);
      })
      .catch(function () {
        hideLoading();
        alert("Try resetting your approval to 0 first");
      });
  }

  if (currentTokens / 1e18 > 0) {
    showLoading();
    allow
      .then(async function () {
        HORDE_PIT.enter(currentTokens, { gasLimit: 500000 })
          .then(function (t) {
            App.provider.waitForTransaction(t.hash).then(function () {
              hideLoading();
            });
          })
          .catch(function () {
            hideLoading();
            _print("Something went wrong.");
          });
      })
      .catch(function () {
        hideLoading();
        _print("Something went wrong.");
      });
  } else {
    alert("You have no tokens to stake!!");
  }
}

async function hordePitLeave(HORDE_PIT, currentStakedAmount, App) {
  showLoading();
  HORDE_PIT.leave(currentStakedAmount, { gasLimit: 500000 })
    .then(function (t) {
      App.provider.waitForTransaction(t.hash).then(function () {
        hideLoading();
      });
    })
    .catch(function () {
      hideLoading();
    });
}
