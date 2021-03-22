
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

const QuickStakingContracts = [
    { 
      stakingRewardAddress: '0x67C5Eda539c9A5e6FF6ceD94D2cc9452416A7f88',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x867875D8225e92f25549B2baC7B1379DbF0cc66D',
      ended: false,
      name: 'StkGHST-QUICK',
      lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
      },
    { 
      stakingRewardAddress: '0xfE54aCf90f3F88cc2486710aa2B9234d05c833b7',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xc419BF84922a3695899144473ABFfcea9D3F492e',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xD2365152dfB7C3f896e1ba9fA73b80e7e6888805',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x35deCFb44FDC18d9e5B3A7F85cc28dfc3b185a39',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x2260A04EDd0b3E72778206843Cb12cC535f5E656',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xcB7249F0800F299F90b977E26a7Af34E94C4Ca70',
      ended: false,
      name: 'stkGHST-USDC',
      lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
      },
    { 
      stakingRewardAddress: '0xAc7Ce318f0bbBF1b6132383a63e560711019F3bf',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xC4c83eaaBb76d4ef70342A2E66f4C080A1378782',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x7EAE699ADd9C2B0128Db06EE07153d1863790A32',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xC70fAfD776b5C4b24eD25C8754eCabf5860F8cE9',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x56fA7Fd005Aa9143bfe638ac784A60e46b02A465',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xA962dE558655e1c4c77afFE8362b532389a7dDAe',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xE3109dbAA0744e4480223fEA418c3702136532Cd',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4BB809afd6d8F6cAd09cfdfA88577a0Ccc037259',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xc1942fe5F9f0eF039eD0EFb411D413CCD6a8bD69',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x36613a52B272bA901EcFE4E76D490AF6Acbc005b',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x524A38c1F5E9bFC528ABc5bD2e2AfeE01c24B7E2',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xe630Fe16F48df044A668053A655C513594e55361',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x747d0Aa4A8C4eF704DdECd23885e020B79d43cE9',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xa69BE44aE9Db6b9684B74256Bf6a217d36891d19',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x359c7f2fEc1FB7b9a3A88c2bd388e58EB24b98fb',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x9f229439716FDAC3D5093D5fD98F1C81785a72d6',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x04cba2d8b8DB56626bbd0236d081329bbB28EeBa',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x96a87830bBf522bb205A2A77320CC7c426844df7',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x0E1B4043543C84dC40FcbA0B8E7E895377Af14C6',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x2bfC489AeD1943879332BCa3cFAA8B7E9B406BAc',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4a27b46B3d7cFC62686D4621649655af8Ebc590A',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x8B6f5a397Fd2a49Cc5DAcd9B28be16C511aAb079',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x7BDa91E5B73760335BB353894d9067AAD85d37DD',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x812890108687f12D6A4366AA32A7c8b0d08e8025',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x515584b6c266CC6d1Fb50CE95eb1d16c5EDdBB7D',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xb3dBF90899177594ef2F123487A2E791fE13da00',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4B413d529442C0039c8e854B8267d502692694FA',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x726c42cB8f2012EA222408d7df0243117747Ef91',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x044343dcD512A1169A8C19d2D2948019B73AaEB8',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x49f9D07Ec803664a92502DD09094bc1819A58bb4',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xD02053bB6c244199A995A3bE2d861fE9D6bEE3b3',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xc0DD4e629f26b91F7FA387608A88c4F139f8bB36',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xd0dacd91413fE7561700A7222d5A8afC178dd6fe',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xd66ebd64577C3201f845E8BB88552a7cedDe7E08',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xa46ABc9ECe1B6364Bf9257fB7abD3C6808000105',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4036F3610CE025810B0C3d5F703F58F4A3aa31A6',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4393e146010B35Be6f1b3f5164D8b1B9e4E83b3e',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xED59c17ee7Ecd7B61B275F1E742082Bba5A87c79',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xceC7607e603D7665856088cC5Cd086454cd5624b',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xDD9Fff9C41321A65DdDe6849433AA1611a8Ce2f7',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x9f8d97859d7113De0fA4F27cc3840198641ebe34',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x8FFcaA8e6d2a3141Cd066D04fE54D2A1da24028a',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x5211c45377f033d913Df1b74257131FF16365A8A',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x38284f873B2F9b43754E509105a7C1b8bccEE150',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xA7B4e642316555Fd660fC22682463F8A28Dda9f8',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xA77728Fd7B4ea7DE784DfbA67838972ff0987cde',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x5cad7553A60c37d0b59Cc7820b73fc3c3E572bC5',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xE90960FaFdbbbCA56e339f59B24Ef85B851519fD',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x22cbe5a96b9057A3F9a68523d61Af4f685D11863',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x603123d6798fa3B11290144fEd21F9a40453A22f',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x41220025fCF199333Ca575D25f4568EA06FC7F2e',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xa3b0e2799d9A0656FB333c1E9B4aD131FBd6B139',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x8330aa05Db8f7D98C794608f565BD0530F08ba0F',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x499D074E1966e0Bb5C858Ca872D763F68e1d09FE',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xdcf1A0D8Ea7102884C73A39F8e90a2945494eA2c',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x559cF318A1a1869d1871b55f26801f657442B7A9',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xC2F99D34B8dC20A5A868bFA474F8a786e501ab1F',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xd5dA80F60C931D8542501450aE67f1663a56F4Fa',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x59e63cDFB26AfC3C786F3D0e194AF76EcBAC4f69',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x4432c332EC0F39450803a6371519D342709175e1',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xFf2300669A0f7e12d5FB40Ba2D03bAb6855c7CB4',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x629F0b2F56b40E009a3289D44934b7c9467119a3',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x5d790cCaD673B041180A0433a52cD4f0BF265982',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x68B4eca6EE1b802E5a7ee3A743ca4FBa4b1376b4',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xBf8442359c9F172B5bFe4a6be751CAb03d27dF93',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x23d4253bB9434959088013eFD87385DB21990029',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0x310B0e340e451F6169aAA13d7D4Cb039d9517317',
      ended: false,
      lp: '',
      name: '',
      },
    { 
      stakingRewardAddress: '0xDbd2cBd1e69777643301b7623a99610E60fAD3A7',
      ended: false,
      lp: '',
      name: '',
      }
    
  ]