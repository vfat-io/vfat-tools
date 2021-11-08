$(function() {
  consoleInit(main)
});

const REAPER_VAULT_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"DepositsIncremented","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"}],"name":"TermsAccepted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"total","type":"uint256"}],"name":"WithdrawalsIncremented","type":"event"},{"inputs":[],"name":"agreeToTerms","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"constructionTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeDeposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"cumulativeWithdrawals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasReadAndAcceptedTerms","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategy","type":"address"}],"name":"initialize","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const Address = [
  '0xc653C5128C8D135FF8ad796353128AFf872Ff1bA',
  '0x08a9A35A70d1AE4D9c1035fc92ab5D278f4B7800',
  '0x98010a39f41E2EF41c4943936BD852a1843C9574',
  '0x62b53cAAD9acBAbAE33bbeA012503Dd3cc151498',
  '0x7270071225BA3CCB46a8bed2E99309BB02c576B9',
  '0xB60Ef4F4DeBBF3Ef073e766bff5195E070f4EC2e',
  '0x55b0F1c2414334b1Bdd091e53d95D66D936Aa944',
  '0xc4F6114e7764128792415AA6e859d79Fe1CFF775',
  '0x75e9d0fe21e47A5ea584e7cd3FDfD6494b5C6d26',
  '0xc5E3339F907486f1Ff9969765e5842C9E93C507d',
  '0xDb6721a1FC3Cec2a5a8af2c5946beD3D60843C1c',
  '0x8DC2B5532A2b3245ded3406a064e8452E8364Ee3',
  '0xe3165402205EE383A171cb20cEa1229b4DE05C80',
  '0x7170e41Fca6388e50544290A70A73AcB2697f27E',
  '0x68565c0ff26b082539Aac476d96aDD93644Ef989',
  '0x804B330e28f53C911162a57a5b98Cd310Cc9e856',
  '0x7893AE094DEC343cD8080E78EE73ea1930d19ABe',
  '0x50BFB487698335Ad58b3cA1135Eb66D1dD7D368f',
  '0x6e7CeB988f63FAC007Fd9135e06db8C785f1E5a9',
  '0x2425BE5F64ed3CbcC0731886058C675eE62e88ed',
  '0x4310a444499D808fB767891c140f587D1D4bD925',
  '0x60cB193Fc6864769728c85D534B462A3469f9409',
  '0xDf156E97FE6E380dDc75950a030BF54960621ed0',
  '0x30A9Eb3EC69eD8e68c147B47b9C2E826380024a3',
  '0x1FdE23461662a23Bc753b9f2739b42410701d064',
  '0x88e325103c7ADBAe844995Ce639cE2Ec075d51c3',
  '0x6651cDe506411D7fFcf5d1A45adE87899feD4Faa',
  '0x6fcF689F75f52F4127B3d6443082D7838a23A6cA',
  '0x78E1BC92C8D9fdfDc5D61e8eEa91c2B31efF48be',
  '0xec1f94e6eF30C13bD1cCA0f9DA24418F1F1eaE90',
  '0xBfa72c1dEdf01D8d23B471BB4C6b58ad56000D49',
  '0x1DCFa0081DB79D4379EcF5fB5F50aaCB38ebC29F',
  '0x89258E367aE8a66CB276Fa8b98Cb3743B7cD853e',
  '0xAF8850d4b91B5a46e0Fe7ec16CA60c25F0d488e9',
  '0x7Fe81Fa9743Dba1D1E05447c35781871AD26ee47',
  '0xe0cD38B7c566A48eaac11B8af63Ab22E891D7d27',
  '0x722A51779f78c9Eb87810a962cac7D4eb828d673',
  '0xcb547CFB9E2f6b921928618dFEeaD94fB1782fC9',
  '0x693be4dD67fe3AacA8A795AE64447D0e6a954D2f',
  '0xD3514644cCc3EC6640E9aC4A4289744377Eb8aBF',
  '0x0f3eE7EFD5423e557067aFff4FbD3FED769d7f74',
  '0xbc2502A4130369B5e116C644751f7E494D4c2748',
  '0xf9eEd794Ff17386721c6488aaBe65a59ed53C120',
  '0xc627BbFC991Be4A4852cED481e47B425494ba99C',
  '0x5BC25619faDA2e322aB7Dd0F2B9f31ba729DA5af',
  '0x7E1110917abAe47D688029Bb57A7186b4D5C6a4F',
  '0x1eA2B476F2669c47937d2d5D64Ef92E59DE9D002',
  '0xF508E956b07486De4588880B602B3f02AdFc6941',
  '0xD73A72a25220C64431e6327d11D3CF96F5380206',
  '0x17cBE3eD02A92c2D9C7647D06De99E58b13dFa48',
  '0x170ECd93e6DaF338253d5a9cA67a4C0E898BB082',
  '0x6AeA0967A4C579e2310F133b200d0A1252a4ba78',
  '0x9a92D53a923C75CC388Ea27D71F93Fb0b0797Fb1',
  '0x6891701faae04eD9738160Ac9eE57C2916a7F95c',
  '0xbC43B27443D97Afa9eB048E8E857DEcC7274A257',
  '0xb8024c7a0B5c2D60C24fB20E27e625681058e3F3',
  '0x18618BffC1598785f7407400Fb8332954A298C07',
  '0x38092Fce723d999D592877B48a6F198e9DE8DE53',
  '0x9700ee5Be14DbA8aDC3b3e9202CbE5D4E50e2959',
  '0x7647F9DB71F4A0E52b40101633352d3EDA367c0d',
  '0x0351C62325b91dB8A67C00C489c71878203A0bBb',
  '0x4987AbFACE73C78bA7435eC16743c541CF1Ef660',
  '0x19383c6e3dFd5Da571Afb6D03600a26dB246bF21'
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const prices = await getFantomPrices();
  const tokens = {};
  const poolInfos = await Promise.all(Address.map(a => loadReaperPoolInfo(App, tokens, prices, a)));
  let tvl = 0, userTvl = 0
  for(const p of poolInfos.filter(p => p))
  {
    printReaperContract(p);
    if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
    if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
  }
  _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function loadReaperPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, REAPER_VAULT_ABI, App.provider);
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

async function printReaperContract(poolInfo) {
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