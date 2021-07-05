
$(function() {
consoleInit(main)
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

const QuickStakingContracts =[{
  //tokens: [de, jn],
  stakingRewardAddress: "0x8FF56b5325446aAe6EfBf006a4C1D88e4935a914",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 105,
  pair: "0xadbf1854e5883eb8aa7baf50705338739e558e5b"
}, {
  //tokens: [ce, de],
  stakingRewardAddress: "0x070D182EB7E9C3972664C959CE58C5fC6219A7ad",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 90,
  pair: "0xdc9232e2df177d7a12fdff6ecbab114e2231198d"
}, {
  //tokens: [de, re],
  stakingRewardAddress: "0x4A73218eF2e820987c59F838906A82455F42D98b",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 80,
  pair: "0x853ee4b2a13f8a742d64c8f088be7ba2131f670d"
}, {
  //tokens: [de, oe],
  stakingRewardAddress: "0xB26bfcD52D997211C13aE4C35E82ced65AF32A02",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 70,
  pair: "0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046"
}, {
  //tokens: [jn, se],
  stakingRewardAddress: "0x7Ca29F0DB5Db8b88B332Aa1d67a2e89DfeC85E7E",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 65,
  pair: "0x019ba0325f1988213d448b3472fa1cf8d07618d7"
}, {
  //tokens: [ae, de],
  stakingRewardAddress: "0x785AaCd49c1Aa3ca573F2a32Bb90030A205b8147",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: ae,
  rate: 50,
  pair: "0x4a35582a710e1f4b2030a3f826da20bfb6703c09"
}, {
  //tokens: [fn, de],
  stakingRewardAddress: "0x573bb5CCC26222d8108EdaCFcC7F7cb9e388Af10",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 45,
  pair: "0x90bc3e68ba8393a3bf2d79309365089975341a43"
}, {
  //tokens: [re, oe],
  stakingRewardAddress: "0x251d9837a13F38F3Fe629ce2304fa00710176222",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 30,
  pair: "0x2cf7252e74036d1da831d11089d326296e64a728"
}, {
  //tokens: [Ke, de],
  stakingRewardAddress: "0x97D69E23DF7BBB01F9eA78b5651cb6ad125D6d9a",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 29,
  pair: "0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67"
}, {
  //tokens: [re, se],
  stakingRewardAddress: "0x8cFad56Eb742BA8CAEA813e47779E9C38f27cA6E",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 25,
  pair: "0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb"
}, {
  //tokens: [de, se],
  stakingRewardAddress: "0xD1C762861AAe85dF2e586a668A793AAfF820932b",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 20,
  pair: "0x1bd06b96dd42ada85fdd0795f3b4a79db914add5"
}, {
  //tokens: [ce, re],
  stakingRewardAddress: "0x8f2ac4EC8982bF1699a6EeD696e204FA2ccD5D91",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 20,
  pair: "0xf6a637525402643b0654a54bead2cb9a83c8b498"
}, {
  //tokens: [ae, re],
  stakingRewardAddress: "0xEd8413eCEC87c3d4664975743c02DB3b574012a7",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 20,
  pair: "0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd"
}, {
  //tokens: [pn, se],
  stakingRewardAddress: "0x19f227C90Ccd615858A7F7848b3b1eb2C652E328",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 17,
  pair: "0xe88e24f49338f974b528ace10350ac4576c5c8a1"
}, {
  //tokens: [pe, se],
  stakingRewardAddress: "0xa132faD61EDe08f1f288a35ff4c10dcD1cB9E107",
  ended: !1,
  name: "StkGHST-QUICK",
  lp: "0xA02d547512Bb90002807499F05495Fe9C4C3943f",
  //baseToken: se,
  rate: 15,
  pair: "0x8b1fd78ad67c7da09b682c5392b65ca7caa101b9"
}, {
  //tokens: [de, tn],
  stakingRewardAddress: "0xb11856d3Aea0203e50B8520479C6332daBcF3f82",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 15,
  pair: "0xdf8139e9bebecadecf48bec8c8064ccefb618e2b"
}, {
  //tokens: [We, de],
  stakingRewardAddress: "0x8917692e0Bdb47AF1D36837805E141Ed79065dFC",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 14,
  pair: "0xeaa5e4620373d9ded4dcb9267f46fcfc6698c867"
}, {
  //tokens: [pn, de],
  stakingRewardAddress: "0xe99e60462C8FCd1470AE258b5649d9fcd3122999",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 14,
  pair: "0xfc2fc983a411c4b1e238f7eb949308cf0218c750"
}, {
  //tokens: [de, Je],
  stakingRewardAddress: "0xf563fAe71bDAcDD370098CeCff14dbe2c9518a6b",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 12,
  pair: "0x654e651b658f784406125400cf648588cb9773e8"
}, {
  //tokens: [En, se],
  stakingRewardAddress: "0xD3435396c763aBA84FD6C6FBFA94243Fc033227c",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 12,
  pair: "0xfc24a83a657a1f3f299a5f801af8816e2d14ff46"
}, {
  //tokens: [se, tn],
  stakingRewardAddress: "0x3CB338519AD8AE7cbaCb4A1035052BE6DA7e0b59",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 11,
  pair: "0xda5a2d1c048e58e2d1e6b55d840c2e2294caeec4"
}, {
  //tokens: [wn, se],
  stakingRewardAddress: "0xDE571d6ee61a9Ce8358b9cF011452ff5290ACc21",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 11,
  pair: "0xbedee6a7c572aa855a0c84d2f504311d482862f4"
}, {
  //tokens: [jn, re],
  stakingRewardAddress: "0x6C6920aD61867B86580Ff4AfB517bEc7a499A7Bb",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 10,
  pair: "0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827"
}, {
  //tokens: [Tn, se],
  stakingRewardAddress: "0x6BcCF1f0825826964c2eCC2408B00659eb357b6D",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 10,
  pair: "0x9b6550471fbf39d4708c407eee3fe3d82c6ac6c3"
}, {
  //tokens: [ke, de],
  stakingRewardAddress: "0x225d8F0f5FB5D66cA7C0a27da85F462689c47C23",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 8,
  pair: "0x3Ff616172e87429A037e4B42843FB11bF0C945bB"
}, {
  //tokens: [pe, re],
  stakingRewardAddress: "0xfDC02Dc768a587514b992b03Fb713F74061764a2",
  ended: !1,
  name: "stkGHST-USDC",
  lp: "0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09",
  //baseToken: re,
  rate: 7,
  pair: "0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4"
}, {
  //tokens: [sn, jn],
  stakingRewardAddress: "0x3139523e1507cF6B0700Be2EABea6D5e919C6369",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: jn,
  rate: 7,
  pair: "0x652a7b75c229850714d4a11e856052aac3e9b065"
}, {
  //tokens: [Ke, se],
  stakingRewardAddress: "0xfEc1E86786841FF699588DD1e88178AB2BB6DAbC",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 7,
  pair: "0xdea8f0f1e6e98c6aee891601600e5fba294b5e36"
}, {
  //tokens: [cn, ln],
  stakingRewardAddress: "0x855b8dCA0Dfe3A1AC474f5A25792d4326580E06A",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: cn,
  rate: 6,
  pair: "0x1e794afed730e913d2a514033773c90dc0b59c54"
}, {
  //tokens: [ie, se],
  stakingRewardAddress: "0x72ed24d2b2D98D3c4b5297ce244f623B9357F798",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 6,
  pair: "0x4b4c614b9219397c02296f6f4e2351259840b3c7"
}, {
  //tokens: [En, re],
  stakingRewardAddress: "0x589a0C538c056b99B0D9F40f8e79DeABede87060",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: re,
  rate: 6,
  pair: "0x6405ebc22cb0899fc21f414085ac4044b4721a0d"
}, {
  //tokens: [ae, oe],
  stakingRewardAddress: "0x97Efe8470727FeE250D7158e6f8F63bb4327c8A2",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: ae,
  rate: 5,
  pair: "0x59153f27eefe07e5ece4f9304ebba1da6f53ca88"
}, {
  //tokens: [wn, jn],
  stakingRewardAddress: "0x774685013B4248c9f7ddE063cfBdA0a87269C0Cd",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: jn,
  rate: 5,
  pair: "0x264e6bc3f95633725658e4d9640f7f7d9100f6ac"
}, {
  //tokens: [Tn, jn],
  stakingRewardAddress: "0xC9212Ee9bb5A5Cc4fe4D827c65e6De7324297F77",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: jn,
  rate: 5,
  pair: "0xa408a751b6d05d1649c5bbd7c38842fb17ea1846"
}, {
  //tokens: [ve, Ee],
  stakingRewardAddress: "0x2f5c21A2084fE66E3CEDe1dfd048Ea00b3dcf1f4",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: ve,
  rate: 4,
  pair: "0x4756ff6a714ab0a2c69a566e548b59c72eb26725"
}, {
  //tokens: [$e, se],
  stakingRewardAddress: "0x65Bb31f4ad1D9958Cd808d4337eaaB6F40CFaD2e",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 4,
  pair: "0x75a4917aee97bda48d3572f431e04003743da85e"
}, {
  //tokens: [De, se],
  stakingRewardAddress: "0x8FC0a8dE57d15dF22238FCd165Cd5d6658ac4788",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 4,
  pair: "0x6276969983510b3dfae28fe6b7b8e2a858f0c2bd"
}, {
  //tokens: [de, $e],
  stakingRewardAddress: "0x729970954a0c26cdBe765A93020efC787283dfcA",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 4,
  pair: "0xfdbdb3a2bbdc7d9dc6203dcef9d53f1735135951"
}, {
  //tokens: [qe, de],
  stakingRewardAddress: "0x5Afc79ce4481a4565B88074393F2DbFc19CbCDdC",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 4,
  pair: "0xd88810f3fe698862669448dce29808b242b9a1bc"
}, {
  //tokens: [an, de],
  stakingRewardAddress: "0x7cc64850E4c65e753247A1Ed2c8DF63DCF7d002d",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 4,
  pair: "0xbf646010b1ae86ad7fbb4cff5fd93c7019331cc9"
}, {
  //tokens: [Ne, de],
  stakingRewardAddress: "0x34D4257C4935673Fb5059f29602B9AAe9Dea0296",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 4,
  pair: "0x47be4b1b6921a36591142e108b8c9e04bb55e015"
}, {
  //tokens: [se, Je],
  stakingRewardAddress: "0xDdB4E83F0977CAf315f5A4d71930FD72DA00d8d9",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 4,
  pair: "0xa975ceeb05b379cf67fdfa63e7b2770f9f1d72c6"
}, {
  //tokens: [ge, de],
  stakingRewardAddress: "0x0C7395bc2b25603941a67e4DaF327362dB8f7D54",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 4,
  pair: "0xb1ff609d3341fe5a822faae973b8c5a227d8889e"
}, {
  //tokens: [se, We],
  stakingRewardAddress: "0x0BA297E04008070E3075Fa08a920bB3CeC2ed45b",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 3.5,
  pair: "0xf8b5e03841c07a72035f719979ccd6f4589bbb8a"
}, {
  //tokens: [se, an],
  stakingRewardAddress: "0xab1d645fe5148322D4991fCB3bceF6848a5e8123",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 3.5,
  pair: "0x42fd10ddc7628b82d80c3b2c286f3e79555fd7a1"
}, {
  //tokens: [Le, de],
  stakingRewardAddress: "0x219670F92CC0e0ef1C16BDB0aE266F0472930906",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 3,
  pair: "0xcc203f45a31ae086218170f6a9e9623fa1655486"
}, {
  //tokens: [jn, rn],
  stakingRewardAddress: "0xEEc558404E179dEb5561fB043D8fd0567227FDE7",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: jn,
  rate: 3,
  pair: "0x5a94f81d25c73eddbdd84b84e8f6d36c58270510"
}, {
  //tokens: [Ie, se],
  stakingRewardAddress: "0x219ab685344518c60eFb399a039EBC73cC4f1471",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.5,
  pair: "0xfcb980cfd282027b7a0544802a03b8af63ee9cc4"
}, {
  //tokens: [ke, ae],
  stakingRewardAddress: "0xefF782c32385B5eBd196fFD860629a5c69216c25",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: ae,
  rate: 2.5,
  pair: "0x8ed2dac7145865def7838623f715c835dea154cf"
}, {
  //tokens: [Me, se],
  stakingRewardAddress: "0xEa2EC0713D3B48234Ad4b2f14EDb4978D1228aE5",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.5,
  pair: "0xd7668414bfd52de6d59e16e5f647c9761992c435"
}, {
  //tokens: [Le, se],
  stakingRewardAddress: "0x24830905906b53F737cDc8a227C9475C52795C5C",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.5,
  pair: "0x08a945b6de91a7d0e242e55484a99a4a5f3810a8"
}, {
  //tokens: [He, se],
  stakingRewardAddress: "0xe818cbeE29477e6C6915Df1e9757dd663f10106d",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.5,
  pair: "0x4fa5e499eea684c2fee4b67e96271ee916c26155"
}, {
  //tokens: [ln, se],
  stakingRewardAddress: "0xa6b85D97853248973d11B9c806492D405D1B50e5",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.5,
  pair: "0xba29f611473f3eccadb995d85a39b87677f620fe"
}, {
  //tokens: [kn, se],
  stakingRewardAddress: "0xD6E9C2576FEa298c5C9FA9F2cBC5f124c5f97625",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2.25,
  pair: "0xeb275d1d930f157504cca7d7afce38360c7302b5"
}, {
  //tokens: [He, de],
  stakingRewardAddress: "0x214249a7bd9a6C10AdfF8fAd70749ebf8108494a",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: de,
  rate: 2,
  pair: "0x0712323f8451cf7acc1141083baa60cc70dc32a8"
}, {
  //tokens: [ve, se],
  stakingRewardAddress: "0xa859D2C37A49bbd5992E39FCC37a7dD56aE130E7",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2,
  pair: "0x2aa7a18ceabf2ef893d2f7c0145cc45e6f10b223"
}, {
  //tokens: [Ne, se],
  stakingRewardAddress: "0x859f1E2490B4F62C5D32cf9409e2bBF43dfA3B61",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 2,
  pair: "0x52f31162e07c0158c5dda8c922ca09b52881e471"
}, {
  //tokens: [Re, se],
  stakingRewardAddress: "0x4E5317608D854104ffcC02F9741b52d1f07225Ac",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.75,
  pair: "0xd6c1fe4e4dd9a949c05c9b6904c353b87e3cea3a"
}, {
  //tokens: [se, Ye],
  stakingRewardAddress: "0xFd20CfF4eBD6EaD961E86A1264eEa4B64F847150",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.5,
  pair: "0x7579fb88f46adc9ad97d51c3b22e8dcdb6f68a57"
}, {
  //tokens: [ge, se],
  stakingRewardAddress: "0x4aC2D949D9E7e2c47e0FB6c7e2316BAE58d27599",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.5,
  pair: "0x96fdd975c4ba24c49e21140284ee09d6537e8ef7"
}, {
  //tokens: [cn, se],
  stakingRewardAddress: "0x4D637F2d946b4028705BEb436e66Bf1Ffb85C22D",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.5,
  pair: "0x282b89e71325551a2b6d1d30cc10349ea0c79f12"
}, {
  //tokens: [le, se],
  stakingRewardAddress: "0x0aC274597134209b640A18Fc70FaE075D33D1d87",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.5,
  pair: "0x2e026b382bccc90df4e73985d1bfadb8ca4ab13b"
}, {
  //tokens: [dn, se],
  stakingRewardAddress: "0x6065BAD6E8d8760b0cA729fCE35A98641CE1060C",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.5,
  pair: "0x7c3b697f63a17ccdcd450d6bdb93cabcf9cff114"
}, {
  //tokens: [gn, se],
  stakingRewardAddress: "0x631F21B329C958e6A522c7b857F22c0C5E013368",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1.25,
  pair: "0xc1950da9e676d352954c1424b341afccf8c4c608"
}, {
  //tokens: [qe, se],
  stakingRewardAddress: "0xc74dAA25035577E20db7C1cDEb01bcfFfe4927Ac",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1,
  pair: "0x8075cda830ea117457f914b790daf93f93c66136"
}, {
  //tokens: [bn, se],
  stakingRewardAddress: "0xB771f27de915529DcbBCeFd3b73f2537B94Ab3Fa",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1,
  pair: "0x2af64089156efa9ce3677c3392ef8fbd9a06a8ad"
}, {
  //tokens: [An, se],
  stakingRewardAddress: "0x74A7fdA76A008276705c39B0599916ee8513965c",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1,
  pair: "0x5278a593fa07f7ec723b992d293f4edc3ae65927"
}, {
  //tokens: [Ve, se],
  stakingRewardAddress: "0x86806771672fb51a04be7BcdC4546fC111BBbA57",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: 1,
  pair: "0xeb951f0da8148a0a3fad7a568194ff9495fc464b"
}, {
  //tokens: [ke, se],
  stakingRewardAddress: "0x78A8Ef79CB397FeDD933922b3A3Ced03dAcE52d4",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .75,
  pair: "0x049AB22922e2FA63CB259f9D0D30294748cB3E1b"
}, {
  //tokens: [se, rn],
  stakingRewardAddress: "0xC29996f70BC8D7052287Ada2B7B7765360A69a32",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .75,
  pair: "0xbfe3bb39c514f74f37e20115785bbe58089865a0"
}, {
  //tokens: [un, se],
  stakingRewardAddress: "0x4AB627237c2ce3719Ca42940c641Cd3dDbC83C0A",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .5,
  pair: "0x4f4b7477850466d96cbcab5b74e58150ed0f2b24"
}, {
  //tokens: [sn, se],
  stakingRewardAddress: "0x8732f213E8F82c6580e2579Dc2E3310aFF90E972",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .45,
  pair: "0x19e524d444f12dc572bea6a45bd7e0bd38818693"
}, {
  //tokens: [mn, se],
  stakingRewardAddress: "0x395c81AcB66aEfb84CAcc501Bd581f0B261e4Fc1",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .4,
  pair: "0x065d609ff57e8ce4ee5fbc3c040a442354e8a2e4"
}, {
  //tokens: [je, se],
  stakingRewardAddress: "0x0E5a923524fC0A14fA4ab108145e4a019D2f2C6a",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .2,
  pair: "0x592d8faea9e740facbd6115abd92d2e6acb2f8f1"
}, {
  //tokens: [se, _e],
  stakingRewardAddress: "0xcb099768c2eB727f5380c9E7AF93153E8d0e3766",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .15,
  pair: "0x3cb10463648e3f35ed7c5b64394d482a1b7287b5"
}, {
  //tokens: [Qe, se],
  stakingRewardAddress: "0xB9Ce318ac54EC8b3aa17d18dFfb0EC3c46E88fef",
  ended: !1,
  lp: "",
  name: "",
  //baseToken: se,
  rate: .1,
  pair: "0x9c8e56e594831951de0791577c0b9bf9aadfbb9e"
}]
/*{
  //tokens: [ae, ke],
  stakingRewardAddress: "0xca5Da81e08E573D5D92aCDe4Ac9Cc6534c3fAe09",
  ended: !0,
  rate: 0,
  pair: "",
  name: "",
  //baseToken: te,
  lp: ""
}]*/