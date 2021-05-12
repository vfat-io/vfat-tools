$(function() {
  consoleInit(main);
});

const BONE = ethers.BigNumber.from(10).pow(18);
const AVG_BLOCK_TIME = 13.1

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const STAKING_ABI = [ { "inputs": [ { "internalType": "address", "name": "oilerToken_", "type": "address" }, { "internalType": "uint256", "name": "stakingDurationInBlocks_", "type": "uint256" }, { "internalType": "uint256", "name": "stakingFundAmount_", "type": "uint256" }, { "internalType": "uint256", "name": "vestingDuration_", "type": "uint256" }, { "internalType": "address", "name": "owner_", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountEarned", "type": "uint256" } ], "name": "RewardGranted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lockingPeriodInBlocks", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "expectedStakingRewardPoints", "type": "uint256" } ], "name": "StakeLocked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lockingPeriodInBlocks", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rewardPoints", "type": "uint256" } ], "name": "StakeUnlocked", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lockingPeriodInBlocks", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "actualLockingPeriodInBlocks", "type": "uint256" } ], "name": "StakeUnlockedPrematurely", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "grantedTokensReleased", "type": "event" }, { "inputs": [ { "internalType": "uint72", "name": "tokenAmount_", "type": "uint72" }, { "internalType": "uint24", "name": "lockingPeriodInBlocks_", "type": "uint24" } ], "name": "calculateStakingRewardPoints", "outputs": [ { "internalType": "uint128", "name": "", "type": "uint128" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "getRewards", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "grantedTokens", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint72", "name": "tokenAmount_", "type": "uint72" }, { "internalType": "uint24", "name": "lockingPeriodInBlocks_", "type": "uint24" } ], "name": "lockTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "oilerToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolToken", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "release", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "releasedTokens", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "rewardPointsEarned", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "poolToken_", "type": "address" }, { "internalType": "address", "name": "stakingFundAddress_", "type": "address" } ], "name": "setPoolToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "stakes", "outputs": [ { "internalType": "uint72", "name": "tokenAmount", "type": "uint72" }, { "internalType": "uint24", "name": "lockingPeriodInBlocks", "type": "uint24" }, { "internalType": "uint32", "name": "startBlock", "type": "uint32" }, { "internalType": "uint128", "name": "expectedStakingRewardPoints", "type": "uint128" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingFundAmount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakingProgramEndsBlock", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalRewardPoints", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unlockTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "vestingDuration", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];
  const UNISWAP_ABI = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" } ], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" } ], "name": "Mint", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" } ], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" } ], "name": "Sync", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MINIMUM_LIQUIDITY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "PERMIT_TYPEHASH", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" } ], "name": "burn", "outputs": [ { "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "factory", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getReserves", "outputs": [ { "internalType": "uint112", "name": "reserve0", "type": "uint112" }, { "internalType": "uint112", "name": "reserve1", "type": "uint112" }, { "internalType": "uint32", "name": "blockTimestampLast", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "kLast", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" } ], "name": "mint", "outputs": [ { "internalType": "uint256", "name": "liquidity", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "nonces", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" } ], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "price0CumulativeLast", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price1CumulativeLast", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" } ], "name": "skim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, { "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "swap", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "sync", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token0", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token1", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
  const ERC20_ABI = [ { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];

  const STAKING_ADDRESS = "0xe546F8f17aff17C05dac9F9b4F9957f725fab087";
  const UNISWAP_ADDRESS = "0x0e9c8107682ab88604b4fbf847eeeceacf38e9e6";
  const OILER_ADDRESS = "0x0275E1001e293C46CFe158B3702AADe0B99f88a5";
  const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

  const STAKING_CONTRACT = new ethers.Contract(STAKING_ADDRESS, STAKING_ABI, App.provider);
  const UNISWAP_POOL = new ethers.Contract(UNISWAP_ADDRESS, UNISWAP_ABI, App.provider);
  const OILER = new ethers.Contract(OILER_ADDRESS, ERC20_ABI, App.provider);
  const USDC = new ethers.Contract(USDC_ADDRESS, ERC20_ABI, App.provider);

  await loadOilerContract(App, STAKING_CONTRACT, UNISWAP_POOL, OILER, USDC);

  hideLoading();
}

async function loadOilerContract(App, staking, uniswap, oiler, usdc) {

  _print(`<a href='https://etherscan.io/address/${uniswap.address}' target='_blank'>USDC/OIL Uniswap Pool</a>`);

  const [oilerReserve, usdcReserve] = await getUniswapReserves(oiler.address, usdc.address, uniswap);

  _print('\nUniswap USDC/OIL Pool Depth:');
  _print('\t'+formatUSDC(usdcReserve))
  _print('\t'+formatOIL(oilerReserve))

  const price = calculatePrice(oilerReserve, usdcReserve);
  _print(`\nOIL price: ${formatUSDC(price)}`);

  const LPtotalSupply = await uniswap.totalSupply();
  _print(`\nLP Tokens Total Supply: ${formatLP(LPtotalSupply)}`)

  _print(`\n\n<a href='https://etherscan.io/address/${staking.address}' target='_blank'>Staking Contract</a>`);

  const LPtokensLocked = await uniswap.balanceOf(staking.address);
  _print(`\nLP Tokens Locked in the Staking Contract: ${formatLP(LPtokensLocked)}`)

  const LPtokenValue = usdcReserve.mul(2).mul(BONE).div(LPtotalSupply);

  const TVL = LPtokensLocked.mul(LPtokenValue).div(BONE);
  _print(`\nTVL (Total Value Locked) in the Staking Contract: ${formatUSDC(TVL)}`)

  const stakingFundAmount = await staking.stakingFundAmount();

  const rewardPoolValueInUSDC = stakingFundAmount.mul(price).div(BONE);
  _print(`\nReward pool amount: ${formatOIL(stakingFundAmount)} (= ${formatUSDC(rewardPoolValueInUSDC)})`);

  const programAPR = rewardPoolValueInUSDC.mul(1000000).div(TVL);

  _print(`\nCurrent 100-day Staking Program Returns: ${formatPercentage(programAPR)}`);
  _print(`\tDayly: ${formatPercentage(programAPR.div(100))}`);
  _print(`\tWeekly: ${formatPercentage(programAPR.mul(7).div(100))}`);
  _print(`\tMonthly: ${formatPercentage(programAPR.mul(36525).div(120000))}`);
  _print(`\tYearly: ${formatPercentage(programAPR.mul(36525).div(10000))}`);


  const stakingProgramEndsBlock = await staking.stakingProgramEndsBlock();
  const totalExtractionPower = await staking.totalRewardPoints();

  let blockNumber = await App.provider.getBlockNumber();

  _print(`\nStaking Program ends in:`)
  _print(`\t${(stakingProgramEndsBlock-blockNumber)} blocks`);
  _print(`\t${forHumans((stakingProgramEndsBlock - blockNumber) * AVG_BLOCK_TIME)}`);

  const userStake = await staking.stakes(App.YOUR_ADDRESS);
  if (userStake.startBlock != 0) {
    printUserStake(userStake, LPtokenValue, blockNumber, stakingFundAmount, totalExtractionPower, price);
  }

  _print("\nFinished reading smart contracts.\n");
}

function formatPercentage(percentageInUSDC) {
  return (Number(percentageInUSDC.toString())/10000).toFixed(2)+"%";
}

function printUserStake(userStake, LPtokenValue, blockNumber, stakingFundAmount, totalExtractionPower, price) {
  const { expectedStakingRewardPoints, lockingPeriodInBlocks, startBlock, tokenAmount } = userStake;
  _print("\nYour stake:");
  _print(`\t${formatLP(tokenAmount)} locked for ${lockingPeriodInBlocks.toString()} blocks`);
  _print(`\t${blockNumber - startBlock} blocks passed already`);
  _print(`\t${startBlock - blockNumber + lockingPeriodInBlocks} more blocks to go`);
  _print(`\t${forHumans((startBlock - blockNumber + lockingPeriodInBlocks) * AVG_BLOCK_TIME)} left`);
  
  const stakeValueLocked = tokenAmount.mul(LPtokenValue).div(BONE);
  _print(`\nYour value locked: ${formatUSDC(stakeValueLocked)}`);
  
  const stakePoolShare = expectedStakingRewardPoints.mul(1000000).div(totalExtractionPower);
  _print(`\nYour current % of the Reward Pool for this stake: ${formatPercentage(stakePoolShare)}`);

  const rewardForThisStakeOIL = expectedStakingRewardPoints.mul(stakingFundAmount).div(totalExtractionPower);
  const rewardForThisStakeUSDC = rewardForThisStakeOIL.mul(price).div(BONE);
  _print(`\nYour Reward for this stake: ${formatOIL(rewardForThisStakeOIL)} (${formatUSDC(rewardForThisStakeUSDC)})`);

  const currentStakeAPR = rewardForThisStakeUSDC.mul(1000000).div(stakeValueLocked);
  _print(`\nYour current expected returns for this stake: ${formatPercentage(currentStakeAPR)}`);
  _print(`\tDayly: ${formatPercentage(currentStakeAPR.mul(Math.floor(86400/AVG_BLOCK_TIME)).div(lockingPeriodInBlocks))}`);
  _print(`\tWeekly: ${formatPercentage(currentStakeAPR.mul(Math.floor(86400*7/AVG_BLOCK_TIME)).div(lockingPeriodInBlocks))}`);
  _print(`\tMonthly: ${formatPercentage(currentStakeAPR.mul(Math.floor(86400*365.25/12/AVG_BLOCK_TIME)).div(lockingPeriodInBlocks))}`);
  _print(`\tYearly: ${formatPercentage(currentStakeAPR.mul(Math.floor(86400*365.25/AVG_BLOCK_TIME)).div(lockingPeriodInBlocks))}`);
}

function formatNumber(num) {
  const [integerPart, fractionPart] = num.split(".");
  return integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '.' + fractionPart;
}

function formatUSDC(amount) {
  return formatNumber((Number(amount.toString()) / 1000000).toFixed(2)) + ' USDC';
}

function formatOIL(amount) {
  return formatNumber((Number(ethers.utils.formatEther(amount))).toFixed(2)) + ' OIL';
}

function formatLP(amount) {
  return formatNumber((Number(ethers.utils.formatEther(amount))).toFixed(6)) + ' LP';
}


async function getUniswapReserves(oilerAddress, usdcAddress, pool)
{
  const [reserve0, reserve1] = await pool.getReserves();

  const [oilerReserve, usdcReserve] = oilerAddress.localeCompare(usdcAddress, 'en', { sensitivity: 'base' }) < 0
      ? [reserve0, reserve1]
      : [reserve1, reserve0];

  return [oilerReserve, usdcReserve]
}

function calculatePrice(oilerReserve, usdcReserve) {
  return usdcReserve.mul(BONE).div(oilerReserve);
}