$(function() {
  consoleInit(main)
});

const Address = [
  '0xb3B7414CFD0C31747e982B5104325A57025eC78A',
  "0x15c74Dae3afd158C24759FddA8a27e644C9368eF",
  "0x7E534F582C79e5c1368185bed8faBB0343E127Ef",
  "0xb9977F7a1780feFFc0388bC5EB0C7661cd8e5185",
  "0x4f0fbA90E25995291E2e848dC1a556B3F59D83cF",
  "0x4dcEA1238Ac823Bb3018A96fC374C360A23e29cc",
  "0xfcbC7dF02448b6CE83498AEC2162Da95d105A026",
  "0x6DBF865f19cd0AACA9550bdDD3b92f4f4E239468",
  "0x75912BF4454e7f7EA21B83BD1313974b69d8C63a",
  "0x69d8EbE4A431D51ef6720b7e4aEd213615d2e614",
  "0x9CFe241015D21c3D8290a1b59205E5d0c2F7f421",
  "0x56E2492A926E419C6711e257b6be5E4491220b92",
  "0x0B3f8eFa73B40AB006b99867D9abFc76dCf699C4",
  "0x459f0Df3D59554dcd82A26C0373789D7ED3e0C53",
  "0xF7A0D4E27F1A7663A10851710f0285afEf3467F7",
  "0x1498d43FC704DEC72fD86B5f535Da65603aA466A",
  "0x28Cd1849acbE189805BBc06f2E192b81189cE3E5",
  "0x23824a5df28fdB675299fa6B34A96E6CDAE6EB2E",
  "0x07f11f5903Af3Bb24E27Af0f794Ef120726E76BB",
  "0xbF5bFFbf7D94D3B29aBE6eb20089b8a9E3D229f7",
  "0x46CE405ee945B2D2cC494c62105D8284fb04B8Ba",
  "0x6DA2Cd9D221a79769A72D78525437bb78602c57f",
  "0x048db6C50fFd46DF3bBD8332BB65c062F8D961a8",
  "0xDdddDfEb2dB092a84f27893a040b2BfedE8BE074",
  "0xAcA969fb39FF5d572a219838411F218DE96615Fb",
  "0x23576f938a7923E3f4e419831b35489Adb0494e4",
  "0x92984CE5878Ce56f65218cBC1957c99b2573Ec3B",
  "0x51132860F3c6947aeb3cB8139121F4D5Ff6AA6d4",
  "0xE40Dd09cBe02419d2Be363f55200c72bcA617404",
  "0xAB4f4a38bc4F74116259174835f67035e973B885",
  "0xDd1C67481A12C8314aA834D6c96A6530ccfb9dA9",
  "0x19D579dfA6a41C9215f1a55B810D59F254F6A8fC",
  "0xFf40Eb068d35bB24f1e43CDB38fd342e2aA58af7",
  "0x32e4F703d6eB770f4e1fD8AbC4daE35f1a420291",
  "0x5f02327Fc088f8Db5fa8F5A9992Aebdc33450d1F",
  "0xf8571832675F27a26E7d152394fC07246Bd33b91",
  "0xbb0841e1b782E001aF08cDD5097A7a09162B9ec6",
  "0xe84BC4114f38D7259D04cE53DF8aaA784dd6680d",
  "0x0f12DC66F750d95fe7612dC757D7f352521bB61D",
  "0x117A18E4f7514Ba89e5a1BDF92E2202EdAeD90E1",
  "0x19d6C1acd4DdA69b54BBe5dA8c45D8261A0E47FB",
  "0x11303d1552C95f96CaD65A3c0797f20d043e1AB5",
  "0xE8917E088FFaF180b061f6EAAc061bcf20f0Ab70",
  "0x87099fDE786144b554Af66Fb8cbE3130c8cb6470",
  "0x1933133cFab7Fd8908E776e63095aC58c0fAEaE3",
  "0xb9D554fee84Fa97fEee3525a162602860aE554c5",
  "0x211654525dC64A7f74F6361D6F3Dc0710108ae43",
  "0x9EE89F3a3Dfd596bb6F53696E2ed1D09C738f8c8",
  "0x1B53500677cB1B042b12081a8661a6f08781D58c",
  "0x142b4e2c9234aFC3dC07e12d24493a4Ef26c537C",
  "0x3ca2cfd8E17C40ac6F4Aa6c1A4b1723F0Bf59dD8",
  "0xb940DA8b71791c1F42cc612d1af427878ec1A369",
  "0xFbDc6e63CF250E2843ffAef75717993b3D7CA89E",
  "0x150f6526De9b55E126870A118D47DC4Fd0F8Ac48",
  "0x4d94796EEe7694E5c60cd850eF47D9E536D3Ad8b",
  "0xCFD132761c41f66A188A478a282121b0Fb6d99bF",
  "0x3E63F20Cdd82A9Fec2Bbe48ca820589AFCb85194",
  "0x0280988155EdB58210Fe30be5d429C0f1B91BcE6",
  "0xD3F113CFC44A5E28a6683A2D0424d3ea6CCc2aC0",
  "0x68E7DD061b068eA476E979215e3C08a235BD0CeE",
  "0x38056B8AD79256cECf7a2Ab6103A9c00AbE61214",
  "0x14d35e27D1381C73AA748f39eCa82c6E6f759392",
  "0x4647247005A15594D16a226867812F509C4557ED",
  //"0x8B414448de8B609e96bd63Dcf2A8aDbd5ddf7fdd",
  "0x67F8190A37aA1F3516713F849bdF3B7b9E3dF3a0",
  "0xa13ADB03619835E6e59ED0eD440bE765017D8715",
  "0x8a39f38b783857fd128A8bC3354f981160D750A7",
  "0xB6Bf27B1b3E0ce30A91533F2Fc251aFbda53E187",
  "0xFB503e8CC1657aDEb1A7ed40A0D7aE77ECeCaAfd",
  "0x7873238A924C6f00bE150b8CfDc3C233a8D5758B",
  "0x73d835325637FAF11Ae1838428510D9566E1a465",
  "0x942B94A79fBe8Ae12594ee4510619B5209D4a6D4",
  "0x2eC16d231f4001153dD84Da477455D0BcB7d5c71",
  "0x1fEb96Ef9B166859280B6992d4d6c4cdC5b694f6",
  "0x816D5441C47d6d8fa62b28b6CB32aE7e72fB0E7a",
  "0x81514F9533753137E9F8842fe4BDefFFa3E3Dced",
  "0x316AD32f61eb06d537D1b545C5d4c5c2168Baf6a",
  "0x99D6aCaCA55ffcA5fE47755D17865d394E59c891",
  "0x8DbDD4A46ABE939a98b5876702bFF56EA4Cd33Ad",
  "0xb7e864cB98896b8E348d31Bda03C3524dc709041",
  "0x7d2dA0917500AFb3df94a09e24a34790A386B208",
  "0x3129FB69d734AeBeeeF7E40D33b5093f4284767c",
  "0x7257F259c17226C5B09048308403757a6680f2C1",
  "0xA1801f4FFD40b192A13A54614E66d3625d5C422e",
  "0x481480FCEECA146743D75bFDa581946efBc74261",
  "0xc8410344FDa4F4A348492a19b099B389494ED668",
  "0x755c78D3bC25e297e8E010A2D1FCf49Cc43ADa21",
  "0x5bD57DFC6Bc4FC322da4a4A4dA9a0a05482644C2",
  "0x4084F32A91F4D8636Ca08386EFE70c6E302F1d84",
  "0x698bceeE246934FbFFDbe222CC4444Ae7585C3cb",
  "0x8dc3cf91D0118121b5F152556E8E33804c1Ae1CD",
  "0x7D2d076000611E44740d636843384412399e31b9",
  "0x9669Fe1ea0d8883661289461b90a10B71Ae400Ee",
]

async function main() {
  const App = await init_ethers();

  _print(`Initialized ${App.YOUR_ADDRESS}\n`);
  _print("Reading smart contracts...\n");

  const prices = await getAvaxPrices();
  const tokens = {};
  const poolInfos = await Promise.all(Address.map(a => loadYieldyakPoolInfo(App, tokens, prices, a)));
  let tvl = 0, userTvl = 0
  for(const p of poolInfos.filter(p => p))
  {
    printYieldyakContract(p);
    if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
    if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
  }
  _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
  if (userTvl > 0) {
    _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
  }

  hideLoading();
}

async function loadYieldyakPoolInfo(App, tokens, prices, contractAddress) {
  try {
    const contract = await new ethers.Contract(contractAddress, ARBIS_VAULT_UNDERLYING_ABI, App.provider);
    const vault = await getAvaxToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getAvaxToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const totalDeposits = await contract.totalDeposits() / 1e18;
    const ppfs = totalDeposits / totalSupply;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "avax");
    return { vault, poolPrices, userStaked, ppfs, totalSupply, totalDeposits }
  }
  catch (err) {
    const contract = await new ethers.Contract(contractAddress, ARBIS_VAULT_UNDERLYING_ABI2, App.provider);
    const vault = await getAvaxToken(App, contractAddress, App.YOUR_ADDRESS);
    var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
    for (const address of newTokenAddresses) {
      tokens[address] = await getAvaxToken(App, address, contractAddress);
    }
    const totalSupply = await contract.totalSupply() / 1e18;
    const totalDeposits = await contract.totalDeposits() / 1e18;
    const ppfs = totalDeposits / totalSupply;
    const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const poolPrices = getPoolPrices(tokens, prices, vault, "avax");
    return { vault, poolPrices, userStaked, ppfs, totalSupply, totalDeposits }
  }
}

async function printYieldyakContract(poolInfo) {
  const poolPrices = poolInfo.poolPrices;
  _print(`${poolPrices.name} Price: $${formatMoney(poolPrices.price)} TVL: $${formatMoney(poolPrices.tvl)}`);
  var userStakedUsd = poolInfo.userStaked * poolPrices.price;
  var userStakedPct = userStakedUsd / poolPrices.tvl * 100;
  let underlyingDepositTokensUSD = poolInfo.totalDeposits * poolPrices.price;
  _print(`Total Staked: ${poolInfo.totalSupply.toFixed(4)} ${poolInfo.vault.name} (${poolInfo.totalDeposits.toFixed(4)} ${poolPrices.name}), $${formatMoney(underlyingDepositTokensUSD)}`);
  _print(`You are staking ${poolInfo.userStaked.toFixed(4)} ${poolPrices.name} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  if (poolInfo.userStaked > 0) {
    _print(`Your stake comprises of ${poolInfo.userStaked * poolInfo.ppfs} ${poolInfo.vault.token.symbol}.`)
  }
  _print("");
}