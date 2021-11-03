
$(function() {
  consoleInit(main)
  });

const BEEFY_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_strategy","internalType":"contract IStrategy"},{"type":"string","name":"_name","internalType":"string"},{"type":"string","name":"_symbol","internalType":"string"},{"type":"uint256","name":"_approvalDelay","internalType":"uint256"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"NewStratCandidate","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpgradeStrat","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"approvalDelay","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPricePerFullShare","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseTokensGetStuck","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"proposeStrat","inputs":[{"type":"address","name":"_implementation","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"implementation","internalType":"address"},{"type":"uint256","name":"proposedTime","internalType":"uint256"}],"name":"stratCandidate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IStrategy"}],"name":"strategy","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"upgradeStrat","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"want","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
const BEEFY_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_unirouter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HYPER_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alloy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToWbnbRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hypercity","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hyperdao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hypr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToHyprRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0x4462817b53E76b722c2D174D0148ddb81452f1dE",
    "0x7CE2332fAF6328986C75e3A8fCc1CB79621aeB1F",
    "0xf26607237355D7c6183ea66EC908729E9c6eEB6b",
    "0x942aa6324E5D0C102d3Ad6607495ac5e798a991a",
    "0x53e674D5cC969930420d73E4b79Ee0D46cCdf6c4",
    "0x76cE86B1e1b7a3983B26F7E57B2A0C8896f7eB0D",
    "0xeF1870FddC25586636bf8a3d7cCf4d298f6E072e",
    "0x66df1B2d22759D03A9f37BAaAc826089e56a5936",
    "0x8c2d54BA94f4638f1bb91f623F378B66d6023324",
    "0x752948B4493d2Ee09c95F944A76005aEBF410087",
    "0xaB4105375FbE5F502B0da986F46ADf7a21762e52",
    "0x74907ad4E79b1Ce415caB26FEf526ae017598cEe",
    "0xC422261EdC5dB679CAd9BC403e886351De540e77",
    "0x8b89477dFde285849E1B07947E25012206F4D674",
    "0xa008B727ddBa283Ddb178b47BB227Cdbea5C1bfD",
    "0xa5aaE3a55cA356C62b5425AA4bFC212542B17777",
    "0x7f6fE34C51d5352A0CF375C0Fbe03bD19eCD8460",
    "0x8a198BCbF313A5565c64A7Ed61FaA413eB4E0931",
    "0x0C4705EBd2BF69660b72f9E9B684714c9e341942",
    "0x8c9d3Bc4425773BD2F00C4a2aC105c5Ad73c8141",
    "0xAA7C2879DaF8034722A0977f13c343aF0883E92e",
    "0xfEcf784F48125ccb7d8855cdda7C5ED6b5024Cb3",
    "0xebe0c8d842AA5A57D7BEf8e524dEabA676F91cD1",
    "0x3dab1aCB811dc4C8b2FdC77812552f4d4Efd0A8c",
    "0x0dFd8c4dd493d8f87Be362878E41537Ca7Ee4d9e",
    "0xC1A2e8274D390b67A7136708203D71BF3877f158",
    "0x21bA98fCb000dFeD8eC3B94cB41BeA51A601A94c",
    "0x77276a7c9Ff3a6cbD334524d6F1f6219D039ac0E",
    "0xC8e809a9180d637Cc23dAf60b41B70CA1ad5Fc08",
    "0x1d23ecC0645B07791b7D99349e253ECEbe43f614",
    "0x93c9f29CF2496e73f3d8b07055e2359267207147",
    "0x5d4B83B3011B1E14e55185c5D432987e76f6DE3C",
    "0xc24Cf5fA29E619f2D5ccbEC46F2295876c3722ff",
    "0xD3395577febc6AdaB25490a69955ebC47040766C",
    "0xa2Dd60Fb8Bbf21e60E58AF97Cfc9dB9A34397848",
    "0xf62c521c4fb3Fbc20EaB50E1871A90A53632f22e",
    "0xADA7F98fb2594E76914EB593e74B348A498Ea5Bd",
    "0xba1548b3f673950094dc00eDc1eB71683f371696",
    "0x58C55B5675B106b440635E2c550A771f4E256D35",
    "0x247303D4Be227Aa87Bd52F05aDDAD772794DE394",
    "0x0564889d4Ff0dA0371Ec8a898AC39ABC99065BfA",
    "0xE4DB97A2AAFbfef40D1a4AE8B709f61d6756F8e1",
    "0xD35B3733c2ceaf3635bE246B2c6C42f10e5b6B78",
    "0x584611DA226b4d4C0c4D880E6f1E0c0E8522f3AE",
    "0xBe1C35d3349555Ba9eEa38AB1A21a6Db0Bb0fCdD",
    "0x1BE356364a1e849af2F7a513Fc46dAB6063Db485",
    "0xCC2755476B0573F0ee0D5a754Bb6fE720c3641Bb",
    "0x03F69AAF4c8512f533Da46cC9eFd49C4969e3CB8",
    "0x9649e6E5c689f21BC27B47CE4177f7c5f7281E20",
    "0xad88D6B731DCb567a3E13407f1E7B0649Bad82D2",
    "0x866a910F3375d0dEBDdD904A36B3940aFcD29900",
    "0x7eE71053102d54Fc843BaEBaf07277C2b6dB64f1",
    "0x74b00bbb693de4dC07d8aB79Ac935b323e2A136a",
    "0xe3B5a0d5dFDCD6dE7e22a5c2B6b957aB76d2A085",
    "0xB6B89a05ad8228b98d0D8a77e1a695c54500db3b",
    "0x5E7156F7c0B5E2005000C38beb38540ba9c283df",
    "0x76F0e4a08c1e85d020dfD7C66B991ecd4A7551AF",
    "0x9DA4048550C1a73686E594f726310F0b0585fBA3",
    "0x6530E351074f1f9fdf254dC7d7d8A44324E158a4",
    "0xe09888EEab19bce85e67eDC59521F3f290B1BCcE",
    "0xE71f3C11D4535a7F8c5FB03FDA57899B2C9c721F",
    "0xCB171DF46CA6FF7AfEF6c4935128204435E4F05C",
    "0x6888f67662d1f442C4428129e0Bdb27a275e0a65",
    "0x383489a0A5deA3f1499c638e0258F7e6a68a253f",
    "0xe95d14D09a8F6034C582bd993A2F2aA8ecEC72f0",
    "0xefA8E30cE4cc433cEA1B3b6006D69731A4FBd485",
    "0xaF34573353aBd160889889D52d7841B2bBCE7Cf9",
    "0x3AD9cd8d75f7a711Caea58e725425A9dC0D249c4",
    "0x5B19A2e8E5878cF2b1E9b1AC7CEA50346671B2Fc",
    "0x75424BE5378621AeC2eEF25965f40FeB59039B52",
    "0x9B36ECeaC46B70ACfB7C2D6F3FD51aEa87C31018",
    "0x8Ce906F6f383c31b09B1D2A5f2c9f480b87ceb58",
    "0x91a55E4b057119e20334258f7C5EAB8822491CEb",
    "0x2b17aD11c5e9553c79a18F33Df4dE565eF0ad5b0",
    "0x5c7fd860fC0072cFef2Cc4aB17CC7fF25B639d8b",
    "0xe4b3CCbB1E48c579Ea3D764Fb258Bc908e46487E",
    "0xd73AEF83c08264C5600C3a17f009B6f8c0226221",
    "0xcC16BbE4987920a17F5C4a92C1Ab4dbDfB0B9790",
    "0x970283Df294f9cedD2187bf84782AB75617Be31c",
    "0x6C433f102A6b8582a43222e335C73873538161b7",
    "0xAbA81D550C326DFf2cE0D31bC7Aa6289d576591E",
    "0x0Ca850eEfE051ED244846A2939e218ec6D44a0b2",
    "0x90D0F2050e62a6d4AF088dD09d802D9A18253c40",
    "0x97fe99a9bc7db115EC89Bc2627eC7f0518409121",
    "0xE695fCeD8fD93eeE54204a7fC33323a60d41865A",
    "0x1A90Ea15e00a6c647478e86e3A3DB1aC1eB23cE5",
    "0xdD32ca42a5bab4073D319BC26bb4e951e767Ba6E",
    "0x8efCf419813F9E018cCaCda36151e5079c274fa4",
    "0x8Fa291074B9E28055fFdBCd4C1C1Dad67B9a130A",
    "0xF7A5eC9168B4C5688b3ad599Aa5c8E1922fEacAE",
    "0x6F6bbbCA49b4b2cE0E27eb0156977048AC3434B9",
    "0x6C4593D4f91c790404cCEe5007E929d2b7bF45bD",
    "0x75A59e8d6611e90e7A8e439Cb59D9f78e738d16F",
    "0x3a3a9784Af130d692E19A3f1C1b13eF44301D0f7",
    "0x6b6ca47520dDC9333B8bD09a1e64204648B63274",
    "0xA4fB94990f99A8C1290e83d40DB9C648fD868D14",
    "0x9a8390F3F74E7f367B5f948dd04495B67a54a5F4",
    "0x8F1F1FB23A208041e1f4Bf4A3b4E165bcCA25Bbb",
    "0x61f55dc5243398D57acd5d6265e228da65C4Cb52",
    "0x832dEe19e5EFeA9251d967f96c324B154780384B",
    "0x1001844Cb9Bc3B89a60ce4f4773dBa3B27115230",
    "0xaE65a66B3c7f8cc1ba71cEA740C953aBa0F3Ce8b",
    "0xBA4FA9A5e1e573fA5267970238af5Edf40727315",
    "0x23Ee6ED971ae7731F53913D9f8a45C7C1af3D6D5",
    "0xa55e8326a9AC7B0bFcA5E6Fc9Cf1141E2dc11f67",
    "0x1d7A7182043F521ab57Fe07a8420Fee9843E365e",
    "0x1A1432b90a093CbFFeCb44cf6965e2fd11005373",
    "0xa5b0E0f38BC86723a9893B828a4B9595ecb22F42",
    "0xA1B2Ef1b6D5823D832DDa2AE2B489793832Fd082",
    "0xE8417099971151CD5CfAE264e25634Fac05cA2b3",
    "0xeCBb84E73760d0E22BDBeE79490c691386B5008F",
    "0xe5D9d4F4C6369E24c8dA4cB07cCb2901845f6021",
    "0xe9CAf4DfeaB51114a619C8104C38a309ccA236E1",
    "0x7D59B0cAC35d431fe5B2F3aAED2FB70050B2113D",
    "0x2D4cf116A59e24Dd0aB8821c93AE87658a9483b6",
    "0xB1893a79fcCe73aEfc878e5AC918698Ee0110444",
    "0x9f3B96a2Dd55aa904bC5476Ffe66E74a53f6b420",
    "0x66b3d910c30f2305EA0078E06DF65e0c1745ceF0",
    "0xf2984c27B963A14F9f3B7326096c54fb05d5b9AF",
    "0x37884333d34eeE3EAe83439CE4608E69E7081116",
    "0x544551E4E7D7bDd1CfbD55F07e304F5C9fD514Dd",
    "0xdf4E615e05713f9Be712bb999B3190Fd238bb77A",
    "0x9fc153db31a5CeF1Cd326De31FEb37C7499eebC8",
    "0x0E765383bea3a166A87a042132422f5F29fDb217",
    "0xDC52e53f9E8b2cf42b557A6b3cE36e79De39ACd6",
    "0xB198A916123394f2d9c31D4645468566e87080d5",
    "0x82303a4b2c821204A84AB2a068eC8EDf3Bc23061",
    "0x2849095eE44eCd5f60Ed04f94e5BB45623A8e75a",
    "0xbea5D2Aed651F579fa3e7ADAA2eC51276B2ea420",
    "0x3e349b83A3E68bdD5BB71fAB63dDE123c478FEA4",
    "0x0e229c6381f00F4be47a9529CBDde18016dD9369",
    "0xe942A8Ef245EAC3CEa951486e3Df5764C79b9621",
    "0xf7e1226F6f98D1981e88Da328347F0E2131A2864",
    "0xda3E3ee01Ee7284e3D0d900Ca3fb3D09484E1ce0",
    "0x5C6e97Ae01d2bE807c8D5d23B9dF63D3A5eF8E9B",
    "0x442ca31De7E6732455e60e3641Ac076fa7a0905f",
    "0xb74792F6a2cF81E3f704930621cb4832ffFcC840",
    "0x191E0b3B023fd8911c1D7632086A46C0D2dB39ed",
    "0xaA66e6EA1cAa7B86a8119B1420F6EdeDE3bb58f1",
    "0x2AaB02eDE64d4A686EA1d1A70B688E46cce50fFd",
    "0xddD5F39d044Dbaeef7b348cf04C3628acd3F1D8f",
    "0x226a18Fb5eb7d9d1c4Eb1b5Cff957E0F1e3fd9Ed",
    "0xE63aCEbE35265896cC6E8BdB8eCC0640a1807141",
    "0xD239D193809b04fD24CB0Cd56A99A3F9dB069C9d",
    "0xBa58D7131Ca50DdFB458f37ea0De6fdcebFe836B",
    "0x8e3e85c7d4A616683f3F9468bC17169774cD1aFC",
    "0x9a3892d43363083fa8b557C3db8B8652E7061612",
    "0x9525A39b7E642785c10F02287b6A181CE9552f44",
    "0x6b7c061949BE60d59F857fcc08b76c278c3B73C0",
    "0x1b27b7083a9BdA1aCD04266F61DF646f8296a872",
    "0xc4cC677bb8b7E6EEA6409Ee2af9F434BAB004192",
    "0x94242E121F056FA7F0892452e6a17678124981c1",
    "0x4D42bD06425179e53498D364427Af4Bf50d27658"
  ]
  
async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");
  
    const prices = await getMaticPrices();
    const tokens = {};
    const poolInfos = await Promise.all(Address.map(a => loadBeefyPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printBeefyContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }
  
    hideLoading();
  }
  
  async function loadBeefyPoolInfo(App, tokens, prices, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, BEEFY_VAULT_ABI, App.provider);
      const vault = await getMaticToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const ppfs = await contract.getPricePerFullShare() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "matic");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }
  
  async function printBeefyContract(poolInfo) {
    const poolPrices = poolInfo.poolPrices;
    _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
    var userStakedUsd = poolInfo.userStaked * poolPrices.price;
    var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
    _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
    if (poolInfo.userStaked > 0) {
      _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
    }
    _print("");
  }
