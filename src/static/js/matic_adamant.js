
$(function() {
  consoleInit(main)
  });

const ADAMANT_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_strategy","internalType":"contract IStrategy"},{"type":"string","name":"_name","internalType":"string"},{"type":"string","name":"_symbol","internalType":"string"},{"type":"uint256","name":"_approvalDelay","internalType":"uint256"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"NewStratCandidate","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpgradeStrat","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"approvalDelay","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPricePerFullShare","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseTokensGetStuck","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"proposeStrat","inputs":[{"type":"address","name":"_implementation","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"implementation","internalType":"address"},{"type":"uint256","name":"proposedTime","internalType":"uint256"}],"name":"stratCandidate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IStrategy"}],"name":"strategy","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"upgradeStrat","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"want","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
const ADAMANT_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_unirouter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HYPER_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alloy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToWbnbRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hypercity","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hyperdao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hypr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToHyprRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0x6aa5d8ddd8ca969e4f985d53fd8a46077652f239",
    "0x223fd0c9214e13481ee972121fa0164af9fd94ec",
    "0x6cc7a91990a9503736daf38cc67cc44e667cda39",
    "0x25915bd35bf3ae2a4396dfc4bc150664aeb18477",
    "0x96ef332c950f9ec2fb5b37420887ee1e28cff1f1",
    "0xc4a350b85ae1af071fc9d542caa6c7deabf19a24",
    "0xf2536cfb2e8113c812b4fa670dcc95c35b5b3cdd",
    "0xc202e09d60fb53ef023098bf6dbae941b05312f2",
    "0x019d2b581b22ef1266136df1882684e216b354fe",
    "0x7fba16061d1a9d30f5fa1ced211e161c7d7ff1e4",
    "0x88f81fbb5fc676065a9e3dada597a9829109e79c",
    "0x132d94e04c1deec2e0b0daf34a4948be89d02103",
    "0x5778fe61a19af2ae7e0f7183b00b3ab4f160747a",
    "0x96315d37876a576f313fa1a93994156f492f8fad",
    "0x26026849333149fc576e8a84833e84631dec3e35",
    "0x29316d4d0426d8a43c52f4e555e9eb5f92a51c5d",
    "0x6c06dc0785bd6b3c1a911bf972317c93b6f82cb8",
    "0x9c7f926d7a269921d87bca8d7d184dfa7103f58f"
  ]
  
async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const prices = await getMaticPrices();
    const tokens = {};
    const poolInfos = await Promise.all(Address.map(a => loadAdamantPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printAdamantContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }
  
    hideLoading();
  }
  
  async function loadAdamantPoolInfo(App, tokens, prices, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, ADAMANT_VAULT_ABI, App.provider);
      const vault = await getMaticToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const ppfs = await contract.getPricePerFullShare() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "matic");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }
  
  async function printAdamantContract(poolInfo) {
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
  