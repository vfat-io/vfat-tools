$(function () {
  consoleInit(main)
})

const MOTOSWAP_CHEF_ADDR = "0x51e648f08a9a08A724591938d9cbc483C809aCA4"
const MOTOSWAP_ESCROW_ADDR = "0xB5B07c3007c183348AF0Ff3d4Fbc65cac3527Aed"
const MOTOSWAP_REWARD_TICKER = "MOTO"
const MOTOSWAP_SECONDS_PER_WEEK = 604800

// VampChef: MasterChef-style, flat per-second emission over a fixed window.
// Half of every harvest is paid liquid, half streams over 180 days via the escrow.
const MOTOSWAP_CHEF_ABI = [
  "function poolLength() view returns (uint256)",
  "function totalAllocPoint() view returns (uint256)",
  "function rewardToken() view returns (address)",
  "function rewardPerSecond() view returns (uint256)",
  "function emissionStart() view returns (uint64)",
  "function emissionEnd() view returns (uint64)",
  "function poolInfo(uint256) view returns (address lpToken, uint256 allocPoint, uint256 lastRewardTime, uint256 accRewardPerShare, uint256 lpSupply)",
  "function userInfo(uint256, address) view returns (uint256 amount, uint256 rewardDebt)",
  "function pendingReward(uint256 _pid, address _user) view returns (uint256)",
  "function deposit(uint256 _pid, uint256 _amount)",
  "function withdraw(uint256 _pid, uint256 _amount)",
  "function harvest(uint256 _pid)",
  "function emergencyWithdraw(uint256 _pid)"
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const chef = new ethers.Contract(MOTOSWAP_CHEF_ADDR, MOTOSWAP_CHEF_ABI, App.provider);

  const [poolCount, totalAllocPoints, rewardTokenAddress, rewardPerSecond, emissionStart, emissionEnd] =
    await Promise.all([
      chef.poolLength(),
      chef.totalAllocPoint(),
      chef.rewardToken(),
      chef.rewardPerSecond(),
      chef.emissionStart(),
      chef.emissionEnd()
    ]);

  const now = Math.floor(Date.now() / 1000);
  const start = Number(emissionStart);
  const end = Number(emissionEnd);
  const emissionLive = start > 0 && now >= start && now < end;

  _print(`<a href='https://etherscan.io/address/${MOTOSWAP_CHEF_ADDR}' target='_blank'>Staking Contract</a>`);
  _print(`<a href='https://motoswap.org/farm' target='_blank'>Motoswap farms</a>`);
  _print(`Found ${poolCount} pools.\n`);
  if (start === 0) {
    _print("Emission has not started.\n");
  } else if (now < start) {
    _print(`Emission starts ${new Date(start * 1000).toUTCString()}.\n`);
  } else if (now >= end) {
    _print(`Emission ended ${new Date(end * 1000).toUTCString()}. No rewards are accruing.\n`);
  } else {
    _print(`Emission runs until ${new Date(end * 1000).toUTCString()}.\n`);
  }
  _print("Half of each harvest is paid now, half streams over 180 days through the vesting escrow.");
  _print(`<a href='https://etherscan.io/address/${MOTOSWAP_ESCROW_ADDR}' target='_blank'>Vesting escrow</a>\n`);
  _print("Showing incentivized pools only.\n");

  const rewardToken = await getToken(App, rewardTokenAddress, MOTOSWAP_CHEF_ADDR);
  const rewardsPerWeek = emissionLive
    ? rewardPerSecond / 10 ** rewardToken.decimals * MOTOSWAP_SECONDS_PER_WEEK
    : 0;

  const poolInfos = await Promise.all([...Array(Number(poolCount)).keys()].map(async (pid) => {
    try {
      const info = await getPoolInfo(App, chef, MOTOSWAP_CHEF_ADDR, pid, "pendingReward");
      if (info.poolToken) {
        // The chef tracks staked supply itself. For the single-sided MOTO pool the chef's
        // token balance also holds the unclaimed reward budget, so balanceOf would overstate TVL.
        const raw = await chef.poolInfo(pid);
        info.poolToken.staked = raw.lpSupply / 10 ** info.poolToken.decimals;
      }
      return info;
    } catch (ex) {
      console.log(`Error loading pool ${pid}: ${ex}`);
      return null;
    }
  }));

  let tokens = {};
  const tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  let prices = {};
  await getNewPricesAndTokens(App, tokens, prices, [rewardTokenAddress], MOTOSWAP_CHEF_ADDR);

  await Promise.all(tokenAddresses.map(async (address) => {
    tokens[address] = await getToken(App, address, MOTOSWAP_CHEF_ADDR);
  }));

  const poolPrices = poolInfos.map(info => info?.poolToken ? getPoolPrices(tokens, prices, info.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  // Claim through harvest(pid). The default zero-amount deposit would also work on this chef,
  // but harvest is the named path and reads better in the wallet prompt.
  const claim = (pid, overrides) =>
    new ethers.Contract(MOTOSWAP_CHEF_ADDR, MOTOSWAP_CHEF_ABI, App.provider.getSigner()).harvest(pid, overrides);

  let totalStaked = 0, totalUserStaked = 0, averageApr = 0;
  for (let i = 0; i < Number(poolCount); i++) {
    if (!poolPrices[i]) continue;
    const apr = printChefPool(App, MOTOSWAP_CHEF_ABI, MOTOSWAP_CHEF_ADDR, prices, tokens, poolInfos[i], i, poolPrices[i],
      totalAllocPoints, rewardsPerWeek, MOTOSWAP_REWARD_TICKER, rewardTokenAddress,
      "pendingReward", null, claim);
    if (apr && !isNaN(apr.totalStakedUsd)) totalStaked += apr.totalStakedUsd;
    if (apr && apr.userStakedUsd > 0) {
      totalUserStaked += apr.userStakedUsd;
      averageApr += apr.userStakedUsd * apr.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;

  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`);
    _print(`Estimated earnings:`
      + ` Day $${formatMoney(totalUserStaked * averageApr / 365)}`
      + ` Week $${formatMoney(totalUserStaked * averageApr / 52)}`
      + ` Year $${formatMoney(totalUserStaked * averageApr)}\n`);
  }

  hideLoading();
}
