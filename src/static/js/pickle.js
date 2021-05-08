$(function() {
consoleInit(main)
  });

  const PICKLE_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"DILL","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DISTRIBUTION","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PICKLE","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TOKEN","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TREASURY","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"account","type":"address"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"derivedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"derivedBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"derivedSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"kick","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

  async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    let tokens = {};
    let prices = {};

    const Pools = [
      "0xfAA267C3Bb25a82CFDB604136a29895D30fd3fd8",	//UNI PICKLE/ETH
      "0xd3F6732D758008E59e740B2bc2C1b5E420b752c2",	//pSLP yveCRV
      "0xf5bD1A4894a6ac1D786c7820bC1f36b1535147F6",	//p3CRV
      "0x6092c7084821057060ce2030F9CC11B22605955F",	//pSLP DAI
      "0x8f720715d34ff1fda1342963ef6372d1557db3a7",	//pSLP USDC
      "0x421476a3c0338E929cf9B77f7D087533bc9d2a2d",	//pSLP USDT
      "0xD55331E7bCE14709d825557E5Bca75C73ad89bFb",	//pSLP WBTC
      "0x2E32b1c2D7086DB1620F4586E09BaC7147640838",	//pSLP YFI
      "0x4731CD18fFfF2C2A43f72eAe1B598dC3c0C16912",	//stETH-ETH
      "0x02c9420467a22ad6067ef0CB4459752F45266C07",	//pUNIV2 MIR/UST
      "0xd7513F24B4D3672ADD9AF6C739Eb6EeBB85D8dD5",	//pUNIV2 MTSLA/UST
      "0x2Df015B117343e24AEC9AC99909A4c097a2828Ab",	//pUNIV2 MAAPL/UST
      "0x3D24b7693A0a5Bf13977b19C81460aEd3f60C150",	//pUNIV2 MQQQ/UST
      "0x1456846B5A7d3c7F9Ea643a4847376fB19fC1aB1",	//pUNIV2 MSLV/UST
      "0x6Ea17c249f6cFD434A01c54701A8694766b76594",	//pUNIV2 MBABA/UST
      "0xdaf08622Ce348fdEA09709F279B6F5673B1e0dad",	//pSLP SUSHI
      "0xeA5b46877E2d131405DB7e5155CC15B8e55fbD27",	//pUNIV2 FEI/TRIBE
      "0xDA481b277dCe305B97F4091bD66595d57CF31634",	//pSUSHIYVBOOST
      "0xbc9d68f38881a9c161da18881e21b2ac9df87b55",	//pUNILUSDETH
      "0xE9bEAd1d3e3A25E8AF7a6B40e48de469a9613EDe"	//pSUSHIALCX
    ].map(a => {
      return {
        address: a,
        abi: PICKLE_STAKING_ABI,
        stakeTokenFunction: "TOKEN",
        rewardTokenFunction: "PICKLE"
      }; }
    )

    let p0 = await loadMultipleSynthetixPools(App, tokens, prices, Pools)

    _print_bold(`Total staked: $${formatMoney(p0.staked_tvl)}`)
    if (p0.totalUserStaked > 0) {
      _print(`You are staking a total of $${formatMoney(p0.totalUserStaked)} at an APR of ${(p0.totalAPR * 100).toFixed(2)}%\n`)
    }

    /*const PICKLE_CHEF_ADDR = "0xbD17B1ce622d73bD438b9E658acA5996dc394b0d";
    const rewardTokenTicker = "PICKLE";
    const PICKLE_CHEF = new ethers.Contract(PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, App.provider);
    const rewardsPerWeek = await PICKLE_CHEF.picklePerBlock() / 1e18
        * 604800 / 13.5;

    await loadChefContract(App, PICKLE_CHEF, PICKLE_CHEF_ADDR, PICKLE_CHEF_ABI, rewardTokenTicker,
        "pickle", null, rewardsPerWeek, "pendingPickle");*/

    hideLoading();
  }
