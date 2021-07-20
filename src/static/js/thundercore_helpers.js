
const TTSwapFactoryABI = [ { "name": "NewExchange", "inputs": [ { "type": "address", "name": "token", "indexed": true }, { "type": "address", "name": "exchange", "indexed": true } ], "anonymous": false, "type": "event" }, { "name": "initializeFactory", "outputs": [], "inputs": [{ "type": "address", "name": "template" }], "constant": false, "payable": false, "type": "function" }, { "name": "createExchange", "outputs": [{ "type": "address", "name": "out" }], "inputs": [{ "type": "address", "name": "token" }], "constant": false, "payable": false, "type": "function" }, { "name": "getExchange", "outputs": [{ "type": "address", "name": "out" }], "inputs": [{ "type": "address", "name": "token" }], "constant": true, "payable": false, "type": "function" }, { "name": "getToken", "outputs": [{ "type": "address", "name": "out" }], "inputs": [{ "type": "address", "name": "exchange" }], "constant": true, "payable": false, "type": "function" }, { "name": "getTokenWithId", "outputs": [{ "type": "address", "name": "out" }], "inputs": [{ "type": "uint256", "name": "token_id" }], "constant": true, "payable": false, "type": "function" }, { "name": "exchangeTemplate", "outputs": [{ "type": "address", "name": "out" }], "inputs": [], "constant": true, "payable": false, "type": "function" }, { "name": "tokenCount", "outputs": [{ "type": "uint256", "name": "out" }], "inputs": [], "constant": true, "payable": false, "type": "function" } ]

const TT_SWAP_FACTORY_ADDRESS = "0xce393b11872ee5020828e443f6ec9de58cd8b6c5"
const ether = ethers.BigNumber.from(10).pow(18)

const ttTokens = [
  { "id": "thunder-token","symbol": "TT","contract": "0x0000000000000000000000000000000000000000" },
  { "id": "usd-coin","symbol": "USDC","contract": "0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e" },
  { "id": "tether", "symbol": "USDT", "contract": "0x4f3C8E20942461e2c3Bdd8311AC57B0c222f2b82"},
  { "id":"binance-usd", "symbol": "BUSD", "contract": "0xBEB0131D95AC3F03fd15894D0aDE5DBf7451d171" },
  { "id":"ethereum", "symbol": "ETHER", "contract": "0x6576bb918709906dcbfdceae4bb1e6df7c8a1077" }
]

async function getTTPrices() {
  const idPrices = await lookUpPrices(ttTokens.map(x => x.id));
  const prices = {}
  for (const bt of ttTokens)
      if (idPrices[bt.id])
          prices[bt.contract] = idPrices[bt.id];
  return prices;
}

async function geterc20(App, token, address, stakingAddress) {
  if (address == "0x0000000000000000000000000000000000000000") {
    return {
      address,
      name : "Thunder Token",
      symbol : "TT",
      totalSupply: 1e8,
      decimals: 18,
      staked: 0,
      unstaked: 0,
      contract: null,
      tokens:[address]
    }
  }
  const decimals = await token.decimals()
  return {
      address,
      name : await token.name(),
      symbol : await token.symbol(),
      totalSupply : await token.totalSupply(),
      decimals : decimals,
      staked:  await token.balanceOf(stakingAddress) / 10 ** decimals,
      unstaked: await token.balanceOf(App.YOUR_ADDRESS)  / 10 ** decimals,
      contract: token,
      tokens : [address]
  };
}

const HOUBI_API_URL = "https://api-aws.huobi.pro/market/detail?symbol=ttusdt"

async function getTTUsdFromHuobi() {
  const res = await fetch(HOUBI_API_URL)
  const data = await res.json()
  return data.tick.close
}


const NAME = "name"
const SYMBOL = "symbol"
const DECIMALS = "decimals"
const EXCHANGE_ADDRESS = "exchangeAddress"
const WEBSITE = "website"
const BLOCK_EXPLORER = "blockExplorer"


const INITIAL_TOKENS_CONTEXT = {
  108: {
    "0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82": {
      [NAME]: "TT-USDT",
      [SYMBOL]: "TT-USDT",
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: "0x3e9ada9f40cd4b5a803cf764ece1b4dae6486204",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x4f3c8e20942461e2c3bdd8311ac57b0c222f2b82",
    },
    "0x1F489E0282cFA883A4224C91309bC4D4c062ed93": {
      [NAME]: "NICER",
      [SYMBOL]: "NICER",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x3fd0d6e5461c535fc3d4c996561763a15334aecd",
      [WEBSITE]: "https://nicer.bet/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x1F489E0282cFA883A4224C91309bC4D4c062ed93",
    },
    "0x18fB0A62f207A2a082cA60aA78F47a1af4985190": {
      [NAME]: "TT-WBTC",
      [SYMBOL]: "TT-WBTC",
      [DECIMALS]: 8,
      [EXCHANGE_ADDRESS]: "0x4d5cade82907d04f89063a27079e026f42aa16fc",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x18fB0A62f207A2a082cA60aA78F47a1af4985190",
    },
    "0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e": {
      [NAME]: "TT-USDC",
      [SYMBOL]: "TT-USDC",
      [DECIMALS]: 6,
      [EXCHANGE_ADDRESS]: "0xd8d020934f008fbd10bd2b47263eb4e751acf1a2",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x22e89898A04eaf43379BeB70bf4E38b1faf8A31e",
    },
    "0x6576Bb918709906DcbFDCeae4bB1e6df7C8a1077": {
      [NAME]: "TT-ETH",
      [SYMBOL]: "TT-ETH",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0xa91f09a91ea6c5fcb2f4953fd0383b55506e8d52",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x6576Bb918709906DcbFDCeae4bB1e6df7C8a1077",
    },
    "0xc1e7000f379f2247ae930ba98d5568cd9d0b924b": {
      [NAME]: "RISER",
      [SYMBOL]: "RISER",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x1d1018C8B2BF965F0077CA25B5D7decb7F70615D",
      [WEBSITE]: "https://riserdefi.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0xc1e7000f379f2247ae930ba98d5568cd9d0b924b",
    },
    "0xBEB0131D95AC3F03fd15894D0aDE5DBf7451d171": {
      [NAME]: "TT-BUSD",
      [SYMBOL]: "TT-BUSD",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x0646ccb4983a65b1ad6b7c34d62fe2fcfbbd8b1b",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0xBEB0131D95AC3F03fd15894D0aDE5DBf7451d171",
    },
    "0x8EF1A1E0671Aa44852f4d87105eF482470bB3e69": {
      [NAME]: "TT-BNB",
      [SYMBOL]: "TT-BNB",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x2fdc081adba636458965927c66e124f7bf0b7c9f",
      [WEBSITE]: "https://bridge.thundercore.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x8EF1A1E0671Aa44852f4d87105eF482470bB3e69",
    },
    "0x8c2eeccd83752db11594e699bbc8f756c4d03cb9": {
      [NAME]: "Punch",
      [SYMBOL]: "PUNCH",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0xbf1754ba478267e88b40a488acf78e56a7deba6e",
      [WEBSITE]: "https://game.punchlinex.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x8c2eeccd83752db11594e699bbc8f756c4d03cb9",
    },
    "0xfE146D5710015d4075355fb7bE8d133346EC63c2": {
      [NAME]: "Ram",
      [SYMBOL]: "RAM",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x28CC382df937cF3e2aA0f41686329Bb61CF10A11",
      [WEBSITE]: "https://rammer.finance/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0xfE146D5710015d4075355fb7bE8d133346EC63c2",
    },
    "0x47fe33d321EEF4719FdFf38EA72B1dFC7f0cdf10": {
      [NAME]: "Oolong",
      [SYMBOL]: "OOL",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x5179Cdc003f5d993E91b5C1989bE24b993721068",
      [WEBSITE]: "https://oolong.fi/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0x47fe33d321EEF4719FdFf38EA72B1dFC7f0cdf10",
    },
    "0xe15c1cbF2de3fd15864F48A66b9da07736dAF578": {
      [NAME]: "GuessToken",
      [SYMBOL]: "GuessToken",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x71783060cE590992ba0652dd3CDb610B93260C6C",
      [WEBSITE]: "https://ttguess-b5023.web.app/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0xe15c1cbF2de3fd15864F48A66b9da07736dAF578",
    },
    "0xFCDEa9f405bc6bd85C2e90c1DEbB9F3ca7a59D8f": {
      [NAME]: "Zippy Dice",
      [SYMBOL]: "DICEZ",
      [DECIMALS]: 18,
      [EXCHANGE_ADDRESS]: "0x1355cabc77854e123113b02964a0c39d2ea5f0c8",
      [WEBSITE]: "https://dice.zippydapps.com/",
      [BLOCK_EXPLORER]: "https://viewblock.io/thundercore/address/0xFCDEa9f405bc6bd85C2e90c1DEbB9F3ca7a59D8f",
    },
  },
}

const EXCHANGE_ABI = [
  {
    "name": "TokenPurchase",
    "inputs": [
      { "type": "address", "name": "buyer", "indexed": true },
      { "type": "uint256", "name": "eth_sold", "indexed": true },
      { "type": "uint256", "name": "tokens_bought", "indexed": true }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "EthPurchase",
    "inputs": [
      { "type": "address", "name": "buyer", "indexed": true },
      { "type": "uint256", "name": "tokens_sold", "indexed": true },
      { "type": "uint256", "name": "eth_bought", "indexed": true }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "AddLiquidity",
    "inputs": [
      { "type": "address", "name": "provider", "indexed": true },
      { "type": "uint256", "name": "eth_amount", "indexed": true },
      { "type": "uint256", "name": "token_amount", "indexed": true }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "RemoveLiquidity",
    "inputs": [
      { "type": "address", "name": "provider", "indexed": true },
      { "type": "uint256", "name": "eth_amount", "indexed": true },
      { "type": "uint256", "name": "token_amount", "indexed": true }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Transfer",
    "inputs": [
      { "type": "address", "name": "_from", "indexed": true },
      { "type": "address", "name": "_to", "indexed": true },
      { "type": "uint256", "name": "_value", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Approval",
    "inputs": [
      { "type": "address", "name": "_owner", "indexed": true },
      { "type": "address", "name": "_spender", "indexed": true },
      { "type": "uint256", "name": "_value", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "setup",
    "outputs": [],
    "inputs": [{ "type": "address", "name": "token_addr" }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 175875
  },
  {
    "name": "addLiquidity",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "min_liquidity" },
      { "type": "uint256", "name": "max_tokens" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 82605
  },
  {
    "name": "removeLiquidity",
    "outputs": [
      { "type": "uint256", "name": "out" },
      { "type": "uint256", "name": "out" }
    ],
    "inputs": [
      { "type": "uint256", "name": "amount" },
      { "type": "uint256", "name": "min_eth" },
      { "type": "uint256", "name": "min_tokens" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 116814
  },
  {
    "name": "__default__",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": true,
    "type": "function"
  },
  {
    "name": "ethToTokenSwapInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "min_tokens" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 12757
  },
  {
    "name": "ethToTokenTransferInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "min_tokens" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 12965
  },
  {
    "name": "ethToTokenSwapOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 50463
  },
  {
    "name": "ethToTokenTransferOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" }
    ],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 50671
  },
  {
    "name": "tokenToEthSwapInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_eth" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 47503
  },
  {
    "name": "tokenToEthTransferInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_eth" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 47712
  },
  {
    "name": "tokenToEthSwapOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "eth_bought" },
      { "type": "uint256", "name": "max_tokens" },
      { "type": "uint256", "name": "deadline" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 50175
  },
  {
    "name": "tokenToEthTransferOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "eth_bought" },
      { "type": "uint256", "name": "max_tokens" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 50384
  },
  {
    "name": "tokenToTokenSwapInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_tokens_bought" },
      { "type": "uint256", "name": "min_eth_bought" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "token_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 51007
  },
  {
    "name": "tokenToTokenTransferInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_tokens_bought" },
      { "type": "uint256", "name": "min_eth_bought" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" },
      { "type": "address", "name": "token_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 51098
  },
  {
    "name": "tokenToTokenSwapOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "max_tokens_sold" },
      { "type": "uint256", "name": "max_eth_sold" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "token_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 54928
  },
  {
    "name": "tokenToTokenTransferOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "max_tokens_sold" },
      { "type": "uint256", "name": "max_eth_sold" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" },
      { "type": "address", "name": "token_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 55019
  },
  {
    "name": "tokenToExchangeSwapInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_tokens_bought" },
      { "type": "uint256", "name": "min_eth_bought" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "exchange_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 49342
  },
  {
    "name": "tokenToExchangeTransferInput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_sold" },
      { "type": "uint256", "name": "min_tokens_bought" },
      { "type": "uint256", "name": "min_eth_bought" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" },
      { "type": "address", "name": "exchange_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 49532
  },
  {
    "name": "tokenToExchangeSwapOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "max_tokens_sold" },
      { "type": "uint256", "name": "max_eth_sold" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "exchange_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 53233
  },
  {
    "name": "tokenToExchangeTransferOutput",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "uint256", "name": "tokens_bought" },
      { "type": "uint256", "name": "max_tokens_sold" },
      { "type": "uint256", "name": "max_eth_sold" },
      { "type": "uint256", "name": "deadline" },
      { "type": "address", "name": "recipient" },
      { "type": "address", "name": "exchange_addr" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 53423
  },
  {
    "name": "getEthToTokenInputPrice",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "eth_sold" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 5542
  },
  {
    "name": "getEthToTokenOutputPrice",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "tokens_bought" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6872
  },
  {
    "name": "getTokenToEthInputPrice",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "tokens_sold" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 5637
  },
  {
    "name": "getTokenToEthOutputPrice",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "uint256", "name": "eth_bought" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 6897
  },
  {
    "name": "tokenAddress",
    "outputs": [{ "type": "address", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1413
  },
  {
    "name": "factoryAddress",
    "outputs": [{ "type": "address", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1443
  },
  {
    "name": "balanceOf",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [{ "type": "address", "name": "_owner" }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1645
  },
  {
    "name": "transfer",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 75034
  },
  {
    "name": "transferFrom",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "_from" },
      { "type": "address", "name": "_to" },
      { "type": "uint256", "name": "_value" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 110907
  },
  {
    "name": "approve",
    "outputs": [{ "type": "bool", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "_spender" },
      { "type": "uint256", "name": "_value" }
    ],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 38769
  },
  {
    "name": "allowance",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [
      { "type": "address", "name": "_owner" },
      { "type": "address", "name": "_spender" }
    ],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1925
  },
  {
    "name": "name",
    "outputs": [{ "type": "bytes32", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1623
  },
  {
    "name": "symbol",
    "outputs": [{ "type": "bytes32", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1653
  },
  {
    "name": "decimals",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1683
  },
  {
    "name": "totalSupply",
    "outputs": [{ "type": "uint256", "name": "out" }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1713
  }
]
