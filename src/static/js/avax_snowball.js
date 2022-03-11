
$(function() {
  consoleInit(main)
  });

const SNOWBALL_VAULT_TOKEN_ABI = [{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_governance","type":"address"},{"internalType":"address","name":"_timelock","type":"address"},{"internalType":"address","name":"_controller","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controller","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"depositAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"earn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"reserve","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"max","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"min","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_controller","type":"address"}],"name":"setController","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_min","type":"uint256"}],"name":"setMin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_timelock","type":"address"}],"name":"setTimelock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timelock","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_shares","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawAll","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const Address = [
    "0x8665e1FAD19D14b16Eecb96A7608cD42962E7eEB",
    "0xECce05f99cc3D9252eb22699c4fa4B0268B33353",
    "0x1022baD88471d7e7d59893A86E4e2fc49F441981",
    "0x4C7887F2C555ba214582D7935ed60D004816BB0C",
    "0x3a3a0570f66cD5DfacB3c72b5214fec88e5722a8",
    "0x26CBeA666139daAde08A5E6E8bc3bB7245c6b5dd",
    "0xEBeCc1f55963F52649B71BCeCA663d2A03028f76",
    "0xa9ebe7B640F65077c16803Ff1275D790796038a0",
    "0xc33b19c3d166CcD844aeDC475A989F5C0FC79E43",
    "0x702999Be42a3F5B47c7B983BF445B1607b846630",
    "0x70807713924697Cc5A4a252aCeaeD921365bbf29",
    "0xE61E5291ba241027b10064ac0c99411aa51DAC52",
    "0x13a531D4eF7eBa06985751569Af8B1EC3Bfc0078",
    "0x42a8Bcb58e8507c8987Ca59374DaF5aeF4974BFB",
    "0x3F1Ba471A9945cD97F519225b578223D75C5155f",
    "0x4943489a97ac7228efFb3D6b06C6A106A1BA9E60",
    "0xd12661461b09C5f440191d90FcA907769453Cdf0",
    "0xe6d20Fc3fC82c8526994d9923b2BbbDd69B227D6",
    "0x8DBDC64d691f44d538338D18403c6fB12972696a",
    "0xcC757081C972D0326de42875E0DA2c54af523622",
    "0xf6E8432EF7d85Ae1202Dc537106D3696eBB27769",
    "0xfAa4f21A8Ef346370d00F1a7693FdC5D87C3e12a",
    "0x5b227c2D55f5FDD084a86B8EF0C8BF1EaBa8b8d3",
    "0x8b382e9badB63CeaB38C7D4Cc649E9983bDd6d34",
    "0xf561EAE92039ab1540a75FDFD50ce8C6800bC078",
    "0x8C0A2Cd047d2da517Dc51B189EDfbdC150ee832d",
    "0x0377c3e6072bEa5cb34a19adce67394373AeD04B",
    "0x9937dD4aaaCfD77BD34a88f9282fAe36fAE364f9",
    "0x8C4185D7303c7865a45B46d705F40a8FAAd43Add",
    "0x2ca2F78D38D05489C95f4499E6abB669b5E42546",
    "0xf25f6f5dad18a16033d05c1f2F558119665fDEF4",
    "0xc72901E3dBE5258728B329352fC4742f4966Bc1f",
    "0xAD53e02601eca3ebD828646A80539868543c1747",
    "0x5c52587bD441A6e6916D2C2d32A84735b9Ee4ccD",
    "0xe13E1a491eDc640b0591D70390897620f31bbF6E",
    "0x0B2C4f6C54182EDeE30DFF69Be972f9E04888321",
    "0xDe9f979fEdf595FcfD1D09c85d194C700678cC83",
    "0xA562f95dB32A0D72e0692f731BBfb9E20648870B",
    "0xAFB27fB1c5bd91A80d18A321D6dC09aDd6a94219",
    "0x5586630339C015dF34EAB3Ae0343D37BE89671f9",
    "0x6C6B562100663b4179C95E5B199576f2E16b150e",
    "0x8C9fAEBD41c68B801d628902EDad43D88e4dD0a6",
    "0xc7Ca863275b2D0F7a07cA6e2550504362705aA1A",
    "0x5d587f520590bb80153356271d33828bf499e9A2",
    "0xfb49ea67b84F7c1bBD825de7febd2C836BC4B47E",
    "0x49e6A1255DEfE0B194a67199e78aD5AA5D7cb092",
    "0x8cC91bA89A32AC17b0959C6264EF8e86e6f2D0c0",
    "0xeEc0b6B6Af1a5Ec3571Ca5E219511bbd630F0477",
    "0x44F8c64856ea948D502DBEE084d3D6293fA291c8",
    "0x3eDF51FCcB9C578386de2f964b5C9A6E6e76f240",
    "0x39BF214A93EC72e42bC0B9b8C07BE1af6Fe169dA",
    "0xaA80f9CC2121c690C8De19990a0D3242cb59cffe",
    "0x4aB4944Bf4D376b9914Ae4b81E7C31Ff88d633b8",
    "0xa8ab5Ad340A3A728C835f93190357088C8aD5225",
    "0x56A6e103D860FBb991eF1Afd24250562a292b2a5",
    "0x54c89888fC1809Baf15413B5fFA99ACb0b8AFB30",
    "0x31412dF24798A8c635bE55c5c100a24da9bA192d",
    "0xf4a591BeaC3A4D864C3293477bBD3f86880ADa16",
    "0xa68D5438B7AA4E31cEEf616469dfbE26bEBBA703",
    "0x3018Eeb374a1a48338836BD3e693A554E739291B",
    "0x8a9d06976073715461D66d595523a06C7B5c5313",
    "0x2a1D2D2Fdb76AB3baB6ba424612dDAFc5750de59",
    "0x678C00250f9BA6F86857D72B1f31F42984bB6926",
    "0x7F00E024cA3C514a1c9228f89F96dB0dcb6cE04F",
    "0x98C64DE8118eF067Fe8e3756d77FF134270A94Ad",
    "0x17FD2418bcae447Ab383a437e4991F5536646681",
    "0x08D5Cfaf58a10D306937aAa8B0d2eb40466f7461",
    "0x9ce2631A9E7075C86F750746AeB385f51287a052",
    "0x3cc6F418cf646e11D783A97415195865014fC628",
    "0xA96f7AfD4651319Be90bbA35175FBCBd6758e79f",
    "0x09d5f6DC51485985ef248d9Ea796B349134595fc",
    "0x0Ca13F6cfd20eF14e140e7E8D69D04Bc60B77EfC",
    "0x4672520158F7c20e2CCFcdCE756910C062D77F19",
    "0x5fb4d08bCBD444fDD5a0545fdB0C86783D186382",
    "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815",
    "0xeEc21abC6daD38A8515a7C3388E5ef962Cd960e6",
    "0x026402B96A3EBDeaE03B70E4C197D70a8f33B295",
    "0x51D914129E4EAf1BFA34e0194CE36F9C46112a65",
    "0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7",
    "0xe90A5cEdABe829B5dCf596b326ef03e74ae60faB",
    "0x2b48ff2cA4374562CDEea82534519076105663F2",
    "0x445182E6FCb4c41fC5eaC224929A0514F9FE0178",
    "0xd63359ff51BF1217730ae2C37979242B1a3f7c53",
    "0x7CC8068AB5FC2D8c843C4b1A6572a1d1E742D7c8",
    "0xd5fbe71Bf4989e2aB72dF6C78F69f87bE46dADc6",
    "0x04A3B139fcD004b2A4f957135a3f387124982133",
    "0xfEC005280ec0870A5dB1924588aE532743CEb90F",
    "0x6AB8DAC517c244f53D86a155a14064E86c2dE653",
    "0x1BF90bdeb965a76Af56024EF3e70439DEa89bF3f",
    "0xD7601D15ce8D207Ef01f2e45c6e24Fc5A34c393f",
    "0x2Fb9D91530b032079a142D7B3c4c6770c85F646b",
    "0x476B7729e57Da8a3f48d37c4A36626201F7A3D35",
    "0x5e50be947a629a7bE56b143A1271651B832B0Ad6",
    "0x4c073D1F04EC6208f79C097c239153d3797711D9",
    "0x39259A07C7B21189BF1bC2Bd75967565b3C1F16e",
    "0x162Ed770E1Fb50aA5EA98Bb1bde4c7f7e3063269",
    "0x44b4C308421Df7B8Dfb28a01274788e9279EF06F",
    "0x0676cD100D229B60b0F89f990380Af75883376DF",
    "0xA22D8FD15FB36aA9e1Db795A78db8b688F6284F6",
    "0x7b2525A502800E496D2e656e5b1188723e547012",
    "0x32d9D114A2F5aC4ce777463e661BFA28C8fE9Eb7",
    "0x124F5991e1EAD696D3082139154dB787E52f4C87",
    "0xa8981Eab82d0a471b37F7d87A221C92aE60c0E00",
    "0xE9d842C46e3bE5Ab68b226d9329515a85DF7cEE2",
    "0xaCF2814cF22fCB08b3dDA331221A52ad7B05639B",
    "0x8FA104f65BDfddEcA211867b77e83949Fc9d8b44",
    "0x37d4b7B04ccfC14d3D660EDca1637417f5cA37f3",
    "0xE4543C234D4b0aD6d29317cFE5fEeCAF398f5649",
    "0x0c33d6076F0Dce93db6e6103E98Ad951A0F33917",
    "0x567350328dB688d49284e79F7DBfad2AAd094B7A",
    "0x951f6c751A9bC5A75a4E4d43be205aADa709D3B8",
    "0xcB707aA965aEB9cB03d21dFADf496e6581Cd7b96",
    "0x72b7AddaeFE3e4b6452CFAEcf7C0d11e5EBD05a0",
    "0xb4281C75bab70734CDe886A9f6624385e88429CC",
    "0xce589add607A2e541EEa8eEFB3544e3B0Ba2dFf9",
    "0x35c21956ca9876f98059C12F81E31425bB30b53D",
    "0xB164cA68a881cb7cabaE22fcd2AC02008561d40F",
    "0x593e089a899Fe398a5C9f2799Dd31F1bDA4Cb64e",
    "0xf332d93A556A556a785AC0B010791918d7b8E927",
    "0x54FfFEedA53a49F0fe59A89E8Cc44d4D80FC4eC4",
    "0x6D1be2cdE72ABc0a0A02B723c1ef880fa61eBCd3",
  ]

async function main() {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}\n`);
    _print("Reading smart contracts...\n");

    const prices = await getAvaxPrices();
    const tokens = {};
    const poolInfos = await Promise.all(Address.map(a => loadSnowballPoolInfo(App, tokens, prices, a)));
    let tvl = 0, userTvl = 0
    for(const p of poolInfos.filter(p => p))
    {
      printSnowballContract(p);
      if (!isNaN(p.poolPrices.tvl)) tvl += p.poolPrices.tvl;
      if (!isNaN(p.userStaked * p.poolPrices.price)) userTvl += p.userStaked * p.poolPrices.price;
    }
    _print_bold(`\nTotal Value Locked: $${formatMoney(tvl)}`);
    if (userTvl > 0) {
      _print_bold(`You are staking a total of $${formatMoney(userTvl)}`);
    }

    hideLoading();
  }

  async function loadSnowballPoolInfo(App, tokens, prices, contractAddress) {
    try {
      const contract = await new ethers.Contract(contractAddress, SNOWBALL_VAULT_TOKEN_ABI, App.provider);
      const vault = await getAvaxToken(App, contractAddress, contractAddress);
      var newTokenAddresses = vault.tokens.filter(x => !getParameterCaseInsensitive(tokens, x));
      for (const address of newTokenAddresses) {
          tokens[address] = await getAvaxToken(App, address, contractAddress);
      }
      const balance = await contract.balance() / 1e18;
      const totalSupply = await contract.totalSupply() / 1e18;
      const ppfs = await contract.getRatio() / 1e18;
      const userStaked = await contract.balanceOf(App.YOUR_ADDRESS) / 1e18;
      const poolPrices = getPoolPrices(tokens, prices, vault, "avax");
      return { vault, poolPrices, userStaked, ppfs, totalSupply }
    }
    catch (err) {
      console.log(contractAddress, err);
      return null;
    }
  }

  async function printSnowballContract(poolInfo) {
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
