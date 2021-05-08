$(function() {
consoleInit(main)
});

const TYPHOON_ABI = [{"inputs":[{"internalType":"contract Tornado","name":"_tornado","type":"address"},{"internalType":"contract IERC20","name":"_typhoon","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nullifierHashDeposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tornado","outputs":[{"internalType":"contract Tornado","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tornadoInputToken","outputs":[{"internalType":"contract ERC20Detailed","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"typhoon","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"},{"internalType":"address payable","name":"_recipient","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


const TYPHOON_ETH_ABI = [{"inputs":[{"internalType":"contract Tornado","name":"_tornado","type":"address"},{"internalType":"contract IERC20","name":"_typhoon","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nullifierHashDeposit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tornado","outputs":[{"internalType":"contract Tornado","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"typhoon","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"},{"internalType":"address payable","name":"_recipient","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const TyphoonContracts = [
    { name: "ETH 1 Reward", address: "0xBFa25a8D992c343FcEea9011dc5Bc3813F2c96A6", abi : TYPHOON_ETH_ABI },
    { name: "ETH 100 Reward", address: "0xFccA987CB6A5f67002e10e16e769d87FC48A1027", abi : TYPHOON_ETH_ABI },
    { name: "cDAI 50k Reward", address: "0x06721288C44DC07621BDdb54C1378DE947C05773", abi : TYPHOON_ABI },
    { name: "cDAI 500k Reward", address: "0xEfe6a4E64DBCcFE4C4f5F62E6d1feF00b9637171", abi : TYPHOON_ABI },
    { name: "cDAI 5m Reward", address: "0xd20B405E0d56e68E9b111bAA9E413410b419e48a", abi : TYPHOON_ABI },
    { name: "crDAI 50k Reward", address: "0x376B71437f5916825F24CCA28d34626851346a8c", abi : TYPHOON_ABI },
    { name: "crDAI 500k Reward", address: "0xacd3b2FF91859197651fD4acE9CFE19603146998", abi : TYPHOON_ABI },
    { name: "crDAI 5m Reward", address: "0x464EdcdFb1755aDc304Ee7b65cbe887422cc9F9A", abi : TYPHOON_ABI },
    { name: "cUSDT 50k Reward", address: "0xfF293155BF9Cf2e9280aa57F11387D0b35ae5b69", abi : TYPHOON_ABI },
    { name: "cUSDT 500k Reward", address: "0x701223Ddb0626Cd1F1672DD6E340F3b8A9C5b511", abi : TYPHOON_ABI },
    { name: "cUSDT 5m Reward", address: "0x14c1c27b66299846dfC32860d7c2629b40A6eADE", abi : TYPHOON_ABI },
    { name: "crUSDT 50k Reward", address: "0x28B5afb89EA9112fD35B206A1763ff5F9fA57c0e", abi : TYPHOON_ABI },
    { name: "crUSDT 500k Reward", address: "0xE5aA147e5392dAed163EAE7506c14398AF51532e", abi : TYPHOON_ABI },
    { name: "crUSDT 5m Reward", address: "0x772D74D9AC5B4A8f327436cCD7B9c4443862049a", abi : TYPHOON_ABI },
    { name: "USDT 1k Reward", address: "0x5a75d0149af2c105323D1E34D371eF434B1B148B", abi : TYPHOON_ABI },
    { name: "USDT 10k Reward", address: "0x132155F2C33bb1fF182bB912d65F76Cc31286dA8", abi : TYPHOON_ABI },
    { name: "USDT 100k Reward", address: "0xBB390d220D960C524C28c925c7E6c3ddaff7D6a6", abi : TYPHOON_ABI },
    { name: "y3CRV 1k Reward", address: "0x4Cd9b527C28bA5C0Af640C0Eb1647DBAED4bC95C", abi : TYPHOON_ABI },
    { name: "y3CRV 10k Reward", address: "0xf2Ab3b1065B7447d769c770E9E86520091281E1E", abi : TYPHOON_ABI },
    { name: "y3CRV 100k Reward", address: "0xA9aE0ebF7D1fA5928e94a95Ea27dd7e71075BF7F", abi : TYPHOON_ABI },
    { name: "MIC 1k Reward", address: "0x5e2f33320674d1969a250fC2B8c32E78EB61307A", abi : TYPHOON_ABI },
    { name: "MIC 10k Reward", address: "0x3AC8c18e09964f6f2DE686FFb8F6Cf29af42c375", abi : TYPHOON_ABI },
    { name: "MIC 100k Reward", address: "0x76Eea4364363eFf85f4151f9240F71Cf140b2439", abi : TYPHOON_ABI },
    { name: "MIS 10 Reward", address: "0x72C9A9685F3B5Af597027F2d493a73886ea726b8", abi : TYPHOON_ABI },
    { name: "MIS 100 Reward", address: "0x46F0697C507E9Bb3eE3E94b23605Ae47EE66e0a6", abi : TYPHOON_ABI },
    { name: "MIS 1k Reward", address: "0x3a5ca58aCF236e99ACc77438b8CF3c39b8F00A27", abi : TYPHOON_ABI  }
]

async function loadSynthetixPoolInfo_(App, tokens, prices, stakingAbi, stakingAddress, stakeTokenFunction, name) {
    const rewardTokenAddress = "0x79256DB1BDB6259315a1a3D7Dd237F69cADFd8FC"
      const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
      const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

      const stakeTokenAddress = STAKING_POOL.callStatic[stakeTokenFunction] ?
        await STAKING_POOL.callStatic[stakeTokenFunction]()
        : "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" //WETH

      var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

      var newPriceAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(prices, x));
      var newPrices = await lookUpTokenPrices(newPriceAddresses);
      for (const key in newPrices) {
          if (newPrices[key])
              prices[key] = newPrices[key];
      }
      var newTokenAddresses = stakeToken.tokens.filter(x => !getParameterCaseInsensitive(tokens,x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getToken(App, address, stakingAddress);
      }
      const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

      const rewardTokenTicker = rewardToken.symbol;

      const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(), STAKING_MULTI.totalSupply()]

      const [periodFinish, rewardRate, totalSupply] = await App.ethcallProvider.all(calls);

      stakeToken.staked = totalSupply / 10 ** stakeToken.decimals;


      const poolPrices = getPoolPrices(tokens, prices, stakeToken);

      const stakeTokenTicker = poolPrices.stakeTokenTicker;

      const stakeTokenPrice = getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd ?? poolPrices.price;
      const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

      const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

      const usdPerWeek = weeklyRewards * rewardTokenPrice;

      const staked_tvl = poolPrices.staked_tvl;

      return  {
        name,
        stakingAddress,
        poolPrices,
        stakeTokenAddress,
        rewardTokenAddress,
        stakeTokenTicker,
        rewardTokenTicker,
        stakeTokenPrice,
        rewardTokenPrice,
        weeklyRewards,
        usdPerWeek,
        staked_tvl
      }
  }

  async function printSynthetixPool_(info) {
      _print(info.name);
      info.poolPrices.print_price();
      _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
      const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
      const dailyAPR = weeklyAPR / 7;
      const yearlyAPR = weeklyAPR * 52;
      _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
      _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>\n`);
      return {
          staked_tvl: info.poolPrices.staked_tvl,
          apr : yearlyAPR
      }
  }

  async function loadMultipleSynthetixPools_(App, tokens, prices, pools) {
    let totalStaked  = 0;
    const infos = await Promise.all(pools.map(p =>
      loadSynthetixPoolInfo_(App, tokens, prices, p.abi, p.address, p.stakeTokenFunction, p.name)));
    for (const i of infos) {
      let p = await printSynthetixPool_(i);
      if (!isNaN(p.staked_tvl)) totalStaked += p.staked_tvl;
    }
    return { staked_tvl : totalStaked };
  }

const LP_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_typhoon","type":"address"},{"internalType":"contract IERC20","name":"_rewardLP","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardLP","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_rewardDistribution","type":"address"}],"name":"setRewardDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"typhoon","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const LPPools = [
    { name : "PHOON-USDT", address : "0x7df50b4fcae42581e40e2d91edd7d4fa1b37bae1",
      stakeTokenFunction : "rewardLP", rewardTokenFunction : "typhoon",
      abi : LP_ABI },
      { name : "PHOON-MIC", address : "0x7D66Dcd9064272051656D961a25170DD50cDe526",
        stakeTokenFunction : "rewardLP", rewardTokenFunction : "typhoon",
        abi : LP_ABI }
]

async function main() {
    const App = await init_ethers();
    let tokens = {};
    let prices = {};

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    const slp = await getToken(App, "0xD1482DC5d5f6C140A69157D945267831d1CF2D6e", App.YOUR_ADDRESS);
    var newPriceAddresses = slp.tokens.filter(x =>
        x.toLowerCase() !== "0x79256db1bdb6259315a1a3d7dd237f69cadfd8fc" &&
        !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
        if (newPrices[key])
            prices[key] = newPrices[key];
    }
    var newTokenAddresses = slp.tokens.filter(x => !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, App.YOUR_ADDRESS);
    }
    const slpPrices = getPoolPrices(tokens, prices, slp);

    const p1 = await loadMultipleSynthetixPools(App, tokens, prices, LPPools);

    let pools = TyphoonContracts.filter(c => c.address !== "").map(c => { return {
        name : c.name,
        address : c.address,
        abi : c.abi,
        stakeTokenFunction : "tornadoInputToken"
    }})
    const p2 = await loadMultipleSynthetixPools_(App, tokens, prices, pools);

    _print_bold(`Total staked: $${formatMoney(p1.staked_tvl + p2.staked_tvl)}`)

    hideLoading();
}
