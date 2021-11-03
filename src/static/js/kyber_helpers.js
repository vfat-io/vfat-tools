KYBER_FAIR_LAUNCH_ABI = [{"inputs":[{"internalType":"address","name":"_admin","type":"address"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"contract IKyberRewardLocker","name":"_rewardLocker","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"uint32","name":"startBlock","type":"uint32"},{"indexed":true,"internalType":"uint32","name":"endBlock","type":"uint32"},{"indexed":false,"internalType":"uint256[]","name":"rewardPerBlocks","type":"uint256[]"}],"name":"AddNewPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"blockNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"blockNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"address","name":"rewardToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"lockedAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"startBlock","type":"uint32"},{"indexed":true,"internalType":"uint32","name":"endBlock","type":"uint32"},{"indexed":false,"internalType":"uint256[]","name":"rewardPerBlocks","type":"uint256[]"}],"name":"RenewPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint32","name":"endBlock","type":"uint32"},{"indexed":false,"internalType":"uint256[]","name":"rewardPerBlocks","type":"uint256[]"}],"name":"UpdatePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"blockNumber","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint32","name":"_startBlock","type":"uint32"},{"internalType":"uint32","name":"_endBlock","type":"uint32"},{"internalType":"uint256[]","name":"_rewardPerBlocks","type":"uint256[]"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"rewardTokenIndex","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"adminWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bool","name":"_shouldHarvest","type":"bool"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"getPoolInfo","outputs":[{"internalType":"uint256","name":"totalStake","type":"uint256"},{"internalType":"address","name":"stakeToken","type":"address"},{"internalType":"uint32","name":"startBlock","type":"uint32"},{"internalType":"uint32","name":"endBlock","type":"uint32"},{"internalType":"uint32","name":"lastRewardBlock","type":"uint32"},{"internalType":"uint256[]","name":"rewardPerBlocks","type":"uint256[]"},{"internalType":"uint256[]","name":"accRewardPerShares","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardTokens","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_account","type":"address"}],"name":"getUserInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256[]","name":"unclaimedRewards","type":"uint256[]"},{"internalType":"uint256[]","name":"lastRewardPerShares","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_pids","type":"uint256[]"}],"name":"harvestMultiplePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pendingAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256[]","name":"rewards","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint32","name":"_startBlock","type":"uint32"},{"internalType":"uint32","name":"_endBlock","type":"uint32"},{"internalType":"uint256[]","name":"_rewardPerBlocks","type":"uint256[]"}],"name":"renewPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardLocker","outputs":[{"internalType":"contract IKyberRewardLocker","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint32","name":"_endBlock","type":"uint32"},{"internalType":"uint256[]","name":"_rewardPerBlocks","type":"uint256[]"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePoolRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

KYBER_REWARD_LOCKER_ABI = [{"inputs":[{"internalType":"address","name":"_admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"rewardContract","type":"address"},{"indexed":true,"internalType":"contract IERC20Ext","name":"token","type":"address"},{"indexed":false,"internalType":"bool","name":"isAdded","type":"bool"}],"name":"RewardContractAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20Ext","name":"token","type":"address"},{"indexed":false,"internalType":"uint64","name":"vestingDuration","type":"uint64"}],"name":"SetVestingDuration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20Ext","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"vestedQuantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"}],"name":"Vested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"contract IERC20Ext","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"startBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"}],"name":"VestingEntryCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":true,"internalType":"contract IERC20Ext","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"VestingEntryQueued","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"contract IERC20Ext","name":"","type":"address"}],"name":"accountEscrowedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"contract IERC20Ext","name":"","type":"address"}],"name":"accountVestedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"address","name":"_rewardContract","type":"address"}],"name":"addRewardsContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"}],"name":"getRewardContractsPerToken","outputs":[{"internalType":"address[]","name":"rewardContracts","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVestingScheduleAtIndex","outputs":[{"components":[{"internalType":"uint64","name":"startBlock","type":"uint64"},{"internalType":"uint64","name":"endBlock","type":"uint64"},{"internalType":"uint128","name":"quantity","type":"uint128"},{"internalType":"uint128","name":"vestedQuantity","type":"uint128"}],"internalType":"struct IKyberRewardLocker.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"contract IERC20Ext","name":"token","type":"address"}],"name":"getVestingSchedules","outputs":[{"components":[{"internalType":"uint64","name":"startBlock","type":"uint64"},{"internalType":"uint64","name":"endBlock","type":"uint64"},{"internalType":"uint128","name":"quantity","type":"uint128"},{"internalType":"uint128","name":"vestedQuantity","type":"uint128"}],"internalType":"struct IKyberRewardLocker.VestingSchedule[]","name":"schedules","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"lock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"quantity","type":"uint256"},{"internalType":"uint256","name":"startBlock","type":"uint256"}],"name":"lockWithStartBlock","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"contract IERC20Ext","name":"token","type":"address"}],"name":"numVestingSchedules","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pendingAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"address","name":"_rewardContract","type":"address"}],"name":"removeRewardsContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"uint64","name":"_vestingDuration","type":"uint64"}],"name":"setVestingDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"}],"name":"vestCompletedSchedules","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext[]","name":"tokens","type":"address[]"}],"name":"vestCompletedSchedulesForMultipleTokens","outputs":[{"internalType":"uint256[]","name":"vestedAmounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"uint256[]","name":"indexes","type":"uint256[]"}],"name":"vestScheduleAtIndices","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext[]","name":"tokens","type":"address[]"},{"internalType":"uint256[][]","name":"indices","type":"uint256[][]"}],"name":"vestScheduleForMultipleTokensAtIndices","outputs":[{"internalType":"uint256[]","name":"vestedAmounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"token","type":"address"},{"internalType":"uint256","name":"startIndex","type":"uint256"},{"internalType":"uint256","name":"endIndex","type":"uint256"}],"name":"vestSchedulesInRange","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20Ext","name":"","type":"address"}],"name":"vestingDurationPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

DMM_POOL_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"feeInPrecision","type":"uint256"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"vReserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"vReserve1","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reserve1","type":"uint256"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"shortEMA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"longEMA","type":"uint256"},{"indexed":false,"internalType":"uint128","name":"lastBlockVolume","type":"uint128"},{"indexed":false,"internalType":"uint256","name":"skipBlock","type":"uint256"}],"name":"UpdateEMA","type":"event"},{"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ampBps","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"contract IDMMFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTradeInfo","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint112","name":"_vReserve0","type":"uint112"},{"internalType":"uint112","name":"_vReserve1","type":"uint112"},{"internalType":"uint256","name":"feeInPrecision","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVolumeTrendData","outputs":[{"internalType":"uint128","name":"_shortEMA","type":"uint128"},{"internalType":"uint128","name":"_longEMA","type":"uint128"},{"internalType":"uint128","name":"_currentBlockVolume","type":"uint128"},{"internalType":"uint128","name":"_lastTradeBlock","type":"uint128"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token0","type":"address"},{"internalType":"contract IERC20","name":"_token1","type":"address"},{"internalType":"uint32","name":"_ampBps","type":"uint32"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"callbackData","type":"bytes"}],"name":"swap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token0","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token1","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

COINGECKO_IDS = {
  KNC: 'kyber-network-crystal',
  ETH: 'ethereum',
  MATIC: 'matic-network',
  USDT: 'tether',
  'USDT.E': 'tether',
  USDC: 'usd-coin',
  'USDC.E': 'usd-coin',
  BUSD: 'binance-usd',
  DAI: 'dai',
  WBTC: 'wrapped-bitcoin',
  WETH: 'weth',
  'WETH.E': 'weth',
  WMATIC: 'wmatic',
  WBNB: 'wbnb',
  AVAX: 'avalanche-2',
  WAVAX: 'wrapped-avax',
  XUSD: 'xdollar-stablecoin',
  HERO: 'step-hero',
  XDO: 'xdollar',
  DYP: 'defi-yield-protocol',
  APEIN: 'ape-in',
  FIWA: 'defi-warrior',
  CTR: 'creator-platform',
}

async function getCoinGeckoPrice(symbol) {
  let raw = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + symbol + '&vs_currencies=usd')
  let json = await raw.text()

  return JSON.parse(json)[symbol]['usd']
}

async function lp_composition(pool, token0Balance, token1Balance) {
  _print(`Your LP tokens comprise of ${token0Balance.toFixed(8)} ${pool.token0} + ${token1Balance.toFixed(8)} ${pool.token1}`)
}

async function loadLiquidityMiningInfo(App, pool, blockTime, KyberRewardLocker, TOKEN_ADDRESSES, POOLS, REWARDS) {
  const POOL = new ethers.Contract(pool.pool, DMM_POOL_ABI, App.provider)
  const FARMING = new ethers.Contract(pool.farming, KYBER_FAIR_LAUNCH_ABI, App.provider)
  const LOCKER = new ethers.Contract(KyberRewardLocker, KYBER_REWARD_LOCKER_ABI, App.provider)
  const TOKEN0 = new ethers.Contract(TOKEN_ADDRESSES[pool.token0], ERC20_ABI, App.provider)
  const TOKEN1 = new ethers.Contract(TOKEN_ADDRESSES[pool.token1], ERC20_ABI, App.provider)

  const lpSymbol = await POOL.symbol()
  const ticker = `[${pool.token0}]-[${pool.token1}] ${lpSymbol}`
  const reserves = await POOL.getReserves()
  const rewardTokens = await FARMING.getRewardTokens()
  const poolInfo = await FARMING.getPoolInfo(pool.pid)
  const lpTotalSupply = (await POOL.totalSupply()) / 1e18
  const token0Decimals = await TOKEN0.decimals()
  const token1Decimals = await TOKEN1.decimals()
  const token0Balance = (parseFloat(reserves._reserve0)) / 10**token0Decimals
  const token1Balance = (parseFloat(reserves._reserve1)) / 10**token1Decimals

  const token0Price = token1Balance / token0Balance
  const token1Price = token0Balance / token1Balance
  const token0MarketPrice = await getCoinGeckoPrice(COINGECKO_IDS[(await TOKEN0.symbol()).toUpperCase()])
  const token1MarketPrice = await getCoinGeckoPrice(COINGECKO_IDS[(await TOKEN1.symbol()).toUpperCase()])
  const tvl = (token0Balance * token0MarketPrice) + (token1Balance * token1MarketPrice)
  const lpPrice = tvl / lpTotalSupply
  const lpStaked = poolInfo.totalStake / 1e18
  const lpStakedPrice = lpStaked * lpPrice
  const userInfo = await FARMING.getUserInfo(pool.pid, App.YOUR_ADDRESS)
  const userStaked = userInfo.amount / 1e18
  const userStakedUSD = userStaked * lpPrice
  const userPoolOwnership = (userStaked / lpTotalSupply) * 100
  const userAvailableToStake = (await POOL.balanceOf(App.YOUR_ADDRESS)) / 1e18
  const userHarvestableRewards = await FARMING.pendingRewards(pool.pid, App.YOUR_ADDRESS)
  const userToken0Balance = userPoolOwnership * token0Balance / 100
  const userToken1Balance = userPoolOwnership * token1Balance / 100
  const currentBlock = await App.provider.getBlockNumber()
  const endBlock = poolInfo.endBlock

  let apr = 0
  let rewards = ''
  let rewardsPerWeek = ''
  let userVestingRewards = {}
  let userVestedRewards = {}
  let rewardsPerBlock = 0;
  for (let tokenAddr of rewardTokens) {
    let token = Object.keys(REWARDS).find(key => REWARDS[key].address == tokenAddr)
    rewards += ` ${token} $${formatMoney(REWARDS[token].price)}`
    
    if (currentBlock < endBlock) {
      rewardsPerBlock = poolInfo.rewardPerBlocks[Object.keys(REWARDS).indexOf(token)] / 1e18 || 0
    } else {
      rewardsPerBlock = 0;
    }
    REWARDS[token].rewardsPerBlock = rewardsPerBlock
    let weeklyRewardsCalc = (rewardsPerBlock / blockTime) * (60 * 60 * 24 * 7) // Avg 13s block time
    rewardsPerWeek += ` ${token} ${weeklyRewardsCalc.toFixed(8)} ($${formatMoney(weeklyRewardsCalc * REWARDS[token].price)})`

    let rewardsPerLP = rewardsPerBlock / lpStaked
    let rewardAPR = (((rewardsPerLP * REWARDS[token].price / blockTime) * 31536000) / lpPrice) * 100
    apr += rewardAPR

    userVestingRewards[token] = {
      reward: await LOCKER.accountEscrowedBalance(App.YOUR_ADDRESS, tokenAddr) / 1e18
    }
    userVestedRewards[token] = {
      reward: await LOCKER.accountVestedBalance(App.YOUR_ADDRESS, tokenAddr) / 1e18
    }
  }

  return {
    pool,
    ticker,
    token0Price,
    token1Price,
    tvl,
    lpSymbol,
    lpPrice,
    lpStaked,
    lpStakedPrice,
    rewardTokens,
    rewards,
    rewardsPerWeek,
    apr,
    userStaked,
    userStakedUSD,
    userPoolOwnership,
    userAvailableToStake,
    userHarvestableRewards,
    userToken0Balance,
    userToken1Balance,
    userVestingRewards,
    userVestedRewards,
  }
}

async function printLiquidityMiningInfo(App, info, blockTime, explorer, TOKEN_ADDRESSES, REWARDS) {
  _print(
    `<a href='https://${explorer.info}.dmm.exchange/pool/${info.pool.pool}' target='_blank'>${info.ticker.toUpperCase()}</a> ` +
     `<a href='https://dmm.exchange/#/add/${TOKEN_ADDRESSES[info.pool.token0]}/${TOKEN_ADDRESSES[info.pool.token1]}/${info.pool.pool}' target='_blank'>[+]</a> ` +
     `<a href='https://dmm.exchange/#/remove/${TOKEN_ADDRESSES[info.pool.token0]}/${TOKEN_ADDRESSES[info.pool.token1]}/${info.pool.pool}' target='_blank'>[-]</a> ` +
     `<a href='https://dmm.exchange/#/swap?inputCurrency=${TOKEN_ADDRESSES[info.pool.token0]}&outputCurrency=${TOKEN_ADDRESSES[info.pool.token1]}' target='_blank'>[<=>]</a> ` +
     `LP Price: $${formatMoney(info.lpPrice)} TVL: $${formatMoney(info.tvl)}`
  )
  _print(`${info.pool.token0}/${info.pool.token1} Price: ${info.token0Price.toFixed(8)}`)
  _print(`${info.pool.token1}/${info.pool.token0} Price: ${info.token1Price.toFixed(8)}`)
  _print(`Reward Tokens:${info.rewards}`)
  _print(`Rewards Per Week:${info.rewardsPerWeek}`)

  const weeklyAPR = info.apr / 365 * 7
  const dailyAPR = info.apr / 365

  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${info.apr.toFixed(2)}%`)
  _print(`Total Staked: ${(info.lpStaked).toFixed(18)} ${info.lpSymbol} ($${formatMoney(info.lpStakedPrice)})`)
  _print(
    `You are staking ${info.userStaked.toFixed(18)} ${info.lpSymbol} ` +
      `$${formatMoney(info.userStakedUSD)} (${info.userPoolOwnership.toFixed(2)}% of the pool).`
  )

  if (info.userStaked > 0) {
    lp_composition(info.pool, info.userToken0Balance, info.userToken1Balance)
    for (let tokenAddr of info.rewardTokens) {
      let token = Object.keys(REWARDS).find(key => REWARDS[key].address == tokenAddr)
      const userWeeklyRewards = (info.userPoolOwnership / 100) * (REWARDS[token].rewardsPerBlock / blockTime * 604800)
      const userDailyRewards = userWeeklyRewards / 7
      const userYearlyRewards = userWeeklyRewards * 52
      _print(
        `Estimated ${token} earnings:` +
          ` Day ${formatMoney(userDailyRewards)} ($${formatMoney(userDailyRewards * REWARDS[token].price)})` +
          ` Week ${formatMoney(userWeeklyRewards)} ($${formatMoney(userWeeklyRewards * REWARDS[token].price)})` +
          ` Year ${formatMoney(userYearlyRewards)} ($${formatMoney(userYearlyRewards * REWARDS[token].price)})`
      )
    }
  }

  let vesting = ''
  let vested = ''
  for (let tokenAddr of info.rewardTokens) {
    let token = Object.keys(REWARDS).find(key => REWARDS[key].address == tokenAddr)

    vesting +=
      ` ${info.userVestingRewards[token].reward.toFixed(8)} ${token} ` +
      `($${formatMoney(info.userVestingRewards[token].reward * REWARDS[token].price)})`

    vested +=
      ` ${info.userVestedRewards[token].reward.toFixed(8)} ${token} ` +
      `($${formatMoney(info.userVestedRewards[token].reward * REWARDS[token].price)})`
  }
  _print(`Vesting rewards:${vesting}`)
  _print(`Vested rewards:${vested}`)

  const approveAndStake = async function() {
    const signer = App.provider.getSigner()

    const POOL = new ethers.Contract(info.pool.pool, DMM_POOL_ABI, signer)
    const FARMING = new ethers.Contract(info.pool.farming, KYBER_FAIR_LAUNCH_ABI, signer)

    const maxAllowance = ethers.constants.MaxUint256
    const balance = await POOL.balanceOf(App.YOUR_ADDRESS)
    const current = balance / 1e18
    const allowed = await POOL.allowance(App.YOUR_ADDRESS, info.pool.farming)

    let allow = Promise.resolve()

    if (allowed / 1e18 < current / 1e18) {
      showLoading()

      allow = POOL.approve(info.pool.farming, maxAllowance)
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
          FARMING.deposit(info.pool.pid, balance, false)
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(x => {
              hideLoading()
              _print(x)
              _print('Something went wrong.')
            })
        })
        .catch(x => {
          hideLoading()
          _print(x)
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }

  const withdraw = async function() {
    const signer = App.provider.getSigner()

    const FARMING = new ethers.Contract(info.pool.farming, KYBER_FAIR_LAUNCH_ABI, signer)

    console.log(info.userStaked > 0)
    if (info.userStaked > 0) {
      showLoading()

      FARMING.withdrawAll(info.pool.pid)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const harvest = async function() {
    const signer = App.provider.getSigner()
  
    const FARMING = new ethers.Contract(info.pool.farming, KYBER_FAIR_LAUNCH_ABI, signer)
    let userHarvestableRewards = 0
    for (let harvest of info.userHarvestableRewards) {
      userHarvestableRewards += harvest
    }
  
    if (userHarvestableRewards > 0) {
      showLoading()

      FARMING.harvest(info.pool.pid)
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
  
    const LOCKER = new ethers.Contract(KyberRewardLocker, KYBER_REWARD_LOCKER_ABI, signer)
  
    let rewards = 0
    for (let tokenAddr of info.rewardTokens) {
      let token = Object.keys(REWARDS).find(key => REWARDS[key].address == tokenAddr)
      rewards += info.userVestingRewards[token].reward
    }

    if (rewards > 0) {
      showLoading()

      LOCKER.vestCompletedSchedulesForMultipleTokens(info.rewardTokens)
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

    const POOL = new ethers.Contract(info.pool.pool, DMM_POOL_ABI, signer)

    showLoading()

    POOL.approve(info.pool.farming, 0)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }

  _print(`<a target="_blank" href="https://${explorer.url}/address/${info.pool.farming}#code">${explorer.name}</a>`)
  _print_link(`Stake ${info.userAvailableToStake.toFixed(18)} ${info.lpSymbol}`, approveAndStake)
  _print_link(`Withdraw ${info.userStaked.toFixed(18)} ${info.lpSymbol}`, withdraw)
  let userHarvestableRewards = ''
  for (let tokenAddr of info.rewardTokens) {
    let token = Object.keys(REWARDS).find(key => REWARDS[key].address == tokenAddr)
    const tokenHarvestable = info.userHarvestableRewards[info.rewardTokens.indexOf(tokenAddr)] / 1e18
    userHarvestableRewards +=
      ` ${tokenHarvestable.toFixed(4)}` +
      ` ${token} ($${formatMoney(tokenHarvestable * REWARDS[token].price)})`
  }
  _print_link(
    `Harvest${userHarvestableRewards}`,
    harvest
  )
  _print_link(
    `Claim${vested}`,
    claim
  )
  _print_link(`Revoke (set approval to 0)`, revoke)
  _print('')
}
