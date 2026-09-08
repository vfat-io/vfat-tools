$(function() {
  consoleInit(main)
  });

const JUMPBOX_STAKING_ADDR = "0x80d25c6615ba03757619ab427c2d995d8b695162"
const JUMPBOX_TOKEN_ADDR = "0x5B9957A7459347163881d19a87f6DC13291C2B07"

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const JUMPBOX_STAKING = new ethers.Contract(
    JUMPBOX_STAKING_ADDR,
    JUMPBOX_STAKING_ABI,
    App.provider
  );

  const tokens = {};
  const prices = await getBasePrices();

  await loadJumpboxContract(
    App,
    tokens,
    prices,
    JUMPBOX_STAKING,
    JUMPBOX_STAKING_ADDR,
    JUMPBOX_STAKING_ABI,
    "JUMPBOX",
    "JUMPBOX-WETH",
    "jumpbox",
    0
  );

  hideLoading();
}

async function loadJumpboxContract(
  App,
  tokens,
  prices,
  contract,
  address,
  abi,
  rewardTokenTicker,
  stakeTokenTicker,
  poolName,
  poolIndex
) {
  const STAKING_TOKEN = await contract.stakingToken();
  const REWARD_TOKEN = JUMPBOX_TOKEN_ADDR;

  const stakeTokenContract = new ethers.Contract(
    STAKING_TOKEN,
    ERC20_ABI,
    App.provider
  );

  const rewardTokenContract = new ethers.Contract(
    REWARD_TOKEN,
    ERC20_ABI,
    App.provider
  );

  const stakeSymbol = await stakeTokenContract.symbol();
  const rewardSymbol = await rewardTokenContract.symbol();

  const stakeBalance = await stakeTokenContract.balanceOf(App.YOUR_ADDRESS);
  const earnedRewards = await contract.earned(App.YOUR_ADDRESS);
  const stakedTokens = await contract.balanceOf(App.YOUR_ADDRESS);

  const rewardPerToken = await contract.rewardRate();
  const totalSupply = await contract.totalSupply();

  const weeklyRewards = rewardPerToken / 1e18 * 604800;
  const usdPerWeek = weeklyRewards * prices[REWARD_TOKEN]?.usd ?? 0;

  const staked_tvl = totalSupply / 1e18 * prices[STAKING_TOKEN]?.usd ?? 0;

  const userStaked = stakedTokens / 1e18;
  const userUnstaked = stakeBalance / 1e18;
  const earned = earnedRewards / 1e18;

  const weeklyAPR = usdPerWeek / staked_tvl * 100;
  const dailyAPR = weeklyAPR / 7;
  const yearlyAPR = weeklyAPR * 52;

  _print_bold(`${poolName} Pool`);
  _print(`Staking Token: ${stakeSymbol}`);
  _print(`Reward Token: ${rewardSymbol}`);
  _print(`Pool Total Value Locked: $${formatMoney(staked_tvl)}`);
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%\n`);

  _print(`You are staking ${userStaked.toFixed(6)} ${stakeSymbol} ($${formatMoney(userStaked * prices[STAKING_TOKEN]?.usd ?? 0)})`);
  _print(`You have ${userUnstaked.toFixed(6)} ${stakeSymbol} unstaked ($${formatMoney(userUnstaked * prices[STAKING_TOKEN]?.usd ?? 0)})`);
  _print(`You have earned ${earned.toFixed(6)} ${rewardSymbol} ($${formatMoney(earned * prices[REWARD_TOKEN]?.usd ?? 0)})\n`);

  const approveTENDAndStake = async function() {
    return rewardsContract_stake(STAKING_TOKEN, address, App);
  };

  const unstake = async function() {
    return rewardsContract_unstake(address, App);
  };

  const claim = async function() {
    return rewardsContract_claim(address, App);
  };

  const exit = async function() {
    return rewardsContract_exit(address, App);
  };

  _print_link(`Stake ${stakeSymbol}`, approveTENDAndStake);
  _print_link(`Unstake ${stakeSymbol}`, unstake);
  _print_link(`Claim ${earned.toFixed(6)} ${rewardSymbol}`, claim);
  _print_link(`Exit`, exit);
  _print("");
}

const JUMPBOX_STAKING_ABI = [
  "function stakingToken() view returns (address)",
  "function rewardToken() view returns (address)",
  "function earned(address) view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function rewardRate() view returns (uint256)",
  "function stake(uint256) external",
  "function withdraw(uint256) external",
  "function getReward() external",
  "function exit() external"
];
