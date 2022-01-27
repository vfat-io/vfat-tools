
$(function() {
consoleInit(main)
  });

const SPIRIT_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_depoPercent","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"implementation","type":"uint256"}],"name":"NewDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"implementation","type":"uint256"}],"name":"NewPropDelay","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"changeDelay","outputs":[{"internalType":"uint256","name":"implementation","type":"uint256"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depoPercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"executeNewDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newDelay","type":"uint256"}],"name":"proposeNewDelay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SPIRIT_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_strategist","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REWARDS_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STRATEGIST_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TREASURY_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bifi","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"inch","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToBifiRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const Address = [
  "0x6B55416F50e0b9D255aAe7d58c46a184ACa2F7C2",
  "0x49b5988d48039794f6232b44D7ed8F9bF8b6F784",
  "0x8a764562AA6e2cB35E432E8dD7865A830e4d5385",
  "0x1ca699086CB76235FB7FE8DB85b21834a24D08cD",
  "0x6a517Ee3B83758292120cab8339B4fB670BFa21d"
]

const SPIRIT_CHEF_ABI = [{"inputs":[{"internalType":"contract SpiritToken","name":"_spirit","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_feeAddress","type":"address"},{"internalType":"uint256","name":"_spiritPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSpirit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IBEP20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accSpiritPerShare","type":"uint256"},{"internalType":"uint16","name":"depositFeeBP","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"uint16","name":"_depositFeeBP","type":"uint16"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_feeAddress","type":"address"}],"name":"setFeeAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"spirit","outputs":[{"internalType":"contract SpiritToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"spiritPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_spiritPerBlock","type":"uint256"}],"name":"updateEmissionRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SPIRIT_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_spirit","type":"address"},{"internalType":"address","name":"_inSpirit","type":"address"},{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DISTRIBUTION","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SPIRIT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOKEN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inSPIRIT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"kick","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const SPIRIT_CHEF_ADDR = "0x9083EA3756BDE6Ee6f27a6e996806FBD37F6F093";

   const rewardTokenTicker = "SPIRIT";
   const SPIRIT_CHEF = new ethers.Contract(SPIRIT_CHEF_ADDR, SPIRIT_CHEF_ABI, App.provider);

   const rewardsPerWeek = await SPIRIT_CHEF.spiritPerBlock() /1e18 * 604800;  //blocks every 1 sec in FTM chain

    const tokens = {};
    const prices = await getFantomPrices();

    const Pools = stakingGauges.map(sg => {return{
      address: sg.gaugeAddress,
      abi: SPIRIT_GAUGE_ABI,
      stakeTokenFunction: "TOKEN",
      rewardTokenFunction: "SPIRIT"
    }})

    let p = await loadMultipleFantomSynthetixPools(App, tokens, prices, Pools)
    _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalApr * 100).toFixed(2)}%\n`);
    }

    _print("");

    await loadFantomChefContract(App, tokens, prices, SPIRIT_CHEF, SPIRIT_CHEF_ADDR, SPIRIT_CHEF_ABI, rewardTokenTicker,
      "spirit", null, rewardsPerWeek, "pendingSpirit", [1,2,3,4,5,6,7,8,9,10,11,12,13]);

    _print("");

    const poolInfos = await Promise.all(Address.map(a => loadSpiritPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
      {
        printSpiritContract(p);
        if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
        if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
      }
      _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
      if (userTvl > 0) {
        _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
      }

    hideLoading();
  }

async function loadSpiritPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, SPIRIT_VAULT_ABI, App.provider);
    const vault = await getFantomToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getFantomToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const ppfs = await contract.getPricePerFullShare() / 1e18;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "fantom");
    return { vault, poolPrices, userStaked, ppfs, totalSupply }
  }
  catch (err) {
    console.log(contractAddress, err);
    return null;
  }
}

async function printSpiritContract(poolInfo) {
  const poolPrices = poolInfo.poolPrices;
  _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
  var userStakedUsd = poolInfo.userStaked * poolPrices.price;
  var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
  _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (poolInfo.userStaked > 0) {
    _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
  }
  _print("");
}

const stakingGauges = [{
  pid: 1,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "SPIRIT-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x30748322B6E34545DBe0788C421886AEB5297789"
  },
  gaugeAddress: "0xEFe02cB895b6E061FA227de683C04F3Ce19f3A62",
  tokenSymbol: "SPIRIT",
  tokenAddresses: {
      4002: "",
      250: "0x5Cc61A78F164885776AA610fb0FE1257df78E59B"
  },
   
   
}, {
  pid: 2,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "WETH-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x613BF4E46b4817015c01c6Bb31C7ae9edAadc26e"
  },
  gaugeAddress: "0xE86CeE843a5CE2F40575544B1fFc43CB1701D9ae",
  tokenSymbol: "WETH",
  tokenAddresses: {
      4002: "",
      250: "0x74b23882a30290451A17c44f4F05243b6b58C76d"
  },
   
   
}, {
  pid: 3,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "WBTC-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x279b2c897737a50405ED2091694F225D83F2D3bA"
  },
  gaugeAddress: "0xDccAFCE93E6e57f0464b4639d4aFD7B9Ad006F61",
  tokenSymbol: "WBTC",
  tokenAddresses: {
      4002: "",
      250: "0x321162Cd933E2Be498Cd2267a90534A804051b11"
  },
   
   
}, {
  pid: 4,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "gOHM-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xae9BBa22E87866e48ccAcFf0689AFaa41eB94995"
  },
  gaugeAddress: "0xb3AfA9CB6c53d061bC2263cE15357A691D0D60d4",
  tokenSymbol: "gOHM",
  tokenAddresses: {
      4002: "",
      250: "0x91fa20244Fb509e8289CA630E5db3E9166233FDc"
  },
   
   
}, {
  pid: 5,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "FRAX-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x7ed0cdDB9BB6c6dfEa6fB63E117c8305479B8D7D"
  },
  gaugeAddress: "0x805f756d7B2592637725a1b797088c29c9D6A1F8",
  tokenSymbol: "FRAX",
  tokenAddresses: {
      4002: "",
      250: "0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355"
  },
   
   
}, {
  pid: 6,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "wsHEC-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xE1fd274Ef08D50C3ecdaEe90c322b6c2342AE5DE"
  },
  gaugeAddress: "0xaAdd9A7155Dbd447c62C1EB574E2FE3967af2E81",
  tokenSymbol: "wsHEC",
  tokenAddresses: {
      4002: "",
      250: "0x94CcF60f700146BeA8eF7832820800E2dFa92EdA"
  },
   
   
}, {
  pid: 7,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "MIM-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xB32b31DfAfbD53E310390F641C7119b5B9Ea0488"
  },
  gaugeAddress: "0x0B905475bEa057060D066f3D1F85E6902Ae62557",
  tokenSymbol: "MIM",
  tokenAddresses: {
      4002: "",
      250: "0x82f0B8B456c1A451378467398982d4834b6829c1"
  },
   
   
}, {
  pid: 8,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "MAI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x51Eb93ECfEFFbB2f6fE6106c4491B5a0B944E8bd"
  },
  gaugeAddress: "0x27Dc7cc7175F8Ac26dc7421a3a92DAcdc1a9EF0D",
  tokenSymbol: "MAI",
  tokenAddresses: {
      4002: "",
      250: "0xfB98B335551a418cD0737375a2ea0ded62Ea213b"
  },
   
   
}, {
  pid: 9,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "JEWEL-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x782b3e90d85b72fDD3A15dE534fD0DC9D5Ae46E7"
  },
  gaugeAddress: "0xF399D101fB4D3466f70e2eC25467721eaEC8b460",
  tokenSymbol: "JEWEL",
  tokenAddresses: {
      4002: "",
      250: "0xD97F9674E2597e7a252de4875985f4385B9608fB"
  },
   
   
}, {
  pid: 10,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "ICE-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x936D23C83c2469f6a14B9f5bEaec13879598A5aC"
  },
  gaugeAddress: "0xA6A6f26426FB5FE15b33fAe65d1335B02dC54372",
  tokenSymbol: "ICE",
  tokenAddresses: {
      4002: "",
      250: "0xf16e81dce15B08F326220742020379B855B87DF9"
  },
   
   
}, {
  pid: 11,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "LQDR-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x4Fe6f19031239F105F753D1DF8A0d24857D0cAA2"
  },
  gaugeAddress: "0x717BDE1AA46a0Fcd937af339f95361331412C74C",
  tokenSymbol: "LQDR",
  tokenAddresses: {
      4002: "",
      250: "0x10b620b2dbAC4Faa7D7FFD71Da486f5D44cd86f9"
  },
   
   
}, {
  pid: 12,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "USDC-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xe7E90f5a767406efF87Fdad7EB07ef407922EC1D"
  },
  gaugeAddress: "0xa3C6D55397Dcddaf9f600B082F7a6A918f2F4A5C",
  tokenSymbol: "USDC",
  tokenAddresses: {
      4002: "",
      250: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75"
  },
   
   
}, {
  pid: 13,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "fUSDT-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xd14Dd3c56D9bc306322d4cEa0E1C49e9dDf045D4"
  },
  gaugeAddress: "0xED912897138f8aF455B8F95F75850B11979806D8",
  tokenSymbol: "fUSDT",
  tokenAddresses: {
      4002: "",
      250: "0x049d68029688eAbF473097a2fC38ef61633A3C7A"
  },
   
   
}, {
  pid: 14,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "DAI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xdbc490b47508D31c9EC44aFB6e132AD01C61A02c"
  },
  gaugeAddress: "0x1B6cA59BF8A911eE56e58Eb5E5A97F69356EC6C3",
  tokenSymbol: "DAI",
  tokenAddresses: {
      4002: "",
      250: "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"
  },
   
   
}, {
  pid: 15,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "SPELL-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x19d4092635740699B6E4735701742740e235165A"
  },
  gaugeAddress: "0x02ADc9b582E39dc4Cb727a64d8584830CF1bb9bC",
  tokenSymbol: "SPELL",
  tokenAddresses: {
      4002: "",
      250: "0x468003B688943977e6130F4F68F23aad939a1040"
  },
   
   
}, {
  pid: 16,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "YFI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x4fc38a2735C7da1d71ccAbf6DeC235a7DA4Ec52C"
  },
  gaugeAddress: "0x237E7E20bf10a61C8DeD780398AA0D5e69DdfF9c",
  tokenSymbol: "YFI",
  tokenAddresses: {
      4002: "",
      250: "0x29b0Da86e484E1C0029B56e817912d778aC0EC69"
  },
   
   
}, {
  pid: 17,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "SUSHI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x9Fe4c0CE5F533e96C2b72d852f190961AD5a7bB3"
  },
  gaugeAddress: "0x3FD04eEb74204F8FAa5ea539cd5275EC1a3Aa70C",
  tokenSymbol: "SUSHI",
  tokenAddresses: {
      4002: "",
      250: "0xae75A438b2E0cB8Bb01Ec1E1e376De11D44477CC"
  },
   
   
}, {
  pid: 18,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "LINK-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xd061c6586670792331E14a80f3b3Bb267189C681"
  },
  gaugeAddress: "0x1360E082C01C897339B82eF098ab4e8B271252C8",
  tokenSymbol: "LINK",
  tokenAddresses: {
      4002: "",
      250: "0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8"
  },
   
   
}, {
  pid: 19,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "CRV-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x374C8ACb146407Ef0AE8F82BaAFcF8f4EC1708CF"
  },
  gaugeAddress: "0x73eCAaD4Fff43619f31D47D66d841dE41A933488",
  tokenSymbol: "CRV",
  tokenAddresses: {
      4002: "",
      250: "0x1E4F97b9f9F913c46F1632781732927B9019C68b"
  },
   
   
}, {
  pid: 20,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "MULTI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x15aFDbDb27767d58A58459ae159814b6bBe6f506"
  },
  gaugeAddress: "0xfF1E257F9b482567dE88fcE9788502CbD4cC95F2",
  tokenSymbol: "MULTI",
  tokenAddresses: {
      4002: "",
      250: "0x9Fb9a33956351cf4fa040f65A13b835A3C8764E3"
  },
   
   
}, {
  pid: 21,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "wsSQUID-gOHM LP",
  lpAddresses: {
      4002: "",
      250: "0x292e3CF358C40c38156F874ac4Fc726F72543E92"
  },
  gaugeAddress: "0x0ccb407510C529EfF71F02348E57E26a406Ac0E1",
  tokenSymbol: "wsSQUID",
  tokenAddresses: {
      4002: "",
      250: "0xb280458B3cf0FAcC33671D52FB0E894447C2539A"
  },

}, {
  pid: 22,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "JUST-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x0133660D0578Bf9D085033Ea753a27F5Aa2b9de1"
  },
  gaugeAddress: "0x8A500EB01085776918F90438555d45E35fE863C9",
  tokenSymbol: "JUST",
  tokenAddresses: {
      4002: "",
      250: "0x37C045bE4641328DFEB625f1Dde610D061613497"
  },
   
   
}, {
  pid: 23,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "FANG-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x871DD566AB3De61E5Cc8fb16fEE82595b17e9cc6"
  },
  gaugeAddress: "0x3020F2A9d7003923377dE267ac0d6A7F8748e541",
  tokenSymbol: "FANG",
  tokenAddresses: {
      4002: "",
      250: "0x49894fCC07233957c35462cfC3418Ef0CC26129f"
  },
   
   
}, {
  pid: 24,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "PILLS-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x9C775D3D66167685B2A3F4567B548567D2875350"
  },
  gaugeAddress: "0x3A514Ce911E86164064F30Bf9134085Ae0E514aC",
  tokenSymbol: "PILLS",
  tokenAddresses: {
      4002: "",
      250: "0xB66b5D38E183De42F21e92aBcAF3c712dd5d6286"
  },
   
   
}, {
  pid: 25,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "ZOO-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xDF18DD2631f02D930071DF7d6FF89bbc3718C62F"
  },
  gaugeAddress: "0xd8b503F5Bb44166194B6fB3438918F50341aD63E",
  tokenSymbol: "ZOO",
  tokenAddresses: {
      4002: "",
      250: "0x09e145A1D53c0045F41aEEf25D8ff982ae74dD56"
  },
   
   
}, {
  pid: 26,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "GRIM-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x2c18c39622b90318B0124eCFd6d4aC81efcC51db"
  },
  gaugeAddress: "0x6f45A990D727bdBb447078422CfDD8B53c765741",
  tokenSymbol: "GRIM",
  tokenAddresses: {
      4002: "",
      250: "0x7eC94C4327dC757601B4273cD67014d7760Be97E"
  },
   
   
}, {
  pid: 27,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "TAROT-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0xF050133847bb537C7476D054B8bE6e30253Fbd05"
  },
  gaugeAddress: "0xF7d3dE134c9d09998f94a3de5E0D7F3317Dd97be",
  tokenSymbol: "TAROT",
  tokenAddresses: {
      4002: "",
      250: "0xC5e2B037D30a390e62180970B3aa4E91868764cD"
  },
   
   
}, {
  pid: 28,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "wMEMO-MIM LP",
  lpAddresses: {
      4002: "",
      250: "0xC9B98e4A4e306DFc24bc5b5F66e271e19Fd74c5A"
  },
  gaugeAddress: "0x86762289Ffb97F8DB441a4fAf5ecd335165e8E08",
  tokenSymbol: "wMEMO",
  tokenAddresses: {
      4002: "",
      250: "0xDDc0385169797937066bBd8EF409b5B3c0dFEB52"
  },

}, {
  pid: 29,
  isPsc: !0,
  isGauge: !0,
  lpSymbol: "YOSHI-FTM LP",
  lpAddresses: {
      4002: "",
      250: "0x9D2489d0DA3436445a0a5ef8515Dc10B2D8b4eaA"
  },
  gaugeAddress: "0xc1AE6EdBf55214B3FA690Cc376838785cDb6D8FB",
  tokenSymbol: "YOSHI",
  tokenAddresses: {
      4002: "",
      250: "0x3dc57B391262e3aAe37a08D91241f9bA9d58b570"
  },
   
   
}];