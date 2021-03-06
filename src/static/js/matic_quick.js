
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

const QuickStakingContracts =
[//TODO: MATIC
  {
    stakingRewardAddress: '0x68910d18332fFDc1D11caEA4fE93C94Ccd540732',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x7E8DC91771296F8d5c03ad5c074F9Dc219C6F8A3',
    ended: false,
    
    name: 'StkGHST-QUICK',
    lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f'
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x5DA02A2B3F401605181D55583E42a99206A795ba',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x5E405eBCc4914ACD27aA4A5EfF7BaBc04521E87A',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x40251Dd84EA72001627f71aD1924EAb56192363F',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x04Bd1c14b42b200B5D51fB322EDC57ff8c9c7cc0',
    ended: false,
    
    name: 'stkGHST-USDC',
    lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09'
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xC6C65bdf0EC4481ED70354463af0A8F5fC236A8C',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x53CE63267F4faf45f6eb4c5656cc53705144496a',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xf3535a4EC27613f7b6608DFCBbc31Aaeb47c2d8A',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x74aF83811468d7a51452128727AB14507B7DC57E',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x5D9baBB81BAA29EAC55498a8155098e4bCC90657',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x8187b7F03A90826Ad79f890F9e55117C74C60C98',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x99B39206ef9b4C6757ebaf36C1BdEE9824d5FC4a',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x9732E1cC876d8D0B61389385fC1FC756920404fd',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xDFc1b89b6184DfCC7371E3dd898377ECBFEf7058',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xF6B03C8092751Fc1A4AD793Ebf72f8ae1Cb720d7',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x5AE1e3Af79270e600D0e86609bB56B6c6CE23Ee8',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x66aCCDc838F563D36D0695539c5A01E651eAAEC9',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x0A8E11C2C9B89285e810A206D391CE480dbA7562',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x3991E2EF480Cc56859de294b4c38219D2160f8F4',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xFEaf88193eCD50eEDc4b8100cB069Fa07F245324',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x13FD442B86caE142C4F06730860AE14BC03194b4',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xe77F457935701Ae04a19fEdE930360bD3bc8B077',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xE7Cf8098be964a2034BBB11Ab373B59CACFC955e',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xcb5eaa6141722b7ECd8865Fb8fDd28Ba78153A36',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x4c859e0B6f0373358D9510fe09a74B2871F462CF',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x22c79bB6641a0D2f573cCa0d8E2349F4fcFa6BED',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xF2514375270A988F3dce1b63e6093475a2134E65',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xb2e4aC9AF7bC5f74ACF826DD81a1EE361FAb7052',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x688cf18efEF9385dCB5c961B5e3e8EDB73e4f92d',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x1c15a10EA6d42127CE7446304fE32DE4D6503539',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xA9c67F0377999c93978430922E4D9DD9394F6292',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x462a089E0115610586d0BEc74b1436C4B18193D9',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xD91b7C331F220596068278AF5a0AD7AD61b488f1',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x744C0F3f2ef797A22f87cD33A6E3A15a848c312e',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x294118caB442669ea29E49a54FF8f51C954DcD54',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xa7a2FC8D0AA647dFF90Bb914f81F8ebbfDaC54E5',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xfe6223eC2ad07cE55C9eE23202D4D3f35Aa55259',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x3DB374fBCf306Da680CFAE1E2C7A60C95447a31d',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x587E811A008373DAf584F14d474b0d9094E3718F',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xE9C16C34f687d6Ca742e4f78682c34d9DCA085b9',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x0B614B3a0B3aD1bFb8B15Ec372834f36125ac5bA',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x4C912FD46B5612fe0De5b9a0384a0404676A632b',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x5f426A6aBe6F2fdF9B144F8FC9CC0D6e669b33A3',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xD7C465E1BA3F2eA56603610B6959162eEd10EdfE',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0x25397E9A3c874B49E86aAD308f0049A1294594ad',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xA662c541aB5668D32EaF83221546D119e794F922',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xd84d9f9C8C86e87c141fDbF6946FE9806f4d7253',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  },
  {
    stakingRewardAddress: '0xad1D6c4519deeE5e396E17A87C886ef0fdcB3651',
    ended: false,
    
    name: '',
    lp: ''
    //STAKINGREWARDSFACTORY- 0xbD20FAdBdd65A73A15452Ce0adf7d4943e102b69
  } 
]