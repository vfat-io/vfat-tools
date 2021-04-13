
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
    stakingRewardAddress: '0xA958408a73253a7CA59aa62c4F048B1d21E3DA32',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xb02eE9583cd78B781B060B1c96E0Ab43dd35865C',
    ended: false,
    name: 'StkGHST-QUICK',
    lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
  },
  { 
    stakingRewardAddress: '0x9bCfD9B9a5Cbe2669AD30B0AD02693aFac0485f1',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x804bE64d74D1611C2240B4E26e75DD15611B1AD8',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xF440356a4c7BD396ED4834b191323cd7631F4e48',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x641797a37E9bFE6c1d8acC480d88dFb1F650469E',
    ended: false,
    name: 'stkGHST-USDC',
    lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
  },
  {
    stakingRewardAddress: '0x63872458DF5aFc02a4C94aC35c5Bd3b290157d4E',
    ended: false,
    lp: '',
    name: ''},
  {
    stakingRewardAddress: '0x1caaE46899f1408c56DB17BeDCbC4F5258201677',
    ended: false,
    lp: '',
    name: ''},
  { 
    stakingRewardAddress: '0xc1625138D914aEEB6C1c0538F2D982fDC12B1E94',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0x34B23B92b99b04aB959A35d80dc86b4B6543798D',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0x7f5649FB6b517Da2Fb94C9C13270F6019587be95',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xAbaaBB7932941E995e297762428Aee671B3897CB',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xbC37455390309b8CD05CD20D9bDC9d8e86F05E44',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x97ADf29d52113a201928903DFC0d1ddB4DF55c5f',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x6E25652E99ACeEbeE08677523E57485B8814D828',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x1B92675fD23464b08e3846D1651546B1b55d8440',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x35d6A1a4D8d6e6B6b7ecAfa3624B2b58D84DEA87',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xB96483272c47b4eA28AB84CCa90b39Bb5E72461d',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x20e1cd604a3b3E36FfE3be0AaDb00A11493e013F',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x3Dc98a487e9c0Fa6818e2AC8d1e0c6859864fBB2',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xc9efCF977e2e616BAd165Be2C821404A747241e1',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x7A3ECA5cb983aEfF1498AA97FcCFf4E622071861',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x77B3fc66a479352680aCc73F54d4E5C61Aee031E',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x8aaadD27f054AA431deaDB2a27Dcb01bFDbA065D',
    ended: false,
    lp: '',
    name: '',
  },
  {
    stakingRewardAddress: '0x3fCF47aE7fce0F7cD11DF857bB5EdB10B6B46d85',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x4E15567FA3019C3D3E06b61db291e34a7C706588',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x2eb5089210F74C8181d73b57583Db2dFB8f5F99B',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0xDEE71EB6a43d6C78A76DfEdEc58b909e40A65113',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x12918AE5DB0A44003F30513c3C6D79b9A6DFDD7A',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x7c10d4d1373d68Ef0C6562A055746490F095884e',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x23839054C80405d8f17975A69928e98F688e19F4',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x89c4dEf39208FCAd8576203FDB822113251F336D',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0xec8EDe9b9c611875204DCD6D230E6f4d27093e83',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x8Ae80Fb622AD0E0cC07f2C1Df542127643D6de5B',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x76Fde8bF414dC50424369cC8cD5Cfe4FB8a723E7',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0xcC7aD1515B0597B9F6349296e32bFBFce7A0647B',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0xCAe5859a7b015C8712097Aa5035f0cb550727f11',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x3554268f2b33d7437055CeE63761fA74D7f4eF01',
    ended: false,
    lp: '',
    name: '',
      },
  {
    stakingRewardAddress: '0x0dD81cfB657257C8B3Def470F7f9B73dB0cdF999',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xC6F3D941734038705202339BfbE9FF304D225578',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x0B8D16bb9d352A4e7e28B126480dB28C75a41099',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x2425aFCE5E595A49D288e04A4AB0500C5b8de166',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x857015ed5FABB889F3502fdC1a9292742435c1d2',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0x3524bdf73A734E59fAC15164656ab1948De683F2',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x64dE4A52f6657BAc9b2F7BfD6b2dEdd4784aDb21',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x43AdE98902bF121C8eaB832313EFFff084CcAbE4',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xe4D994A4f5cbDe9C58708B618B577eE24Bbc7A4F',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x085bF80e14F6623566bADE65cD2e80ba30d75594',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x0B6BcA5fD3AC33DBe359186EDcE20Bb8e2f5F412',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0x5128891a4491778b7C4D5977adaD2AA0fcaaa4B3',
    ended: false,
    lp: '',
    name: '',
   },
  {
    stakingRewardAddress: '0x1219270E956f743a162AE86995a124FCd3F45303',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x3a806E445E76eC82AB9E9eD52d1Ea26b86b20535',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xd6773Ec3Df8aEfBfbeAe228d8e35547d660A75D2',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0xa0f066630a448cC5D749F40CB76c8D6C2FB26de1',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0xf3D1e34FB6d7B7387B48DebFeBDEa095dD04C728',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x185DE8B523A1917aC9707D58caF88C99b894a86B',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x3d0695b1A356Bce355C2eE5748c0b6F588bC2460',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x9Dc0968cb466efbcaCCAaF11A968e2f4C6B6DFD7',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xf6D11f1BCEd96E406459B3C61e5FF7bA08118810',
    ended: false,
    lp: '',
    name: '',
      },
  {
    stakingRewardAddress: '0x876aC040AB328735A962FA564f6c96892E991b52',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x06963e6F7D8F07CF51C0Bf0B62afEf66070251c0',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x40B2e5857C11f0cb17475Bd0dB799d11B96835dA',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x65a3Fa9E294014754c127708422296EC2f3DDDEd',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x643e41cC2B3E1D4fe5eb6726DF27362Fcc4cdf47',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x6D24AFeb3f83645E0569A7Ad30b2Ee7A8c2Af8B7',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x44ba17f47e1a8fE909ca99F9854001091293E6Ff',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x3238Cd353fd549DDdd1703f1aa30aA1439c1C89F',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x77Fae246AB517778FD0B9f131A5F7c8609c39beB',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x297182f8cE4A9753071c046FD2c7a2b8Af3d7E3b',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xB8c89BCCAB833705e2c261d38D56e04281e5DfC0',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0xd157ceF172a04C77eF9Bf9AE4221FFeAAefC3cd6',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x6eA21F2b8EB4c33F1Dcc09ce13067922F9eBCb29',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x35c738000dA563A4BA7A8243d48DA1288d275de0',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x0Dd8cf4410e18C6B2559CC561Ee32113DfF1ED9d',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0xb5536ecB9dD16D6E9f53460C46B75CEF99A81B47',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x554aE50F333758DCe71bfe36F7cf7DA4AE6C6C7D',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x981803904e7E38cf7D053B17AcDd07b312A5cAfF',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x18eE880Da337B9ef245aa607225Df0C3e855d7ae',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0xb4efe5E33f32D3B00Ff2237a7eC8C6d6FF7cEb7F',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x9774a4649A8ca32942776687f1e6989dA9a5f2C1',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x9fD1FF330aC9e73eD6491342c33bcFCAf5e76f9D',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xD854701dD42a0B78697B51D9678F3FFa1fD536FA',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0xb87A500aA5DE176F08c23288AC46AF72740c81CA',
    ended: false,
    lp: '',
    name: '',
   },
  { 
    stakingRewardAddress: '0x5141905F200c951438152496DEe74A000ed1e5E9',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x5144Bf60788920e1B3C566F62692DBFee9139925',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0xd4F2605f077Bf215c72614C5A447BDcFa7792532',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xBbD31D613ff98d0f56d1Acc1de7b5C08Da49ACB8',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xe09792F7716d820C62d7746BBAF2A418EeE8135D',
    ended: false,
    lp: '',
    name: '',
      },
  { 
    stakingRewardAddress: '0x3Ede2fbC9F720c05ceC8296857480fAA71f074C4',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0x69F8E212c97DB9Ec721f508a038a1BA724131946',
    ended: false,
    lp: '',
    name: '',
    },
  {
    stakingRewardAddress: '0x6162f89F1582A74D6B8918b5989994c678A762a8',
    ended: false,
    lp: '',
    name: '',
      },
  {
    stakingRewardAddress: '0x4909E3fdabf5eCA5e489E7Ac4227C412619838a1',
    ended: false,
    lp: '',
    name: '',
      },
  {
    stakingRewardAddress: '0x02e564da1f53BC11Ea2cb60c394f69d2bfD348d7',
    ended: false,
    lp: '',
    name: '',
     },
  { 
    stakingRewardAddress: '0xc8fC0635F8369Ad79B9ed801963047D2f523C4d9',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x027DfAf5128a64522aC52FD68370150E4A6C5da4',
    ended: false,
    lp: '',
    name: '',
  },
  { 
    stakingRewardAddress: '0x3052faD089A5115C84a201dCc8bfE57722542814',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x8290c27e97707B84C7fFbcB0F33dc68cFEe8ae2a',
    ended: false,
    lp: '',
    name: '',
     },
  {
    stakingRewardAddress: '0x15D04518278a4D271706a291242734e16D4D9D32',
    ended: false,
    lp: '',
    name: '',
     }
]