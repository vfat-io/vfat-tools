$(function() {
  consoleInit(main)
});

const PENDLE_MARKET_ABI = [{"inputs":[{"internalType":"address","name":"_governanceManager","type":"address"},{"internalType":"address","name":"_xyt","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"weight0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"_desiredXytAmount","type":"uint256"},{"internalType":"uint256","name":"_desiredTokenAmount","type":"uint256"},{"internalType":"uint256","name":"_xytMinAmount","type":"uint256"},{"internalType":"uint256","name":"_tokenMinAmount","type":"uint256"}],"name":"addMarketLiquidityDual","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"},{"internalType":"uint256","name":"lpOut","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"_inToken","type":"address"},{"internalType":"uint256","name":"_exactIn","type":"uint256"},{"internalType":"uint256","name":"_minOutLp","type":"uint256"}],"name":"addMarketLiquiditySingle","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"},{"internalType":"uint256","name":"exactOutLp","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"initialXytLiquidity","type":"uint256"},{"internalType":"uint256","name":"initialTokenLiquidity","type":"uint256"}],"name":"bootstrap","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"},{"internalType":"uint256","name":"exactOutLp","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bootstrapped","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"expiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint256","name":"xytBalance","type":"uint256"},{"internalType":"uint256","name":"xytWeight","type":"uint256"},{"internalType":"uint256","name":"tokenBalance","type":"uint256"},{"internalType":"uint256","name":"tokenWeight","type":"uint256"},{"internalType":"uint256","name":"currentBlock","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governanceManager","outputs":[{"internalType":"contract PendleGovernanceManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastCurveShiftBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastNYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastParamK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lockStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paramL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"redeemLpInterests","outputs":[{"internalType":"uint256","name":"interests","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"_inLp","type":"uint256"},{"internalType":"uint256","name":"_minOutXyt","type":"uint256"},{"internalType":"uint256","name":"_minOutToken","type":"uint256"}],"name":"removeMarketLiquidityDual","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"_outToken","type":"address"},{"internalType":"uint256","name":"_inLp","type":"uint256"},{"internalType":"uint256","name":"_minOutAmountToken","type":"uint256"}],"name":"removeMarketLiquiditySingle","outputs":[{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IPendleRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"setUpEmergencyMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"start","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"inToken","type":"address"},{"internalType":"uint256","name":"inAmount","type":"uint256"},{"internalType":"address","name":"outToken","type":"address"},{"internalType":"uint256","name":"minOutAmount","type":"uint256"}],"name":"swapExactIn","outputs":[{"internalType":"uint256","name":"outAmount","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"inToken","type":"address"},{"internalType":"uint256","name":"maxInAmount","type":"uint256"},{"internalType":"address","name":"outToken","type":"address"},{"internalType":"uint256","name":"outAmount","type":"uint256"}],"name":"swapExactOut","outputs":[{"internalType":"uint256","name":"inAmount","type":"uint256"},{"components":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"isOut","type":"bool"}],"internalType":"struct PendingTransfer[2]","name":"transfers","type":"tuple[2]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"xyt","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const PENDLE_LIQUIDITY_MINING_ABI = [{"inputs":[{"internalType":"address","name":"_governanceManager","type":"address"},{"internalType":"address","name":"_pausingManager","type":"address"},{"internalType":"address","name":"_whitelist","type":"address"},{"internalType":"address","name":"_pendleTokenAddress","type":"address"},{"internalType":"address","name":"_pendleRouter","type":"address"},{"internalType":"bytes32","name":"_pendleMarketFactoryId","type":"bytes32"},{"internalType":"bytes32","name":"_pendleForgeId","type":"bytes32"},{"internalType":"address","name":"_underlyingAsset","type":"address"},{"internalType":"address","name":"_baseToken","type":"address"},{"internalType":"uint256","name":"_startTime","type":"uint256"},{"internalType":"uint256","name":"_epochDuration","type":"uint256"},{"internalType":"uint256","name":"_vestingEpochs","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"_expiries","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_allocationNumerators","type":"uint256[]"}],"name":"AllocationSettingSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"_rewards","type":"uint256[]"},{"indexed":false,"internalType":"uint256","name":"numberOfEpochs","type":"uint256"}],"name":"Funded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"PendleRewardsSettled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256[]","name":"_epochIds","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"_rewards","type":"uint256[]"}],"name":"RewardsToppedUp","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract IERC20","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"expiry","type":"uint256"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allExpiries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"allocationSettings","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"data","outputs":[{"internalType":"contract IPendleData","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"epochDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"forgeId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_rewards","type":"uint256[]"}],"name":"fund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"funded","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"getBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governanceManager","outputs":[{"internalType":"contract PendleGovernanceManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestSetting","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"firstEpochToApply","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"lpHolderForExpiry","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"marketFactoryId","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numberOfEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendleTokenAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"readAllExpiriesLength","outputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epochId","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"readAvailableRewardsForUser","outputs":[{"internalType":"uint256","name":"availableRewardsForUser","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epochId","type":"uint256"}],"name":"readEpochData","outputs":[{"internalType":"uint256","name":"settingId","type":"uint256"},{"internalType":"uint256","name":"totalRewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"readExpiryData","outputs":[{"internalType":"uint256","name":"totalStakeLP","type":"uint256"},{"internalType":"uint256","name":"lastNYield","type":"uint256"},{"internalType":"uint256","name":"paramL","type":"uint256"},{"internalType":"address","name":"lpHolder","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epochId","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"readExpirySpecificEpochData","outputs":[{"internalType":"uint256","name":"stakeUnits","type":"uint256"},{"internalType":"uint256","name":"lastUpdatedForExpiry","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"epochId","type":"uint256"},{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"expiry","type":"uint256"}],"name":"readStakeUnitsForUser","outputs":[{"internalType":"uint256","name":"stakeUnitsForUser","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"readUserExpiries","outputs":[{"internalType":"uint256[]","name":"_expiries","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"readUserSpecificExpiryData","outputs":[{"internalType":"uint256","name":"lastTimeUserStakeUpdated","type":"uint256"},{"internalType":"uint256","name":"lastEpochClaimed","type":"uint256"},{"internalType":"uint256","name":"balances","type":"uint256"},{"internalType":"uint256","name":"lastParamL","type":"uint256"},{"internalType":"uint256","name":"dueInterests","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"redeemLpInterests","outputs":[{"internalType":"uint256","name":"interests","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"redeemRewards","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IPendleRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_expiries","type":"uint256[]"},{"internalType":"uint256[]","name":"_allocationNumerators","type":"uint256[]"}],"name":"setAllocationSetting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"expiries","type":"uint256[]"},{"internalType":"address","name":"spender","type":"address"}],"name":"setUpEmergencyMode","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[{"internalType":"address","name":"newLpHoldingContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[{"internalType":"address","name":"newLpHoldingContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_epochIds","type":"uint256[]"},{"internalType":"uint256[]","name":"_rewards","type":"uint256[]"}],"name":"topUpRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"epochId","type":"uint256"}],"name":"totalRewardsForEpoch","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underlyingAsset","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underlyingYieldToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"vestingEpochs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelist","outputs":[{"internalType":"contract IPendleWhitelist","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address payable","name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_REWARDS_PROXY_ABI = [{"inputs":[{"internalType":"contract PendleLiquidityMiningBase","name":"liqMiningContract","type":"address"},{"internalType":"uint256[]","name":"expiries","type":"uint256[]"},{"internalType":"address","name":"user","type":"address"}],"name":"redeemLiquidityRewards","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"},{"internalType":"uint256[]","name":"pendingRewards","type":"uint256[]"},{"internalType":"uint256","name":"currentEpoch","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]

const PENDLE_SINGLE_STAKING_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_pendle","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"pendleAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Enter","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"pendleAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"shares","type":"uint256"}],"name":"Leave","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[{"internalType":"uint256","name":"sharesToMint","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[{"internalType":"uint256","name":"rewards","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendle","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingManager","outputs":[{"internalType":"contract SingleStakingManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const PENDLE_SINGLE_STAKING_MANAGER_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_pendle","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"adjustRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishedDistToBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBlocksLeft","outputs":[{"internalType":"uint256","name":"blocksLeft","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendle","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

COINGECKO_IDS = {
  PENDLE: "pendle",
  USDC: "usd-coin",
}

const FARMS = [{
  yt: "YT-aUSDC-29DEC2022",
  token: "USDC",
  market: "0x8315BcBC2c5C1Ef09B71731ab3827b0808A2D6bD",
  staking: "0x6f40A68E99645C60F14b497E75aE024777d61726",
}, {
  yt: "YT-cDAI-29DEC2022",
  token: "USDC",
  market: "0xB26C86330FC7F97533051F2F8cD0a90C2E82b5EE",
  staking: "0x5B1C59Eb6872f88a92469751a034B9B5ADA9A73F",
}]

const SINGLE_SIDED = {
  staking: '0x07282F2CEEbD7a65451Fcd268b364300D9e6D7f5',
  manager: '0x747fc744837DEDa8D1c568d8e90839e5D4495255',
}

async function getTokenPrice(symbol) {
  let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd')
  let json = await raw.text()

  return JSON.parse(json)[symbol]['usd']
}

async function print_contained_price(farm, userPoolOwnership, ytPoolBalance, tokenPoolBalance) {
  const yts = userPoolOwnership * ytPoolBalance / 100
  const tokens = userPoolOwnership * tokenPoolBalance / 100
  _print(`Your LP tokens comprise of ${yts.toFixed(4)} ${farm.yt} + ${tokens.toFixed(4)} ${farm.token}`)
}

async function loadLiquidityMiningInfo(App, farm, rewardTokenPrice, rewardsProxy) {
  const REWARDS_PROXY = new ethers.Contract(rewardsProxy, PENDLE_REWARDS_PROXY_ABI, App.provider)
  const MARKET = new ethers.Contract(farm.market, PENDLE_MARKET_ABI, App.provider)
  const STAKING = new ethers.Contract(farm.staking, PENDLE_LIQUIDITY_MINING_ABI, App.provider)
  const TOKEN = new ethers.Contract(await MARKET.token(), ERC20_ABI, App.provider)
  const TOKEN_DECIMALS = parseInt(await TOKEN.decimals())
  const YT = new ethers.Contract(await MARKET.xyt(), ERC20_ABI, App.provider)
  const YT_DECIMALS = parseInt(await YT.decimals())
  
  const expiry = await MARKET.expiry()
  const marketSymbol = await MARKET.symbol()
  const ticker = `[${farm.yt}]-[${farm.token}] ${marketSymbol}`
  const epochDuration = await STAKING.epochDuration()
  const reserves = await MARKET.getReserves()
  const ytPoolBalance = parseFloat(reserves[0]) / 10**YT_DECIMALS
  const ytWeight = parseFloat(reserves[1])
  const tokenPoolBalance = parseFloat(reserves[2]) / 10**TOKEN_DECIMALS
  const tokenWeight = parseFloat(reserves[3])
  const lpTotalSupply = parseFloat(await MARKET.totalSupply()) / 1e18

  const tokenPrice = await getTokenPrice(COINGECKO_IDS[await TOKEN.symbol()])
  const tvl = (tokenPoolBalance * tokenPrice) / (tokenWeight / 2**40)
  const lpPrice = tvl / lpTotalSupply / 10**(18-TOKEN_DECIMALS)  
  const ytPrice = (tokenPoolBalance / (tokenWeight / 2**40)) / (ytPoolBalance / (ytWeight / 2**40))
  const lpStaked = parseFloat((await STAKING.readExpiryData(expiry)).totalStakeLP)
  const lpStakedPrice = lpStaked * (lpPrice / 10**TOKEN_DECIMALS)

  const latestSetting = await STAKING.latestSetting()
  const allocationSettings = parseFloat(await STAKING.allocationSettings(latestSetting.id, expiry))
  const currentEpoch = Math.floor((((Date.now() / 1000) - await STAKING.startTime()) / epochDuration) + 1)
  const rewardsPerEpoch =  parseFloat(await STAKING.totalRewardsForEpoch(currentEpoch))
  const rewardsPerEpochUSD = (rewardsPerEpoch / 1e18) * rewardTokenPrice
  const rewardsAllocated = allocationSettings ? (allocationSettings * rewardsPerEpoch) / 1e9 : 0
  const rewardsPerEpochPerLP = rewardsAllocated / lpStaked
  const apr = (rewardsPerEpochPerLP * rewardTokenPrice / epochDuration * 31536000 / (lpPrice * 10**(18-TOKEN_DECIMALS))) * 100

  const userStaked = parseFloat(await STAKING.getBalances(expiry, App.YOUR_ADDRESS)) / 1e18
  const userStakedUSD = userStaked * (lpPrice * 10**(18-TOKEN_DECIMALS))
  const userPoolOwnership = userStaked / (lpStaked / 1e18) * 100
  const userAvailableToStake = parseFloat(await MARKET.balanceOf(App.YOUR_ADDRESS)) / 1e18

  let liquidityRewards = 0;
  let pendingRewards = 0;
  try {
    liquidityRewards = await REWARDS_PROXY.callStatic.redeemLiquidityRewards(farm.staking, [expiry], App.YOUR_ADDRESS)

    for (let i = 0; i < liquidityRewards.pendingRewards.length; i++) {
      pendingRewards += parseInt(liquidityRewards.pendingRewards[i])
    }

    liquidityRewards = liquidityRewards.rewards
  } catch {}  
  const userClaimableRewards = liquidityRewards / 1e18
  const userPendingRewards = pendingRewards / 1e18

  return  {
    farm,
    expiry,
    marketSymbol,
    ticker,
    tvl,
    lpPrice,
    ytPrice,
    tokenPrice,
    tokenPrice,
    lpStaked,
    lpStakedPrice,
    rewardsPerEpoch,
    rewardsPerEpochUSD,
    apr,
    userStaked,
    userStakedUSD,
    userPoolOwnership,
    userAvailableToStake,
    userClaimableRewards,
    userPendingRewards,
    ytPoolBalance,
    tokenPoolBalance,
    epochDuration,
  }
}

async function printLiquidityMiningInfo(App, info, rewardTokenTicker, rewardTokenPrice, rewardsProxy) {
  _print(
    `<a href='https://app.pendle.finance/trade?t=liquidity' target='_blank'>${info.ticker}</a> <a href='https://app.pendle.finance/trade?t=swap' target='_blank'>[<=>]</a> Price: $${formatMoney(info.lpPrice)} TVL: $${formatMoney(
      info.tvl
    )}`
  )
  _print(`${info.farm.yt} Price: $${displayPrice(info.ytPrice)}`)
  _print(`${info.farm.token} Price: $${displayPrice(info.tokenPrice)}`)
  _print(`${rewardTokenTicker} Price: $${displayPrice(rewardTokenPrice)}`)
  _print(`${rewardTokenTicker} Per Epoch: ${formatMoney(info.rewardsPerEpoch / 1e18)} ($${formatMoney(info.rewardsPerEpochUSD)})`)

  const weeklyAPR = info.apr / 365 * 7
  const dailyAPR = weeklyAPR / 7

  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${info.apr.toFixed(2)}%`)
  _print(`Total Staked: ${(info.lpStaked / 1e18).toFixed(18)} ${info.marketSymbol} ($${formatMoney(info.lpStakedPrice)})`)
  _print(
    `You are staking ${info.userStaked.toFixed(18)} ${info.marketSymbol} ` +
      `$${formatMoney(info.userStakedUSD)} (${info.userPoolOwnership.toFixed(2)}% of the pool).`
  )

  if (info.userStaked > 0) {
    print_contained_price(info.farm, info.userPoolOwnership, info.ytPoolBalance, info.tokenPoolBalance)
    const userWeeklyRewards = (info.userPoolOwnership / 100) * (info.rewardsPerEpoch / 1e18 / info.epochDuration * 604800)
    const userDailyRewards = userWeeklyRewards / 7
    const userYearlyRewards = userWeeklyRewards * 52
    _print(
      `Estimated ${rewardTokenTicker} earnings:` +
        ` Day ${formatMoney(userDailyRewards)} ($${formatMoney(userDailyRewards * rewardTokenPrice)})` +
        ` Week ${formatMoney(userWeeklyRewards)} ($${formatMoney(userWeeklyRewards * rewardTokenPrice)})` +
        ` Year ${formatMoney(userYearlyRewards)} ($${formatMoney(userYearlyRewards * rewardTokenPrice)})`
    )
  }

  _print(
    `Accrued rewards: ${(info.userClaimableRewards + info.userPendingRewards).toFixed(3)} ${rewardTokenTicker} ` +
    `($${formatMoney((info.userClaimableRewards + info.userPendingRewards) * rewardTokenPrice)}) ` +
    `[Claimable: ${info.userClaimableRewards.toFixed(3)} ${rewardTokenTicker} ($${formatMoney(info.userClaimableRewards)})]`
  )

  const approveAndStake = async function() {
    const signer = App.provider.getSigner()

    const MARKET = new ethers.Contract(info.farm.market, PENDLE_MARKET_ABI, signer)
    const STAKING = new ethers.Contract(info.farm.staking, PENDLE_LIQUIDITY_MINING_ABI, signer)

    const maxAllowance = ethers.constants.MaxUint256
    const balance = await MARKET.balanceOf(App.YOUR_ADDRESS)
    const current = balance / 1e18
    const allowed = await MARKET.allowance(App.YOUR_ADDRESS, info.farm.staking)

    let allow = Promise.resolve()

    if (allowed / 1e18 < current / 1e18) {
      showLoading()

      allow = MARKET.approve(info.farm.staking, maxAllowance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (current > 0) {
      showLoading()

      allow
        .then(async function() {
          STAKING.stake(info.expiry, balance)
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(x => {
              hideLoading()
              console.log(x)
              _print('Something went wrong.')
            })
        })
        .catch(x => {
          hideLoading()
          console.log(x)
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const withdraw = async function() {
    const signer = App.provider.getSigner()

    const STAKING = new ethers.Contract(info.farm.staking, PENDLE_LIQUIDITY_MINING_ABI, signer)
    const balance = await STAKING.getBalances(info.expiry, App.YOUR_ADDRESS)

    if (parseInt(balance) > 0) {
      showLoading()

      STAKING.withdraw(info.expiry, balance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const claim = async function() {
    const signer = App.provider.getSigner()
  
    const REWARDS_PROXY = new ethers.Contract(rewardsProxy, PENDLE_REWARDS_PROXY_ABI, signer)
  
    if (info.userClaimableRewards > 0) {
      showLoading()

      REWARDS_PROXY.redeemLiquidityRewards(info.farm.staking, [info.expiry], App.YOUR_ADDRESS)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const revoke = async function() {
    const signer = App.provider.getSigner()

    const MARKET = new ethers.Contract(info.farm.market, PENDLE_MARKET_ABI, signer)

    showLoading()

    MARKET.approve(info.farm.staking, 0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }

  _print(`<a target="_blank" href="https://etherscan.io/address/${info.farm.staking}#code">Etherscan</a>`)
  _print_link(`Stake ${info.userAvailableToStake.toFixed(18)} ${info.marketSymbol}`, approveAndStake)
  _print_link(`Withdraw ${info.userStaked.toFixed(18)} ${info.marketSymbol}`, withdraw)
  _print_link(
    `Claim ${info.userClaimableRewards.toFixed(3)} ${rewardTokenTicker} ($${formatMoney(info.userClaimableRewards * rewardTokenPrice)})`,
    claim
  )
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print('')
}

async function loadSingleSidedInfo(App, pool, rewardTokenAddress, rewardTokenPrice) {
  const PENDLE = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider)
  const POOL = new ethers.Contract(pool.staking, PENDLE_SINGLE_STAKING_ABI, App.provider)
  const MANAGER = new ethers.Contract(pool.manager, PENDLE_SINGLE_STAKING_MANAGER_ABI, App.provider)

  const pendleStaked = parseFloat(await POOL.totalSupply()) / 1e18
  const tvl = pendleStaked * rewardTokenPrice
  const rewardPerBlock = parseFloat(await MANAGER.rewardPerBlock())
  const rewardPerBlockUSD = rewardPerBlock / 1e18 * rewardTokenPrice
  const userAvailableToStake = parseFloat(await PENDLE.balanceOf(App.YOUR_ADDRESS))
  const userShare = await POOL.balances(App.YOUR_ADDRESS)
  const userShareUSD = parseFloat(userShare) / 1e18 * rewardTokenPrice
  const userPoolOwnership = (parseFloat(userShare) / 1e18) / pendleStaked * 100

  return {
    pool,
    pendleStaked,
    tvl,
    rewardPerBlock,
    rewardPerBlockUSD,
    userAvailableToStake,
    userShare,
    userShareUSD,
    userPoolOwnership,
  }
}

async function printSingleSidedInfo(App, info, rewardTokenTicker, rewardTokenAddress, rewardTokenPrice) {
  _print(
    `<a href='https://app.pendle.finance/farm' target='_blank'>${rewardTokenTicker} SINGLE STAKING POOL</a> TVL: $${formatMoney(info.tvl)}`
  )
  _print(`${rewardTokenTicker} Price: $${displayPrice(rewardTokenPrice)}`)
  _print(`${rewardTokenTicker} Per Block: ${info.rewardPerBlock / 1e18} ($${formatMoney(info.rewardPerBlockUSD)})`)

  const yearlyAPR = ((info.rewardPerBlock / 1e18) * 365 * 86400 / 13.1) / info.pendleStaked * 100 // avg 13.1 seconds block time
  const weeklyAPR = yearlyAPR / 52
  const dailyAPR = yearlyAPR / 365

  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`)
  _print(`Total Staked: ${formatMoney(info.pendleStaked)} ${rewardTokenTicker} ($${formatMoney(info.tvl)})`)
  _print(
    `You are staking ${formatMoney(parseFloat(info.userShare) / 1e18)} ${rewardTokenTicker} ` +
      `$${formatMoney(info.userShareUSD)} (${info.userPoolOwnership.toFixed(5)}% of the pool).`
  )

  if (parseFloat(info.userShare) > 0) {
    const userYearlyRewards = (info.userPoolOwnership / 100) * ((info.rewardPerBlock / 1e18) * 365 * 86400 / 13.1)
    const userWeeklyRewards = userYearlyRewards / 52
    const userDailyRewards = userYearlyRewards / 365
    _print(
      `Estimated ${rewardTokenTicker} earnings:` +
        ` Day ${formatMoney(userDailyRewards)} ($${formatMoney(userDailyRewards * rewardTokenPrice)})` +
        ` Week ${formatMoney(userWeeklyRewards)} ($${formatMoney(userWeeklyRewards * rewardTokenPrice)})` +
        ` Year ${formatMoney(userYearlyRewards)} ($${formatMoney(userYearlyRewards * rewardTokenPrice)})`
    )
  }

  const approveAndStake = async function() {
    const signer = App.provider.getSigner()

    const PENDLE = new ethers.Contract(rewardTokenAddress, ERC20_ABI, signer)
    const POOL = new ethers.Contract(info.pool.staking, PENDLE_SINGLE_STAKING_ABI, signer)

    const maxAllowance = ethers.constants.MaxUint256
    const balanceOf = await PENDLE.balanceOf(App.YOUR_ADDRESS)
    const current = balanceOf / 1e18
    const allowed = await PENDLE.allowance(App.YOUR_ADDRESS, info.pool.staking)

    let allow = Promise.resolve()

    if (allowed / 1e18 < current / 1e18) {
      showLoading()

      allow = PENDLE.approve(info.pool.staking, maxAllowance)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (current > 0) {
      showLoading()

      allow
        .then(async function() {
          POOL.enter(balanceOf)
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(x => {
              hideLoading()
              console.log(x)
              _print('Something went wrong.')
            })
        })
        .catch(x => {
          hideLoading()
          console.log(x)
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const unstake = async function() {
    const signer = App.provider.getSigner()

    const POOL = new ethers.Contract(info.pool.staking, PENDLE_SINGLE_STAKING_ABI, signer)

    if (parseFloat(info.userShare) > 0) {
      showLoading()

      POOL.leave(info.userShare)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const revoke = async function() {
    const signer = App.provider.getSigner()

    const PENDLE = new ethers.Contract(rewardTokenAddress, ERC20_ABI, signer)

    showLoading()

    PENDLE.approve(info.pool.staking, 0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }

  _print(`<a target="_blank" href="https://etherscan.io/address/${info.pool.staking}#code">Etherscan</a>`)
  _print_link(`Stake ${formatMoney(info.userAvailableToStake / 1e18)} ${rewardTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${formatMoney(info.userShare / 1e18)} ${rewardTokenTicker}`, unstake)
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print('')
}

async function main() {
  const App = await init_ethers()

  _print(`Initialized ${App.YOUR_ADDRESS}`)
  _print('Reading smart contracts...\n')

  const rewardTokenTicker = 'PENDLE'
  const rewardTokenAddress = '0x808507121B80c02388fAd14726482e061B8da827'
  const rewardTokenPrice = await getTokenPrice(COINGECKO_IDS[rewardTokenTicker])
  const rewardsProxy = '0x246Bc457768b96003349C367E42021ef47DF1640'

  _print('=========================== PENDLE MARKET POOLS ===========================\n')

  _print('*** Note ***')
  _print('- Liquidity Mining contracts can support multiple expiries.')
  _print('- As all PendleMarket LPs are 18 decimals, the LP price shown would be')
  _print('  equivalent to LP / 10^BASE_TOKEN_DECIMALS, or e.g. every')
  _print('  0.000001 LP for the YT-aUSDC-USDC pool as USDC is 6 decimals.')
  _print(`- Accrued ${rewardTokenTicker} rewards linearly vests over 5 epochs.\n`)

  let info
  for (i in FARMS) {
    info = await loadLiquidityMiningInfo(App, FARMS[i], rewardTokenPrice, rewardsProxy)
    printLiquidityMiningInfo(App, info, rewardTokenTicker, rewardTokenPrice, rewardsProxy)

    _print("")
  }

  _print('========================== SINGLE SIDED STAKING POOL =========================\n')

  info = await loadSingleSidedInfo(App, SINGLE_SIDED, rewardTokenAddress, rewardTokenPrice)
  printSingleSidedInfo(App, info, rewardTokenTicker, rewardTokenAddress, rewardTokenPrice)

  // _print('============================= SUSHISWAP POOLS =============================\n')

  hideLoading()
}
