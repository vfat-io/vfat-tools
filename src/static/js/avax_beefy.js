
$(function() {
  consoleInit(main)
  });

const BEEFY_VAULT_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_strategy","internalType":"contract IStrategy"},{"type":"string","name":"_name","internalType":"string"},{"type":"string","name":"_symbol","internalType":"string"},{"type":"uint256","name":"_approvalDelay","internalType":"uint256"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"NewStratCandidate","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UpgradeStrat","inputs":[{"type":"address","name":"implementation","internalType":"address","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"approvalDelay","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getPricePerFullShare","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseTokensGetStuck","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"proposeStrat","inputs":[{"type":"address","name":"_implementation","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"implementation","internalType":"address"},{"type":"uint256","name":"proposedTime","internalType":"uint256"}],"name":"stratCandidate","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IStrategy"}],"name":"strategy","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"upgradeStrat","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"want","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}]
const BEEFY_STRATEGY_ABI = [{"inputs":[{"internalType":"address","name":"_lpPair","type":"address"},{"internalType":"uint8","name":"_poolId","type":"uint8"},{"internalType":"address","name":"_vault","type":"address"},{"internalType":"address","name":"_unirouter","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"harvester","type":"address"}],"name":"StratHarvest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"CALL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"HYPER_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_FEE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAWAL_MAX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alloy","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp0Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToLp1Route","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alloyToWbnbRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfLpPair","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceOfPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"hypercity","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hyperdao","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hypr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lpToken1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"panic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolId","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"retireStrat","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unirouter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"vault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wbnb","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wbnbToHyprRoute","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0xCeefB07Ad37ff165A0b03DC7C808fD2E2fC77683",
    "0xe1a8EeA58D63Ea64d00365531D266C2AD1f62FC4",
    "0x87267285Bd7990B05950703f7bA6b24dF88aa302",
    "0xD78d5464690544F5D838dAEF0D7650fA03c64598",
    "0x2c0E2Ec5C2C84346497cc82F5afF72f8A29dA835",
    "0x1B156C5c75E9dF4CAAb2a5cc5999aC58ff4F9090",
    "0xB6aE1f6Be8575a44D22af3cD2C5385CC9c293978",
    "0xbaCeC852971EB461DA6Ad8F5C2e37694dca56002",
    "0xEd7208d44f5cC209DE534461a5D5b3cf60fDdeE5",
    "0xcd1f50DFfbC44F5eeFBA2ae6a19dE8196B51427a",
    "0xD437ba91922f7e0066C780cC17f175708Fd7b736",
    "0x37a51D57958386E52f6d7D7d08ACb381abDA9157",
    "0x5508222678C5337e76D93A3005dC008056715655",
    "0x440F1249349B185748C9aA8dAB26F067A515A68F",
    "0x6330c1eC0449c721F0DB17980344Abd6dC071Dfb",
    "0x35A338091c2077f33BED09717EB31BA0f02Efb2f",
    "0x6537015Ea91516FdA74deB5E361d1FB4482D9525",
    "0x83E05C8a4AdEfA875ABe0f30a18bb6F9b54b807e",
    "0xDf306fBdA58527729A8D5185aB8fEF96BFa94c7A",
    "0x6399A5E96CD627404b203Ea80517C3F8F9F78Fe6",
    "0x9b03eF3896edea1cC1Ee19b8Fed35cA82843Aed4",
    "0x0421AE152e3967361a54396486C970257c14E096",
    "0x9B02209a331c072637C6eBd34cdCD6b6A16987a9",
    "0x9829E51f6C1292563892dC65A4270b94E09B30C0",
    "0x180A73F4e0a84E4343019529429344cBEC21d946",
    "0x72A6F8E2510B9332Eaf744FEb1F7c19E3aCB2201",
    "0x4E685C0d068cb0af88Ff662B89951Ad5B3727387",
    "0x2D48D94ABfaD5a95b5fCA0fAB9cD37dd722C84A4",
    "0xD8E92bcBf66a675b2Ac45f0BBbb0F285ba607AB7",
    "0x405e20D81E659382e2bcaE6D6Cb6581203Fcd95D",
    "0xb2f030af9B6000912e13764018A8121751D86BE8",
    "0x84Cb5FF7f5068AC02a7B0fd4772577c670A5aFC6",
    "0xe6f6466E1cA56ab02eBb909C8228eD76534686D7",
    "0xA413a9a99F2681c89369Fe1e5F91d209C8bc7d53",
    "0x682d9fB30cfe4Ced14a307F57AAbE9B27E05CC56",
    "0x808D5f0A62336917Da14fA9A10E9575B1040f71c",
    "0xFeA7976733f47557860f4483f2147a3e99C76b58",
    "0x42ab5A790E99dF1b5d46f1C5C3e61d0Cd63D1f6E",
    "0x258e9884c111E2e3e0273372521982bd57ef29Bd",
    "0xd2D0Cf1675961357AfC934856421D2C5ffd87b1e",
    "0x374DC1BaF7a05e2D47f8D169FB9c8c862A9082CA",
    "0xc7024B02a3C3893C482F5DD03193CFD1DBEC604f",
    "0xCefB5D22477394222F5C683E917Aa7c65847262C",
    "0x57c7128A8FbA6425F380AF712EFDCD7688acE332",
    "0x5526851c271d8B59F6412e3244A7A6db3A13808f",
    "0x2ebAF60a6d6AE9ffe2C418470dF0D2444b996AE9",
    "0x40324434a0b53dd1ED167Ba30dcB6B4bd7a9536d",
    "0xa803058482F2681f347BB0da6f31F2DF94d72DEA",
    "0x0D48E4E02eA44003b44360B9045F5A562890B1c6",
    "0x99EeB92A4896a9F45E9390e2A05ceE5647BA0f95",
    "0x6cBaEBC1333E72206FC326e810972D28f8250485",
    "0x39F94cb5d9239858Ba8eeBD1174b8B13e34b240B",
    "0xE06575Cfd4a631e8C0Cd9FBDd8d77AB04CFfA52C",
    "0x5dd766E859c4BB01eaBCaFc320dED1A5E8e4a147",
    "0x714A52Cdee18cD074BaA87F1f9631B13d302E516",
    "0x275eF36E6097c68bE8765c238100BF061B38A922",
    "0xfda2E1E9BE74F60738e935b06A5d9C32143B18D5",
    "0x7E47541114db3addD074EB5aAD3A2318671FD91D",
    "0x4C25854f6DA3b5848F7B5C71dcb8EEe20b292d3E",
    "0xEbdf71f56BB3ae1D145a4121d0DDCa5ABEA7a946",
    "0x87c4F0BB71C4Bb92809F33dBd807614475eA8a5a",
    "0x44eA6e68C2F52353AE4eFF315360Fd3C29FfE098",
    "0x4112D114658c8B9a7598E4b588f75e80B2d9b1F4",
    "0xfe27D61F8386370d6CfA63EA06470ED55F6DBFe7",
    "0xb1e29194d90d67b8d1c4104FDf6DaF0F7d3344D5",
    "0x79A44dc13e5863Cf4AB36ab13e038A5F16861Abc",
    "0x41e6612044AeDDeB19102304775cA39c204Ad030",
    "0x936d1f2ECF2C911Efba16BCBB9F205184d827986",
    "0x865628e18e99Ab563405E1F329024C50f7093318",
    "0xAf9f33df60CA764307B17E62dde86e9F7090426c",
    "0xD795d70ec3C7b990ffED7a725a18Be5A9579c3b9",
    "0xb6767518b205ea8B312d2EF4d992A2a08C2f2416",
    "0xDc5e537764F5Ad0f51Bf52CCF0767083bb4565EC",
    "0xD0e4b0B711A5296a8D72EB8B2a9Cb0F3f7A4211d",
    "0x6944E87349dA351b441c4CFa4B7B749AD2DD2c81",
    "0x282B11E65f0B49363D4505F91c7A44fBEe6bCc0b",
    "0xea75ff4F580418A1430Bd3EBaF26B03C096D9489",
    "0xaF5D5a21E6d53b96daf37EC9fC9360c5b6B4AeBE",
    "0xe419f17821F10Ce741F67232406F6a8585d52005",
    "0xA4D0b2100107479dd637526F9296D34D8CBdde13",
    "0x0D6f7D5Bf8406FAaa1eeB66756f684dBc6790350",
    "0x2b7066770EF90eb7faCFB6cbe6A975C91FA13151",
    "0xE37CeD3b5FBeDb523a48eB4eA3c3e13b2092352a",
    "0x95D11A45B0B55F96D75f70d63EBf95a824cD836D",
    "0xc1e960785292E68a027FC88042e3ec1A5A064B3C",
    "0x7cB719CD18E171c3db4607536804f34A01AE506F",
    "0x3E25CcCD4aC11d4F417b992285188714E80BAE8C",
    "0xdAfD1803956c0eb7D85d475eb10D69Baa207C72d",
    "0x4502e2F6802D48578f76920e5D56557459C04B7D",
    "0x670AF270FeE3BbC89e32DDd7B8ec43663A910793",
    "0xaa5a5AD8a27fEd7F791952705ce90134eac620dc",
    "0x3D81A269E05e6057e4dF9E2D76E254E65a65Eb66",
    "0xD0B0B19f2DC29a17175A2afc47b29C6DDd74d3D4",
    "0xb387376366C479Ac1d97833c10cFe738CC786dd1",
    "0x1CA786F754D339797BBecE959799fBA063C22F44",
    "0x9b50B06B81f033ca86D70F0a44F30BD7E0155737",
    "0x3f5E367AC9Fb78A21Dc83d96dc1477eDE1F6219D",
    "0xf32E23EB10350e381aA8b775d381e27C50a9195f",
    "0x68866acc5C940938B373F55F7009f824c7662F5B",
    "0x8EdD09d683bD30baCB0EF6040160997Afe7d36c0",
    "0xdD63306A9792Ecbd1cd6baED3f1b18BEA638aaCe",
    "0x71d57De132b3a090BFF5027A1e88947Bed1a32ba",
    "0x8eb23a3010795574eE3DD101843dC90bD63b5099",
    "0xabd4a1aDaC20ff42d9946EF5ec5FbF822Ccd5B74",
    "0x2913966e88490B5a65D67298801c0c51f377BB9C",
    "0xB297EC6eb512d646f558F6514e85aa59cD583a1F",
    "0x052B006A2CfB2523042b3041f15adC7fa5356312",
    "0x48cc86214C58d7EaA78C100156c55DD45A676Ed1",
    "0xd9fe7Ff89C5303E439a14a5155F7F48E34F28518",
    "0xC556387AEA8B0E55f672edf15FEc3acbcF45dC17",
    "0x97e860CE03ae3da20Ba9740b8dA90036EE891f81",
    "0xa66DfCBdAfbe4B4D62535f64f1C2Fb50FF42E4C6",
    "0x97102bAdf07DA7af61594b686fe311d06930B76e",
    "0x2bAe08Cf46867b6c29d6bcA000Dc43dFCCAc73E3",
    "0xc98fF20bB8cd7C68C483c7C66f36e3F69ad81B47",
    "0xC24c73C256d527726a7a012e1360c78d0cc02eEA",
    "0xBBBe0fA93c8ced0614351bAF74979aB1243cF9c8",
    "0x0E97d2E7DdD8708b99C7dd57C68B490B511b12Da",
    "0xEbAE4810Fd13605957e7D90bd49d2fD8F8148923",
    "0xc44d493B6219A7f5C286724b74c158CEBd7fB6f7",
    "0x994aB71F95A8de4dAaF6DE3D9862284693fB2bDf",
    "0x9Bb9B11917e7bC3528B6048E9B01cD5E302bb27B",
    "0xBdA8bC79705BC60226adCA2766e94Eb5512949a3",
    "0x0a350c62f4b8C7dA93fBca469e53a182b5BBD044",
    "0x0c89Ca08b6831e6b81f9f969F37A966a2C44d3d1",
    "0x7076a33b6525132fF77F0FeE2daB2a1e79688DA0",
    "0x114c5f7f42fB75b7960aa3e4c327f53288360F58",
    "0xA43d8f6Db69610C8260B953658553cabF01D77c6",
    "0x3094Ab4Af54f5208B867125B5CCeCc94Bc17cbB6",
    "0xd5ab3Fac6200B0D8e8d76daED62793026118A78c",
    "0x6571052b2FB67DF6DD003ED6ed371098A030Eb0d",
    "0x17657955D954bD7F7315C388D7099af7B0b851FA",
    "0x044e87f30bd9bD961c04028aC69155493E1b9eD0",
    "0xDA875A511860f2752B891677489d08CaEDac00EA",
    "0x7a670e849DB824364d1031DEAfB4cD603144F23D",
    "0x71b5852857b85D5096d4288AD6d293F217d8e162"
  ]
  
async function main() {
    const App = await init_ethers();
  
    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    _print(`This may take up to 5 minutes...\n`);
  
    const prices = await getAvaxPrices();
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
      const vault = await getAvaxToken(App, contractAddress, App.YOUR_ADDRESS);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getAvaxToken(App, address, contractAddress);
      }
      const totalSupply = await contract.totalSupply() / 1e18;
      const ppfs = await contract.getPricePerFullShare() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "avax");
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
