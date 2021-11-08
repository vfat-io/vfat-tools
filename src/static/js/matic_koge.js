
$(function() {
  consoleInit(main)
  });

const KOGE_VAULT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getLastTimeRestaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getLastTimeStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"keepMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const KOGE_STRATEGY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"jar","type":"address"}],"name":"SetJar","type":"event"},{"inputs":[],"name":"Iron_MASTER_CHEF","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Want_Token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getHarvestable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestCutoff","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestedToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"iron","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"jar","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keepFXS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keepFXSmax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiHarvest","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"salvage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_jar","type":"address"}],"name":"setJar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"NewFee","type":"uint256"}],"name":"set_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newCutoff","type":"uint256"}],"name":"set_harvestCutoff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newHarvest","type":"address"}],"name":"set_multiHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"titan","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlyingPoolId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdc","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usdc_titan_path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0x992Ae1912CE6b608E0c0d2BF66259ab1aE62A657",
    "0xbfE130aBd54F202dd7f8C3cdAe7C993fCd703f8a",
    "0x4e1578399F02F8f33c0911159dC61F5c9Adf1B25",
    "0x92F42e22D812C0C8ADFC30190faC42919032E19B",
    "0xE4a966c8225BA2A5dd7B4861AB5fe3570E002629",
    "0xd5032F602AA9F6C00D7F20d00e3Dc61eaaAA3331",
    "0xaBE114ca2B3406b5919c3617B9D8cFCe0f33611a",
    "0xd606Bd85424F372ec96DBDAcBB7ca7f9Bf04f270",
    "0xE0011c255B8E7A5939e41913e3657D7852d50a9a",
    "0x1e5F7C5A8c2D3a071573Cc8101288D413cBDDc80",
    "0xA2C2473ccE81aF668f25C8d798f7A1C0F9172Cb9",
    "0xc0892B586636528a0ECd1dD16256867271C5C3b7",
    "0xc78e2EBbdB1d45A9d0e1C35EFe2a477781387DcE",
    "0x1173c353e93342B337098b63B0B64226645Fb79d",
    "0x25006b72061A512B2629dE0142d930f2F3751b7C",
    "0xf30e1d85153E501BA8171DACf85F6613e91248B0",
    "0x50B808875e9722E0bDADB7211f486D8E49a2ceB9",
    "0xFAf49e554778e9D11F8a646679fDBf406B871556",
    "0x395AB0835bea33aF0Fd1A4E20b9ED3eDc65DC0dc",
    "0x51e150D14C5f4Ce7b08eBd7a22A4D41ECF614614",
    "0x15a5d625755FC77fC0753d9F1c3e2620297273C4",
    "0x883200d4E483d01eEef2ffE96d37f9Df1E85d954",
    "0x7F9bcE09fa5Dd6885142b34cAC9AfE4c142021Ff",
    "0xaE48aCc701151061A5bfff8e4c3f0DCfe4A957E9",
    "0x4a93D6b394Da4c1e6e436e9370E5DF08A45377a8",
    "0x7a54BeCc6e4898249F4B4573Ea904F75Cbb17e2F",
    "0x2584B6211f054E5DcF8a708e60875b9BbA45A32b",
    "0x8402c67fC92691c745E0Bbbe4989eB07Bc02c335",
    "0x69aAF33Cd4bd6Cbd3Ef275f8Ddc3342e0365F083",
    "0x82d007ffcd3DCCB60b461085Ecd11Fb5812A7335",
    "0x092b0a3e0d7b17E837a2ae8664885406D06bcB99",
    "0xA0be41bF0454d1CDd4F19CDDC5A23A1D254722ed",
    "0x885B1248D36fB83E824AD49eA637Ea7998C0Ca54",
    "0x2Cb2c97F28cC58de6bD3d379919dD66Ba1801c65",
    "0xBa1998aD991DDC36f9f927764d0950F10654cbE7",
    "0xAD367134f993D8C2d62A1255FE1252A18d5C78ba",
    "0x9A7D67a685251567B0AEe4CA08402A1A9f8a1D05",
    "0x2E084932ECf2df9ad7841E7838Dd39f47Ea4e695",
    "0x967e9A7A23E68cc6A0e8b98db8C079f133580760",
    "0x9abF2f2acBce703Eaca4430F7E44Ab9098b60C48",
    "0x720726a3546B1f9CF145093bcdc293E149e2e07F",
    "0x57bc21ff1236A3fDE7164FCe75c97E3e0714CCB5",
    "0x0DCc3Cd939e347dAaaA5b5729E6A2DAf52E4F402",
    "0xe47b2E9c02EF23B91cdfc1ADbfA9bBb4372d421B",
    "0xEab5DAC8E6E3da7679b2a01FCD17DBE1Ed519904",
    "0x1ddE2a134E4dE3D0c85bb3f0816f343B9a861B64",
    "0xA6B3647DeCdefB4CE5D855250517f5EaE462F617",
    "0x66F483df4aE87991539B042E8320Ac21dD33A677",
    "0xaE3e4292705e5052aCA9054B4003421F717A521C",
    "0xB062BB2dC24FF6B764a9Cd32973674268bB8dfad",
    "0x453f0CdBE6cB2C56ac38A171Ff80d41981f9f149",
    "0x4C389275c52b2A2b07E444cf0223744668A54b52",
    "0x51AC169E6139E3bebaf8D51A8867b921a77E9d99",
    "0x9420981430E703f0310db748483d1627478EfCFA",
    "0x9e7eB04168078eE76755D81ddC229d5C7Ad218c9",
    "0x9ea363902D086A4707F71d7AF6Fb91DAf7aE4948",
    "0x3BF440465b8E5A36cac9e6B6F4300b461B42C9A6",
    "0x8e73021E5eC8aB320b96D01fE756bd9C2B3Ab5B0",
    "0xE28809B6070DB755b01303d03Dc0476F49A96B17",
    "0xAD37B0Be3164a85C6Ffc48fEc9D722756C000AE6",
    "0x928aC990A5A9471DA5f05A27211613aA5c75DD3c",
    "0xCF6081788AFa655705078D8371c1E6A08B7C6619",
    "0xC2c5a92E4dA9052aF406c0b97f09378C51a7E767",
    "0xA7BEFC58c2e14e8f22E5566E49c05a7e7E6F054F",
    "0xfAa6Ca9A5FED9cAEF91711283d59F0EebE782a23",
    "0x5E0F3303218a3665a2707a1D01EDEe78Abe9F3D6",
    "0x42064982010d0881c7A6BC89D83B32309bd17a99",
    "0x5AA51B3890bAEdFB3BF570a6345D5F3B2A6ddfDf",
    "0xE5C7986950e10541CADC1646ff227aCA52F7995D",
    "0x084A5e96F3EE81909bF8e4De5Ad3a823616Bd08f",
    "0x64c20BB3D9aCD870f748fe73B6541D500643e490",
    "0xb99898440ff53A7f36422faee7030F4785452636",
    "0x2002ac0EE6Fb936d5F0d52ACebAB581a3dF5F971",
    "0x05e30F9b15a88f911c58D63EdAc8B60d24488AeB",
    "0xc74e6DcF602e81FC10dE4FE852Ab4243412E0Dd9",
    "0xA1e13449EA8218Ab2e3ea0CF841d39A61b2024D9",
    "0xd9bea4230Be112D900B493F6a772b1E769eCC7B8",
    "0xFC3578356Cb5BcBA389145903254Aad2c3f606bc",
    "0xcA5a23122238A0CC126CbE30CA170839c4Ee15E8",
    "0xe806cfd63a2aA1461415DF918a24af77b103FD27",
    "0xbccD774b1f377430C3cBA3662744E5157A029847",
    "0x1c6f6D77639281DC990A7743231743C526101e42",
    "0xd125662e2C04C355B4F6b22780f9fBaB48463163",
    "0xbA9702585136Cd7E39E6BCA0e700c3fae72DF05f",
    "0x09c656425B71D1459f210e250f2f2E4210DCd126",
    "0x4B7E2DFDDFcA7aB50c4bEdc2721EceD34c8c79F6",
    "0x23f9c7097157c0f6Fdbf355D8fB8914f4711Ab05",
    "0x7a9be7CdF26C8311625ed97c174869fcA9b791eC",
    "0x00567b197A3506e8D05Dc8aA21E8Ce250dbcE13c",
    "0x92FB3E8323baDBEE16f4E69De52D3a0b5BA39C7C",
    "0xD33eDaB4e24D7471e8b772Fbc1f6b068d99FE391",
    "0x55A2FedB176C09488102596Db21937A753025466",
    "0x79D2F222c67e954AcAc8eCF3166cefAEB6cb56D0",
    "0x2f026c3b0fdCcF941FB07A62F4803CAF36e45859",
    "0x0CB25E588E0dF55Fb6B4407884D6B3B553D16095",
    "0xeE0B5e8d2187DAeeAD591b3F51b2C9ed8452f28E",
    "0x11685B6Eb3B71E43077941Be3557048B95b96236",
    "0x11801BfC70d6b049d81DE15b0Aa172CFe704AA09",
    "0xD02064bEd4126ACCCe79431A52F206C558479648",
    "0xfC7B6d0f6157a1971679f5aF7F5B6374694E658f",
    "0x3De0305D703b5ce1A748D174e29BA38e7C834005",
    "0x64ec0D31EA0345BCBf29855d7C0B74b5Dcc78fd9",
    "0x7B612e2A58F31Eb482812D1F3529e001655e6EB9",
    "0x79c3f7c36ACb46Ee566c2c33B9DdE4668eC069a6",
    "0x55D51F0C3215085e45BA7041d32Fc8d4890570fE",
    "0x95a56528Dcf6e8eC4c020Af18f869eA77b76E265",
    "0xEC56A5a3c43Ef9e60F7baE05254f5bE6eae4bdB5",
    "0xA6633cE2A7Bb69D3B1d34D56c95Aa0F59FFF6f57",
    "0xa807d2892698190207E6f66d35DFbF0a227f51f4",
    "0x1CFef93D79d0421cf5e21bbeAF8F8f389BA3A5B6",
    "0x96d1DB482032eE964D344Ca44B2AfE4B8f96f8d2",
    "0xa18A9C9527aCFCa8F697c8691687DA254F773f99",
    "0x89030969DB2B51897D7f4C789b7C9d3c2ef05083",
    "0x67cE36bf3106D782Ca06EEFa937d14f2D054ebe4",
    "0xb9F9E41ac77A6B6E90e7EC26D9CDcEdB194F508A",
    "0x51eEEb529b647EdD27fced366D15F52bf668e419",
    "0x2C61069B2e429F132CeF57D28aC58F4fA91B1dE1",
    "0x5C3533B44d7c3e804C428A57C426577CA899A311",
    "0xeF721dc8AACFA0F2113DBfcB08a77207a220FEe9",
    "0x531222F9399fa37AFfeBE759174423C962620E66",
    "0xc67DEEA5195a55FB19876AB3cB31F6d44a771946",
    "0xD3dAdEAF5355Ca23150b037b2229Fd16A37004ae",
    "0x9A547d7c5359cd19C95A0c88C0967B715Cd19601",
    "0xF58B6E2A1187f3a4cf6494E75f047D268ee80dcA",
    "0xf15b4FDc78a87786d3f3d775cB5E27847348490C",
    "0xEA2A839abE3dd0fc8830B28706dF8d81FF3201eD",
    "0x2A60105aB70Eb62A7EEaa04b2748a8054cA6D6aE",
    "0x00e80B9137560D0A0Abe5Ed39D39F5b0F5804237",
    "0x8715Bb8f3157C7cA5bB379A107C9b810f11F7815",
    "0x94d00dEe78f4b79CA8c07E0b2B00039b6B87c236",
    "0x33c7f2cD56506e3Eac79984E96453b517D532D1e",
    "0x7E90B622b8891e736247fFEE896dD2a1B3f9142e",
    "0x65378692264B09Ca93740F439dFA5A7978A821b1",
    "0xCc5579577AD2F499F2d3583FCb4aFD765510A33B",
    "0xB364963Fd56D8A49a896E8c7BBB666b3159396fD",
    "0xb7b5641442C1762586AA03Fdc4Fa4200CB57D4e5",
    "0xb7D3e1C5cb26D088d619525c6fD5D8DDC1B543d1",
    "0x2425b13B711c82E694237F852c3b1A3E50930c7C",
    "0xCc72AF943EF649B540021590fF349A454b5E2e9a",
    "0x3c928f0eE37bafeB6e90D835e7000ef533A09472",
    "0xf5bc9A2251A1Ae5AEeb0286CC9562608E8bDb824",
    "0xb33576835cC51EF8D71ccB861775B2821470bb71",
    "0x3F5912c3312B73483Cd8015A7881Ef40118d50C6",
    "0xe5B7402d8Ccae02D3BaA65140a50B26f876cec8b",
    "0xFa10DbeFA09f369E191eD385FccC63c7De22bcd0",
    "0x93da5BAF95E313C99B76A98974D27d6eb32B2996",
    "0x043AFFc47423d39445d623c5Ca6E431643F1dd1b",
    "0xB38f6067703c924602C6c316E9193bE547cd7a01",
    "0xE057c5b2e0eDbE5c336123409B0346d889286DdC",
    "0xC21FA0BE9eB6679bf071FFbA79f0933bE41F2293",
    "0x9762Bb14a5E9a2Fa94eb5FB9D241FA3d4893e6A5",
    "0xae39a17C457d7fB75C0D5FAf96F685483aBD570b",
    "0x0dad07D37A8e6E6dB623225c5CC0a114356048d3",
    "0x37E45856616Cf8CeE2E3a69C7C401b6163552afF",
    "0xAFBFB2Bc9C0C00781993B203f43605966C8cD637",
    "0x1478883920113b91991a9520252347e3274a6396",
    "0x0eB72cd5f9911C307a0E3B07426a7FDeb4588600",
    "0x759DCd61C021eDC0365882048C726462fA05F642",
    "0xd6a9550Fe158b477bC12af882911CB5e89295D39",
    "0x53197CBe1cBeb417089cAAb3B5fB16391EDe0a69",
    "0x32752c391fa2F241F60068e7EA1D8B84BaB88611",
    "0x0D3389DB05bC0d21961fEFd8b54B92558D798Fe2",
    "0xceE1BaaEAD121DfC60fb292d64714acC0E3147C1",
    "0x277c64Aa105bc4892280050726D3de0848b9C274",
    "0xa8974E37d2B9dF1c9dDD49e7D6363d32D366D976",
    "0x01E02c272f0436317B1d05C350ED9C5482777aAb",
    "0x87EaCf1a93469CC73D1b22b3fFeb995cA9825661",
    "0xACF8cEd23d13Ce791A085f573e70751c2Ba90360",
    "0xc1f26fb014eF6EAa600ba95dAa18dDb0FeFaCC91",
    "0x26637b02F9ccF6BE12b38945698251E4721F0290",
    "0xfee30B81bD194f23dc5AcC23769410Beab3adB21",
    "0xA838F1e986b27d7AC5a977c7d0eCbADFFCDC7Bb5",
    "0xa67153C4b30f24F60286C664547aeE010AE87F1D",
    "0xa3F49c515b3c45294D3F9B5A4525AF6223EDf954",
    "0x85eFa41967c508f6F2f5236B08E734cce88BC7e1",
    "0x1e187A8Fc90e5DCbbfd25B473e17955Efe6E15E5",
    "0x24771c6C514F0307b01dC14e361c311B8E9823b5",
    "0x00983223517fb75F5B963a3e896E1d682da0359a",
    "0x74EeB0121f82784622Df86C9c2b1FEE61541B03b",
    "0xD8A6050F39e2910091b55927eDefb667fC30aa8E",
    "0xE48aA84AB5A0Ee50e08fc12dfaED0ada08a1aA5d",
    "0x89dC99ffFC4a2300c7164cDe87FE0fE05398FA1C",
    "0x17754aCE28b367dc0ee5B9D00232B1Feb05664c5",
    "0xa4FEb444c17FBe341e2481B89e1574DA1ab0A833",
    "0xa5B762Df7b6491f30A62681b2F988977a98A07Fe",
    "0x45a686CC6a9627a2fb2e4f44104c6EC09594bA93",
    "0xFc0Da0cBAab796e983b3c0ee42bE6edC498AEf61",
    "0xB01705A4fe67D957E7e328834f09608359313065",
    "0x3528DB3895423c71d64D0F040D88B036B4579471",
    "0x9F807bf6FDfCa49adEA2a7a87cB86e9c3BacCC0a",
    "0x4ce450F7aa450ADd27E7F3631d1Ab1Cca56e1A3D",
    "0x7F75a9924066Fff7c97B150cB5119D5F9C8FD0E4",
    "0xcB57482aF988A2A00F14fa796920c50C4eb932A1",
    "0xF31049674cb4d43edE717d430a5b16066ecD4EFA",
    "0x029f402412e0Ee600929Ae878473C4c9d2976E15",
    "0x0C776471CB3Ac5be3a0e7560C7B87977a5Ac0be2",
    "0xC9D6b9D95070f924E511415bb4a7640997704E4C",
    "0x8e66a05C09b31e12f65b71Eb36F46b7E249cEaa5",
    "0x2F47fBD707D9dFB3CAb292700b71A3681DEB0721",
    "0x9790a55E43a79f30e04f0B39FC766028950E793F",
    "0x88f87372bDe5E2242e1a7996B4472dE490AF8453",
    "0xba4A9A92fc9ae91Bb26f31D7Dc538e44Ab04f2a3",
    "0x7Bd9e5F441D2013c473c3e366F2883b9A6cf9091",
    "0x14d09C69163F94D7f5e674A004F224F24739A56C",
    "0xEB2852258F0E4117352bA3364E599dc980681c2e",
    "0xC918945e4785D7ffd3f801407368c3d5e32A7C18",
    "0x26e028B287486E0Daa6D4658cc70E7c3aDc75891",
    "0x43f28AAe9fcefA47D5d7835B0a9Eb86E36F035A7",
    "0xa937941C8CC9A21d0c6B866Fd2eEaED78B8C2834",
    "0x1B247E74d5c2D6CeF12C9BEc8115282CbC45c8B5",
    "0x36DFEAE548Cfc9A8335624Cffc3fCDF80a5141f2",
    "0x8b9C797DBcFAD409747962D1FE4718a9660dB94b",
    "0x846C27ec821F67A9177C56F0cA6FEc4cfc5e5C8E",
    "0x379566E654D071E917332F9aA7A10587D09059e9",
    "0xc5CeE98D8B8b273398000f69fC31C6fFD2a37E08",
    "0xF457000D481Df3c486DFD38d8Fa0C4Fc949a6BbE",
    "0x11F75EF77f15EfFd7ad72F99FC5C5Ab4e97E8Acc",
    "0xA89414dD5E57b896a3b20137d36B46a3AF12066A",
    "0xeAdCb0469f05fa07d4f5178FC762C5C872b6D9c0",
    "0xa104c9Aad3EE07676D23159282124dCD3F542c62",
    "0x82e553b4B645A195BEA0E6C78c05483a07cf6116",
    "0x58c12402428ca79Da43Bf14B70CbC59DF5Dfe61a",
    "0x24Dbf973CC3fe6357cAB6394d94781784A55D930",
    "0x41a3dDd6f2502689Bfd6170026ac45DC810E8037",
    "0xa32de2a04f68a17F6289105ce98baaA97f415309",
    "0x8488E2f70055fdc2aCDF511Be789AEb93ae0B1B3",
    "0x15113393DB8B1Cd9781E04499b942AE1A3412763",
    "0xeeb87B59b162B54a7f61DD7C0E7157984A56f506",
    "0x424D5E4000a0795c4CAaa3ee252B1Ae13d4cA39B",
    "0x2D03892d0fAE4479aE2B0d945f67675F006F7271",
    "0x54507Ee8E18FB6d7E4771A6619b04a84635bFf4B",
    "0x55C08f4F053170009010cF7435064d5e0E6905E3",
    "0x58201C1331Bf7f36ed326af0789A33851019875b",
    "0xB131089e899a6F2E7726b83b85C32bbE097b138b",
    "0x510D776fEA6469531f8be69e669e553C0De69621",
    "0x8a8c784DDE052dE731a4477Bb95B4F594f5B9Bc3",
    "0x6726775952DE79b66c2340fCB4DD1cb3D48944E5",
    "0x26C4Cb82c7B7D2e551d5d074f2298686DAc530cA",
    "0x0e0BCba8269f5d2192Ab8ABED301Ee229DE0F244",
    "0xb9A4d32a547a4865E5247D611De7F3D7F3B2d378",
    "0x17051bB60771888Bc908B6946F4Fb7850042FE1d",
    "0x2f3E17b34A79F4990153EE5588aC04724E773C6E",
    "0x97B0262670F3F640A6Be287f403302E2285F5A87",
    "0xDF47221A2240754245dD3b88e01100C0d1d85Aa9",
    "0x7f9fc5bA0c2d213C9Eee7940fefA1a7a297B2320",
    "0x12977EdF05A6718036f4ecc9bE2D26366a97B96b",
    "0xe1A9ab14B4c0efa25a1EE6f1348ef4C34418c258",
    "0x05d83F3Ef95F921971763b035c00298BC42ff008",
    "0x2bb510a979fe3f277636A94B86FA304c6631581C",
    "0xEa2F645691d114f0A7Fa7a759032F8c6f90D58d5",
    "0xF0db902352dfe1EaF8deb2a2eb5c760568821f58",
    "0xbFad80456C71BE0fdE53ecd623605662cF808e53",
    "0x0Be469DE6635A71a07Df915D65D5f08Fb4ac007F",
    "0x4929f3D8934640Fd93a21E89Cd22ddb4b2aff8c1",
    "0xE80D7246EcD89Cb8707001c61f652B90eeA0dbc4",
    "0xf6cF9A3cB64c97D6278A57FA322D9945AA42E417",
    "0x58FE96934a595Df1C03BddA09F0fdba38063770B",
    "0x72812112d635873F5fEF2b0bcAb22cC5BBA2E0dD",
    "0xaA5237Ff567987445e1AC35D5148c11Ef3703173",
    "0x9A48219D7b3106BaAD3F5D6Cf50d94F1Cf747C8D",
    "0x3fae5e941B7eb3A7BeE94399bF669224efa9432C"
  ]


async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const KOGE_CHEF_ABI = [{"inputs":[{"internalType":"contract IERC20","name":"_rewardToken","type":"address"},{"internalType":"address","name":"_masterChefFund","type":"address"},{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"masterChefFund","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_masterChefFund","type":"address"}],"name":"setMasterChefFund","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardPerBlock","type":"uint256"}],"name":"setRewardPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const KOGE_CHEF_ADDR = "0x6275518a63e891b1bC54FEEBBb5333776E32fAbD";
    const KOGE_CHEF = new ethers.Contract(KOGE_CHEF_ADDR, KOGE_CHEF_ABI, App.provider);

    const currentBlock = await App.provider.getBlockNumber();

    //const multiplier = await KOGE_CHEF.getMultiplier(currentBlock, currentBlock+1);

    const rewardsPerWeek = await KOGE_CHEF.rewardPerBlock() / 1e9 *
      604800 /** multiplier*/ / 2.1;

    const rewardTokenTicker = "KOGETOKEN"

    const prices = await getMaticPrices();
    const tokens = {};

    await loadMaticChefContract(App, tokens, prices, KOGE_CHEF, KOGE_CHEF_ADDR, KOGE_CHEF_ABI, rewardTokenTicker,
      "rewardToken", null, rewardsPerWeek, "pendingReward");

    _print("");

    const poolInfos = await Promise.all(Address.map(a => loadKogePoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printKogeContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function loadKogePoolInfo(App, tokens, prices, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, KOGE_VAULT_ABI, App.provider);
      const vault = await getMaticToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getMaticToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const balance = await contract.balance() / 1e18;
      const ppfs = balance / totalSupply;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "matic");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }

  async function printKogeContract(poolInfo) {
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
