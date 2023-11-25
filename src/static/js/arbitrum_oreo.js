
$(function() {
  consoleInit(main)
    });
  
  const OREO_CHEF_ABI = [{"inputs":[{"internalType":"contract IOREO","name":"_oreo","type":"address"},{"internalType":"contract IStake","name":"_stake","type":"address"},{"internalType":"address","name":"_devAddr","type":"address"},{"internalType":"address","name":"_refAddr","type":"address"},{"internalType":"uint256","name":"_oreoPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"AddStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":true,"internalType":"address","name":"caller","type":"address"}],"name":"RemoveStakeTokenCallerContract","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"devAddress","type":"address"}],"name":"SetDevAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"devBps","type":"uint256"}],"name":"SetDevBps","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"prevOreoPerBlock","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentOreoPerBlock","type":"uint256"}],"name":"SetOreoPerBlock","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"refAddress","type":"address"}],"name":"SetRefAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"refBps","type":"uint256"}],"name":"SetRefBps","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"bool","name":"isAllowed","type":"bool"}],"name":"SetStakeTokenCallerAllowancePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"bonusMultiplier","type":"uint256"}],"name":"UpdateMultiplier","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"funder","type":"address"},{"indexed":true,"internalType":"address","name":"fundee","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"}],"name":"addPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"addStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositOreo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address[]","name":"_stakeTokens","type":"address[]"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mintExtraReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oreo","outputs":[{"internalType":"contract IOREO","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oreoPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingOreo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accOreoPerShare","type":"uint256"},{"internalType":"uint256","name":"depositFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pools","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refBps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"removePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_caller","type":"address"}],"name":"removeStakeTokenCallerContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devAddr","type":"address"}],"name":"setDevAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_devBps","type":"uint256"}],"name":"setDevBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_oreoPerBlock","type":"uint256"}],"name":"setOreoPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint256","name":"_depositFee","type":"uint256"}],"name":"setPool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_refAddr","type":"address"}],"name":"setRefAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_refBps","type":"uint256"}],"name":"setRefBps","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"bool","name":"_isAllowed","type":"bool"}],"name":"setStakeTokenCallerAllowancePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stake","outputs":[{"internalType":"contract IStake","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerAllowancePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeTokenCallerContracts","outputs":[{"internalType":"uint256","name":"llSize","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_bonusMultiplier","type":"uint256"}],"name":"updateMultiplier","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"address","name":"fundedBy","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_for","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawOreo","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  const OREO_BOOST_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_oreo","type":"address"},{"internalType":"contract IMasterChef","name":"_masterChef","type":"address"},{"internalType":"contract IOreoBoosterConfig","name":"_oreoboosterConfig","type":"address"},{"internalType":"contract IWNativeRelayer","name":"_wNativeRelayer","type":"address"},{"internalType":"address","name":"_wNative","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"caller","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Harvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"extraReward","type":"uint256"},{"indexed":false,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"prevEnergy","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"currentEnergy","type":"uint256"}],"name":"MasterChefCall","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"StakeNFT","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"unstaker","type":"address"},{"indexed":true,"internalType":"contract IERC20","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"staker","type":"address"},{"indexed":true,"internalType":"address","name":"stakeToken","type":"address"},{"indexed":false,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"name":"UnstakeNFT","type":"event"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GOVERNANCE_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SIGNATURE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_IN_EXEC_LOCK","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_stakeToken","type":"address"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getRoleMember","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleMemberCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_stakeTokens","type":"address[]"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterChef","outputs":[{"internalType":"contract IMasterChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"stakeToken","type":"address"},{"internalType":"address","name":"userAddr","type":"address"},{"internalType":"uint256","name":"unboostedReward","type":"uint256"}],"name":"masterChefCall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"oreo","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oreoboosterConfig","outputs":[{"internalType":"contract IOreoBoosterConfig","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBoosterOreo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"address","name":"_nftAddress","type":"address"},{"internalType":"uint256","name":"_nftTokenId","type":"uint256"}],"name":"stakeNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalAccumBoostedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"unstake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"unstakeAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_stakeToken","type":"address"}],"name":"unstakeNFT","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"accumBoostedReward","type":"uint256"},{"internalType":"uint256","name":"lastUserActionTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userStakingNFT","outputs":[{"internalType":"address","name":"nftAddress","type":"address"},{"internalType":"uint256","name":"nftTokenId","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wNative","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wNativeRelayer","outputs":[{"internalType":"contract IWNativeRelayer","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
  
  async function main() {
      const App = await init_ethers();
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
     const OREO_CHEF_ADDR = "0xa481384653c484901b301634086c8625e550bbec";
     const rewardTokenTicker = "OREO";
     const OREO_CHEF = new ethers.Contract(OREO_CHEF_ADDR, OREO_CHEF_ABI, App.provider);

     const pools = [
      "0xBf6a0418e31f90b60ae3d19c56a659ad8b2f4D18",
      "0x9A8D82568cbe5CcABbFD7C6a44d00231aA547898",
      "0x2036c7128f08C8878c75B3b97d4cDd4a29c25465",
      "0xBa06c51c44E087131249665e31719645641e5268",
      "0x98b9ca5C6464C011C94fB54C4c1BacD9E767E98C",
      "0xee7dA0A346ceD00Da1843bf47200eF70A2929A7A",
      "0x4eB977551E6F8A3A585c130F6E2A15e4080d7456",
      "0x89329541C4c61Cd732E35606BF386ABafcb0f3B1",
      "0xF76519bfd4BDA679a13C562e94ABaB0a900603a5",
      "0xf5175c320A48C0b7517a0622F9F46c14C33710d4",
      "0xe8e1714cbc0e4c35f9d28151c227bc437f1b159a",
      "0xf666a176Ff8c0E28FA0266150Ed3143BA355515B",
      "0xe8625eb865a85a793d3480f95457581525eaba0b",
      "0xf8675061bea4420527bffce9f4e438fb688c86b2",
      "0x26f97775560590184999ba2193211b431c205377",
      "0x2B5512B42f405f0eE34D307a27B591eE71e8BAF5",
      "0x1F11c6F651E0831D9B8E6f39A3961a74bd4cf854",
      "0xCC154c583aDf469a48c84a8EE61e667a6f34e701",
      "0x319e222de462ac959baf2aec848697aec2bbd770", //OREO???
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"  //WETH???
     ]
  
     let rewardsPerWeek = await OREO_CHEF.oreoPerBlock() /1e18
        * 604800 / 13.5;
  
      const tokens = {};
      const prices = await getArbitrumPrices();
  
      await loadArbitrumOreoContract(App, tokens, prices, OREO_CHEF, OREO_CHEF_ADDR, OREO_CHEF_ABI, rewardTokenTicker,
          "oreo", null, rewardsPerWeek, "pendingOreo", pools);
  
      hideLoading();
    }
  
async function loadArbitrumOreoContract(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, pools,
deathPoolIndices, claimFunction) {
const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

const poolCount = pools.length;
const totalAllocPoints = await chefContract.totalAllocPoint();

_print(`<a href='https://arbiscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
_print(`Found ${poolCount} pools.\n`)

_print(`Showing incentivized pools only.\n`);

const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
const rewardToken = await getArbitrumToken(App, rewardTokenAddress, chefAddress);
const rewardsPerWeek = rewardsPerWeekFixed ??
  await chefContract.callStatic[rewardsPerBlockFunction]()
  / 10 ** rewardToken.decimals * 604800 / 13.5

const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) =>
  await getOreoPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, pools[x])));

var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x.poolToken).map(x => x.poolToken.tokens));

await Promise.all(tokenAddresses.map(async (address) => {
  tokens[address] = await getArbitrumToken(App, address, chefAddress);
}));

if (deathPoolIndices) {   //load prices for the deathpool assets
  deathPoolIndices.map(i => poolInfos[i])
    .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);
}

const poolPrices = poolInfos.map(poolInfo => poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "arbitrum") : undefined);


_print("Finished reading smart contracts.\n");

let aprs = []
for (i = 0; i < poolCount; i++) {
  if (poolPrices[i]) {
    const apr = printOreoChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
      totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
      pendingRewardsFunction, null, claimFunction, "arbitrum", poolInfos[i].depositFee, poolInfos[i].withdrawFee)
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

async function getOreoPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, poolAddress) {
const poolInfo = await chefContract.poolInfo(poolAddress);
if (poolInfo.allocPoint == 0) {
  return {
    address: poolAddress,
    allocPoints: poolInfo.allocPoint ?? 1,
    poolToken: null,
    userStaked: 0,
    pendingRewardTokens: 0,
  };
}
const poolToken = await getArbitrumToken(app, poolAddress, chefAddress);
const userInfo = await chefContract.userInfo(poolAddress, app.YOUR_ADDRESS);
const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolAddress, app.YOUR_ADDRESS);
const staked = userInfo.amount / 10 ** poolToken.decimals;
return {
  address: poolAddress,
  allocPoints: poolInfo.allocPoint ?? 1,
  poolToken: poolToken,
  userStaked: staked,
  pendingRewardTokens: pendingRewardTokens / 10 ** 18,
  depositFee: (poolInfo.depositFee ?? 0) / 100,
  withdrawFee: (poolInfo.withdrawFee ?? 0) / 100
};
}

function printOreoChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
pendingRewardsFunction, fixedDecimals, claimFunction, chain = "eth", depositFee = 0, withdrawFee = 0) {
fixedDecimals = fixedDecimals ?? 2;
const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
_print_inline(`${poolIndex} - `);
poolPrices.print_price(chain);
sp?.print_price(chain);
const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
  staked_tvl, userStaked, poolPrices.price, fixedDecimals);
if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
printOreoChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
  rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
  poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
return apr;
}

function printOreoChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
fixedDecimals = fixedDecimals ?? 2;
const approveAndStake = async function () {
  return chefArbitrumContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
}
const unstake = async function () {
  return chefOreoContract_unstake(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction)
}
const claim = async function () {
  return chefOreoContract_claim(chefAbi, chefAddr, poolAddress, App, pendingRewardsFunction, claimFunction)
}
if (depositFee > 0) {
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
} else {
  _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
}
if (withdrawFee > 0) {
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
} else {
  _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
}
_print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens * rewardTokenPrice)})`, claim)
_print(`Staking or unstaking also claims rewards.`)
_print("");
}

const chefOreoContract_claim = async function (chefAbi, chefAddress, poolAddress, App,
pendingRewardsFunction, claimFunction) {
const signer = App.provider.getSigner()

const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer);

CHEF_CONTRACT.harvest(App.YOUR_ADDRESS, poolAddress)
      .then(function (t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function () {
        hideLoading()
      })

    
}

const chefOreoContract_unstake = async function (chefAbi, chefAddress, poolAddress, App, pendingRewardsFunction) {
const signer = App.provider.getSigner()
const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolAddress, App.YOUR_ADDRESS)).amount

showLoading()
  CHEF_CONTRACT.withdraw(App.YOUR_ADDRESS, poolAddress, currentStakedAmount)
    .then(function (t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function () {
      hideLoading()
    })
}