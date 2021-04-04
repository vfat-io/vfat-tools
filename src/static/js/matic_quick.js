
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
    stakingRewardAddress: '0x760c18f57aDe2Eb793832BF37f1a38EBE5909e7c',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xdA41a4b32cc2a1Ce5a1725b5c8eA957d30A1FEa7',
    ended: false,
    name: 'StkGHST-QUICK',
    lp: '0xA02d547512Bb90002807499F05495Fe9C4C3943f',
    },
  { 
    stakingRewardAddress: '0x2a75B9F3F16a276fd5d4bb5C2A6169388Fac92BB',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x79ef40BCFE5CD4Ab8FfA1018B95B8e67a9a61FA6',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xc6eFeC77e083D43FeeC338de40bb4a319e30D1B5',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x0563C5C7631c7eBEF5FbA145e59efD8A94a1E9bE',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x44f653aE620B01e5F18E0288cA08F17a2F17f1bD',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x151ECdf11f87D79Ae746e26005C59828D71D4Ff9',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x124560D444eea90C1E3535F297993D317a0ade3E',
    ended: false,
    name: 'stkGHST-USDC',
    lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
    },
  { 
    stakingRewardAddress: '0xC0e37aeC523860A78b7cE4290758d5E279d18f0e',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x36534085EaD446a519A0acdFE2D6fF5a0AD9B895',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x256A8c77a98414e3D5176bb377233599391fa48A',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x5F83dFAe43E8fea06197F4D9F4DBB5c82e51Ee13',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xcd9233Ef3c4Cfccb9dB13A2e399a9Ba4502258CC',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xB4556635860a40721f79AaD3894D5a6095763d75',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x9CcEc45252Fe367c0B863e98A76ea954dC91e17A',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x33a48aEcBb36743a99D82aE4aC7A146B8Ff2A2A6',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xCE4Aef8d77CaEFbc939Cd629B5eCE9143C8e1eDA',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x32a334F5D3B6eE2efa5772B541944880fb114A67',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xCF80a2f37899b6a82C444D8e9183544e3CeA0D3f',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x4f4FaB530C845c79eb617d85e1F14bBADe0C0169',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xA1ea89ecafF2297Afa157790d1D0a438fAc5e4b6',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x78fBF502875931f27527d2d225550E9d34d5dF3b',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x99CBABc880f011B179D5D92E97BE7Ae8242cF1eB',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x71324576fD096B067cB64a008a51d9FdaE022846',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x461C554C6C2c175730cC8e43a348A1a75fbefADe',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xedABADd0e07921D9B54e3658dFb8477bB7F0dE95',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x49dDaC7fff1b58138BA646C03463A0619155550c',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xD03F9F73C13D89bB965B97227051193228C3A18b',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x9742CeaFf7b09849d1Bdf3Dc58da4E5BE19461cE',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x8483888b8fBFf4F088fFee75fed5CE93c93155f2',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x7D2f33AB7614B1D54FBa92d70Ac9706Fd1f3767B',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x494537215D7Bd2e809640A49424A49bC394ff8aA',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xdAEadE0e7e7f7aC28d20Dd823aa3D11bedb1a40F',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xA5e35B4900AE653E5075832Feb6718BCd50c09ab',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xD1540331b82c36EA64b5f25F64bDAff8f5A0Fd2d',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x4E9134ba0B711878196d7D85cd9539836621e005',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x59EfAD917839A638F352E42fB7d84D56fA5b336A',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xB71B3BB6Fa6D68c7Db2631cA3C47080cfa23a1d2',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x57E82326c8605f3cB2FFe2986Bb1cC58C5d3e680',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x4dCf9047e2eA55FacA95b5E8fAc47f1aF32e5CEC',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x97411Ead424738c6e36b110cb91622740F9A7B29',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xc4BE7e0977b2b5e29AD7530101442d390879e056',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xEdB2Bacf800Ce9fdC4fF4FDbDe5Db5D643373332',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x2b3cB9061BcE6Df8aB03B7C992cB6969D0D3DEDe',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xEDB59F9b142EA7c97E4394C4b2945Bad7436A4B9',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x79791Ae4c010fa0f0Fd6dB711F5d28428c88F5D9',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xc4ef17Df8829A295dA87174d26E82DFA2AC08ccb',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x9b05Abd1E63c28238c52e067D2B1437634F861BA',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x8C73d5d13f2b703542Ca56450A451E1Ac325D215',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x031c8264071dfc903A2f7Bcb86a26Ea37f045F18',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x6cC98Dd5d9B94ffC773A46EB8409f76E91932975',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x57EFe263506a5B74195a5E887fC8ceAed515C54A',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x89A95A0a3f05Ec3956cB7036a446238F900855e9',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x7CD378c646bE4473A44D513A7Ca97ADB5B202656',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xcD9dB8baBA4270987FEF106fC2205ADee0745089',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x496E533038C87A964473090e32cc38dd3e875E82',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xfC4ff3D8D2f960131E9d47226c37f4C4A2791BDf',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x12aa0c98b2b42e0b779Ae5E14dd9D55264cE340a',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x4CDFc343Bee6dF7489872Bd070f98c08f8371E7c',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x410c0D74903A70F1927f6d0290F95b1969ea3280',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x4AaFe90A7D42Af61b9e6E5375545A714708e90F0',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x10988CDF2411135F986bc7053327328C15065b3A',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xcB5F4E9C29281915d31DDcD94A2B99744985198F',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x7e033E7586eDCaa0714cC95AFC03C813e4A8A137',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xB130f85E0b970aaFCCe943BC79CC87312e92131d',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xE67570Eae35ae74D015712CAed97C2c34d0798eF',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x07969ecC01f1b6f96c9f9bf23F7B41456491C11B',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x51f3e892a46560E16F6679d22e0945E24b9ED0E8',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x2E72ba83c59f393575Aa3619c5153214f6CE2307',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x436442fd8887B9EA0c09256b3dbf75092b9b5711',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xdDa752bF5afb79F93632c44BC9BF9D8d0674E8cC',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x884636e960e3573Aa81DE89e7F4D6EB06b1b9B16',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xEBFaB5a23Ac3E6a5892C1623b93028b6637F00f6',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xe07a352772e9c47d78B1B6917bd45FEF7Dd9275b',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x6544928F5Fbf0503f51a02E5C086FFde5874379F',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x3f38cD298994eD6Adf2E272e2080ee959cFefc7e',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xC8dbdF35C0086A8Eb0c4741D4D8586d1D1c9e48d',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x6F58505E1342D57a3115A58cBF2501EfBC5E6f3a',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xb8fFC77Fd7c430E6354fFB2A9e6D3a4c0e91986C',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xf1A99964822316C920E47823e5C67388a52aD326',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x925B371184490de0cd3a6fF2455986dA25456bBa',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xC735dCB3A7A5cF04AF0938C385C0999C4ad13609',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x9632Fd2E96E600D0B0F0ecBC2cc06DEc0B5d2c0B',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x8c7e01E1086969a288C75E968B79cCebB31c422f',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x1F9Fdc142702C89261aCC9754EB3e1dF22a23c92',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x255093F38a09B6909D4AD00165e16d1D73fe709f',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xd2be3Af972252D7821f32F024cB86d3D8E7593D5',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xf02AEE0b7c5D38deE155cb1D44D93F2b6021bA2b',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xE7f82c99211E9849F2DD2417c05a308deE1b4491',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0x3347aaf65771D032157f30B4dc4473402B250a21',
    ended: false,
    lp: '',
    name: '',
    },
  { 
    stakingRewardAddress: '0xF3Fc8269189B2BA3a8749586bDB91a57e1fD6273',
    ended: false,
    lp: '',
    name: '',
    }
]