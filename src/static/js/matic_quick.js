
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

const QuickStakingContracts = [{
  //tokens: [ ETHER,USDC],
  stakingRewardAddress: '0xbB703E95348424FF9e94fbE4FB524f6d280331B8',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 32.886,
  //pair: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d'
},
{
  //tokens: [ ETHER,USDT],
  stakingRewardAddress: '0x45a5CB25F3E3bFEe615F6da0731740093F59b768',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 13.311,
  //pair: '0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046'
},
{
  //tokens: [ WBTC,ETHER],
  stakingRewardAddress: '0x2972175e1a35C403B5596354D6459C34Ae6A1070',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 13.311,
  //pair: '0xdc9232e2df177d7a12fdff6ecbab114e2231198d'
},
{
  //tokens: [ AAVE,ETHER],
  stakingRewardAddress: '0x9891548FB271C2350bd0FA25eb56A3b558cD4A64',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 9.396,
  //pair: '0x90bc3e68ba8393a3bf2d79309365089975341a43'
},
{
  //tokens: [ DAI,ETHER],
  stakingRewardAddress: '0x8d6b2dBa9e85b897Dc97eD262C1aa3e4D76477dF',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: DAI,
  //rate: 9.396,
  //pair: '0x4a35582a710e1f4b2030a3f826da20bfb6703c09'
},
{
  //tokens: [ ETHER,QUICK],
  stakingRewardAddress: '0x5BcFcc24Db0A16b1C01BAC1342662eBd104e816c',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 8.613,
  //pair: '0x1bd06b96dd42ada85fdd0795f3b4a79db914add5'
},
{
  //tokens: [ MI,USDT],
  stakingRewardAddress: '0x06e49078b1900A8489462Cd2355ED8c09f507499',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDT,
  //rate: 7.83,
  //pair: '0xe89fae1b4ada2c869f05a0c96c87022dadc7709a'
},
{
  //tokens: [ QI,ETHER],
  stakingRewardAddress: '0x17fE4630A855FF6e546C19c315BE7f3ED01f38Ff',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 7.83,
  //pair: '0x8c1b40ea78081b70f661c3286c74e71b4602c9c0'
},
{
  //tokens: [ MI,DAI],
  stakingRewardAddress: '0xb827B23e2276ceB912CB42088ab064800447c158',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: DAI,
  //rate: 7.83,
  //pair: '0x74214f5d8aa71b8dc921d8a963a1ba3605050781'
},
{
  //tokens: [ XCASH,QUICK],
  stakingRewardAddress: '0x7E9E46BBAa92a2d18c17B8e8c537Cc488f0f1559',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 7.047,
  //pair: '0x30167fea9499c11795bfd104667240bdac939d3a'
},
{
  //tokens: [ LINK,ETHER],
  stakingRewardAddress: '0x1b077a0586b2ABD4062a39E6368E256dB2F723c4',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 6.264,
  //pair: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67'
},
{
  //tokens: [ WBTC,USDC],
  stakingRewardAddress: '0xBF0b0DEF82C1D473e6B8770458Ddc82f5C8C7504',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 5.481,
  //pair: '0xf6a637525402643b0654a54bead2cb9a83c8b498'
},
{
  //tokens: [ RUSD,USDC],
  stakingRewardAddress: '0x94d024C05E2eae6ee3C9E0711D3E18C80F8CebA8',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 4.698,
  //pair: '0x5ef8747d1dc4839e92283794a10d448357973ac0'
},
{
  //tokens: [ USDC,QUICK],
  stakingRewardAddress: '0x939290Ed45514E82900BA767bBcfa38eE1067039',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 4.698,
  //pair: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb'
},
{
  //tokens: [ GMEE,QUICK],
  stakingRewardAddress: '0x5454862d457d0e87f68Ff2eb6c2Ffb12FE5f254b',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 4.698,
  //pair: '0xfe4ba2ab8562b6204a17f19651c760818a361571'
},
{
  //tokens: [ MASK,USDC],
  stakingRewardAddress: '0xDa734d661BEf168895EFB2aC0634950C7874B5Ec',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 3.915,
  //pair: '0x253d637068fbf11b18d0f2a1bf3b167d37802687'
},
{
  //tokens: [ USDC,USDT],
  stakingRewardAddress: '0xAFB76771C98351Aa7fCA13B130c9972181612b54',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 3.915,
  //pair: '0x2cf7252e74036d1da831d11089d326296e64a728'
},
{
  //tokens: [ UCO,ETHER],
  stakingRewardAddress: '0x81f0076780F7CeeF57E801b10EF9DbC92f3a2B5a',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 3.915,
  //pair: '0x25bae75f6760ac30554cc62f9282307c3038c3a0'
},
{
  //tokens: [ TCP,USDC],
  stakingRewardAddress: '0x43CdB843Bdc76DDfb9F5aE1B9F20424E9D77cED6',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 3.132,
  //pair: '0xad431d0bde99e21d9848691615a0756a09ed3dce'
},
{
  //tokens: [ NEXO,ETHER],
  stakingRewardAddress: '0x1476331f814c00F1d15dc6187A0EB1e1E403D745',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 3.132,
  //pair: '0x10062ec62c0be26cc9e2f50a1cf784a89ded075f'
},
{
  //tokens: [ UNITOKEN,ETHER],
  stakingRewardAddress: '0x76cC4059Dd19518c377934CD799615B3543967fd',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 3.132,
  //pair: '0xf7135272a5584eb116f5a77425118a8b4a2ddfdb'
},
{
  //tokens: [ ADS,USDC],
  stakingRewardAddress: '0x4a01270909A3a11810B8d73dF11083106f7833Ce',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 3.132,
  //pair: '0x85ba262be13329a2db5acf9aa46ac2345b5df4ff'
},
{
  //tokens: [ EROWAN,QUICK],
  stakingRewardAddress: '0xf113B8dec8368b7FeC4802fF7126cA317131F7cF',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 3.132,
  //pair: '0x631f39d22430e889a3cfbea4fd73ed101059075f'
},
{
  //tokens: [ EROWAN,ATOM],
  stakingRewardAddress: '0x70C674bCe0aEc05E0d13bFEdd692b2F231323899',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ATOM,
  //rate: 3.132,
  //pair: '0x7051810a53030171f01d89e9aebd8a599de1b530'
},
{
  //tokens: [ MCASH,ETHER],
  stakingRewardAddress: '0xd24FdB548704D8C6AA1e15B238E4cBe10d214119',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 3.132,
  //pair: '0x1fef1ce437bb025c08609e0c14ab916622bd09f4'
},
{
  //tokens: [ OM,QUICK],
  stakingRewardAddress: '0x7Cb08B1dd9A9fA5da22ef99E7Fb00a856DA6A2c7',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.7405,
  //pair: '0xdfa81e266ff54a7d9d26c5083f9631e685d833d7'
},
{
  //tokens: [ ADS,QUICK],
  stakingRewardAddress: '0x132A9714939d0194eAC5B97725BFE0d7D6fFb8bb',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.7405,
  //pair: '0x5a25c9e27097ebac600ed1df3f31441272af9d38'
},
{
  //tokens: [ ELET,QUICK],
  stakingRewardAddress: '0x7b4125d303eE59e8Ef5aB66ca06314904E45DA7E',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.349,
  //pair: '0x592d8faea9e740facbd6115abd92d2e6acb2f8f1'
},
{
  //tokens: [ ANGEL,QUICK],
  stakingRewardAddress: '0x7381EC7FB10d4242447A4056a84EF75b007D1a00',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.349,
  //pair: '0x5701026955d90e9d9ea79eba2cc70596a6a7accd'
},
{
  //tokens: [ REVV,QUICK],
  stakingRewardAddress: '0xB84319392d51FEEBfA40EdA326C14Bf56c31D030',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.349,
  //pair: '0xc52f4e49c7fb3ffceb48ad06c3f3a17ad5c0dbfe'
},
{
  //tokens: [ RELAY,QUICK],
  stakingRewardAddress: '0x8eF44aF84D79717577C54DD7eC60a60945404680',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.349,
  //pair: '0x7ca8e540df6326005b72661e50f1350c84c0e55d'
},
{
  //tokens: [ BUNNY,ETHER],
  stakingRewardAddress: '0x7475b9eDfc13cdc994AeF39F67F5b4211515C873',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 2.349,
  //pair: '0x62052b489cb5bc72a9dc8eeae4b24fd50639921a'
},
{
  //tokens: [ UGT,ETHER],
  stakingRewardAddress: '0x4Cef5a7B5736e65ad9dd6Ab52eD79eF1BbeBec84',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 2.349,
  //pair: '0x15551bedc20b01b473da93e6cfa29b1eb7baeabb'
},
{
  //tokens: [ ZUSD,USDC],
  stakingRewardAddress: '0xE3Cd2c9971C12F817Aac1350654CBae53BE72433',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 2.349,
  //pair: '0xca8e44fdf749a7c5c28bc927726ea21ccd669969'
},
{
  //tokens: [ START,QUICK],
  stakingRewardAddress: '0xB1B2e2b4cBED8e7b6FF7Cca016760ccA9260f0Ec',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 2.349,
  //pair: '0x9e2b254c7d6ad24afb334a75ce21e216a9aa25fc'
},
{
  //tokens: [ REVV,USDC],
  stakingRewardAddress: '0x97E4bcF95DfA4C0EDAcFd12287317BfaF5B4866A',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.9575,
  //pair: '0xe4139dbf19e9c8d880f915711c8674022979d432'
},
{
  //tokens: [ DNXC,USDC],
  stakingRewardAddress: '0xEce832aBe253681FC0C4fE116ca3De8d18D811e2',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.9575,
  //pair: '0xe169a660d720917b4fb7e95f045b6f60a64eb10a'
},
{
  //tokens: [ DNXC,QUICK],
  stakingRewardAddress: '0xc003fC1a62f7eEa5b07FeFf89BA45A925AC46f1d',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.9575,
  //pair: '0xb61fbe5aac9e91c16f477c8505cf21fb919048f6'
},
{
  //tokens: [ UGT,QUICK],
  stakingRewardAddress: '0x20b07BF5d7c84171c84Daf1ec327306830561AD9',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.9575,
  //pair: '0x29429e4099ed88884729b8fa800b9c65dbe57b63'
},
{
  //tokens: [ OOE,QUICK],
  stakingRewardAddress: '0x7fF1ed1960108Ff896be37199796Cc474B2C070D',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.9575,
  //pair: '0x23e93ce78d7fb5287e4b6a8d91403bc5e7ac845a'
},
{
  //tokens: [ REI,QUICK],
  stakingRewardAddress: '0x5189B2e1A3896c053D094633B77Adc6AeBCF7C03',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.9575,
  //pair: '0x1c75bd54ad15449d12e6c24a9b5e8ce1a62c567c'
},
{
  //tokens: [ POLYDOGE,QUICK],
  stakingRewardAddress: '0x403A2604226585Cb1e07D644780930D650EA4b73',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.9575,
  //pair: '0xbedee6a7c572aa855a0c84d2f504311d482862f4'
},
{
  //tokens: [ SWAP,QUICK],
  stakingRewardAddress: '0x3486D306c3Fe9e1cC7809e2C171766CA942c144A',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0xfcb980cfd282027b7a0544802a03b8af63ee9cc4'
},
{
  //tokens: [ MATIC,MI],
  stakingRewardAddress: '0x5F709F81cdA3E84fC2af3662B8B8C3F4f44e3d4E',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.566,
  //pair: '0x7805b64e2d99412d3b8f10dfe8fc55217c5cc954'
},
{
  //tokens: [ GFARM2,DAI],
  stakingRewardAddress: '0xC0389A2A49aCe18eF35Fa8285Ab47D9B1D1315a0',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: DAI,
  //rate: 1.566,
  //pair: '0x0c7ad41d3e0dbc1cfdcdd717afb0a72a65cdf069'
},
{
  //tokens: [ XED,QUICK],
  stakingRewardAddress: '0x3fC5c25f946894e14AA2e9cE755Be55d98B7d515',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0x222789b185a145ccbd19803a448143252612d012'
},
{
  //tokens: [ DAI,USDC],
  stakingRewardAddress: '0xACb9EB5B52F495F09bA98aC96D8e61257F3daE14',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.566,
  //pair: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd'
},
{
  //tokens: [ AVAX,MATIC],
  stakingRewardAddress: '0x0cAB010bA055a9F3B3f987BA39eE0ad3E2d1a830',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.566,
  //pair: '0xeb477ae74774b697b5d515ef8ca09e24fee413b5'
},
{
  //tokens: [ PLR,QUICK],
  stakingRewardAddress: '0x0e72b1b7658FFb0e3f45562A489FD4Bc15873E4B',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0xb980171e5647a8531d3b28134622d225bc3cdb82'
},
{
  //tokens: [ ETHA,USDC],
  stakingRewardAddress: '0xE73580E28A4cCb796fEBb276902F2fa2F5a39067',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.566,
  //pair: '0xb417da294ae7c5cbd9176d1a7a0c7d7364ae1c4e'
},
{
  //tokens: [ RDOGE,ETHER],
  stakingRewardAddress: '0x16043947b496a5B31932bcF9f41dD66880ff2Bb7',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 1.566,
  //pair: '0xab1403de66519b898b38028357b74df394a54a37'
},
{
  //tokens: [ SOL,MATIC],
  stakingRewardAddress: '0xB332b9D67E20bb8Ce4B93308A63C2EE2F846D372',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.566,
  //pair: '0x898386dd8756779a4ba4f1462891b92dd76b78ef'
},
{
  //tokens: [ ETHA,QUICK],
  stakingRewardAddress: '0xDBFb709a40F4B6C10DbfC27Cd96F90cf67EbBcF1',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0x8167d3156fccdbaf3e43ae019a0e842e5d1f1ac1'
},
{
  //tokens: [ BNB,USDC],
  stakingRewardAddress: '0xCd7E62D9E2D209EcB22EC48A942b4db9503aB97B',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.566,
  //pair: '0x40a5df3e37152d4daf279e0450289af76472b02e'
},
{
  //tokens: [ TRADE,QUICK],
  stakingRewardAddress: '0x789c93e6fd3F6327Ff2f2d1F394e694DE442044e',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0x36d906b17371678ba39de21b8631854c9490e87e'
},
{
  //tokens: [ PBR,USDT],
  stakingRewardAddress: '0x4c510d82FD85F2B54FD0C41975fbb9305a92751B',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDT,
  //rate: 1.566,
  //pair: '0x53b02ad5f6615262ec5b483937260135429d5af9'
},
{
  //tokens: [ WATCH,QUICK],
  stakingRewardAddress: '0x4f5f46Db08D28b7c6A96653B7C4BdB8a209c6331',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0x8000fe11cffa3ced146d98f091d95c9bc2c55c97'
},
{
  //tokens: [ MEEB,ETHER],
  stakingRewardAddress: '0x7a066B2e504ae958926F5DAa2A31aC5Fa278c52D',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 1.566,
  //pair: '0xd0a4bbb49ddd36b0d832d485974a2387d81dbdd3'
},
{
  //tokens: [ GFARM2,QUICK],
  stakingRewardAddress: '0x9fD3642874a58308644DF36192046000bB726853',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.566,
  //pair: '0x065d609ff57e8ce4ee5fbc3c040a442354e8a2e4'
},
{
  //tokens: [ XPRT,EROWAN],
  stakingRewardAddress: '0xA0395e5f54f396527322fb11D922e50707552176',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: EROWAN,
  //rate: 1.566,
  //pair: '0xf366df119532b2e0f4e416c81d6ff7728a60fe7d'
},
{
  //tokens: [ IRIS,EROWAN],
  stakingRewardAddress: '0x49734F8A9ED60CBdc489d90A3d80aaf41FaE0Ae4',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: EROWAN,
  //rate: 1.566,
  //pair: '0x58ffb271c6f3d92f03c49e08e2887810f65b8cd6'
},
{
  //tokens: [ REGEN,EROWAN],
  stakingRewardAddress: '0xb72547668E5759a81BB2DD0C81a04437487e7F17',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: EROWAN,
  //rate: 1.566,
  //pair: '0x66c37a00e426a613b188180198aac12b0b4ae4d4'
},
{
  //tokens: [ AKT,EROWAN],
  stakingRewardAddress: '0x9C2F4bebEA8B843485EdbD77801CD41B92805bBf',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: EROWAN,
  //rate: 1.566,
  //pair: '0xa651ef83fa6a90e76206de4e79a5c69f80994556'
},
{
  //tokens: [ ANRX,ETHER],
  stakingRewardAddress: '0xB8219752b7E35E82B2a37845D74351580A6AC3cc',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 1.37025,
  //pair: '0x3dd6a0d31818fdacd2724f2b0b3b220f14a54215'
},
{
  //tokens: [ MITX,ETHER],
  stakingRewardAddress: '0x2a33666D3e06FdBE07F8AeA0d0ae22861F8C7e73',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 1.1745,
  //pair: '0xa28864af52aedcef717c34bffca2ccf9d6aa23cc'
},
{
  //tokens: [ ODDZ,MATIC],
  stakingRewardAddress: '0x2458D6CE80963915Be56FD9bfBd702728EE899b0',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.1745,
  //pair: '0x972d0c9d46742d04a35e2521e8ff1657e8107b2c'
},
{
  //tokens: [ ODDZ,QUICK],
  stakingRewardAddress: '0x4Fdc40A3F4926E04BC8B76eB4a83433318D6f0E6',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0x8df6f7da556b9e70e272434bdc581dbb4848dffc'
},
{
  //tokens: [ PERA,QUICK],
  stakingRewardAddress: '0x9DD277679F4BB9412Ec68D7E0F41cb2985BEF0c7',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0x8bab360e41468dff5326df636e2377a858ad0670'
},
{
  //tokens: [ MONA,USDT],
  stakingRewardAddress: '0xb323d6f17A0cDFaE1BfD263839B39eBB5210155a',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDT,
  //rate: 1.1745,
  //pair: '0x856ad56defbb685db8392d9e54441df609bc5ce1'
},
{
  //tokens: [ PHX,MATIC],
  stakingRewardAddress: '0x7aE6190a279a919612B5C563296C93CAe983e457',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.1745,
  //pair: '0x666dd949db4f3807c6e8e360a79473a5f0c7075a'
},
{
  //tokens: [ XCAD,USDC],
  stakingRewardAddress: '0x7efCff893e01D36F3856a5b063A50b91Bbad303D',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.1745,
  //pair: '0x602fe85ceba5d27fd4d48c241cfb83ce045a179d'
},
{
  //tokens: [ MITX,QUICK],
  stakingRewardAddress: '0xeD79D524B50e16ccC5d57193a2CAdF1964d484E7',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0x5938dc50094e151c7dd64e5b774a2a91cd414daf'
},
{
  //tokens: [ MOONED,USDC],
  stakingRewardAddress: '0xfBAafCc888E68153a667CA36020B0dc2c5019bAC',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.1745,
  //pair: '0x2d252d4a903a450afa9dac54cb696f0690259a62'
},
{
  //tokens: [ TRADE,ETHER],
  stakingRewardAddress: '0x5db8eB2cbcd7C74CF700173eCf86338247898c1a',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 1.1745,
  //pair: '0x12909209228cedad659a6e13d41f82a4d53ee8d1'
},
{
  //tokens: [ KOM,QUICK],
  stakingRewardAddress: '0x91061e09e9c7819CBbb92a418240954A4D8a9fed',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0x082b58350a04d8d38b4bcae003bb1191b9aae565'
},
{
  //tokens: [ D11,MATIC],
  stakingRewardAddress: '0xC105a406ad18f3736bd8Af158D811E85a018ef00',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: MATIC,
  //rate: 1.1745,
  //pair: '0x4c27eee5f50eeee292ef438a87a42292bd629e70'
},
{
  //tokens: [ DHV,QUICK],
  stakingRewardAddress: '0x09DdB5E6B740De10b4b710E72ac4AF100d47428B',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0xfd0e242c95b271844bf6860d4bc0e3e136bc0f7c'
},
{
  //tokens: [ FEAR,QUICK],
  stakingRewardAddress: '0xc599CdE2c17084E40D25BC4Ca8f33aF04bE5C9B1',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0xbea282f98df962c54be80a2050a211b64ff1aee0'
},
{
  //tokens: [ CIOTX,QUICK],
  stakingRewardAddress: '0xB2ef545E18946a04aE0a82eC4fb199630025F2Ce',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 1.1745,
  //pair: '0x7de19d534c6ecc2f5e236349d36b7d5bb645bfef'
},
{
  //tokens: [ FEAR,USDC],
  stakingRewardAddress: '0xf32E91281f453644F95038526Ee491d2718Db9e2',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 1.1745,
  //pair: '0x4e56843592da70ce073ad6599b3fb3ce3bf02f3b'
},
{
  //tokens: [ DAI,USDT],
  stakingRewardAddress: '0xc45aB79526Dd16B00505EB39222E6B1Aed0Ef079',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: DAI,
  //rate: 1.0962,
  //pair: '0x59153f27eefe07e5ece4f9304ebba1da6f53ca88'
},
{
  //tokens: [ CNTR,QUICK],
  stakingRewardAddress: '0xa19220e11C3a3d5C71CBB29C2e581125f087450D',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.97875,
  //pair: '0xb56843b5550e3f78613ca5abf6bd6ae6f84cd11e'
},
{
  //tokens: [ CIOTX,USDC],
  stakingRewardAddress: '0xeaF39eba018F086e7723CdECdb700BC2b7862ade',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 0.783,
  //pair: '0xcddf91a44c579765227722da371136a4f12dc81b'
},
{
  //tokens: [ MOONED,QUICK],
  stakingRewardAddress: '0xd0AA987bb9C5b6c211094fAC5B3AcA8bA3e6B562',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0x3ba7afa5f600be15607b89d03f98aa791c8ecef8'
},
{
  //tokens: [ MONA,QUICK],
  stakingRewardAddress: '0xFef9DF77b67037b184a22cBB449EaBE571Dd7Ff5',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0x82f1676ef298db09da935f4cb7bd3c44fb73d83a'
},
{
  //tokens: [ YAMP,QUICK],
  stakingRewardAddress: '0x474e655CCD715393E31d66077a007491b7e52070',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0x66ff795535cf162d29f6b15ed546a3e148eff0fb'
},
{
  //tokens: [ EZ,QUICK],
  stakingRewardAddress: '0x32B249cd2717799bEd634940a47c2e8Da56EB670',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0xf745a6358790f7a2ef5da0538b714cbbcc635c40'
},
{
  //tokens: [ IMX,ETHER],
  stakingRewardAddress: '0xBba6c7B2D1B088ecC969E13140b801714f9b1a20',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.783,
  //pair: '0x5f819f510ca9b1469e6a3ffe4ecd7f0c1126f8f5'
},
{
  //tokens: [ RAMP,ETHER],
  stakingRewardAddress: '0x5D2680B93D851B137626361Dfa1F97e60c796615',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.783,
  //pair: '0xe55739e1feb9f9aed4ce34830a06ca6cc37494a0'
},
{
  //tokens: [ RENDGB,ETHER],
  stakingRewardAddress: '0x6491F7eb102233453951aC933b6bc5181077560B',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.783,
  //pair: '0xbf453e64ee7f43513afdc801f6c0fab250fbcf09'
},
{
  //tokens: [ BUNNY,QUICK],
  stakingRewardAddress: '0x6d06DcC1FA6226C3F2e5ECE0aA6c1e4273368F68',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0x976b7b7fe4293111cacd946c422a64f24a223564'
},
{
  //tokens: [ POOL,ETHER],
  stakingRewardAddress: '0x00e13b2873465A07043c701FE5eE7e5AA4D8bA96',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.783,
  //pair: '0x1585d301b58661bc0cb5a8eba24ecae7b4600470'
},
{
  //tokens: [ GHST,USDC],
  stakingRewardAddress: '0x3759D7904a5A0fcdB5AA2d55D5fF1132aE4f2575',
  //ended: false,
  //name: 'stkGHST-USDC',
  //lp: '0x04439eC4ba8b09acfae0E9b5D75A82cC63b19f09',
  //baseToken: USDC,
  //rate: 0.783,
  //pair: '0x096c5ccb33cfc5732bcd1f3195c13dbefc4c82f4'
},
{
  //tokens: [ ATOM,QUICK],
  stakingRewardAddress: '0xeF37c3272DAcdC0FaEe000b3862734d2Df1D9C91',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.783,
  //pair: '0xf7e659966196f069a23ce9b84b9586a809c4cd9a'
},
{
  //tokens: [ KNIGHT,ETHER],
  stakingRewardAddress: '0x426953d2ebBC76aCB9EbFADb2f4d6100a795286d',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.783,
  //pair: '0x7f7c12acec546cdceb028cc5b57f7aa2d91f0887'
},
{
  //tokens: [ GUARD,USDC],
  stakingRewardAddress: '0xF5c305F9D817a462Fa0eCE578a552C3F05F58b40',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 0.58725,
  //pair: '0xd2eeeedfcaf1457f7bc9cba28d5316f73bb83b49'
},
{
  //tokens: [ YAMP,USDC],
  stakingRewardAddress: '0xf588C993b3A410d937bDC24Cb73392e196E0e634',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 0.3915,
  //pair: '0x87d68f797623590e45982ad0f21228557207fdda'
},
{
  //tokens: [ WOW,QUICK],
  stakingRewardAddress: '0xaA1C17a1d8EC352095f5F67fd1cce8FD60099746',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.3915,
  //pair: '0xd5211a55d978bf651b9da899cc8bb09491ff39a1'
},
{
  //tokens: [ UNITOKEN,QUICK],
  stakingRewardAddress: '0xa444aed39Fa4Fd4fB7518877963046453c075CAb',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: QUICK,
  //rate: 0.3915,
  //pair: '0x4b4c614b9219397c02296f6f4e2351259840b3c7'
},
{
  //tokens: [ WOW,USDC],
  stakingRewardAddress: '0x98f4a0a1e5C9A8d93Bda40B0636dFEd870cc40A3',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: USDC,
  //rate: 0.3915,
  //pair: '0x7600cc75fa9045986efe0bddee8e18621a8dd49e'
},
{
  //tokens: [ WOO,ETHER],
  stakingRewardAddress: '0x114114214C0AD1C7C8C8e74458138e6e792a89f8',
  //ended: false,
  //lp: '',
  //name: '',
  //baseToken: ETHER,
  //rate: 0.3915,
  //pair: '0x70294d7aa244bd342c536f9b502152564057162e'
}]