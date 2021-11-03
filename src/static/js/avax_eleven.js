
$(function() {
consoleInit(main)
  });

const ELE_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"changeElevenPerSecond","inputs":[{"type":"uint256","name":"_elePerSecond","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract ElevenToken"}],"name":"eleven","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"elevenPerSecond","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"panicKK","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingEleven","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardTime","internalType":"uint256"},{"type":"uint256","name":"accElevenPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"bool","name":"_withUpdate","internalType":"bool"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"unpaidTokens","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]
const ELE_VAULT_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"block","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_fee","type":"uint256"}],"name":"changeBpsFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"disabledTesting","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyBurn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"insideChef","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingEleven","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingNerve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"recoverDummy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"setBuybackStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"}],"name":"setConvertStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"},{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"setDummyToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_add","type":"address"},{"internalType":"bool","name":"_bool","type":"bool"}],"name":"setHarvestor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"update11Nrv","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateEle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
  "0x399e0348BdAb853576df586027ddeb1cb25Fae2C",
  "0x1ec083C928e00a93e319ed254d8100410D73a7D4",
  "0x46df6cAF76fb40A9bC92A00A34C5BCAc28964Da9",
  "0x37C1FF5EFB68f5E23BdfAF8b12309F643497645f",
  "0xFD5b56E0198006C22F4B5c1f30Ae36CA8699aCC4",
  "0xAf7A8eb2747179680c141293F9e685D38A04703e",
  "0x4753605dc574Caf2AeF3aDB158E226103D8C9871",
  "0xC0e56d328e3f67b56272fFEddCc7644D2944D4F9",
  "0x44f5a05f5c90c41fecd9be2c81fb536608f92ae5",
  "0xd0fcea4b2a59a6225ffd9cebc76352689b4629dc",
  "0xd22282cb16ece13dd0c8f3d34c1549c7d243f55f",
  "0xc1316bd860e94836d18a395e9f0432dc26b43a70",
  "0x1cddcb0c5f5c1c1247654384414bedd7e6e8f092",
  "0x80f1c47935c260e59d0bffdddc7cd3e1591f7b1d",
  "0xcdcaae519b99cc68b5fd6e21b4fbce11c30b9a95",
  "0x240c334c18e0e379449757b761960f7a0f321e6f",
  "0xb3651b2d9867c5849b145467d5a5aab56739c42c",
  "0xb22436e5ed66e656a19230ec954d5492758ad46c",
  "0xd0115b0d46862a99076d0470c6dcd00b83215d49",
  "0xedebff7017580c4162fac14deb6377c27d041702",
  "0x273b63c5f50759703f9f4641e23744efa00eabf0",
  "0x0c20ee555391d50bd426e4ac5dfea15945657f4d",
  "0xf22ca3ca8e7822888838c50da41d0a3473866a4f",
  "0xe814e1c46c958701b72a9fee8148d1351d3479c0",
  "0x238ace9fb80d5c6ebd478762a91366cd9a0ad799",
  "0xe23cb98f2419afd3e282534a5e19abbd6ea16dc3",
  "0xa662c929f1bba4153267dc1bbfcd4217d7e4aef7",
  "0xf9b41ed9e7a6dc02899b016e048e880467b8a4fc",
  "0xc711a3ce0b857696dd4078735ede3946efe78fe1",
  "0x1b10efb968c61df9ced5032b6f43c2cbfe97f3a9",
  "0x46df6caf76fb40a9bc92a00a34c5bcac28964da9",
  "0x37c1ff5efb68f5e23bdfaf8b12309f643497645f",
  "0x458fdf7c47313733df07266b1e30a62756e73543",
  "0xdf1f7377e38bca073f6f84d2f0c5fb35794d7d70",
  "0x310675fa9dacb82fea98be1dd12e816af67a699c",
  "0x12a956efdaeab69312cdf0405e6d78eec0a843d7",
  "0x3110cff794464906f65ce3dcf134c9467e0e5372",
  "0xbfdeadf82fb9e64128edc9437424c254dc0ff355",
  "0xbe1730f13bf112f4b42ad3b4e80afbda6b42f3b7",
  "0x70acb94cc346027715007b1bdb5c2ac0ebe2c484",
  "0x4af836b91e0e5007c9b7ae5aef4e8d49da10365e",
  "0x1e14476c56c8107cd0e1a654b68f5e858e369e7b",
  "0x7497e961d55bd6c98fbce9b661d50df427396c7d",
  "0x2503894349704b5eb1b835fc39c394f244cb111b",
  "0x79f424589fbaf30316257ce9834b5813b8d72e0c",
  "0x6033bcf920d9d041855f69a9d9f4e9b335108072",
  "0x9d64aa118eeb9a51e28cae16e133273f4f6de3c7",
  "0x324ad4d7c660e9f81c456bf182dee6292c63b258",
  "0x5724bf73bfdff6281e952105bd554cfd998d95e6",
  "0x1197c5a12785cbfe62c8bba5d22d7aa08d5d933d",
  "0x12af77ca93d1c5a7b33e7fc1006686470d5c2f23",
  "0xb92ee1f0da5ad4d94cdfbcc8e19176c9094d124a",
  "0xcafebb77b1f86e12dd96335aab7ef0b1cc1995bf",
  "0xf7598a27894acc67912b7779d5f99d84d8454e94",
  "0xc3759c179821c44a9950683aae99b0bf5d7e2617",
  "0xfa1c6a75d15ff26d64b40e5cad19592304bec1f4",
  "0xda0a32fba5e90d82261da03cbe4699c840993b41",
  "0xb542005572fe0afb4db604a3c0aec1dc6c1cc304",
  "0x892e9cc83b994301097a8f67b6194dc4a266b062",
  "0xf6c5b5f86d76060fc1e8b5af0338ab75cf75d890",
  "0x39e82fd1ab78cccb6a99ccef9163780901a24973",
  "0x20784b4d3982512dbf6b710a38919810e9873ef7",
  "0xa44cc964b93b8c75a10de42be154606d8b4a1f9d",
  "0x6eb6f2677673b47f14abf78e84f4b00110c1a33d",
  "0x4da74886fc2fcae54262fa8956070e0c23420e42",
  "0x7cd445476441ed640d52eb0fc8c48c1406d62490",
  "0x1256c04acdb87e913665fd2f5727c8aea33602dd",
  "0xb25a97e7a7b749c6d6845dae41ec48362b68e6c4",
  "0x0002a6f1071d29c0de7e58666d5e7151e15fa3dc",
  "0xd0850e55568a402823df6986bab1facfa9dcb050",
  "0x26f37205876ea56fe59db2ff60eed2424c704d6c"
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const ELE_CHEF_ADDR = "0x52B8bb74Cde6602AB9e6540e25E0A97f5B3226D7";
   const rewardTokenTicker = "ELE";
   const ELE_CHEF = new ethers.Contract(ELE_CHEF_ADDR, ELE_CHEF_ABI, App.provider);

   const rewardsPerWeek = await ELE_CHEF.elevenPerSecond() /1e18
        * 604800;

    const tokens = {};
    const prices = await getAvaxPrices();

    await loadAvaxChefContract(App, tokens, prices, ELE_CHEF, ELE_CHEF_ADDR, ELE_CHEF_ABI, rewardTokenTicker,
        "eleven", null, rewardsPerWeek, "pendingEleven");

    _print("")

    const poolInfos = await Promise.all(Address.map(a => loadElePoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printEleContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

async function loadElePoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, ELE_VAULT_ABI, App.provider);
    const vault = await getAvaxToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getAvaxToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const ppfs = await contract.getPricePerFullShare() / 1e18;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "avax");
    return { vault, poolPrices, userStaked, ppfs, totalSupply }
  }
  catch (err) {
    console.log(contractAddress, err);
    return null;
  }
}

async function printEleContract(poolInfo) {
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
