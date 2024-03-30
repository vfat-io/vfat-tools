
$(function() {
consoleInit(main)
});

const SLIZ_VOTER_ABI = [{"inputs":[{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_gaugeFactory","type":"address"},{"internalType":"address","name":"_bribeFactory","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"int256","name":"weight","type":"int256"}],"name":"Abstained","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Attach","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"lp","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Detach","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DistributeReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"address","name":"creator","type":"address"},{"indexed":true,"internalType":"address","name":"bribe","type":"address"},{"indexed":true,"internalType":"address","name":"pool","type":"address"}],"name":"GaugeCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"int256","name":"weight","type":"int256"}],"name":"Voted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"whitelister","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"}],"name":"Whitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"lp","type":"address"},{"indexed":true,"internalType":"address","name":"gauge","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"attachTokenToGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bribeFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bribes","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_bribes","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimBribes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_bribes","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"claimFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"},{"internalType":"address[][]","name":"_tokens","type":"address[][]"}],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"claimable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_pool","type":"address"}],"name":"createGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"detachTokenFromGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"distributeAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"distributeFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"distributeForGauges","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"finish","type":"uint256"}],"name":"distributeForPoolsInRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emitDeposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"emitWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"gaugeFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gauges","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"_tokens","type":"address[]"},{"internalType":"address","name":"_minter","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isGauge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"lastVote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"listingFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"minter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"poke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolForGauge","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolVote","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pools","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_gaugeOrBribe","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"registerRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_gaugeOrBribe","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"removeRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"reset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"supplyIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"updateAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_gauges","type":"address[]"}],"name":"updateFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"updateForRange","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_gauge","type":"address"}],"name":"updateGauge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usedWeights","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"address[]","name":"_poolVote","type":"address[]"},{"internalType":"int256[]","name":"_weights","type":"int256[]"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"votes","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"weights","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"whitelist","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const SLIZ_GAUGE_ABI = [{"inputs":[{"internalType":"address","name":"_stake","type":"address"},{"internalType":"address","name":"_bribe","type":"address"},{"internalType":"address","name":"_ve","type":"address"},{"internalType":"address","name":"_voter","type":"address"},{"internalType":"address[]","name":"_allowedRewardTokens","type":"address[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"claimed0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"claimed1","type":"uint256"}],"name":"ClaimFees","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"address","name":"recepient","type":"address"}],"name":"ClaimRewards","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"reward","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"NotifyReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"VeTokenLocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"VeTokenUnlocked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"maxRuns","type":"uint256"}],"name":"batchUpdateRewardPerToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bribe","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"checkpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimFees","outputs":[{"internalType":"uint256","name":"claimed0","type":"uint256"},{"internalType":"uint256","name":"claimed1","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fees1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorBalanceIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorRewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"getPriorSupplyIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isRewardToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"lastEarn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"left","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"registerRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"removeRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardPerTokenCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardTokensLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"supplyCheckpoints","outputs":[{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"supplyNumCheckpoints","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"tokenIds","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"underlying","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ve","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"voter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"withdrawToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]

async function main() {
  const App = await init_ethers();

  let clicked = false;

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");
  _print("This may take few minutes...\n");

  const tokens = {};
  const prices = await getArbitrumPrices();

  const SLIZ_VOTER_ADDR = "0x98A1De08715800801E9764349F5A71cBe63F99cc"
  const SLIZ_VOTER_CONTRACT = new ethcall.Contract(SLIZ_VOTER_ADDR, SLIZ_VOTER_ABI);
  const SLIZ_TOKEN_ADDR = "0x463913D3a3D3D291667D53B8325c598Eb88D3B0e"

  const _gauges = [
    '0x0322CEbACF1f235913bE3FCE407F9F81632ede8B',
    '0x549855586afc1283E90295088ba5Eb51E7236ae8',
    '0x7fA25d8d2fcA0d2e7F837ED9396bDba24c6738F7',
    '0x7C57641D7E4713c9a502e0373679A91Cb5C589EA',
    '0x27024Dbe7fBBf827cD917954adDC5ab21B2f9994',
    '0x637DCef6f06A120e0cca5BCa079F6cF6Da9264e8',
    '0xEe7BEaaf6c4012b35b98f4DCf324213430AbF061',
    '0x7a89aea432B7836fEAe1fE807c7192d935bD80DE',
    '0x64143E491C3DCC4A07187943c4f692C9b1EEE15f',
    '0x884C28296b6eC728aC27BfE7579419709514D154',
    '0x07C26dEcaA281779ed50fC3481CF1d52D5aa088a',
    '0xCa092919e590dE8bf8F522aeC357648288990bd2',
    '0x124Db38273e07dfbd1eee925e6CBc5c9c84B1a2F',
    '0x712454E3E51da150D5C914227D9854Bb003871bc',
    '0x6a2291821F9C34B89102245908563cE95eA64959',
    '0x9Eb99DC96c1F35fD0531e2D7271f5058201FC10B',
    '0x2b303809c46C6B14a9fAc1f11CcBd41c0F729eD1',
    '0xD8af28e1d1e4Fc013354CE9eFD0dAD127485838C',
    '0x3dCB41313dAF6C0095f5Bcd0F1BA387c610B45C5',
    '0x2D541Cb623855D8a9a7b3A1966a85fFA9587660F',
    '0xCCd1eE071d38ae78ecdCEF72c0446Ae5877d47A8',
    '0xDB1D64173CCC4711Bacfe8AB8C01D315B02f7131',
    '0x41C3Db2d64F4d94a906bA6e3747faF7353DEA7c5',
    '0xdea3eFbDE29602f2490684246bf32Ee754213Dd7',
    '0x770E9508534C6898890a4Be7EaFe31F03ECEe969',
    '0xa092932FD4aC545A99022Bc5933a7667fd97b97C',
    '0x571c23198488b231212F922e6a48f14848D41434',
    '0xb2Cd2690ABFED39820a522ed84E4e77909575ce2',
    '0x0477F6c935B9Aa3CF90988B48561AA9A38a39e9B',
    '0x66217e92278731bDF249Ad298E844f80C8be2B58',
    '0xd920Bd357Bd0F5ff9185a295C9c299b331D5E4ea',
    '0xa4f536393E277DC63ECfa869d901b4f81cc5462C',
    '0x98Eb3c50513D054088ac13Af7e5f46b37331c503',
    '0xfB3882dd706bfd9F75F0394173C288d2Cd4164F4',
    '0xbE5eb272917c5B78efE930c0C7adB93f345F72ac',
    '0x5aDfc21C8CAaFF22AbF8DdC32f1947e2D782847A',
    '0xcb95E3421AbcBcbd9939e201139747233425aEDB',
    '0x6BCC274235E7879662FC18f1f9Cb4C037d77f514',
    '0x6a1E24b675Bf45D65B389cd41805d38ce302d413',
    '0xe79Cb622C1A56EDcc507cBD0591c08a86eC057ab',
    '0xb46EEd060AB29017d571760e75Cd15221578e39b',
    '0xDc3e8261136f56a7082ef16432DB559026DB8c7C',
    '0xD3714990A70739874313505FA496F8De83d94B8e',
    '0xd1059aC4C66f38013E6bDEaFCf3d943c7820A3a4',
    '0x12981565263628164cDFA32290EBCcdbd7e5cCa4',
    '0x113b7C73f6378bD47bf30cf63146EE04BBBC0e3b',
    '0x38B5118c837f44cb75fa2ec151F21e4f2176b1Ea',
    '0x471b36c1D03C8155B06343b879F45E542D01832F',
    '0x5C89ca35a1AE6c87FB9f17D9C4905CBcba6eDbd5',
    '0x62399d8Cf9510f16edA4A3804801106C78482e20',
    '0x6018931119AeE7da3d8d0B8eF09B7a60739E462A',
    '0xeA0Ccb334FfF329B605D9fB6Cdf2d8451ee4fB95',
    '0xb613D08eb5ff55C553aFCCdab76F1A8c48628A61',
    '0xF5E17c2a60D4eF718F6b233d284978BEEb060eD6',
    '0x30537d33B8e65d99c9f15DA6A9036fe346488fDA',
    '0x7beD9F7FB3a17885926Bf9Ca2680a484cB87d048',
    '0x628f4816380AB612c42B558e09A9509f1Ddb864E',
    '0x815bef112aF76C71921cD32FBD54691F0aaA6C90',
    '0xE08D3842d8217b4Dc0d9D5a9D4923419604D3C9A',
    '0x85cAdB2841D0Ca2De4eC2a0a07aB0b7c151BB343',
    '0xb8f188D85B6a01897635C8A10382AAB83a048cdC',
    '0x3aa010A8d81d20391Af9ff9C723EE39C89D3676a',
    '0x0Cab08A95cbc2084Ed2c5d54781Da2926a371966',
    '0x31c7EB7F0467E43Ed67aeeB184B476Db9e7e83A2',
    '0x5Dd566264374FC29E9e7bC72148B10d71E82495d',
    '0xFfcD37D495FdCddd4D2E41C549A176013ed81068',
    '0xD1D504Ea8580d0AD2C1bD59F96e600882abee180',
    '0x7fDf2877Ee9A2a3d268eE04D87A5A4f46e9d0ACb',
    '0xaDBf3Fb92298eA927539d1Ae3218b386675640e2',
    '0xDed2C2A6C98fBf2b246fd1051eA066F769802B67',
    '0x0a397520553a17d4d513c2F6Fc6C72ea05d51d51',
    '0xa92107768915bde5dbf9cfaBc8818B0975b1293D',
    '0x3C2478566a9f45D1dF606751CA4C43A5173f1c11',
    '0x61f6b1f1E1F281b726eA7a8EeE8d6E27eDC99248',
    '0xE13B8A983ea5Be02573F3cc2F4c963Ced68E742C',
    '0xb4366017274659c00B77f1561520819E551B5fe5',
    '0x9E5129EE4637d859CB0107fFC470F4b0272809eb',
    '0xb4f09Eaf219aa6d2c59c4af95FD7FA790d2673a8',
    '0x7d5CF74DDf465c7bfe605ca4085d7c1bf267FBB0',
    '0xa0c895aBc59BF9E171267A2268e37eAe9A16d890',
    '0x03C13cd2b633b5A10fB101ec1116fd746D863974',
    '0x8A342C31BCE311C902d39CdEE66248edb3E97268',
    '0xc04249914D37c03cCdA63CEB93F26186B62804d1',
    '0xB924eC9DDE82a8a7004618322519db213Ba7Ad18',
    '0x6F18A487095daf237823F297964d7c33EF05E2dD',
    '0xDE1545d25E3EE18CBd6AE6d477eA4882A5180Cec',
    '0xe7298F8C091237D3b31bE1c7Eaa67C68A3fb7df0',
    '0x5E4861d20697B1b9212DF92Cb45f933fdDf64a36',
    '0x5712BaE85f59661891afdd0276DF1155e05AF4cB',
    '0xFFb8702546f8223Cdc890De253E7C30ABC7d671D',
    '0xE151A34Ea3499589F89D5f30F590dC2125957236',
    '0xE9fEc14b99EEe102cA25692a957398d9f3EBDAF2',
    '0xb836B18dE6a8C99f73995476D010022C773bd419',
    '0xC475B9772516b8D5bde3CD2Fa514A79eB8792ebb',
    '0x466E517e96ff93B2A6C3F1A649bEe8fb63a4aFbf',
    '0xC554eDBF190f5f417e2b6d2b9a458c98dbcE9B92',
    '0x9219c4eEA28Fe8D14126ACCcE7cbE6F90Ea94F1b',
    '0x8A076b1ba370fEFe5506608292f041EF49Df3370',
    '0xeCEe212b65a54cA7725aA19DCEed45effB3cf385',
    '0x875fD94A62323e048bd6fc3E113Ed6b50C2BCe5f',
    '0x56B8fFbD000560b45C3D01101D1FaB112B5C48D2',
    '0xdfB2b34D4EAEAdfEF1183089bF0f8D2884941fe7',
    '0xE84c16FC71421c2725820e93aEC1BaF887767C8A',
    '0xAD703298F15ddB58f223884e97718385197Ec19B',
    '0x3434B6537c7DB59aD82cA74E6F977dA706eb38C0',
    '0x8B8b61A08C0BC26f566c63f81aF4796180225181',
    '0x8dC12F8e86cF3b153d2e275B5Cb8Fafd32608710',
    '0x23a91aD3a707460e63f4aA7B1152B4920B05E579',
    '0xE238b77bEF29Ab2E6139514b15594dFA3d615904',
    '0x33B000D49023701770D81D78aB50Ac5eA6624dFC',
    '0xe492ca3CAD007D6fa1125d8d69D9Aa41C88F1B66',
    '0xd2b1fd2c0d4DfcBD0c51D4De4BfcEfd5346f0E6a',
    '0x7ca9B0a674562b8231D36e687fbfEC032556652B',
    '0xc43e8F9AE4c1Ef6b8b63CBFEfE8Fe90d375fe11C',
    '0xAb2De0dB8bA22B97456314fcC235D6D85342e60e',
    '0xa18D84C6BEF410125F97696384D956372C058930',
    '0x7d3Ab79c9C9A23B3b5d928901F66f3519B20BC49',
    '0x66F5AF74Dbfd6cae7890Fa387e06BE721aC288A8',
    '0x21a3C5Eb0a5A4784586CCbC8C803E2E36A9AEcb6',
    '0xD93cA2ABB3A8D351C656957611A7f4482F30e310',
    '0xA62572dF36d902aAa408990fA4d33DFFAfeaC393',
    '0xB20f8E55fE53330Aa37fC50C9d2aC9A66a682472',
    '0x217a38523906BF8edC17c23C90651E3553fa9EBD',
    '0xe179D0e502Da48366C2CB42639De259804542B16',
    '0x45283Db4fB16EB7d926A791EEb8C1E1582ACD658',
    '0x2EA81893a368E3A0ac9505F9037C3a9102A3efB9',
    '0x94D113039dc9ad4eC9344C5C3BAdCe37Aa8217F2',
    '0x73168B5f6466847F5912Cb7b084A183b0c20b26a',
    '0xFb2385C45B51400F54d6E44E9514b9D36Eb41eA5',
    '0x56833909D22097aecB50bf129d4Caab1F572a1F4',
    '0x1eAE67bCB44d0dE3F9fe75e2aeE8805AFc18A4B4',
    '0x058F3a0908C147e08EED415b71e47eA296Bc60e8',
    '0x743b067473d5F5ccA6eBDf6f7d8d35BC891E0d52',
    '0xfb0B6B67790F595CA5997098353E7abC8D8ad5c9',
    '0x36654BF28f8FAeBf7f4252BC304bB1122b283aC8',
    '0x798b0ff5A97614787186F29A70Fdc1Ce2961d191',
    '0x8c14F95Fe9D839F73bd09558BF64e4d343B91ecc',
    '0x390Eb73294844f7e585f6c1c79c201Ba6b780C84',
    '0xAE44E64FF5d1752d8752d4F28bDA302ff8602fbe',
    '0x2ef38699b3F4b48F31Fd08bdd83892c51D8174C8',
    '0x96f82F4C202AC6FB36feDc977e16EbB265eEa3A3',
    '0xBa3fBe3c481a4ceC3B28A7E7e979D5CD17c1e3B1',
    '0xE0b1642F7bED70093D192dE2ddBb3dbf5E0FF867',
    '0x9aC5dA12a9B2e0B8e6a8bbCfD314Fb9B2945d464',
    '0xb5a3c17032f670C556f698B784bbC57c09434749',
    '0xb8d5A3a979dD8678d531d912B8476e440aa0E00e',
    '0x3fC06D3c77fcb309e27cEC6289FCc08082B2Fb63',
    '0x641888Fd7EB92b03C973Add54A5Cb28cd474EA7B',
    '0xeE054e701b313257F78e0f97bfdE2d3f01fe410b',
    '0x0FDA9D621228746FD45cb299641Fd7C00E01B1E9',
    '0x815927872a5Ca508eADe6e2CdA9F0a0BC7aC8293',
    '0x1ddc935A12903A6dda7e05a57f15180dCae57e6E',
    '0xBc08C4e610d3D44133a5ae765DC0A3709CC1C615',
    '0x575D6C85AeEAaaaE64664F7a3570C90E604FBb3A',
    '0x81DCB486Cb80fE593F4088d1B14aCe44ebA36013',
    '0x4Ce4289E09375fd6D77B66552168C1da4456a403',
    '0xf459E6EFCeeAB5Ab6DD7fc22B33141ac24e86244',
    // '0xD25d0789e7Fff1e21c2d8FE8Eb2534ab25d045EC', // missing prices
    // '0xCf6147a50E5b7784CB30C6ab83949726Da43Be9a' //missing prices
  ]

  const gauges = _gauges.filter(g => g != "0x0000000000000000000000000000000000000000").map(a => {
    return {
      address: a,
      abi: SLIZ_GAUGE_ABI,
      stakeTokenFunction: "underlying"
    }
  });

  await loadSlizSynthetixPoolInfoPrice(App, tokens, prices, "0x751F3B8ca139bC1F3482b193297485f14208826a", "0x751F3B8ca139bC1F3482b193297485f14208826a");

  let totalUserStaked = 0, staked_tvl = 0;
  for(const gauge of gauges){
    let p = await loadSlizSynthetixPools(App, tokens, prices, [gauge], clicked)
    totalUserStaked+=p.totalUserStaked;
    staked_tvl+=p.staked_tvl;
  }
  _print_bold(`Total staked: $${formatMoney(staked_tvl)}\n`);
  if (totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(totalUserStaked)}\n`);
    _print("");
  }

  // const claimAll = async function() {
  //   const rewardTokenAddresses = p.gaugeAddresses.map((g) => [SLIZ_TOKEN_ADDR]);
  //   return slizContract_claimAll(p.gaugeAddresses, rewardTokenAddresses, SLIZ_VOTER_ADDR, App)
  // }
  // const reload = async function(){
  //   _print("Reading smart contracts...\n");
  //   _print("This may take few minutes...\n");
  //   const App = await init_ethers();
  //   return reloadFun(App, p.tokens, p.prices, p.pools, p.clicked);
  // }
  // _print_link(`Claim All ${p.earnings.toFixed(6)} SLIZ ($${formatMoney(p.earningsUSD)})\n`, claimAll)
  // _print("");
  // _print_link(`\nClick here to see just your staked pools`, reload);
  // _print("");

  hideLoading();
}

const slizContract_claimAll = async function(gaugeAddresses, rewardTokenAddresses, voterAddress, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(voterAddress, SLIZ_VOTER_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  showLoading();
  REWARD_POOL.claimRewards(gaugeAddresses, rewardTokenAddresses, { gasLimit: 5000000 })
  .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function(ex) {
        console.log(ex);
    }
  )
  hideLoading();
}

const reloadFun = async function (App, tokens, prices, pools, clicked){
  if(clicked == false){
    clicked = true;
    let p = await loadSlizSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }
  }else{
    clicked = false;
    let p = await loadSlizSynthetixPools(App, tokens, prices, pools, clicked)
    if (p.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p.totalUserStaked)}\n`);
      _print("");
    }
  }
}

async function loadSlizSynthetixPools(App, tokens, prices, pools, clicked) {
  let totalStaked  = 0, totalUserStaked = 0;
  let gaugeAddresses = [], earnings = 0, earningsUSD = 0;
  const infos = await Promise.all(pools.map(p =>
      loadSlizSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSlizSynthetixPool(App, i, "arbitrum", clicked);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      gaugeAddresses.push(p.stakingAddress);
      earnings += p.earned;
      earningsUSD += p.earningsUSD;
    }
  }
  return { staked_tvl : totalStaked, totalUserStaked, gaugeAddresses, earnings, earningsUSD, tokens, prices, pools, clicked};
}

async function loadSlizSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    let rewardTokenAddresses = [], rewardTokens = [], rewardTokenTickers = [], rewardTokenPrices = [], earnings = [];
    //Added with manually reward
    const rewardTokenAddress = "0x463913D3a3D3D291667D53B8325c598Eb88D3B0e";
    rewardTokenAddresses.push(rewardTokenAddress);
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
      tokens[rewardTokenAddress] = await getGeneralEthcallToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);
    const rewardTokenTicker = rewardToken.symbol;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
    const earned_ = await STAKING_POOL.earned(rewardTokenAddress, App.YOUR_ADDRESS)
    const earned = earned_ / 10 ** rewardToken.decimals;
    rewardTokens.push(rewardToken);
    rewardTokenTickers.push(rewardTokenTicker);
    rewardTokenPrices.push(rewardTokenPrice);
    earnings.push(earned);

    var stakeToken = await getGeneralEthcallToken(App, stakeTokenAddress, stakingAddress);

    const balance = await STAKING_POOL.balanceOf(App.YOUR_ADDRESS)
    const derivedSupply_ = await STAKING_POOL.derivedSupply()
    const derivedBalance_ = await STAKING_POOL.derivedBalance(App.YOUR_ADDRESS)
    const derivedSupply = derivedSupply_ / 10 ** stakeToken.decimals
    const derivedBalance = derivedBalance_ / 10 ** stakeToken.decimals

    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getGeneralEthcallToken(App, address, stakingAddress);
    }

    const poolPrices = getPoolPrices(tokens, prices, stakeToken, "arbitrum");

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      stakeTokenTicker,
      stakeTokenPrice,
      staked_tvl,
      userStaked,
      userUnstaked,
      earnings,
      derivedSupply,
      derivedBalance,
      rewardTokenPrices,
      rewardTokenAddresses,
      rewardTokens,
      rewardTokenTickers
    }
}

async function printSlizSynthetixPool(App, info, chain="eth", clicked, customURLs) {
  if(clicked == true && info.userStaked == 0){
    return {
      staked_tvl: 0,
      userStaked : 0,
      stakingAddress : info.stakingAddress,
      rewardTokenAddress : info.rewardTokenAddresses[0],
      earned : info.earnings[0],
      earningsUSD : 0
    }
  }
  info.poolPrices.print_price(chain, 4, customURLs);
  const userStakedUsd = info.userStaked * info.stakeTokenPrice;
  const userStakedPct = userStakedUsd / info.staked_tvl * 100;
  _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
  const earningsUSD = info.earnings[0]*info.rewardTokenPrices[0];
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
    }
  const claim = async function() {
    return slizContract_claim(info.rewardTokenAddresses[0], info.stakingAddress, App)
  }
  const exit = async function() {
    return rewardsContract_exit(info.stakingAddress, App)
  }
  const revoke = async function() {
    return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
  }
  _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Scan</a>`);
  let claimLink = "";
  for(let i = 0; i < info.earnings.length; i++){
    claimLink += `${info.earnings[i].toFixed(6)} ${info.rewardTokenTickers[i]} ($${formatMoney(info.earnings[i]*info.rewardTokenPrices[i])}) `
  }
  _print_link(`Claim ${claimLink}`, claim);
  if (info.stakeTokenTicker != "ETH") {
    _print_link(`Revoke (set approval to 0)`, revoke)
  }
  _print_link(`Exit`, exit)
  _print("");

  return {
      staked_tvl: info.poolPrices.staked_tvl,
      userStaked : userStakedUsd,
      stakingAddress : info.stakingAddress,
      rewardTokenAddress : info.rewardTokenAddresses[0],
      earned : info.earnings[0],
      earningsUSD : earningsUSD
  }
}

const slizContract_claim = async function(rewardTokenAddress, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, SLIZ_GAUGE_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(rewardTokenAddress, App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward(App.YOUR_ADDRESS, [rewardTokenAddress], {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function loadSlizSynthetixPoolInfoPrice(App, tokens, prices, stakingAddress, stakeTokenAddress) {
  var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);
  var newPriceAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
    if (newPrices[key]?.usd)
        prices[key] = newPrices[key];
  }
  var newTokenAddresses = stakeToken.tokens.filter(x =>
    !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakingAddress);
  }
  const poolPrices = getPoolPrices(tokens, prices, stakeToken, "optimism");

  if (!poolPrices)
  {
    console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
    return null;
  }

  const stakeTokenTicker = poolPrices.stakeTokenTicker;

  const stakeTokenPrice =
      prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;

  const staked_tvl = poolPrices.staked_tvl;

  return  {
    stakingAddress,
    poolPrices,
    stakeTokenAddress,
    stakeTokenTicker,
    stakeTokenPrice,
    staked_tvl,
  }
}
