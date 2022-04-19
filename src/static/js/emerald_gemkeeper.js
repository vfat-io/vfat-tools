
$(function() {
    consoleInit(main)
      });
  
    const GEM_KEEPER_CHEF_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_bling","internalType":"contract Bling"},{"type":"address","name":"_devaddr","internalType":"address"},{"type":"uint256","name":"_blingPerBlock","internalType":"uint256"},{"type":"uint256","name":"_startBlock","internalType":"uint256"},{"type":"uint256","name":"_bonusEndBlock","internalType":"uint256"},{"type":"uint256","name":"_tokenLaunch","internalType":"uint256"}]},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"EmergencyWithdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Withdraw","inputs":[{"type":"address","name":"user","internalType":"address","indexed":true},{"type":"uint256","name":"pid","internalType":"uint256","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"BONUS_MULTIPLIER","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"add","inputs":[{"type":"uint256","name":"_allocPoint","internalType":"uint256"},{"type":"address","name":"_lpToken","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract Bling"}],"name":"bling","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"blingOfEachPhase","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"blingPerBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"blockNumberOfEachPhase","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"bonusEndBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"currentBlingPhase","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"dev","inputs":[{"type":"address","name":"_devaddr","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devaddr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergencyWithdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getMultiplier","inputs":[{"type":"uint256","name":"_from","internalType":"uint256"},{"type":"uint256","name":"_to","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"launch","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"massUpdatePools","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pendingBling","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"address","name":"_user","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"lpToken","internalType":"contract IERC20"},{"type":"uint256","name":"allocPoint","internalType":"uint256"},{"type":"uint256","name":"lastRewardBlock","internalType":"uint256"},{"type":"uint256","name":"accBlingPerShare","internalType":"uint256"}],"name":"poolInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"poolLength","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"set","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_allocPoint","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"startBlock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"tokenLaunchTime","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"tokenLaunched","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalAllocPoint","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updateBlingPerBlock","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"updatePool","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"amount","internalType":"uint256"},{"type":"uint256","name":"unclaimedReward","internalType":"uint256"},{"type":"uint256","name":"rewardDebt","internalType":"uint256"}],"name":"userInfo","inputs":[{"type":"uint256","name":"","internalType":"uint256"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"},{"type":"uint256","name":"_amount","internalType":"uint256"}]}];
    
    async function main() {
        const App = await init_ethers();
  
        _print(`Connected to ${App.YOUR_ADDRESS}\n`);
        _print("Reading smart contracts states...\n");
  
       const GEM_KEEPER_CHEF_ADDR = "0x05243Bd7778a9D5556AFC98Ae9D222Cdf5E7C704";
  
       const rewardTokenTicker = "BLING";
       const GEM_KEEPER_CHEF = new ethers.Contract(GEM_KEEPER_CHEF_ADDR, GEM_KEEPER_CHEF_ABI, App.provider);
       const currentBlock = await App.provider.getBlockNumber();
       const startBlock = await GEM_KEEPER_CHEF.startBlock();
       let rewardsPerWeek = 0
       const multiplier = 1;
  
       const blocksPerSeconds = await getAverageBlockTime(App);
  
       if(currentBlock < startBlock){
        _print(`Rewards start at block ${startBlock}\n`);
       }else{
        rewardsPerWeek = await GEM_KEEPER_CHEF.blingPerBlock() /1e18 * multiplier * 604800 / blocksPerSeconds;
       }
  
       const tokens = [
        { "id": "tether", "symbol": "USDT", "contract": "0xdC19A122e268128B5eE20366299fc7b5b199C8e3"},
        { "id": "usd-coin", "symbol": "USDC", "contract": "0xE8A638b3B7565Ee7c5eb9755E58552aFc87b94DD"},
        { "id": "oasis-network", "symbol": "ROSE", "contract": "0x5C78A65AD6D0eC6618788b6E8e211F31729111Ca"},
        { "id": "weth", "symbol": "WETH", "contract": "0x3223f17957Ba502cbe71401D55A0DB26E5F7c68F"},
        { "id": "wrapped-bitcoin", "symbol": "WBTC", "contract": "0xd43ce0aa2a29DCb75bDb83085703dc589DE6C7eb"},
        { "id": "oasis-network", "symbol": "WROSE", "contract": "0x21c718c22d52d0f3a789b752d4c2fd5908a8a733"},
        { "id": "usd-coin", "symbol": "USDC", "contract": "0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844"},
        { "id": "binance-usd", "symbol": "BUSD", "contract": "0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C"},
        { "id": "chainlink", "symbol": "LINK", "contract": "0xc9BAA8cfdDe8E328787E29b4B078abf2DaDc2055"},
        { "id": "bnb", "symbol": "BNB", "contract": "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D"},
        { "id": "bling", "symbol": "BLING", "contract": "0x72Ad551af3c884d02e864B182aD9A34EE414C36C"},
      ];
        
        const prices = await getEmeraldAndBlingPrices(tokens);
        await loadEmeraldChefContract(App, tokens, prices, GEM_KEEPER_CHEF, GEM_KEEPER_CHEF_ADDR, GEM_KEEPER_CHEF_ABI, rewardTokenTicker,
          "bling", null, rewardsPerWeek, "pendingBling");
  
        hideLoading();
      }
      async function getEmeraldAndBlingPrices(tokens) {
        const idPrices = await lookUpPrices(tokens.map(x => x.id).filter(id => id !== "bling"));
        const prices = {}
        for (const bt of tokens)
            if (idPrices[bt.id])
                prices[bt.contract] = idPrices[bt.id];
        // Bling token is not yet publicly saled, so we will use the IDO price here and will later change this
        prices['0x72Ad551af3c884d02e864B182aD9A34EE414C36C'] = {
            usd: 0.3,
          }
        return prices;
    }