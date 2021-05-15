$(function() {
consoleInit(main)
});

const TAO_POOL_ABI = [{"inputs":[{"internalType":"address","name":"_LPToken","type":"address"},{"internalType":"address","name":"_TAOToken","type":"address"},{"internalType":"address","name":"_rewardPool","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_blocksToWait","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_blocksRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_amountRewarded","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"PoolUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rewardsClaimed","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"RewardsClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_totalStaked","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"StakeCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_previous","type":"address"},{"indexed":false,"internalType":"address","name":"_next","type":"address"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"TransferredOwnership","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_staker","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"WithdrawCompleted","type":"event"},{"inputs":[],"name":"LPToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TAOToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accTAOPerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"_amountStaked","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_staker","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"stakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"transferOwnership","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unstakeLP","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePool","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userDetails","outputs":[{"internalType":"uint256","name":"_LPDeposited","type":"uint256"},{"internalType":"uint256","name":"_rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"}]
const sTAO_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"monetaryPolicy","type":"address"}],"name":"LogMonetaryPolicyUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"circulatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"monetaryPolicy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"olyProfit","type":"uint256"}],"name":"rebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"monetaryPolicy_","type":"address"}],"name":"setMonetaryPolicy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newStakingContract_","type":"address"}],"name":"setStakingContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner_","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const STAKING_TAO_ABI =  [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "epochLengthInBlocks",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "taoTokenAddress_", "type": "address" },
      { "internalType": "address", "name": "sTAO_", "type": "address" },
      { "internalType": "uint32", "name": "epochLengthInBlocks_", "type": "uint32" }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "sTAO",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "newEpochLengthInBlocks_", "type": "uint256" }
    ],
    "name": "setEpochLengthintBlock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amountToStake_", "type": "uint256" }],
    "name": "stakeTAO",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amountToStake_", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline_", "type": "uint256" },
      { "internalType": "uint8", "name": "v_", "type": "uint8" },
      { "internalType": "bytes32", "name": "r_", "type": "bytes32" },
      { "internalType": "bytes32", "name": "s_", "type": "bytes32" }
    ],
    "name": "stakeTAOWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tao",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "taoToDistributeNextEpoch",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newOwner_", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amountToWithdraw_", "type": "uint256" }],
    "name": "unstakeTAO",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "amountToWithdraw_", "type": "uint256" },
      { "internalType": "uint256", "name": "deadline_", "type": "uint256" },
      { "internalType": "uint8", "name": "v_", "type": "uint8" },
      { "internalType": "bytes32", "name": "r_", "type": "bytes32" },
      { "internalType": "bytes32", "name": "s_", "type": "bytes32" }
    ],
    "name": "unstakeTAOWithPermit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const TAO_ADDR = "0x7065dda3f8ec5f6c155648bdee4420c0525d93c6"
const TAO_POOL_ADDR = "0xC98f066c7232C4A0b2B2885052B7fdc4438D8eF0";
const DISTRIBUTOR_ADDRESS = "0xc8bbc6cA4b99032B126414c2A088Dc38d8743420";
const REWARD_POOL_ADDRESS = '0x08b3545337EfDe91c7d3767EE3A549ba197628d7';
const PRESALE_ADDRESS = '0x4c6846C1B074852aBd18e2E6Cf0A2bC62AcEd5E7';
const BOND_ADDRESS = '0x8E4BE6ec6bA8C76c7Dc6c80Bb4858aC5BBcED3f4';
const sTAO_ADDRESS = '0xE12d3c8675a88fEDCf61946089079323342982bB';
const STAKING_ADDRESS = '0x09744e01D70728786ACCFe7076c525fb41d3B08D';

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {}, prices = await getBscPrices()
  const tao = await getBscToken(App, TAO_ADDR, TAO_POOL_ADDR);

  const TAO_CONTRACT = new ethers.Contract(TAO_ADDR, ERC20_ABI, App.provider);
  const STAKING_TAO_CONTRACT = new ethers.Contract(STAKING_ADDRESS, STAKING_TAO_ABI, App.provider);
  const STAO_CONTRACT = new ethers.Contract(sTAO_ADDRESS, ERC20_ABI, App.provider);
  const STAO_MAIN_CONTRACT = new ethers.Contract(sTAO_ADDRESS,sTAO_ABI, App.provider);

  const taoTotalSupply = await TAO_CONTRACT.totalSupply();

  const distributorBalance = await TAO_CONTRACT.balanceOf(DISTRIBUTOR_ADDRESS);
  const rewardPoolBalance = await TAO_CONTRACT.balanceOf(REWARD_POOL_ADDRESS);
  const bondBalance = await TAO_CONTRACT.balanceOf(BOND_ADDRESS);
  const presaleBalance = await TAO_CONTRACT.balanceOf(PRESALE_ADDRESS);

  let userTaoBalance = await TAO_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  let userStakingBalance = await STAO_CONTRACT.balanceOf(App.YOUR_ADDRESS);
  let totalStakingBalance = await TAO_CONTRACT.balanceOf(STAKING_ADDRESS);

  userTaoBalance = userTaoBalance / 10 ** 9;
  userStakingBalance = userStakingBalance / 10 ** 9;
  totalStakingBalance = totalStakingBalance / 10 ** 9;

  const taoCircSupply = (taoTotalSupply - distributorBalance - rewardPoolBalance - bondBalance - presaleBalance) / 10 ** tao.decimals;

  const rewardTokenTicker = "TAO";
  const TAO_POOL = new ethers.Contract(TAO_POOL_ADDR, TAO_POOL_ABI, App.provider);
  const taoPerBlock = await TAO_POOL.rewardPerBlock();
  const lpToken = await TAO_POOL.LPToken();
  const [userBalance, userEarned] = await TAO_POOL.userDetails(App.YOUR_ADDRESS);
  const pendingRewards = await TAO_POOL.pendingRewards(App.YOUR_ADDRESS);
  const pool = await getBscToken(App, lpToken, TAO_POOL_ADDR);
  const newTokenAddresses = [...pool.tokens, TAO_ADDR]
  for (const n of newTokenAddresses)
        if (!getParameterCaseInsensitive(tokens, n))
          tokens[n] = await getBscToken(App, n, TAO_POOL_ADDR)
  const poolPrices = getPoolPrices(tokens, prices, pool);
  const rewardsPerWeek = taoPerBlock / 10 ** tao.decimals * 604800 / 3;

  const rewardPrice = getParameterCaseInsensitive(prices, TAO_ADDR).usd;
  const userStaked = userBalance / 10 ** pool.decimals;
  const pendingRewardTokens = pendingRewards / 10 ** tao.decimals;

  let staoCircSupply = await STAO_MAIN_CONTRACT.circulatingSupply();
  let stakingReward = await STAKING_TAO_CONTRACT.taoToDistributeNextEpoch(); //getCurrentRewardForNextEpoch();
  let stakingRebase = stakingReward / staoCircSupply;

  let nextEpochRewards = userStakingBalance * stakingRebase;

  let dayRate =  (Math.pow(1 + stakingRebase, 1 * 4) - 1) * 100;
  let weekRate =  (Math.pow(1 + stakingRebase, 7 * 4) - 1) * 100;
  let monthlyRate =  Math.pow(1 + stakingRebase, 30 * 4) * 100;
  let stakingAPY = Math.pow(1 + stakingRebase, 365 * 4) * 100;

  const approveAndStake = async function() {
    return taoPoolContract_stake(App, TAO_POOL_ABI, TAO_POOL_ADDR, lpToken)
}
const unstake = async function() {
    return taoPoolContract_unstake(App, TAO_POOL_ABI, TAO_POOL_ADDR)
}
const claim = async function() {
    return taoPoolContract_claim(App, TAO_POOL_ABI, TAO_POOL_ADDR)
}



const approveAndStakeTAO = async function() {
  return taoDaoContract_stake(App, STAKING_TAO_ABI, STAKING_ADDRESS, TAO_ADDR)
}
const unstakeTAO = async function() {
  return taoDaoContract_unstake(App, STAKING_TAO_ABI, STAKING_ADDRESS)
}

  const usdTaoStaking = userStakingBalance*rewardPrice;
  const apyDay = parseFloat(dayRate.toString()).toFixed(2);
  const apyWeek = parseFloat(weekRate.toString()).toFixed(2)
  const apyYear = parseFloat(stakingAPY.toString()).toFixed(2);
  const amountTaoDay = ((userStakingBalance) * (dayRate / 100)).toFixed(4);
  const amountTaoWeek = ((userStakingBalance) * (weekRate / 100)).toFixed(4);
  const amountTaoYear = ((userStakingBalance) * (stakingAPY / 100)).toFixed(4);
  
  _print(`<a href='https://bscscan.com/address/${TAO_ADDR}' target='_blank'>${rewardTokenTicker}</a> Price: $${formatMoney(rewardPrice)} Circulating Market Cap: $${formatMoney(rewardPrice*taoCircSupply)}`);
  _print(`Staked: ${parseFloat(totalStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(totalStakingBalance*rewardPrice)})`) 
  _print(`You are staking ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker} ($${formatMoney(usdTaoStaking)})`)
  _print(`APY: Day ${apyDay}% (${amountTaoDay} TAO) Week ${apyWeek}% (${amountTaoWeek} TAO) Year ${apyYear}% (${amountTaoYear} TAO)`)
  _print_link(`Stake ${parseFloat(userTaoBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, approveAndStakeTAO)
  _print_link(`Unstake ${parseFloat(userStakingBalance.toString()).toFixed(4)} ${rewardTokenTicker}`, unstakeTAO)
  
  _print(``)

  poolPrices.print_price();
  printAPR("TAO", rewardPrice, rewardsPerWeek, poolPrices.stakeTokenTicker,
      poolPrices.staked_tvl, userStaked, poolPrices.price, 4);

  _print_link(`Stake ${pool.unstaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, approveAndStake)
  _print_link(`Unstake ${userStaked.toFixed(4)} ${poolPrices.stakeTokenTicker}`, unstake)
  _print_link(`Claim ${pendingRewardTokens.toFixed(4)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`);
  _print(`\n`);


  hideLoading();
}


const taoPoolContract_stake = async function(App, taoPoolAbi, taoPoolAddress, lpTokenAddress) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(lpTokenAddress, ERC20_ABI, signer)
  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, taoPoolAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1 < currentTokens / 1) {
    showLoading()
    allow = STAKING_TOKEN.approve(taoPoolAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1 > 0) {
    showLoading()
    allow
      .then(async function() {
          TAO_POOL_CONTRACT.stakeLP(currentTokens, {gasLimit: 500000})
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

const taoPoolContract_unstake = async function(App, taoPoolAbi, taoPoolAddress) {
  const signer = App.provider.getSigner()
  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentStakedAmount = await TAO_POOL_CONTRACT.getUserBalance(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    TAO_POOL_CONTRACT.unstakeLP({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const taoPoolContract_claim = async function(App, taoPoolAbi, taoPoolAddress) {
  const signer = App.provider.getSigner()

  const TAO_POOL_CONTRACT = new ethers.Contract(taoPoolAddress, taoPoolAbi, signer)

  const currentEarnedAmount = await TAO_POOL_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

  if (currentEarnedAmount > 0) {
    showLoading()
    TAO_POOL_CONTRACT.claimRewards({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}


const taoDaoContract_stake = async function(App, taoDaoAbi, taoDaoAddress, taoAddress) {
    const signer = App.provider.getSigner()

    const STAKING_TOKEN = new ethers.Contract(taoAddress, ERC20_ABI, signer)
    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer)

    const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, taoDaoAddress)

    let allow = Promise.resolve()

    if (allowedTokens / 1 < currentTokens / 1) {
      showLoading()
      allow = STAKING_TOKEN.approve(taoDaoAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }

    if (currentTokens / 1 > 0) {
      showLoading()
      allow
        .then(async function() {
            TAO_DAO_CONTRACT.stakeTAO(currentTokens, {gasLimit: 500000})
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

  const taoDaoContract_unstake = async function(App, taoDaoAbi, taoDaoAddress) {
    const signer = App.provider.getSigner()

    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer);
    const STAO_CONTRACT = new ethers.Contract(sTAO_ADDRESS, ERC20_ABI, signer);

    const currentStakedAmount = await STAO_CONTRACT.balanceOf(App.YOUR_ADDRESS)

    if (parseFloat(currentStakedAmount.toString()) > 0) {
      showLoading()
      TAO_DAO_CONTRACT.unstakeTAO(currentStakedAmount, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }

  const taoDaoContract_claim = async function(App, taoDaoAbi, taoDaoAddress) {
    const signer = App.provider.getSigner()

    const TAO_DAO_CONTRACT = new ethers.Contract(taoDaoAddress, taoDaoAbi, signer)

    const currentEarnedAmount = await TAO_DAO_CONTRACT.pendingRewards(App.YOUR_ADDRESS)

    if (currentEarnedAmount > 0) {
      showLoading()
      TAO_DAO_CONTRACT.claimRewards({gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
