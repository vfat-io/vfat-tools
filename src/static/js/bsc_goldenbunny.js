$(function () {
  consoleInit(main)
});

const VaultFlipToCake_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"}],"name":"BunnyPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[],"name":"DisableWhitelist","type":"event"},{"anonymous":false,"inputs":[],"name":"EnableWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"}],"name":"Harvested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"isPaused","type":"bool"}],"name":"PauseChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"profit","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"performanceFee","type":"uint256"}],"name":"ProfitPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"bool","name":"whitelist","type":"bool"}],"name":"Whitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"withdrawalFee","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bunnyChef","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"depositedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"disable","type":"bool"}],"name":"disableWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_token","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"isWhitelist","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keeper","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPauseTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolType","outputs":[{"internalType":"enum PoolConstant.PoolTypes","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"principalOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBunnyChef","name":"newBunnyChef","type":"address"}],"name":"setBunnyChef","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_keeper","type":"address"}],"name":"setKeeper","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newMinter","type":"address"}],"name":"setMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_paused","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"}],"name":"setRewardsDistribution","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRewardsToken","type":"address"}],"name":"setRewardsToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_on","type":"bool"}],"name":"setWhitelist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"sharesOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"withdrawableBalanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const PANCAKE_CHEF_ABI = [{"inputs":[{"internalType":"contract CakeToken","name":"_cake","type":"address"},{"internalType":"contract SyrupBar","name":"_syrup","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_cakePerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"cake","outputs":[{"internalType":"contract CakeToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"cakePerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enterStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"leaveStaking","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingCake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accCakePerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"syrup","outputs":[{"internalType":"contract SyrupBar","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"multiplierNumber","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const PriceCalculatorABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"BNB_feed_in_usd","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BUNNY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BUNNY_BNB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BUSD","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"CAKE_feed_in_usd","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WBNB","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pairTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceOfBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceOfBunny","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceOfCake","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"assets","type":"address[]"}],"name":"pricesInUSD","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"pairToken","type":"address"}],"name":"setPairToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"address","name":"feed","type":"address"}],"name":"setTokenFeed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenFeeds","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unsafeValueOfAsset","outputs":[{"internalType":"uint256","name":"valueInBNB","type":"uint256"},{"internalType":"uint256","name":"valueInUSD","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"valueOfAsset","outputs":[{"internalType":"uint256","name":"valueInBNB","type":"uint256"},{"internalType":"uint256","name":"valueInUSD","type":"uint256"}],"stateMutability":"view","type":"function"}]

const PriceCalculatorAddr = "0xC825637C56A6267960473E29976fC1DE02Df0fd1"
const PANCAKE_CHEF_ADDR = "0x73feaa1eE314F8c655E354234017bE2193C9E24E";
const CAKE_ADDR = "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82";

const rewardTokenTicker = "CAKE";

const fixedDecimals = 6
const decimals = 18

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const VaultInfoList = [
    {
      Id: "O3-BUSD",
      VaultFlipToCake_ADDR: "0x29Fd24d9aaB53e3f6f18fa9cA5aAb96a401E2090",
      VaultPid: 411,
    },
    {
      Id: "TUSD-BUSD",
      VaultFlipToCake_ADDR: "0x6aD1D9725372cA6e0b530eCbCcD8742A1e5a6d30",
      VaultPid: 397,
    },
    {
      Id: "BTCB-ETH",
      VaultFlipToCake_ADDR: "0x90d4aD1eB8b5f03Fa12EB0d0d2cbcb784e27c8D0",
      VaultPid: 408,
    },
    {
      Id: "ETH-USDC",
      VaultFlipToCake_ADDR: "0xDeD0E93a57E13c7926073e9879D4f7e1ad3EEA56",
      VaultPid: 409,
    },
    {
      Id: "UST-BUSD",
      VaultFlipToCake_ADDR: "0x7Ec4d929B1a4cAB118d61f8e8DDd2Cdd9750e62c",
      VaultPid: 293,
    },
    {
      Id: "CAKE-BUSD",
      VaultFlipToCake_ADDR: "0x99f94198E67646e7EfCB060908106BC251ea4858",
      VaultPid: 389,
    },
    {
      Id: "UNI-BNB",
      VaultFlipToCake_ADDR: "0xB1cd9C7b37bd50Ebfd8EDf4c24AEa3BfDd7d3b82",
      VaultPid: 268,
    },
    {
      Id: "XRP-BNB",
      VaultFlipToCake_ADDR: "0x491F54e8C1f851bd0800e07A724438916E9D7881",
      VaultPid: 265,
    },
    {
      Id: "LINK-BNB",
      VaultFlipToCake_ADDR: "0xB6afac842C1C3Bd83D74c6B74fAB4A1DC3a4C439",
      VaultPid: 257,
    },
  ]

  const prices = await getBscPrices();
  // lower case key
  for (let key of Object.keys(prices)) {
    prices[key.toLowerCase()] = prices[key]
  }

  let poolTokens = {}
  for(let vaultInfo of VaultInfoList) {
    const VaultFlipToCake_ADDR = vaultInfo.VaultFlipToCake_ADDR;
    const VAULT = new ethers.Contract(VaultFlipToCake_ADDR, VaultFlipToCake_ABI, App.provider);

    const lpTokenAdx = await VAULT.stakingToken()
    // const poolToken = await getBscToken(App, lpTokenAdx, VaultFlipToCake_ADDR)
    const pool = new ethers.Contract(lpTokenAdx, UNI_ABI, App.provider);
    const poolToken = await getSimpleBscUniPool(App, pool, lpTokenAdx)
    poolTokens[lpTokenAdx.toLowerCase()] = poolToken

    vaultInfo.StakingTokenAdx = lpTokenAdx
  }

  const tokenAddresses = new Set()
  for (let poolTokenAdx in poolTokens) {
    const poolToken = poolTokens[poolTokenAdx]

    tokenAddresses.add(poolToken.token0);
    tokenAddresses.add(poolToken.token1);
  }

  let tokens = {}
  await Promise.all(Array.from(tokenAddresses).map(async (address) => {
    const erc20 = new ethers.Contract(address, ERC20_ABI, App.provider);
    tokens[address.toLowerCase()] = await getBep20(App, erc20, address);
  }));

  for(let info of VaultInfoList) {
    await printVaultInfo(info, prices, tokens, poolTokens, App)
  }

  hideLoading();
}

let cakeAPR;

// LP add liquidity
// APY day, week, year
// you are staking xxx, xxx% of the pool
// Stake
// UnStake
// Claim
async function printVaultInfo(vaultInfo, prices, tokens, poolTokens, App) {
  const PriceCalculator = new ethers.Contract(PriceCalculatorAddr, PriceCalculatorABI, App.provider);
  const PANCAKE_CHEF = new ethers.Contract(PANCAKE_CHEF_ADDR, PANCAKE_CHEF_ABI, App.provider);
  const cakeTokenContract = new ethers.Contract(CAKE_ADDR, ERC20_ABI, App.provider);

  const VaultFlipToCake_ADDR = vaultInfo.VaultFlipToCake_ADDR;
  const VaultPid = vaultInfo.VaultPid;

  const VAULT = new ethers.Contract(VaultFlipToCake_ADDR, VaultFlipToCake_ABI, App.provider);

  const lpTokenAdx = vaultInfo.StakingTokenAdx
  const lpTokenContract = new ethers.Contract(lpTokenAdx, ERC20_ABI, App.provider);
  const poolToken = poolTokens[lpTokenAdx.toLowerCase()]

  const unsafeValueOfAssetResp = await PriceCalculator.unsafeValueOfAsset(lpTokenAdx, ethers.BigNumber.from(10).pow(18))
  const lpPrice = unsafeValueOfAssetResp.valueInUSD / 1e18
  const poolAPR = await getPoolAPR(PANCAKE_CHEF, CAKE_ADDR, lpTokenContract, lpPrice, VaultPid, prices)

  if (!cakeAPR) {
    cakeAPR = await getPoolAPR(PANCAKE_CHEF, CAKE_ADDR, cakeTokenContract, prices[CAKE_ADDR.toLowerCase()].usd, 0, prices)
  }

  const cakeAPY = Math.pow(cakeAPR / 365 + 1, 365) - 1

  const vaultAPY = await getVaultAPY(poolAPR, cakeAPY)

  const userStaked = await VAULT.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals

  let token0 = tokens[poolToken.token0.toLowerCase()]
  let token1 = tokens[poolToken.token1.toLowerCase()]

  helperUrls = [
    `https://exchange.pancakeswap.finance/#/add/${poolToken.token0}/${poolToken.token1}`,
    `https://exchange.pancakeswap.finance/#/remove/${poolToken.token0}/${poolToken.token1}`,
    `https://exchange.pancakeswap.finance/#/swap?inputCurrency=${poolToken.token0}&outputCurrency=${poolToken.token1}`,
  ]

  const lpSymbol = `[${token0.symbol}]-[${token1.symbol}]`
  const stakeTokenTicker = lpSymbol
  const vaultBalance = await VAULT.balance() / 1e18
  const tvl = vaultBalance * lpPrice

  const poolUrl = `https://pancakeswap.info/pair/${lpTokenAdx}`
  const helperHrefs = helperUrls.length == 0 ? "" :
    ` <a href='${helperUrls[0]}' target='_blank'>[+]</a>` +
    `<a href='${helperUrls[1]}' target='_blank'>[-]</a>` +
    `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
  _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(lpPrice)} TVL: $${formatMoney(tvl)}`);

  _print(`APY: Day ${formatPercentage(vaultAPY / 365)} Week ${formatPercentage(vaultAPY / 72)} Year ${formatPercentage(vaultAPY)}`)

  _print(`You are staking ${formatNumber(userStaked.toFixed(6))} ${lpSymbol} ($${lpPrice * userStaked}), ${formatPercentage(userStaked / vaultBalance)} of the pool.`)

  const approveAndStake = async function () {
    return vaultContract_stake(VaultFlipToCake_ABI, VaultFlipToCake_ADDR, lpTokenAdx, App)
  }
  const unstake = async function () {
    const pendingRewardsFunction = "earned"
    return vaultContract_unstake(VaultFlipToCake_ABI, VaultFlipToCake_ADDR, App, pendingRewardsFunction)
  }
  const claim = async function () {
    const pendingRewardsFunction = "earned"
    const claimFunction = "getReward"
    return vaultContract_claim(VaultFlipToCake_ABI, VaultFlipToCake_ADDR, App, pendingRewardsFunction, claimFunction)
  }

  _print_link(`Stake ${poolToken.unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)

  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)

  const rewardTokenPrice = prices[CAKE_ADDR.toLowerCase()].usd
  const earned = await VAULT.earned(App.YOUR_ADDRESS) / 10 ** decimals
  _print_link(`Claim ${earned.toFixed(6)} ${rewardTokenTicker} ($${formatMoney(earned * rewardTokenPrice)})`, claim)

  _print("")
}

function formatNumber(num) {
  const [integerPart, fractionPart] = num.split(".");
  return integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + '.' + fractionPart;
}

function formatPercentage(num) {
  return (Number(num.toString()) * 100).toFixed(2)+"%";
}

function formatLP(amount) {
  return formatNumber((Number(ethers.utils.formatEther(amount))).toFixed(6)) + ' LP';
}

async function getBep20(App, token, address) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name : "Binance",
      symbol : "BNB",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens:[address]
    }
  }
  const decimals = await token.decimals()
  return {
      address,
      name : await token.name(),
      symbol : await token.symbol(),
      totalSupply : await token.totalSupply(),
      decimals : decimals,
      // staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
      unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
      contract: token,
      tokens : [address]
  };
}

const vaultContract_stake = async function(vaultAbi, vaultAddress, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, vaultAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(vaultAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()

    let gasLimit;
    try{
      gasLimit = (await VAULT_CONTRACT.estimateGas.deposit(currentTokens)) * 1.5;
      gasLimit = Math.floor(gasLimit)
    }catch(e) {
      gasLimit = DefaultGasLimit
    }

    allow
      .then(async function() {
          VAULT_CONTRACT.deposit(currentTokens, {gasLimit})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const DefaultGasLimit = 3000001

const vaultContract_unstake = async function(vaultAbi, vaultAddress, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)

  const currentStakedAmount = await VAULT_CONTRACT.balanceOf(App.YOUR_ADDRESS)
  const earnedTokenAmount = await VAULT_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()

    let gasLimit;
    try{
      gasLimit = (await VAULT_CONTRACT.estimateGas.withdraw(currentStakedAmount)) * 1.5;
      gasLimit = Math.floor(gasLimit)
    }catch(e) {
      gasLimit = DefaultGasLimit
    }

    VAULT_CONTRACT.withdraw(currentStakedAmount, {gasLimit})
      .then(function(t) {
        // return App.provider.waitForTransaction(t.hash)
        App.provider.waitForTransaction(t.hash).then(function () {
          hideLoading()
        })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  }
}

const vaultContract_claim = async function(vaultAbi, vaultAddress, App,
  pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()
  
  const VAULT_CONTRACT = new ethers.Contract(vaultAddress, vaultAbi, signer)
  
  const earnedTokenAmount = await VAULT_CONTRACT.callStatic[pendingRewardsFunction](App.YOUR_ADDRESS) / 1e18
  
  if (earnedTokenAmount > 0) {
    showLoading()

    let gasLimit;
    try{
      gasLimit = (await VAULT_CONTRACT.estimateGas[claimFunction]()) * 1.5;
      gasLimit = Math.floor(gasLimit)
    }catch(e) {
      gasLimit = DefaultGasLimit
    }

    if (claimFunction) {
      VAULT_CONTRACT[claimFunction]({gasLimit})
        .then(function(t) {
          // return App.provider.waitForTransaction(t.hash)
          App.provider.waitForTransaction(t.hash).then(function () {
            hideLoading()
          })
        }).catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    }
    else {
      VAULT_CONTRACT.deposit(0)
        .then(function(t) {
          // return App.provider.waitForTransaction(t.hash)
          App.provider.waitForTransaction(t.hash).then(function () {
            hideLoading()
          })
        })
        .catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    }
  }
}

const getPoolAPR = async function(PANCAKE_CHEF, CAKE_ADDR, lpContract, lpPrice, pid, tokenPrices) {
  const totalAllocPoint = await PANCAKE_CHEF.totalAllocPoint()
  const allocPoint = (await PANCAKE_CHEF.poolInfo(pid)).allocPoint
  const cakePerBlock = await PANCAKE_CHEF.cakePerBlock()

  const cakePerYear = cakePerBlock * (365 * 24 * 60 * 60 / 3) * allocPoint / totalAllocPoint / 1e18
  const cakePrice = tokenPrices[CAKE_ADDR.toLowerCase()].usd

  const depositedLPAmount = await lpContract.balanceOf(PANCAKE_CHEF.address) / 1e18

  return cakePrice * cakePerYear / (depositedLPAmount * lpPrice)
}

const getVaultAPY = async function(poolAPR, cake2cakeAPY) {
  const poolARPPerDay = poolAPR / 365.0

  let vaultApy = 0;
  for (let i = 365; i >= 1; i--) {
    vaultApy = vaultApy + poolARPPerDay * (Math.pow(cake2cakeAPY / 365 + 1, i))
  }

  return vaultApy
}

async function getSimpleBscUniPool(App, pool, poolAddress) {
  const token0 = await pool.token0();
  const token1 = await pool.token1();
  return {
      address: poolAddress,
      token0,
      token1,
      unstaked: await pool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
  };
}