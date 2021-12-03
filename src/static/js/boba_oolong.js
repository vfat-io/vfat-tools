
$(function() {
consoleInit(main)
  });

const OLO_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_oolong","internalType":"contract OolongToken"},{"type":"uint256","name":"_oolongPerSec","internalType":"uint256"},{"type":"uint256","name":"_startTimestamp","internalType":"uint256"},{"type":"address","name":"_distributorAddr","internalType":"address"},{"type":"uint256","name":"_distributorPercent","internalType":"uint256"}]},{"type":"event","name":"Add","inputs":[{"type":"address","name":"lpToken","internalType":"address","indexed":true},{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"AddBonusFarm","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"address","name":"bonusFarm","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"RemoveBonusFarm","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true}],"anonymous":false},{"type":"event","name":"Set","inputs":[{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"allocPoint","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"SetDistributorAddress","inputs":[{"type":"address","name":"oldAddress","internalType":"address","indexed":true},{"type":"address","name":"newAddress","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"UpdateEmissionRate","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"_oolongPerSec","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addBonusfarm","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_bonusFarm","internalType":"contract IBonusFarm"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"distributorAddr","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"distributorPercent","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"isPool","inputs":[{"type":"address","name":"","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract OolongToken"}],"name":"oolong","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"oolongPerSec","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingOolong","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardTimestamp","internalType":"uint256"},{"type":"uint256","name":"accOolongPerShare","internalType":"uint256"},{"type":"address","name":"bonusFarm","internalType":"contract IBonusFarm"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeBonusFarm","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDistributorAddr","inputs":[{"type":"address","name":"_distributorAddr","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDistributorPercent","inputs":[{"type":"uint256","name":"_newDistributorPercent","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStartTime","inputs":[{"type":"uint256","name":"_startTimestamp","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startTimestamp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateEmissionRate","inputs":[{"type":"uint256","name":"_oolongPerSec","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

   const OLO_CHEF_ADDR = "0x31B9FBd965397d697D2dAa434EbD219aB878E49B";
   const rewardTokenTicker = "OLO";
   const OLO_CHEF = new ethers.Contract(OLO_CHEF_ADDR, OLO_CHEF_ABI, App.provider);

   const weeklyRewards = await OLO_CHEF.oolongPerSec() /1e18 * 604800;
   const distributorPercent = await OLO_CHEF.distributorPercent()
   const rewardsPerWeek = weeklyRewards * (1 - distributorPercent / 1000)

    const tokens = {};
    const prices = await getBobaPrices();

    await loadOLOSynthetixPoolInfo(App, tokens, prices, "0xf5ffa0aabf101e651f6cf722031d4efedc835b67")

    let p = await loadBobaChefContract(App, tokens, prices, OLO_CHEF, OLO_CHEF_ADDR, OLO_CHEF_ABI, rewardTokenTicker,
        "oolong", null, rewardsPerWeek, "pendingOolong");
    
    const claimAll = async function() {
      return rewardsOloContract_claimAll(OLO_CHEF_ABI, OLO_CHEF_ADDR, p.totalUserStaked, App)
    }
    if(p.totalUserStaked > 0){
      _print_link(`Claim All`, claimAll);
    }

    hideLoading();
  }

async function loadOLOSynthetixPoolInfo(App, tokens, prices, stakeTokenAddress) {
      var stakeToken = await getBobaToken(App, stakeTokenAddress, stakeTokenAddress);
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
          tokens[address] = await getBobaToken(App, address, stakeTokenAddress);
      }
      const poolPrices = getPoolPrices(tokens, prices, stakeToken, "boba");
      if (!poolPrices)
      {
        console.log(`Couldn't calculate prices for pool ${stakeTokenAddress}`);
        return null;
      }
      const stakeTokenTicker = poolPrices.stakeTokenTicker;

      const stakeTokenPrice =
          prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
      return  {
        poolPrices,
        stakeTokenAddress,
        stakeTokenTicker,
        stakeTokenPrice
      }
}

const rewardsOloContract_claimAll = async function(chefAbi, chefAddress, userStaked, App) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  if (userStaked > 0) {
    showLoading()
    CHEF_CONTRACT.claimAll({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}