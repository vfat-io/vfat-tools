$(function() {
  main().catch(err => {
    console.error(err);
    _print(`Error: ${err && err.message ? err.message : err}`);
    hideLoading();
  });
});

// Aero chains that use the new FactoryRegistry contracts (same addresses as src/js/aero.js).
// Open the page with ?chain=<key> to scan one chain, otherwise every chain is scanned.
const AERO_CHAINS = {
  ethereum: {
    chainId: 1, name: 'Ethereum',
    registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
    rpcs: ['https://ethereum.publicnode.com', 'https://cloudflare-eth.com']
  },
  optimism: {
    chainId: 10, name: 'Optimism',
    registry: '0xb6F9705A631CC1C0E8570FFde48882C95E2Df408',
    rpcs: ['https://mainnet.optimism.io', 'https://optimism.drpc.org']
  },
  ink: {
    chainId: 57073, name: 'Ink',
    registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
    rpcs: ['https://rpc-qnd.inkonchain.com']
  },
  robinhood: {
    chainId: 4663, name: 'Robinhood Chain',
    registry: '0xdd1705e23762F4D6e44D8C31BD8Ea80c54612239',
    rpcs: ['https://rpc.mainnet.chain.robinhood.com']
  },
  base: {
    chainId: 8453, name: 'Base',
    registry: '0x7b2A2c12dC5Ea2a31455952a05031C3E4BB28F3E',
    rpcs: ['https://mainnet.base.org']
  },
  arbitrum: {
    chainId: 42161, name: 'Arbitrum',
    registry: '0x9E635b2c689fC52201DF7eF1C9FA607c2F58f666',
    rpcs: ['https://arb1.arbitrum.io/rpc']
  },
  arc: {
    chainId: 5042, name: 'Arc',
    registry: '0xCe44907DC45D3BFa3f5f6035B0e6E8B22D780A42',
    rpcs: ['https://rpc.mainnet.arc.io', 'https://rpc.blockdaemon.mainnet.arc.io', 'https://rpc.arc-scan.org', 'https://arc-mainnet.drpc.org']
  }
};

const MULTICALL3_ADDRESS = '0xcA11bde05977b3631167028862bE2a173976CA11';
const BATCH_SIZE = 200;

const REGISTRY_ABI = [
  {"inputs":[],"name":"gaugeFactories","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"factoryToGauges","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"factoryToGaugesLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"factoryToGaugesAt","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeToTarget","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"leafVoter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
];

const VOTER_ABI = [
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"gaugeStates","outputs":[{"internalType":"uint128","name":"ceiling","type":"uint128"},{"internalType":"uint128","name":"claimed","type":"uint128"},{"internalType":"uint48","name":"lastSettlement","type":"uint48"},{"internalType":"bool","name":"isRegistered","type":"bool"},{"internalType":"bool","name":"isActivated","type":"bool"},{"internalType":"uint128","name":"surplus","type":"uint128"},{"internalType":"uint256","name":"lastIndex","type":"uint256"},{"internalType":"uint256","name":"lastTimeIndex","type":"uint256"},{"components":[{"internalType":"int128","name":"bias","type":"int128"},{"internalType":"int128","name":"slope","type":"int128"},{"internalType":"uint48","name":"ts","type":"uint48"},{"internalType":"uint128","name":"permanentStakeBalance","type":"uint128"}],"internalType":"struct Point","name":"point","type":"tuple"}],"stateMutability":"view","type":"function"}
];

const POOL_ABI = [
  {"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"POOL_TYPE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
];

const TOKEN_ABI = [
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"}
];

const TOKEN_BYTES32_ABI = [
  {"inputs":[],"name":"symbol","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"}
];

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

async function main() {
  const chainParam = new URLSearchParams(window.location.search).get('chain');
  const chainKeys = chainParam
    ? chainParam.split(',').map(c => c.trim().toLowerCase()).filter(c => AERO_CHAINS[c])
    : Object.keys(AERO_CHAINS);

  if (chainKeys.length == 0) {
    _print(`Unknown chain "${chainParam}". Use one of: ${Object.keys(AERO_CHAINS).join(', ')}`);
    hideLoading();
    return;
  }

  _print("Loading aero gauges from the FactoryRegistry...\n");

  // http request to vfat-api
  const farms = await $.ajax({
    url: 'https://api.vfat.io/v4/farms',
    type: 'GET',
  });

  for (const key of chainKeys) {
    const chain = AERO_CHAINS[key];
    _print_bold(`*************** ${chain.name.toUpperCase()} (${chain.chainId}) ***************`);
    _print(``);
    try {
      await scanChain(chain, farms);
    } catch (err) {
      console.error(err);
      _print(`Failed to scan ${chain.name}: ${err && err.message ? err.message : err}`);
    }
    _print(``);
  }

  hideLoading();
}

async function getEthcallProvider(chain) {
  let lastError;
  for (const rpc of chain.rpcs) {
    try {
      const provider = new ethers.providers.StaticJsonRpcProvider(rpc, chain.chainId);
      const ethcallProvider = new ethcall.Provider();
      await ethcallProvider.init(provider);
      const multicall = { address: MULTICALL3_ADDRESS, block: 0 };
      ethcallProvider.multicall = multicall;
      ethcallProvider.multicall2 = multicall;
      ethcallProvider.multicall3 = multicall;
      // make sure the rpc answers before using it
      await ethcallProvider.tryAll([new ethcall.Contract(chain.registry, REGISTRY_ABI).leafVoter()]);
      return ethcallProvider;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('No rpc available');
}

// tryAll in batches, failed calls come back as null
async function batchCalls(ethcallProvider, calls) {
  const results = [];
  for (let i = 0; i < calls.length; i += BATCH_SIZE) {
    const res = await ethcallProvider.tryAll(calls.slice(i, i + BATCH_SIZE));
    results.push(...res);
  }
  return results;
}

const isRealAddress = a => a && a.toLowerCase() != ZERO_ADDRESS;

async function scanChain(chain, farms) {
  const ethcallProvider = await getEthcallProvider(chain);
  const REGISTRY_CONTRACT = new ethcall.Contract(chain.registry, REGISTRY_ABI);

  const [gaugeFactories, voter] = await ethcallProvider.tryAll([REGISTRY_CONTRACT.gaugeFactories(), REGISTRY_CONTRACT.leafVoter()]);

  let gauges = [];
  for (const gaugeFactory of gaugeFactories || []) {
    let [factoryGauges] = await ethcallProvider.tryAll([REGISTRY_CONTRACT.factoryToGauges(gaugeFactory)]);
    if (!factoryGauges || factoryGauges.length == 0) {
      const [_length] = await ethcallProvider.tryAll([REGISTRY_CONTRACT.factoryToGaugesLength(gaugeFactory)]);
      const length = _length ? _length / 1 : 0;
      factoryGauges = await batchCalls(ethcallProvider, [...Array(length).keys()].map(i => REGISTRY_CONTRACT.factoryToGaugesAt(gaugeFactory, i)));
    }
    gauges.push(...(factoryGauges || []).filter(isRealAddress));
  }
  gauges = remove_dublicates(gauges, a => a.toLowerCase());

  // only keep the gauges that the voter has activated
  if (isRealAddress(voter)) {
    const VOTER_CONTRACT = new ethcall.Contract(voter, VOTER_ABI);
    const states = await batchCalls(ethcallProvider, gauges.map(g => VOTER_CONTRACT.gaugeStates(g)));
    gauges = gauges.filter((_, i) => !states[i] || (states[i].isRegistered && states[i].isActivated));
  }

  const pools = await batchCalls(ethcallProvider, gauges.map(g => REGISTRY_CONTRACT.gaugeToTarget(g)));

  const vfat_gauges = farms.filter(d => d.chainId == chain.chainId).map(ob => ob.address.toLowerCase());

  const missing = [];
  for (let i = 0; i < gauges.length; i++) {
    if (!isRealAddress(pools[i])) continue;
    if (!vfat_gauges.includes(gauges[i].toLowerCase())) {
      missing.push({ gauge: gauges[i], pool: pools[i] });
    }
  }

  _print(`Active gauges ${gauges.length}`);

  const response2 = await $.ajax({
    url: `https://api.vfat.io/v4/chain-tokens?chainId=${chain.chainId}&pageSize=999`,
    type: 'GET',
  });
  const vfat_io_tokens = response2.map(t => t.address.toLowerCase());

  const poolCalls = [];
  for (const m of missing) {
    const poolContract = new ethcall.Contract(m.pool, POOL_ABI);
    poolCalls.push(poolContract.token0(), poolContract.token1(), poolContract.POOL_TYPE());
  }
  const poolData = await batchCalls(ethcallProvider, poolCalls);
  missing.forEach((m, i) => {
    m.token0 = poolData[i * 3];
    m.token1 = poolData[i * 3 + 1];
    m.poolType = poolData[i * 3 + 2] ? bytes32ToText(poolData[i * 3 + 2]) : '';
  });

  const tokenAddresses = remove_dublicates(missing.flatMap(m => [m.token0, m.token1]).filter(isRealAddress), a => a.toLowerCase());
  const tokenInfo = await getTokenInfo(ethcallProvider, tokenAddresses);

  const v2_missing = missing.filter(m => m.poolType.indexOf('CL') != 0);
  const cl_missing = missing.filter(m => m.poolType.indexOf('CL') == 0);

  _print_bold("V2 POOLS");
  _print_bold("Missing v2 pools count " + v2_missing.length);
  _print(``);
  const v2_list = v2_missing.flatMap(m => printPool(m, 'LP', tokenInfo, vfat_io_tokens, chain.chainId));
  for (const v2 of remove_dublicates(v2_list, ob => ob.address.toLowerCase())) {
    _print(v2);
  }
  _print(``);

  _print_bold("CL POOLS");
  _print_bold("Missing cl pools count " + cl_missing.length);
  _print(``);
  const cl_list = cl_missing.flatMap(m => printPool(m, 'CL', tokenInfo, vfat_io_tokens, chain.chainId));
  for (const cl of remove_dublicates(cl_list, ob => ob.address.toLowerCase())) {
    _print(cl);
  }
}

async function getTokenInfo(ethcallProvider, addresses) {
  const calls = [];
  for (const address of addresses) {
    const tokenContract = new ethcall.Contract(address, TOKEN_ABI);
    calls.push(tokenContract.symbol(), tokenContract.decimals());
  }
  const results = await batchCalls(ethcallProvider, calls);
  const info = {};
  const retry = [];
  addresses.forEach((address, i) => {
    info[address.toLowerCase()] = { symbol: results[i * 2], decimals: results[i * 2 + 1] };
    if (!results[i * 2]) retry.push(address);
  });
  // some old tokens return the symbol as bytes32
  if (retry.length > 0) {
    const symbols = await batchCalls(ethcallProvider, retry.map(a => new ethcall.Contract(a, TOKEN_BYTES32_ABI).symbol()));
    retry.forEach((address, i) => {
      info[address.toLowerCase()].symbol = symbols[i] ? bytes32ToText(symbols[i]) : '';
    });
  }
  return info;
}

function printPool(m, label, tokenInfo, vfat_io_tokens, chainId) {
  const t0 = tokenInfo[(m.token0 || '').toLowerCase()] || {};
  const t1 = tokenInfo[(m.token1 || '').toLowerCase()] || {};

  _print(`${t0.symbol}/${t1.symbol} ${m.poolType}`);
  _print(`GAUGE ADDRESS - ${m.gauge}`);
  _print(`${label} TOKEN ADDRESS - ${m.pool}`);
  _print(`TOKEN 0 ADDRESS  - ${m.token0}`);
  _print(`TOKEN 0 SYMBOL  - ${t0.symbol}`);
  _print(`TOKEN 0 DECIMALS  - ${t0.decimals}`);
  _print(`TOKEN 1 ADDRESS  - ${m.token1}`);
  _print(`TOKEN 1 SYMBOL  - ${t1.symbol}`);
  _print(`TOKEN 1 DECIMALS  - ${t1.decimals}`);
  _print(``);

  const missingTokens = [];
  for (const [address, t] of [[m.token0, t0], [m.token1, t1]]) {
    if (!isRealAddress(address) || vfat_io_tokens.includes(address.toLowerCase())) continue;
    missingTokens.push({
      address: address,
      symbol: t.symbol,
      decimals: t.decimals == null ? null : Number(t.decimals),
      chainId: chainId,
      logoURI: ""
    });
  }
  return missingTokens;
}

function bytes32ToText(value) {
  try {
    return ethers.utils.parseBytes32String(value).replace(/\u0000/g, '').trim();
  } catch (_) {
    return '';
  }
}

function remove_dublicates(arr, key) {
  return [
    ...new Map(
      arr.map(x => [key(x), x])
    ).values()
  ]
}
