
$(function() {
  consoleInit(main)
  });

const KOGE_VAULT_ABI = [{"inputs":[{"internalType":"contract IStrategy","name":"_strategy","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getLastTimeRestaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"getLastTimeStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"keepMax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const KOGE_STRATEGY_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"jar","type":"address"}],"name":"SetJar","type":"event"},{"inputs":[],"name":"Iron_MASTER_CHEF","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Want_Token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfWant","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentRouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getHarvestable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvestCutoff","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvestedToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"iron","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"jar","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keepFXS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"keepFXSmax","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiHarvest","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pairName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewards","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"salvage","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_jar","type":"address"}],"name":"setJar","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"NewFee","type":"uint256"}],"name":"set_fee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newCutoff","type":"uint256"}],"name":"set_harvestCutoff","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newHarvest","type":"address"}],"name":"set_multiHarvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"titan","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlyingPoolId","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"usdc","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"usdc_titan_path","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"want","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weth","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0x992Ae1912CE6b608E0c0d2BF66259ab1aE62A657",
    "0x92F42e22D812C0C8ADFC30190faC42919032E19B",
    "0xE4a966c8225BA2A5dd7B4861AB5fe3570E002629",
    "0x1e5F7C5A8c2D3a071573Cc8101288D413cBDDc80",
    "0xA2C2473ccE81aF668f25C8d798f7A1C0F9172Cb9",
    "0xc78e2EBbdB1d45A9d0e1C35EFe2a477781387DcE",
    "0x7F9bcE09fa5Dd6885142b34cAC9AfE4c142021Ff",
    "0xaE48aCc701151061A5bfff8e4c3f0DCfe4A957E9",
    "0x4a93D6b394Da4c1e6e436e9370E5DF08A45377a8",
    "0x7a54BeCc6e4898249F4B4573Ea904F75Cbb17e2F",
    "0x69aAF33Cd4bd6Cbd3Ef275f8Ddc3342e0365F083",
    "0x7B612e2A58F31Eb482812D1F3529e001655e6EB9",
    "0x55D51F0C3215085e45BA7041d32Fc8d4890570fE",
    "0x95a56528Dcf6e8eC4c020Af18f869eA77b76E265",
    "0x5C3533B44d7c3e804C428A57C426577CA899A311",
    "0x531222F9399fa37AFfeBE759174423C962620E66",
    "0xc67DEEA5195a55FB19876AB3cB31F6d44a771946",
    "0xD3dAdEAF5355Ca23150b037b2229Fd16A37004ae",
    "0x9A547d7c5359cd19C95A0c88C0967B715Cd19601",
    "0xF58B6E2A1187f3a4cf6494E75f047D268ee80dcA",
    "0xEA2A839abE3dd0fc8830B28706dF8d81FF3201eD",
    "0xCc5579577AD2F499F2d3583FCb4aFD765510A33B",
    "0xB364963Fd56D8A49a896E8c7BBB666b3159396fD",
    "0xb7b5641442C1762586AA03Fdc4Fa4200CB57D4e5",
    "0xb7D3e1C5cb26D088d619525c6fD5D8DDC1B543d1",
    "0x2425b13B711c82E694237F852c3b1A3E50930c7C",
    "0x4113Ea72bbD03AcDBBf5cFF9967849daF32b019a",
    "0xf0De7A732035f855eE90B354D306aB1246F585Fd",
    "0x3c928f0eE37bafeB6e90D835e7000ef533A09472",
    "0xb33576835cC51EF8D71ccB861775B2821470bb71",
    "0xe5B7402d8Ccae02D3BaA65140a50B26f876cec8b",
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
    "0xa67153C4b30f24F60286C664547aeE010AE87F1D",
    "0x7F75a9924066Fff7c97B150cB5119D5F9C8FD0E4",
    "0xcB57482aF988A2A00F14fa796920c50C4eb932A1",
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
    "0x3fae5e941B7eb3A7BeE94399bF669224efa9432C",
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
