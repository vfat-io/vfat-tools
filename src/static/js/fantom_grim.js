
$(function() {
consoleInit(main)
  });

const GRIM_VAULT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint256","name":"_approvalDelay","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"NewStratCandidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"implementation","type":"address"}],"name":"UpgradeStrat","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"approvalDelay","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"user","type":"address"}],"name":"depositFor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getPricePerFullShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"inCaseTokensGetStuck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_implementation","type":"address"}],"name":"proposeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stratCandidate","outputs":[{"internalType":"address","name":"implementation","type":"address"},{"internalType":"uint256","name":"proposedTime","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"contract IStrategy","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upgradeStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const GRIM_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_unirouter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HYPER_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alloy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToWbnbRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hypercity","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hyperdao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hypr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToHyprRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
  "0xb7145dE7F5537D07D7Cc3410691D105566A5E434",
  "0x26f47811f74f67e0Dc00494406685d07A3255C96",
  "0x18C5C07a9F68c82de678470a9E9306Ffc3e9Ced6",
  "0x8582267c3a2bb11fCcF1eBB1c9Af128e94B024E0",
  "0x40F7E873Ebefa5BB762341a8DD63f06d9A332D56",
  "0x6d149DA26c4b3AFB9E4D5CEb5C426242532cBEE2",
  "0x1De740fEa240fB67E40824586DC483d19966848D",
  "0x0d5Ecb27D1574E3B574d6D8c93C628d17348c99B",
  "0x6fF9e23BdC45a165f88F723A265d412F403270A0",
  "0x59DfF3203383f6A7573a8bA71FF3DAFD95ebee72",
  "0xB5a7854D6F034D53FF3c57E5E75E3F2A3B4957e0",
  "0xDf14d05277b55d5097bec0eC56cd599E246F77D8",
  "0x3621AE77Df07b6e341710F24083B8398a59E7eF1",
  "0xd0CA2E5A8c12F56a130A7d609DcAC0f820743056",
  "0xB45c9a2627219Db00D82b4F2816D544f41bCBC4B",
  "0x8C2DCB72c80a4e4014D0EAda094a4DD690c6fe37",
  //"0x72dC5eF4EC32582b18465eD7900Fe0280Fde9736", cant read the token symbol
  "0x3A5A2a671d30b09ecFB95bC398be62313569b6de",
  "0x8f9d07bae2A31b5B82F7E5fb8916296EEB3e3e9a",
  "0x14409cab075DDe7A50fF14e9f76c9E1B26d030AE",
  "0x05C8e2230bdbEdd27016F0F50eadA181D36e16B7",
  "0x0092739FEDaC3c77EdC88A1e9B83686f21b9BE96",
  "0xD671f21fAaAd44CC5c5937Ca1e90380d3276FDf5",
  "0x106A8d32D4CcC8fA3BCf6BA39dC999853B5F4C2E",
  "0xBBDfebA68D7615159F1663FcF324a96F524E197F",
  "0x724f06Dd82646b2cE819058F2F77138d42dB47Ec",
  "0x22ba9BD1D288f468F540a35017537ce9023B1aaD",
  "0xebf1060892c7128e0169abE52eB53D33E131880e",
  "0xD60ebdc6556FeCb9100C7E0c2BCCC9d18B9852D3",
  "0x064bD3eBE8b5E7D4C7828fDb04b3425bBE5046c4",
  "0xa75152568b584271486D54F606BDc2b7fA4e1f0E",
  "0x19429C692737EE8a85432c8CF6209ca6d51E39c4",
  "0x0122Ce265e2F7B1E641233fd0Fd03B721B4fDa62",
  "0x210D17Fa5b223776961Dde5617A0CC99893Ed725",
  "0xac803ecC4F119f7fe3Af53408c30d84342d49be2",
  "0xb64d101172600FF652B669A813Fee37616182023",
  "0x9e8e674D41EF4aA269BAb21C7938000CEcF367D6",
  "0x830a058D324a1176C09a7310152519f56e29b26e",
  "0x177Bd708eB4880d2f0e0E319F48BF1308CFe6494",
  "0x2e36e51335715c4B37022C46E8Ab170BF35B2F41",
  "0x15337eC8FBCeD2E27c153A11DeD23879A2E084d6",
  "0x5197AD80800060C324e7B8306766BCfbe73b5E7f",
  "0xF520d3D486d3378b7370efC7722B44d0D88B4a9A",
  "0xC6ac0Dd798da6A7d41a7E4717C04cA1297D58b15",
  "0xf4828601Db52156c2d5f901A65E0D70a65557f39",
  "0x650e0523636c9811dE26ca324e761639b2ACc22F",
  "0xD34d4F1da52196861A0bC807804DBD150D22244A",
  "0x752c106344dca85b4aA061cCa3D459747b8C9d53",
  "0xA7c827f796761427aDa4269F56b48dCb69b6897d",
  "0x6881A44aB179A9714f2F4670605AD4E75b3d9B36",
  "0xa484E9a6C10C1a8d777ae26Dc4340958d79C3FFB",
  "0x83859901dB1D927e387C58f5E1c89D1dfdD3E032",
  "0xD95D30097dcE2cF32b17d23f742F3a0c02b56895",
  "0xdeED1f3CDA881763315d7Be2E147Fc9BAFCd07e9",
  "0x7D2c2194a17A1d6Bc2f288be7fDa22607F587A22",
  "0xDfA8f14ADbfF7f477E8B6e9EA9fAd3ab8594e98B",
  "0xc1426E48378AfaD5b3cD93580b4B411E60C79536",
  "0x64c2D4de917a0e3f07600281a7a8b1e4e422B588",
  "0xAcdcECc12a5e0714add4493B1369C2849232674d",
  "0xDF3a54f99c08f85cFcb0D4a0849736d720EACF27",
  "0xb4Ed4Ab1079a8683e9759E41FF6e60C50FB42526",
  "0xaDc65e44F69e4bB0Fe8A09CFE1c49C59Ed07d022",
  "0xAA54cfdD1119f29881C0FBC1d506F10BC15b03ae",
  "0x366986561196117Ce020ecC5E6A62e595b20f90d",
  "0xE8895281398122B1F447De75d35786493Ea9Dc50",
  "0xa286d50AE31AcA88Ab8C1C0c0E495CC991f082fE",
  "0x9aFe2842C694ae3C3b444d048356c4e42553ee22",
  "0x645cA2db228902B86c9026ACf8f824EA2A94E19B",
  "0xAee374a0B974ce7f270c28b6008186941aeEb213",
  "0x34a3FEb169F3718ACE8829B46c0bA7638a32A452",
  "0x12ff76Dbf229CC2B54F12384585a6f7Bc5481202",
  "0x0F2c793F77645706b57491F301D870085980e1a4",
  "0x122B48eca046F467d54A76D81c3bf874Bf2c2F2C",
  "0xb87f072126C28A7834E402a1E4B7E41ac81b70b8",
  "0x71af16B836Ba3855608a910D3E45b22B27ddF8B3",
  "0xD10780626b6b3Cca8724E9d998e25E7C01b89CF0",
  "0x253641B5e9627F53072F06eD0C5f16bA629C70a1",
  "0x49fF9Fed2aC69275eC1Ab4D0b194BcA1ed280199",
  "0x144117cce4CcFDCc9B56F2fE13d5c367E2960014",
  "0x891D65d1227170210C90d94d7B4cd75445DEEA8F",
  "0x17c64A789a46F7D64b102eb3744876aa4B88Df7e",
  "0x32e648Ac5FFeDf07170b5b1a8e79515058230083",
  "0xB6beCceED9bcb92B1cf475F473E7F81471b2d2d4",
  "0xD3CF64FDA8b2e22167f8253009dC1A149DfCd87B",
  "0x27F261FCDf1Df0Af1D557dAADB40ad53556c90A9",
  "0xC90fff6f55191788A6bE165129caFe8E446251f9",
  "0x7cC3C243CB8e2f9Ddef1e37bDc27dBa162109FE2",
  "0x4574005C8DB94210bA17F7b0591c118Df0E1f6DB",
  "0x46982CAA0d955F3aC70Fa7CAE127e4D9Eb409CC4",
  "0xaFce788BA91b7BbBbFd80f29FD871EC07F0B5D9c",
  "0x847D8c0C0b7e5afce86dBEeaE782B178eba12D5B",
  "0xAf677319f6cb43827bB1a9fE4ba74406E88984bD",
  "0xF8963c3B8705F312B8b38CdE3d8B411a4D5b6317",
  "0x5d2289dA1bb9718Ffa6560FEdE8e25CB81175202",
  "0x50b3A8bCd47174b9B4F2386AF93FeC616c43C946",
  "0x981A93DcFF4FC1143942e342bc9BB3E67A2b8775",
  "0x0266e2DF6D0f6e6f2C40eB84bBC9cD2487DCA30C",
  "0x8a88A650612E0362C9e8c21139bb617DB12241D7",
  "0x3066bE17129857bFeEe112c14887dd8abAc2e590",
  "0x820345700b090DEE21EB6322484A1511423ddd83",
  "0x163b6C8A510Ba7c4487d47d3E709Af00A1a7d340",
  "0x334c090e07d14280Af91Bf2b3a12eCA3913DF1A8",
  "0x9A84E461b83173b1E36a72965C3875986aA439a8",
  "0x833660249bF4a60Ea9146C90773Ba0a30d704B8d",
  "0x528DF137C8131760aa7f340737Bf2CE60Fb16aDe",
  "0x6E7232333eBDD240eA40DF09DD27DBfccC5fd59b",
  "0x8B6815368121CAd92E4211Af89c42640c0d6aF35",
  "0xb7Ce32c8f77BEa2Bb3b482a09c063Aa4Cd5f96a7",
  "0x170A69D76b4A3Ed1217Ca598F152F336A0006676",
  "0xc2988EEfe6E278D9262f8572dF2eF03288181665",
  "0xcbF73e45c9F192539950C3eF525b359a4fe4A3c4",
  "0x1F42cf915E728F3e9cfFF5C85562D44859805298",
  "0xB70eF424D19f6fD958964626e7b61707E4B7Ce53",
  "0xbB59f6c0e0082123D1A9bCA434f3fFd2388B69c1",
  "0x5310E4De5df5A640dE80Cbb874889d11Ef157641",
  "0x31627D796E02bf87EA8B67985c1648457F3EF5cC",
  "0x03760170336C35063a3677e455272233CC808E83",
  "0xe8D247aD0E5e31f919B3D0dF3C1190A79B02564b",
  "0x86f43D26d9807C19F516204438b122ca836c12D4",
  "0x6D69AD57b242C2777aaC8F2E00ce1f27450E9374",
  "0xE113E8a28F9E61B5A7eFE73D4f54b3406a8e9acA",
  "0x687F1063a566371D29eb9A656d39cd669DB6c40e",
  "0x0303Ef025fdbc76c22bc7b00613AaA489EfD7CDb",
  "0x041C84B45A16d270716257c89b91B3cabAf9aeB4",
  "0xFDc10560bd833B763352C481f5785Dd69C803429",
  "0xC7abe55e5532ddA1943bbe5A94bD837dcd96e233",
  "0x7a4bBdeB10D35F65E7e5F1ed38f51Cd350E176c0",
  "0xA874e458C63348891096Fb1e8Cbf69e19E23dad2",
  "0x4F12672202Dcc861438312B9c4eCEc207153D3F2",
  "0xb96a04bc0a52180568894bABB8DBc21A559AE9F1",
  "0x588B594348E1d7057163433332ef5E282eE9D5F8",
  "0xc7710dfE548E6f4b9DaaDA96FAd8DC6B8B790ea8",
  "0x4e37A6b7E814b3FB22A1A9c5f5B1C92100eb290F",
  "0x10129aEc48f87e45376413Ca1fD08962f95204cf",
  "0x50Cab7317df87f4d377B1433467b617EeC9F3D98",
  "0xeedc637397AFE802D3AF1C60C57Bc79c4Bd286d0",
  "0xDda08B5F3c9d5d24A1Aa5ae6b8f6D902b4288B33",
  "0xc599431b1cec674f5264c1984bf139d29a0A5263",
  "0x48fa56d8F0220874D55c86330eB4fB68f8d8Aad8",
  "0x6a4cB2Bf6361DC9661A56dBe81Bd33Bf82398be8",
  "0xa020501aa126b0051EeDCc2dE51f641Ffe23263B",
  "0xaa9CfC06911A517Cd32324A9D10BbD1Ff0116a4A",
  "0xf62673b36Cc5B93b44212c3D9daae2Eb8860cc1F",
  "0x497026cc1a27E0a41864B34ee871b950FCfa85b1",
  "0x499b4B436c394B6564dA90f535B2ac70697d3830",
  "0x3d7089Bee0bD2641d2748c704B7A6D17712F949B",
  "0x79D6Ae816A8e27930497c74d32C2b6660A8708D6",
  "0x0eF324f07df0292B5F562cCD5E0E7599DE2cA8ba",
  "0xb516B5C964c3074117beA4F06E754a66AD34cD9f",
  "0x62a6fe5edC535892cab6a65b23C097C3c6c5B45B",
  "0x5A2a447d6f6ebB43f14bf94D25399A8412C77bDE",
  "0xb422B9864B5Ac5068F1e47621AB722a463a30cf6",
  "0x21ba785ebA7744bC364E5C4f343761F3408ee249",
  "0x1318C46bB503d2a9F699359eB81bfE8735008978",
  "0x68a05D167832F0Be267bdc7e7B93f5c44DecA58A"
]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const tokens = {};
    const prices = await getFantomPrices();

    const vaultInfos = await Promise.all(Address.map(a => loadGrimPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of vaultInfos.filter(p => p))
    {
      printGrimContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

async function loadGrimPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, GRIM_VAULT_ABI, App.provider);
    const vault = await getFantomToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getFantomToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const ppfs = await contract.getPricePerFullShare() / 1e18;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "fantom");
    return { vault, poolPrices, userStaked, ppfs, totalSupply }
  }
  catch (err) {
    console.log(contractAddress, err);
    return null;
  }
}

async function printGrimContract(poolInfo) {
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