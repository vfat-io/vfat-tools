
$(function() {
  consoleInit();
  start(main);
});

const MATIC_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_rewardsDistribution","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDistribution","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"stakeWithPermit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

async function main() {  
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const tokens = {};
  const prices = await getMaticPrices();

  const pools = QuickStakingContracts.map(c => { return {
    address: c.stakingRewardAddress,
    abi: MATIC_STAKING_ABI,
    stakeTokenFunction: "stakingToken",
    rewardTokenFunction: "rewardsToken"
  }})


  let p = await loadMultipleMaticSynthetixPools(App, tokens, prices, pools)
  _print_bold(`Total staked: $${formatMoney(p.staked_tvl)}`);
  if (p.totalUserStaked > 0) {
    _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
  }
  
  hideLoading();
}

const QuickStakingContracts =[
  {
    //tokens: [MATIC,QUICK],
    stakingRewardAddress: '0x7Ca29F0DB5Db8b88B332Aa1d67a2e89DfeC85E7E',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 90
  },
  {
    //tokens: [ETHER,MATIC],
    stakingRewardAddress: '0x8FF56b5325446aAe6EfBf006a4C1D88e4935a914',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 75
  },
  {
    //tokens: [ETHER,USDT],
    stakingRewardAddress: '0xB26bfcD52D997211C13aE4C35E82ced65AF32A02',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 65,
    pair: '0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046'
  },
  {
    //tokens: [GHST,QUICK],
    stakingRewardAddress: '0xa132faD61EDe08f1f288a35ff4c10dcD1cB9E107',
    ended: false,
    name: 'StkGHST-QUICK',
    lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
    //baseToken: QUICK,
    rate: 60
  },
  {
    //tokens: [WBTC,ETHER],
    stakingRewardAddress: '0x070D182EB7E9C3972664C959CE58C5fC6219A7ad',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 60
  },
  {
    //tokens: [USDC,QUICK],
    stakingRewardAddress: '0x8cFad56Eb742BA8CAEA813e47779E9C38f27cA6E',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 50
  },
  {
    //tokens: [GHST,USDC],
    stakingRewardAddress: '0xfDC02Dc768a587514b992b03Fb713F74061764a2',
    ended: false,
    name: 'stkGHST-USDC',
    lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
    //baseToken: USDC,
    rate: 38
  },
  {
    //tokens: [ETHER,WISE],
    stakingRewardAddress: '0xb11856d3Aea0203e50B8520479C6332daBcF3f82',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 35
  },
  {
    //tokens: [ETHER,USDC],
    stakingRewardAddress: '0x4A73218eF2e820987c59F838906A82455F42D98b',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 34
  },
  {
    //tokens: [LINK,ETHER],
    stakingRewardAddress: '0x97D69E23DF7BBB01F9eA78b5651cb6ad125D6d9a',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 33
  },
  {
    //tokens: [AGA,AGAr],
    stakingRewardAddress: '0x855b8dCA0Dfe3A1AC474f5A25792d4326580E06A',
    ended: false,
    lp: '',
    name: '',
    //baseToken: AGA,
    rate: 30
  },
  {
    //tokens: [ETHER,QUICK],
    stakingRewardAddress: '0xD1C762861AAe85dF2e586a668A793AAfF820932b',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 30
  },
  {
    //tokens: [QUICK,WISE],
    stakingRewardAddress: '0x3CB338519AD8AE7cbaCb4A1035052BE6DA7e0b59',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 25
  },
  {
    //tokens: [SX,ETHER],
    stakingRewardAddress: '0x225d8F0f5FB5D66cA7C0a27da85F462689c47C23',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 25
  },
  {
    //tokens: [CEL,ETHER],
    stakingRewardAddress: '0x8917692e0Bdb47AF1D36837805E141Ed79065dFC',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 23
  },
  {
    //tokens: [MAUSDC,USDC],
    stakingRewardAddress: '0x9Aac6390103C1Af774220aaB85bEB49Ae2DF11d6',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 20
  },
  {
    //tokens: [DAI,ETHER],
    stakingRewardAddress: '0x785AaCd49c1Aa3ca573F2a32Bb90030A205b8147',
    ended: false,
    lp: '',
    name: '',
    //baseToken: DAI,
    rate: 20
  },
  {
    //tokens: [AAVE,ETHER],
    stakingRewardAddress: '0x573bb5CCC26222d8108EdaCFcC7F7cb9e388Af10',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 20
  },
  {
    //tokens: [FRAX,QUICK],
    stakingRewardAddress: '0xa859D2C37A49bbd5992E39FCC37a7dD56aE130E7',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 16
  },
  {
    //tokens: [FRAX,FXS],
    stakingRewardAddress: '0x2f5c21A2084fE66E3CEDe1dfd048Ea00b3dcf1f4',
    ended: false,
    lp: '',
    name: '',
    //baseToken: FRAX,
    rate: 16
  },
  {
    //tokens: [ETHER,DEFI5],
    stakingRewardAddress: '0xf563fAe71bDAcDD370098CeCff14dbe2c9518a6b',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 15
  },
  {
    //tokens: [USDC,USDT],
    stakingRewardAddress: '0x251d9837a13F38F3Fe629ce2304fa00710176222',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 15
  },
  {
    //tokens: [WBTC,USDC],
    stakingRewardAddress: '0x8f2ac4EC8982bF1699a6EeD696e204FA2ccD5D91',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 15
  },
  {
    //tokens: [QUICK,DEFI5],
    stakingRewardAddress: '0xDdB4E83F0977CAf315f5A4d71930FD72DA00d8d9',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 14
  },
  {
    //tokens: [LINK,QUICK],
    stakingRewardAddress: '0xfEc1E86786841FF699588DD1e88178AB2BB6DAbC',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 14
  },
  {
    //tokens: [WOLF,MATIC],
    stakingRewardAddress: '0x3139523e1507cF6B0700Be2EABea6D5e919C6369',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 13
  },
  {
    //tokens: [SWAP,QUICK],
    stakingRewardAddress: '0x219ab685344518c60eFb399a039EBC73cC4f1471',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 12.5
  },
  {
    //tokens: [DG,ETHER],
    stakingRewardAddress: '0x0C7395bc2b25603941a67e4DaF327362dB8f7D54',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 12
  },
  {
    //tokens: [DG,QUICK],
    stakingRewardAddress: '0x4aC2D949D9E7e2c47e0FB6c7e2316BAE58d27599',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 12
  },
  {
    //tokens: [DEGEN,QUICK],
    stakingRewardAddress: '0x65Bb31f4ad1D9958Cd808d4337eaaB6F40CFaD2e',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 12
  },
  {
    //tokens: [GAME,QUICK],
    stakingRewardAddress: '0x8FC0a8dE57d15dF22238FCd165Cd5d6658ac4788',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 11
  },
  {
    //tokens: [ETHER,DEGEN],
    stakingRewardAddress: '0x729970954a0c26cdBe765A93020efC787283dfcA',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 10
  },
  {
    //tokens: [DAI,USDC],
    stakingRewardAddress: '0xEd8413eCEC87c3d4664975743c02DB3b574012a7',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 10
  },
  {
    //tokens: [ARIA20,ETHER],
    stakingRewardAddress: '0x5Afc79ce4481a4565B88074393F2DbFc19CbCDdC',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 9
  },
  {
    //tokens: [UBT,ETHER],
    stakingRewardAddress: '0x219670F92CC0e0ef1C16BDB0aE266F0472930906',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 9
  },
  {
    //tokens: [UNITOKEN,QUICK],
    stakingRewardAddress: '0x72ed24d2b2D98D3c4b5297ce244f623B9357F798',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 9
  },
  {
    //tokens: [MAAAVE,QUICK],
    stakingRewardAddress: '0x994c2f4b860B9DC412502a57a60473d7b5AB20e5',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 8
  },
  {
    //tokens: [QUICK,CEL],
    stakingRewardAddress: '0x0BA297E04008070E3075Fa08a920bB3CeC2ed45b',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 8
  },
  {
    //tokens: [QUICK,CC10],
    stakingRewardAddress: '0xab1d645fe5148322D4991fCB3bceF6848a5e8123',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 7
  },
  {
    //tokens: [ETHER,HH],
    stakingRewardAddress: '0xfc4a45f220EaB0a740635eBb3B3b391abbae4e07',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 7
  },
  {
    //tokens: [IFARM,QUICK],
    stakingRewardAddress: '0xEa2EC0713D3B48234Ad4b2f14EDb4978D1228aE5',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 7
  },
  {
    //tokens: [CC10,ETHER],
    stakingRewardAddress: '0x7cc64850E4c65e753247A1Ed2c8DF63DCF7d002d',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 6
  },
  {
    //tokens: [IFARM,MATIC],
    stakingRewardAddress: '0xD26C29d8B22105d0f4dBBf5c421B228B74722C86',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 6
  },
  {
    //tokens: [UBT,QUICK],
    stakingRewardAddress: '0x24830905906b53F737cDc8a227C9475C52795C5C',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 6
  },
  {
    //tokens: [NFTP,QUICK],
    stakingRewardAddress: '0xB771f27de915529DcbBCeFd3b73f2537B94Ab3Fa',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 5
  },
  {
    //tokens: [SUPER,QUICK],
    stakingRewardAddress: '0xe818cbeE29477e6C6915Df1e9757dd663f10106d',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 5
  },
  {
    //tokens: [EASY,QUICK],
    stakingRewardAddress: '0x12bebB96E738159CB68c2be8ED775950e2CfFb50',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 5
  },
  {
    //tokens: [SX,QUICK],
    stakingRewardAddress: '0x78A8Ef79CB397FeDD933922b3A3Ced03dAcE52d4',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 5
  },
  {
    //tokens: [VISION,ETHER],
    stakingRewardAddress: '0x34D4257C4935673Fb5059f29602B9AAe9Dea0296',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 5
  },
  {
    //tokens: [QUICK,XMARK],
    stakingRewardAddress: '0xFd20CfF4eBD6EaD961E86A1264eEa4B64F847150',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4.5
  },
  {
    //tokens: [SX,DAI],
    stakingRewardAddress: '0xefF782c32385B5eBd196fFD860629a5c69216c25',
    ended: false,
    lp: '',
    name: '',
    //baseToken: DAI,
    rate: 4.5
  },
  {
    //tokens: [GFARM2,ETHER],
    stakingRewardAddress: '0x145bB9b8ebD72Ce915D1DDF6bcf3082027A38C9a',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 4
  },
  {
    //tokens: [MAYFI,MAUSDC],
    stakingRewardAddress: '0xe13876aAFb5cd2e162ec253499Eb414083a96Af2',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 4
  },
  {
    //tokens: [MAUSDC,QUICK],
    stakingRewardAddress: '0x8df5AdD0eB677d12EA86C5f83DdB7e184b750116',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [WOLF,QUICK],
    stakingRewardAddress: '0x8732f213E8F82c6580e2579Dc2E3310aFF90E972',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [IGG,QUICK],
    stakingRewardAddress: '0x0aC274597134209b640A18Fc70FaE075D33D1d87',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [MATIC,MOCEAN],
    stakingRewardAddress: '0xEEc558404E179dEb5561fB043D8fd0567227FDE7',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 4
  },
  {
    //tokens: [SWAP,ETHER],
    stakingRewardAddress: '0x897Bc9871F1D1c520F7c200480b556f87D6638e7',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 4
  },
  {
    //tokens: [SUPER,ETHER],
    stakingRewardAddress: '0x214249a7bd9a6C10AdfF8fAd70749ebf8108494a',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 4
  },
  {
    //tokens: [ARIA20,QUICK],
    stakingRewardAddress: '0xc74dAA25035577E20db7C1cDEb01bcfFfe4927Ac',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [GFARM2,QUICK],
    stakingRewardAddress: '0x395c81AcB66aEfb84CAcc501Bd581f0B261e4Fc1',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [AGAr,QUICK],
    stakingRewardAddress: '0xa6b85D97853248973d11B9c806492D405D1B50e5',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 4
  },
  {
    //tokens: [MATIC,USDC],
    stakingRewardAddress: '0x6C6920aD61867B86580Ff4AfB517bEc7a499A7Bb',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 4
  },
  {
    //tokens: [AGA,QUICK],
    stakingRewardAddress: '0x4D637F2d946b4028705BEb436e66Bf1Ffb85C22D',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3.5
  },
  {
    //tokens: [MAUNI,MAUSDC],
    stakingRewardAddress: '0x3e9951ba9ea39FF1ACDCA838E1A294c7C8675b23',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 3
  },
  {
    //tokens: [QUICK,HH],
    stakingRewardAddress: '0xDdAFf21FC862dc1ecf805ca1CEBbfEae95b16E6D',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [QUICK,MOCEAN],
    stakingRewardAddress: '0xC29996f70BC8D7052287Ada2B7B7765360A69a32',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [QUICK,DMT],
    stakingRewardAddress: '0xcb099768c2eB727f5380c9E7AF93153E8d0e3766',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [HEX,QUICK],
    stakingRewardAddress: '0x4E5317608D854104ffcC02F9741b52d1f07225Ac',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [BTU,QUICK],
    stakingRewardAddress: '0x6065BAD6E8d8760b0cA729fCE35A98641CE1060C',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [FSN,QUICK],
    stakingRewardAddress: '0x631F21B329C958e6A522c7b857F22c0C5E013368',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [ANY,QUICK],
    stakingRewardAddress: '0xD6E9C2576FEa298c5C9FA9F2cBC5f124c5f97625',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [PLOT,QUICK],
    stakingRewardAddress: '0x74A7fdA76A008276705c39B0599916ee8513965c',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 3
  },
  {
    //tokens: [PLOT,USDC],
    stakingRewardAddress: '0xB0755c5b3594A9C8845EB383e6E05E7F49460141',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 3
  },
  {
    //tokens: [ELET,QUICK],
    stakingRewardAddress: '0x0E5a923524fC0A14fA4ab108145e4a019D2f2C6a',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 2.5
  },
  {
    //tokens: [VISION,QUICK],
    stakingRewardAddress: '0x859f1E2490B4F62C5D32cf9409e2bBF43dfA3B61',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 2.5
  },
  {
    //tokens: [GAME,ETHER],
    stakingRewardAddress: '0x5554281f7e473d93779722e5aa4c2f62C11283fd',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 2.5
  },
  {
    //tokens: [MADAI,MAUSDC],
    stakingRewardAddress: '0x7131eBbC3e08E8e0D8938DFd36D3E76B874Fc75e',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 2
  },
  {
    //tokens: [MAWETH,MAUSDC],
    stakingRewardAddress: '0x2Ee1eaE8fB3F5F56ABB882D48E2d767DA0211D8E',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 2
  },
  {
    //tokens: [CTSI,QUICK],
    stakingRewardAddress: '0x4AB627237c2ce3719Ca42940c641Cd3dDbC83C0A',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 2
  },
  {
    //tokens: [CTSI,MATIC],
    stakingRewardAddress: '0x2d0D7FD1bFcbF01947fdc40B507BD73B0863f2D5',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 2
  },
  {
    //tokens: [IGG,ETHER],
    stakingRewardAddress: '0x88D6E84D7220A001F031fA5C8b44E77F957Fe1cD',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 2
  },
  {
    //tokens: [QUICK,OM],
    stakingRewardAddress: '0xe1fE89651932D84e7880651187547869CA524976',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 2
  },
  {
    //tokens: [BTU,MATIC],
    stakingRewardAddress: '0xe46E640b9E47080aE2cDe82B30500445C857d6d1',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 2
  },
  {
    //tokens: [MATUSD,MAUSDC],
    stakingRewardAddress: '0xD854f08373a97237C7a830e1e34475535CB1eaDE',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 1.5
  },
  {
    //tokens: [MAAAVE,MAUSDC],
    stakingRewardAddress: '0xe985c9416D05B3b3872d9e640C9590FaC37705Bd',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 1.5
  },
  {
    //tokens: [MAUSDT,MAUSDC],
    stakingRewardAddress: '0xA694345b2f208DA59ebF3fc6b66E97c0CA18C3E1',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 1.5
  },
  {
    //tokens: [DB,ETHER],
    stakingRewardAddress: '0xd437c3c9Ca21D634878BDDBf973bCFB23D280E86',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 1
  },
  {
    //tokens: [DSLA,QUICK],
    stakingRewardAddress: '0xB9Ce318ac54EC8b3aa17d18dFfb0EC3c46E88fef',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 1
  },
  {
    //tokens: [DB,MATIC],
    stakingRewardAddress: '0x35CEADEd1457aE4AaD028ff996DC5A889Ea8d7C1',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 1
  },
  {
    //tokens: [ETHER,DMT],
    stakingRewardAddress: '0x255Df2Ae958aCe49eC9E24B59d5327c6D918C81b',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 1
  },
  {
    //tokens: [ELET,MATIC],
    stakingRewardAddress: '0xDa534f1282F832BAc82Ec4502dA6fAd7a60e63A3',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MATIC,
    rate: 1
  },
  {
    //tokens: [MALINK,MAUSDC],
    stakingRewardAddress: '0x211B1312Bb797Ee7c7193AE87481E0B5f259c0a5',
    ended: false,
    lp: '',
    name: '',
    //baseToken: MAUSDC,
    rate: 1
  },
  {
    //tokens: [QUICK,AZUKI],
    stakingRewardAddress: '0xfBCf532DeE2A6d2f45bD89419adaA07457d50CF9',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 1
  },
  {
    //tokens: [HEX,ETHER],
    stakingRewardAddress: '0x9Be3481DD287345Bb9C8B8DDC836e1D0054Edd46',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 1
  },
  {
    //tokens: [CFI,QUICK],
    stakingRewardAddress: '0x04cda3ed6750AAb11e2A50029460543E914dD81D',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.8
  },
  {
    //tokens: [DSLA,ETHER],
    stakingRewardAddress: '0x4A47Ea19241058b1F960331c3f1a1B4BD7D4A584',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 0.5
  },
  {
    //tokens: [QUICK,ZUZ],
    stakingRewardAddress: '0xC1B0A3f47f05A58a7D83855B9F9e8C5f4042dc8c',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.4
  },
  {
    //tokens: [ETHER,OM],
    stakingRewardAddress: '0xA0218a57CC1D595aF0b79Af450f37fc4207dE94C',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 0.25
  },
  {
    //tokens: [PPDEX,QUICK],
    stakingRewardAddress: '0xC6a6B2d95B99CA9c3149f8dF8f22E1e34fb75ccc',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.25
  },
  {
    //tokens: [ZUT,QUICK],
    stakingRewardAddress: '0x06c0b1461740a8570f755cf26e7B418862c3998B',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.2
  },
{
    //tokens: [QUICK,MDEF],
    stakingRewardAddress: '0xdE1140Ff770F83a59e91c3a04c6628D86e8414f2',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.2
  },
  {
    //tokens: [DRC,QUICK],
    stakingRewardAddress: '0x86806771672fb51a04be7BcdC4546fC111BBbA57',
    ended: false,
    lp: '',
    name: '',
    //baseToken: QUICK,
    rate: 0.2
  },
  {
    //tokens: [ETHER,AZUKI],
    stakingRewardAddress: '0x8d8fDaEcCC776c8E76B8320e8BC29dcC8BC07907',
    ended: false,
    lp: '',
    name: '',
    //baseToken: ETHER,
    rate: 0.1
  },
  {
    //tokens: [CFI,USDC],
    stakingRewardAddress: '0x579eabaED8cdA62D502c219392d9C07B142e0af6',
    ended: false,
    lp: '',
    name: '',
    //baseToken: USDC,
    rate: 0.1
  }

]