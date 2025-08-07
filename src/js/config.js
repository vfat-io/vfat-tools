export const REOWN_PROJECT_ID = process.env.REOWN_PROJECT_ID || ''
export const ETHEREUM_NODE_URL = process.env.ETHEREUM_NODE_URL || ''

const getInfuraId = () => {
  if (!ETHEREUM_NODE_URL) {
    return ''
  }
  return atob(ETHEREUM_NODE_URL).split('/').pop()
}

const INFURA_API_KEY = getInfuraId()

export const customNetworks = [
  {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3/' + getInfuraId()],
    blockExplorers: [{ name: 'Etherscan', url: 'https://etherscan.io' }]
  },
  {
    id: 5,
    name: 'Goerli',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://goerli.infura.io/v3/' + getInfuraId()],
    blockExplorers: [{ name: 'Goerli Etherscan', url: 'https://goerli.etherscan.io' }]
  },
  {
    id: 10,
    name: 'Optimism',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://optimism.drpc.org'],
    blockExplorers: [{ name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io/' }]
  },
  {
    id: 25,
    name: 'Cronos',
    nativeCurrency: { name: 'CRO', symbol: 'CRO', decimals: 18 },
    rpcUrls: ['https://1rpc.io/cro'],
    blockExplorers: [{ name: 'Cronos Explorer', url: 'https://cronos.crypto.org/explorer' }]
  },
  {
    id: 40,
    name: 'Telos',
    nativeCurrency: { name: 'TLOS', symbol: 'TLOS', decimals: 18 },
    rpcUrls: ['https://mainnet.telos.net/evm'],
    blockExplorers: [{ name: 'Telos Explorer', url: 'https://teloscan.io' }]
  },
  {
    id: 56,
    name: 'BNB Smart Chain',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://bsc-dataseed1.binance.org'],
    blockExplorers: [{ name: 'BscScan', url: 'https://bscscan.com' }]
  },
  {
    id: 66,
    name: 'OKExChain',
    nativeCurrency: { name: 'OKT', symbol: 'OKT', decimals: 18 },
    rpcUrls: ['https://exchainrpc.okex.org'],
    blockExplorers: [{ name: 'OKLink', url: 'https://www.oklink.com/okexchain' }]
  },
  {
    id: 70,
    name: 'Hoo Smart Chain',
    nativeCurrency: { name: 'HOO', symbol: 'HOO', decimals: 18 },
    rpcUrls: ['https://http-mainnet.hoosmartchain.com'],
    blockExplorers: [{ name: 'Hoo Explorer', url: 'https://hooscan.com' }]
  },
  {
    id: 82,
    name: 'Meter',
    nativeCurrency: { name: 'MTR', symbol: 'MTR', decimals: 18 },
    rpcUrls: ['https://rpc.meter.io'],
    blockExplorers: [{ name: 'Meter Explorer', url: 'https://scan.meter.io' }]
  },
  {
    id: 100,
    name: 'Gnosis',
    nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
    rpcUrls: ['https://rpc.xdaichain.com'],
    blockExplorers: [{ name: 'Gnosis Explorer', url: 'https://blockscout.com/xdai/mainnet' }]
  },
  {
    id: 106,
    name: 'Velas',
    nativeCurrency: { name: 'VLX', symbol: 'VLX', decimals: 18 },
    rpcUrls: ['https://evmexplorer.velas.com/rpc'],
    blockExplorers: [{ name: 'Velas Explorer', url: 'https://evmexplorer.velas.com' }]
  },
  {
    id: 108,
    name: 'ThunderCore',
    nativeCurrency: { name: 'TT', symbol: 'TT', decimals: 18 },
    rpcUrls: ['https://mainnet-rpc.thundercore.com'],
    blockExplorers: [{ name: 'ThunderCore Explorer', url: 'https://scan.thundercore.com' }]
  },
  {
    id: 122,
    name: 'Fuse',
    nativeCurrency: { name: 'FUSE', symbol: 'FUSE', decimals: 18 },
    rpcUrls: ['https://rpc.fuse.io'],
    blockExplorers: [{ name: 'Fuse Explorer', url: 'https://explorer.fuse.io' }]
  },
  {
    id: 128,
    name: 'Huobi ECO Chain',
    nativeCurrency: { name: 'HT', symbol: 'HT', decimals: 18 },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorers: [{ name: 'HecoInfo', url: 'https://hecoinfo.com' }]
  },
  {
    id: 137,
    name: 'Polygon',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: ['https://rpc-mainnet.matic.network'],
    blockExplorers: [{ name: 'PolygonScan', url: 'https://polygonscan.com' }]
  },
  {
    id: 146,
    name: 'Sonic',
    nativeCurrency: { name: 'S', symbol: 'S', decimals: 18 },
    rpcUrls: ['https://rpc.soniclabs.com'],
    blockExplorers: [{ name: 'Sonic Explorer', url: 'https://explorer.soniclabs.com' }]
  },
  {
    id: 169,
    name: 'Manta Pacific',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://pacific-rpc.manta.network/http'],
    blockExplorers: [{ name: 'Manta Explorer', url: 'https://pacific-explorer.manta.network' }]
  },
  {
    id: 204,
    name: 'opBNB',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: ['https://opbnb-mainnet-rpc.bnbchain.org'],
    blockExplorers: [{ name: 'opBNB Explorer', url: 'https://mainnet.opbnbscan.com' }]
  },
  {
    id: 250,
    name: 'Fantom',
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorers: [{ name: 'FTMScan', url: 'https://ftmscan.com' }]
  },
  {
    id: 288,
    name: 'Boba',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.boba.network'],
    blockExplorers: [{ name: 'Boba Explorer', url: 'https://blockexplorer.boba.network' }]
  },
  {
    id: 321,
    name: 'KuCoin Community Chain',
    nativeCurrency: { name: 'KCS', symbol: 'KCS', decimals: 18 },
    rpcUrls: ['https://rpc-mainnet.kcc.network'],
    blockExplorers: [{ name: 'KCC Explorer', url: 'https://explorer.kcc.io' }]
  },
  {
    id: 324,
    name: 'zkSync Era',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.era.zksync.io'],
    blockExplorers: [{ name: 'zkSync Explorer', url: 'https://explorer.zksync.io' }]
  },
  {
    id: 369,
    name: 'PulseChain',
    nativeCurrency: { name: 'PLS', symbol: 'PLS', decimals: 18 },
    rpcUrls: ['https://rpc.pulsechain.com'],
    blockExplorers: [{ name: 'PulseScan', url: 'https://scan.pulsechain.com' }]
  },
  {
    id: 592,
    name: 'Astar Network',
    nativeCurrency: { name: 'ASTR', symbol: 'ASTR', decimals: 18 },
    rpcUrls: ['https://astar.api.onfinality.io/public'],
    blockExplorers: [{ name: 'Astar Explorer', url: 'https://blockscout.com/astar/' }]
  },
  {
    id: 1088,
    name: 'Metis',
    nativeCurrency: { name: 'METIS', symbol: 'METIS', decimals: 18 },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
    blockExplorers: [{ name: 'Metis Explorer', url: 'https://andromeda-explorer.metis.io' }]
  },
  {
    id: 1101,
    name: 'Polygon zkEVM',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://zkevm-rpc.com'],
    blockExplorers: [{ name: 'Polygon zkEVM Explorer', url: 'https://zkevm.polygonscan.com' }]
  },
  {
    id: 1116,
    name: 'Core',
    nativeCurrency: { name: 'CORE', symbol: 'CORE', decimals: 18 },
    rpcUrls: ['https://rpc.coredao.org'],
    blockExplorers: [{ name: 'Core Explorer', url: 'https://scan.coredao.org' }]
  },
  {
    id: 1135,
    name: 'Lisk',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.api.lisk.com'],
    blockExplorers: [{ name: 'Lisk Explorer', url: 'https://blockscout.lisk.com' }]
  },
  {
    id: 1284,
    name: 'Moonbeam',
    nativeCurrency: { name: 'GLMR', symbol: 'GLMR', decimals: 18 },
    rpcUrls: ['https://rpc.api.moonbeam.network'],
    blockExplorers: [{ name: 'Moonscan', url: 'https://moonscan.io/' }]
  },
  {
    id: 1285,
    name: 'Moonriver',
    nativeCurrency: { name: 'MOVR', symbol: 'MOVR', decimals: 18 },
    rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
    blockExplorers: [{ name: 'Moonriver Explorer', url: 'https://moonbeam.network/networks/moonriver/' }]
  },
  {
    id: 1301,
    name: 'Unichain',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.unichain.org'],
    blockExplorers: [{ name: 'Unichain Explorer', url: 'https://explorer.unichain.org' }]
  },
  {
    id: 1750,
    name: 'Metal L2',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.metall2.com'],
    blockExplorers: [{ name: 'Metal Explorer', url: 'https://explorer.metall2.com' }]
  },
  {
    id: 1923,
    name: 'Swell',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://swell-mainnet.alt.technology'],
    blockExplorers: [{ name: 'Swell Explorer', url: 'https://explorer.swell.network' }]
  },
  {
    id: 2000,
    name: 'DogeChain',
    nativeCurrency: { name: 'wDOGE', symbol: 'wDOGE', decimals: 18 },
    rpcUrls: ['https://rpc01-sg.dogechain.dog'],
    blockExplorers: [{ name: 'DogeChain Explorer', url: 'https://explorer.dogechain.dog' }]
  },
  {
    id: 2008,
    name: 'Milkomeda C1',
    nativeCurrency: { name: 'mADA', symbol: 'mADA', decimals: 18 },
    rpcUrls: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com'],
    blockExplorers: [{ name: 'Milkomeda Explorer', url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com' }]
  },
  {
    id: 2152,
    name: 'Findora',
    nativeCurrency: { name: 'FRA', symbol: 'FRA', decimals: 18 },
    rpcUrls: ['https://rpc-mainnet.findora.org'],
    blockExplorers: [{ name: 'Findora Explorer', url: 'https://evm.findorascan.io' }]
  },
  {
    id: 2222,
    name: 'Kava Network',
    nativeCurrency: { name: 'KAVA', symbol: 'KAVA', decimals: 18 },
    rpcUrls: ['https://evm.kava.io'],
    blockExplorers: [{ name: 'Kava Explorer', url: 'https://explorer.kava.io' }]
  },
  {
    id: 4460,
    name: 'Fraxtal',
    nativeCurrency: { name: 'frxETH', symbol: 'frxETH', decimals: 18 },
    rpcUrls: ['https://rpc.frax.com'],
    blockExplorers: [{ name: 'Fraxscan', url: 'https://fraxscan.com' }]
  },
  {
    id: 4689,
    name: 'IoTeX',
    nativeCurrency: { name: 'IOTX', symbol: 'IOTX', decimals: 18 },
    rpcUrls: ['https://babel-api.mainnet.iotex.io'],
    blockExplorers: [{ name: 'IoTeX Explorer', url: 'https://iotexscan.io' }]
  },
  {
    id: 5000,
    name: 'Mantle',
    nativeCurrency: { name: 'MNT', symbol: 'MNT', decimals: 18 },
    rpcUrls: ['https://mantle.publicnode.com/'],
    blockExplorers: [{ name: 'Mantle Explorer', url: 'https://explorer.mantle.xyz' }]
  },
  {
    id: 5553,
    name: 'Tenet',
    nativeCurrency: { name: 'TENET', symbol: 'TENET', decimals: 18 },
    rpcUrls: ['https://rpc.tenet.org'],
    blockExplorers: [{ name: 'Tenet Explorer', url: 'https://tenetscan.io' }]
  },
  {
    id: 7700,
    name: 'Canto',
    nativeCurrency: { name: 'CANTO', symbol: 'CANTO', decimals: 18 },
    rpcUrls: ['https://canto.gravitychain.io'],
    blockExplorers: [{ name: 'Canto Explorer', url: 'https://evm.explorer.canto.io' }]
  },
  {
    id: 8217,
    name: 'Klaytn Mainnet',
    nativeCurrency: { name: 'KLAY', symbol: 'KLAY', decimals: 18 },
    rpcUrls: ['https://public-node-api.klaytnapi.com/v1/cypress'],
    blockExplorers: [{ name: 'Klaytn Scope', url: 'https://scope.klaytn.com' }]
  },
  {
    id: 8453,
    name: 'Base',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.base.org'],
    blockExplorers: [{ name: 'BaseScan', url: 'https://basescan.org' }]
  },
  {
    id: 9001,
    name: 'Evmos',
    nativeCurrency: { name: 'EVMOS', symbol: 'EVMOS', decimals: 18 },
    rpcUrls: ['https://evmos-evm.publicnode.com'],
    blockExplorers: [{ name: 'Evmos Explorer', url: 'https://evm.evmos.org' }]
  },
  {
    id: 10000,
    name: 'Smart Bitcoin Cash',
    nativeCurrency: { name: 'BCH', symbol: 'BCH', decimals: 18 },
    rpcUrls: ['https://global.uat.cash'],
    blockExplorers: [{ name: 'SmartScan', url: 'https://smartscan.cash' }]
  },
  {
    id: 10001,
    name: 'EthereumPoW',
    nativeCurrency: { name: 'ETHW', symbol: 'ETHW', decimals: 18 },
    rpcUrls: ['https://mainnet.ethereumpow.org'],
    blockExplorers: [{ name: 'ETHW Explorer', url: 'https://www.oklink.com/ethw' }]
  },
  {
    id: 31103,
    name: 'Soneium',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.soneium.org'],
    blockExplorers: [{ name: 'Soneium Explorer', url: 'https://explorer.soneium.org' }]
  },
  {
    id: 34443,
    name: 'Mode',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.mode.network'],
    blockExplorers: [{ name: 'Mode Explorer', url: 'https://explorer.mode.network' }]
  },
  {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: [{ name: 'Arbiscan', url: 'https://arbiscan.io' }]
  },
  {
    id: 42170,
    name: 'Arbitrum Nova',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://nova.arbitrum.io/rpc'],
    blockExplorers: [{ name: 'Arbitrum Nova Explorer', url: 'https://nova-explorer.arbitrum.io' }]
  },
  {
    id: 42220,
    name: 'Celo',
    nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorers: [{ name: 'Celo Explorer', url: 'https://explorer.celo.org' }]
  },
  {
    id: 42262,
    name: 'Emerald',
    nativeCurrency: { name: 'ROSE', symbol: 'ROSE', decimals: 18 },
    rpcUrls: ['https://emerald.oasis.dev'],
    blockExplorers: [{ name: 'Emerald Explorer', url: 'https://explorer.emerald.oasis.dev' }]
  },
  {
    id: 43114,
    name: 'Avalanche',
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: [{ name: 'SnowTrace', url: 'https://snowtrace.io' }]
  },
  {
    id: 57073,
    name: 'Ink',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc-qnd.inkonchain.com'],
    blockExplorers: [{ name: 'Ink Explorer', url: 'https://explorer.inkonchain.com/' }]
  },
  {
    id: 59144,
    name: 'Linea',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.linea.build'],
    blockExplorers: [{ name: 'LineaScan', url: 'https://lineascan.build' }]
  },
  {
    id: 81457,
    name: 'Blast',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.blast.io'],
    blockExplorers: [{ name: 'BlastScan', url: 'https://blastscan.io' }]
  },
  {
    id: 166598,
    name: 'Function X',
    nativeCurrency: { name: 'FX', symbol: 'FX', decimals: 18 },
    rpcUrls: ['https://fx-json-web3.functionx.io:8545'],
    blockExplorers: [{ name: 'FX Explorer', url: 'https://fxexplorer.functionx.io' }]
  },
  {
    id: 333999,
    name: 'Polis',
    nativeCurrency: { name: 'POLIS', symbol: 'POLIS', decimals: 18 },
    rpcUrls: ['https://rpc.polis.tech'],
    blockExplorers: [{ name: 'Polis Explorer', url: 'https://explorer.polis.tech' }]
  },
  {
    id: 534352,
    name: 'Scroll',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://rpc.scroll.io'],
    blockExplorers: [{ name: 'ScrollScan', url: 'https://scrollscan.com' }]
  },
  {
    id: 1313161554,
    name: 'Aurora',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.aurora.dev'],
    blockExplorers: [{ name: 'Aurora Explorer', url: 'https://aurorascan.dev' }]
  },
  {
    id: 1666600000,
    name: 'Harmony Shard 0',
    nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
    rpcUrls: ['https://api.harmony.one'],
    blockExplorers: [{ name: 'Harmony Explorer', url: 'https://explorer.harmony.one' }]
  },
  {
    id: 1666600001,
    name: 'Harmony Shard 1',
    nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
    rpcUrls: ['https://s1.api.harmony.one'],
    blockExplorers: [{ name: 'Harmony Explorer', url: 'https://explorer.harmony.one' }]
  },
  {
    id: 1666600002,
    name: 'Harmony Shard 2',
    nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
    rpcUrls: ['https://s2.api.harmony.one'],
    blockExplorers: [{ name: 'Harmony Explorer', url: 'https://explorer.harmony.one' }]
  },
  {
    id: 1666600003,
    name: 'Harmony Shard 3',
    nativeCurrency: { name: 'ONE', symbol: 'ONE', decimals: 18 },
    rpcUrls: ['https://s3.api.harmony.one'],
    blockExplorers: [{ name: 'Harmony Explorer', url: 'https://explorer.harmony.one' }]
  },
  {
    id: 3347855,
    name: 'DFK Chain',
    nativeCurrency: { name: 'JEWEL', symbol: 'JEWEL', decimals: 18 },
    rpcUrls: ['https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc'],
    blockExplorers: [{ name: 'DFK Explorer', url: 'https://subnets.avax.network/defi-kingdoms' }]
  }
]

// AppKit metadata configuration
export const appKitMetadata = {
  name: 'Vfat Tools',
  description: 'Yield Farming Info',
  url: 'https://vfat.tools',
  icons: ['https://vfat.tools/favicon.svg']
}

// AppKit features configuration
export const appKitFeatures = {
  analytics: false,
  email: false,
  socials: []
}

// Legacy NETWORKS configuration for backwards compatibility
export const NETWORKS = {
  ETHEREUM: {
    "chainId": '0x1',
    "chainName": "Ethereum Mainnet",
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.infura.io/v3/" + INFURA_API_KEY,
      "wss://mainnet.infura.io/ws/v3/" + INFURA_API_KEY,
      "https://api.mycryptoapi.com/eth",
      "https://cloudflare-eth.com"
    ],
    "blockExplorerUrls": [
      "https://etherscan.io"
    ]
  },
  ARBITRUM: {
    "chainId": "0xa4b1",
    "chainName": "Arbitrum Mainnet",
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://arb1.arbitrum.io/rpc"
    ],
    "blockExplorerUrls": [
      "https://explorer.arbitrum.io"
    ]
  },
  ARBITRUM_NOVA: {
    "chainId": "0xA4BA",
    "chainName": "Arbitrum Nova",
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://nova.arbitrum.io/rpc"
    ],
    "blockExplorerUrls": [
      "https://nova-explorer.arbitrum.io"
    ]
  },
  ASTAR: {
    "chainId": "0x250",
    "chainName": "Astar Network",
    "nativeCurrency": {
      "name": "Astar",
      "symbol": "ASTR",
      "decimals": 18
    },
    "rpcUrls": [
      "https://astar.api.onfinality.io/public"
    ],
    "blockExplorerUrls": [
      "https://blockscout.com/astar/"
    ]
  },
  KAVA: {
    "chainId": "0x8AE",
    "chainName": "Kava Network",
    "nativeCurrency": {
      "name": "Kava",
      "symbol": "KAVA",
      "decimals": 18
    },
    "rpcUrls": [
      "https://evm.kava.io"
    ],
    "blockExplorerUrls": [
      "https://explorer.kava.io"
    ]
  },
  KLAYTN: {
    "chainId": "0x2019",
    "chainName": "Klaytn Mainnet Cypress",
    "nativeCurrency": {
      "name": "Klaytn",
      "symbol": "KLAY",
      "decimals": 18
    },
    "rpcUrls": [
      "https://public-node-api.klaytnapi.com/v1/cypress"
    ],
    "blockExplorerUrls": [
      "https://scope.klaytn.com"
    ]
  },
  DOGE: {
    "chainId": "0x7D0",
    "chainName": "DogeChain",
    "nativeCurrency": {
      "name": "wDOGE",
      "symbol": "wDOGE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc01-sg.dogechain.dog"
    ],
    "blockExplorerUrls": [
      "https://explorer.dogechain.dog"
    ]
  },
  BASE: {
    "chainId": "0x2105",
    "chainName": "Base",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.base.org"
    ],
    "blockExplorerUrls": [
      "https://basescan.org"
    ]
  },
  LINEA: {
    "chainId": "0xe708",
    "chainName": "Linea",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.linea.build"
    ],
    "blockExplorerUrls": [
      "https://lineascan.build"
    ]
  },
  MODE: {
    "chainId": "0x868b",
    "chainName": "Mode Mainnet",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.mode.network"
    ],
    "blockExplorerUrls": [
      "https://explorer.mode.network"
    ]
  },
  FRAXTAL: {
    "chainId": "0xfc",
    "chainName": "Fraxtal Mainnet",
    "nativeCurrency": {
      "name": "FraxEther",
      "symbol": "frxETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.frax.com"
    ],
    "blockExplorerUrls": [
      "https://fraxscan.com"
    ]
  },
  LISK: {
    "chainId": "0x46f",
    "chainName": "Lisk Mainnet",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://lisk.drpc.org"
    ],
    "blockExplorerUrls": [
      "https://blockscout.lisk.com/"
    ]
  },
  SONIC: {
    "chainId": "0x92",
    "chainName": "Sonic Mainnet",
    "nativeCurrency": {
      "name": "Sonic",
      "symbol": "S",
      "decimals": 18
    },
    "rpcUrls": [
      "https://sonic.drpc.org"
    ],
    "blockExplorerUrls": [
      "https://sonicscan.org/"
    ]
  },
  METAL_L2: {
    "chainId": "0x6d6",
    "chainName": "Metal L2",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://metall2.drpc.org"
    ],
    "blockExplorerUrls": [
      "https://explorer.metall2.com/"
    ]
  },
  INK: {
    "chainId": "0xdef1",
    "chainName": "Ink",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc-qnd.inkonchain.com"
    ],
    "blockExplorerUrls": [
      "https://explorer.inkonchain.com/"
    ]
  },
  SWELL: {
    "chainId": "0x783",
    "chainName": "Swellchain",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://swell-mainnet.alt.technology"
    ],
    "blockExplorerUrls": [
      "https://explorer.swellnetwork.io/"
    ]
  },
  UNICHAIN: {
    "chainId": "0x82",
    "chainName": "Unichain",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://unichain-rpc.publicnode.com"
    ],
    "blockExplorerUrls": [
      "https://uniscan.xyz/"
    ]
  },
  SONEIUM: {
    "chainId": "0x74c",
    "chainName": "Soneium",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.soneium.org"
    ],
    "blockExplorerUrls": [
      "https://soneium.blockscout.com/"
    ]
  },
  OPBNB: {
    "chainId": "0xcc",
    "chainName": "opBNB",
    "nativeCurrency": {
      "name": "BNB",
      "symbol": "BNB",
      "decimals": 18
    },
    "rpcUrls": [
      "https://opbnb-rpc.publicnode.com"
    ],
    "blockExplorerUrls": [
      "https://opbnbscan.com/"
    ]
  },
  FX: {
    "chainId": "0x212",
    "chainName": "FX Mainnet",
    "nativeCurrency": {
      "name": "Function X",
      "symbol": "FX",
      "decimals": 18
    },
    "rpcUrls": [
      "https://fx-json-web3.functionx.io:8545"
    ],
    "blockExplorerUrls": [
      "https://explorer.starscan.io"
    ]
  },
  CANTO: {
    "chainId": "0x1E14",
    "chainName": "CANTO",
    "nativeCurrency": {
      "name": "CANTO",
      "symbol": "CANTO",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnode.plexnode.org:8545"
    ],
    "blockExplorerUrls": [
      "https://evm.explorer.canto.io"
    ]
  },
  CORE: {
    "chainId": "0x45C",
    "chainName": "Core Blockchain Mainnet",
    "nativeCurrency": {
      "name": "CORE",
      "symbol": "CORE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.coredao.org"
    ],
    "blockExplorerUrls": [
      "https://scan.coredao.org"
    ]
  },
  MILKOMEDA: {
    "chainId": "0x7D1",
    "chainName": "Milkomeda C1 Mainnet",
    "nativeCurrency": {
      "name": "Mada",
      "symbol": "mADA",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc-mainnet-cardano-evm.c1.milkomeda.com"
    ],
    "blockExplorerUrls": [
      "https://explorer-mainnet-cardano-evm.c1.milkomeda.com"
    ]
  },
  EVMOS: {
    "chainId": "0x2329",
    "chainName": "EVMOS",
    "nativeCurrency": {
      "name": "Evmos",
      "symbol": "EVMOS",
      "decimals": 18
    },
    "rpcUrls": [
      "https://evmos-rpc2.binary.host"
    ],
    "blockExplorerUrls": [
      "https://evm.evmos.org"
    ]
  },
  ZKSYNC_ERA: {
    "chainId": "0x144",
    "chainName": "zkSync Era Mainnet",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.era.zksync.io"
    ],
    "blockExplorerUrls": [
      "https://explorer.zksync.io"
    ]
  },
  ZKEVM: {
    "chainId": "0x44D",
    "chainName": "Polygon zkEVM",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://zkevm-rpc.com"
    ],
    "blockExplorerUrls": [
      "https://zkevm.polygonscan.com"
    ]
  },
  GOERLI: {
    "chainId": "0x5",
    "chainName": "Goerli",
    "nativeCurrency": {
      "name": "Ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://ethereum-goerli.publicnode.com"
    ],
    "blockExplorerUrls": [
      "https://goerli.etherscan.io"
    ]
  },
  PULSE: {
    "chainId": "0x171",
    "chainName": "Pulse Chain",
    "nativeCurrency": {
      "name": "Pulse",
      "symbol": "PLS",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.pulsechain.com"
    ],
    "blockExplorerUrls": [
      "https://scan.pulsechain.com"
    ]
  },
  TENET: {
    "chainId": "0x617",
    "chainName": "Tenet Chain",
    "nativeCurrency": {
      "name": "Tenet",
      "symbol": "TENET",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.tenet.org"
    ],
    "blockExplorerUrls": [
      "https://tenetscan.io/"
    ]
  },
  HOO: {
    "chainId": "0x46",
    "chainName": "Hoo Smart Chain",
    "nativeCurrency": {
      "name": "Hoo",
      "symbol": "HOO",
      "decimals": 18
    },
    "rpcUrls": [
      "https://http-mainnet.hoosmartchain.com"
    ],
    "blockExplorerUrls": [
      "https://www.hooscan.com"
    ]
  },
  MOONRIVER: {
    "chainId": "0x505",
    "chainName": "Moonriver",
    "nativeCurrency": {
      "name": "moonriver",
      "symbol": "MOVR",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.moonriver.moonbeam.network"
    ],
    "blockExplorerUrls": [
      "https://moonbeam.network/networks/moonriver/"
    ]
  },
  MOONBEAM: {
    "chainId": "0x504",
    "chainName": "Moonbeam",
    "nativeCurrency": {
      "name": "moonbeam",
      "symbol": "GLMR",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.api.moonbeam.network"
    ],
    "blockExplorerUrls": [
      "https://moonscan.io/"
    ]
  },
  ETHW: {
    "chainId": "0x2711",
    "chainName": "ETHW-mainnet",
    "nativeCurrency": {
      "name": "EthereumPoW",
      "symbol": "ETHW",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.ethereumpow.org"
    ],
    "blockExplorerUrls": [
      "https://mainnet.ethwscan.com"
    ]
  },
  OPTIMISM: {
    "chainId": "0xA",
    "chainName": "Optimistic Ethereum",
    "nativeCurrency": {
      "name": "ethereum",
      "symbol": "OETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://optimism.drpc.org"
    ],
    "blockExplorerUrls": [
      "https://optimistic.etherscan.io/"
    ]
  },
  EMERALD: {
    "chainId": "0xA516",
    "chainName": "Emerald Paratime Mainnet",
    "nativeCurrency": {
      "name": "oasis-network",
      "symbol": "ROSE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://emerald.oasis.dev"
    ],
    "blockExplorerUrls": [
      "https://explorer.emerald.oasis.dev"
    ]
  },
  MANTLE: {
    "chainId": "0x1388",
    "chainName": "Mantle",
    "nativeCurrency": {
      "name": "Mantle",
      "symbol": "MNT",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mantle.publicnode.com/"
    ],
    "blockExplorerUrls": [
      "https://explorer.mantle.xyz"
    ]
  },
  MANTA: {
    "chainId": "0xa9",
    "chainName": "Manta Pacific Mainnet",
    "nativeCurrency": {
      "name": "Manta",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://pacific-rpc.manta.network/http"
    ],
    "blockExplorerUrls": [
      "https://pacific-explorer.manta.network"
    ]
  },
  SHIMMER: {
    "chainId": "0x94",
    "chainName": "ShimmerEVM",
    "nativeCurrency": {
      "name": "Shimmer",
      "symbol": "SMR",
      "decimals": 18
    },
    "rpcUrls": [
      "https://json-rpc.evm.shimmer.network"
    ],
    "blockExplorerUrls": [
      "https://explorer.evm.shimmer.network"
    ]
  },
  SCROLL: {
    "chainId": "0x82750",
    "chainName": "Scroll",
    "nativeCurrency": {
      "name": "ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.scroll.io"
    ],
    "blockExplorerUrls": [
      "https://scrollscan.com"
    ]
  },
  BLAST: {
    "chainId": "0x13E31",
    "chainName": "Blast",
    "nativeCurrency": {
      "name": "ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.blast.io"
    ],
    "blockExplorerUrls": [
      "https://blastscan.io"
    ]
  },
  DFK: {
    "chainId": "0xD2AF",
    "chainName": "DFK Chain",
    "nativeCurrency": {
      "name": "defi-kingdoms",
      "symbol": "JEWEL",
      "decimals": 18
    },
    "rpcUrls": [
      "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"
    ],
    "blockExplorerUrls": [
      "https://explorer.dfkchain.com"
    ]
  },
  BINANCE_SMART_CHAIN: {
    "chainId": "0x38",
    "chainName": "Binance Smart Chain Mainnet",
    "nativeCurrency": {
      "name": "Binance Chain Native Token",
      "symbol": "BNB",
      "decimals": 18
    },
    "rpcUrls": [
      "https://bsc-dataseed.binance.org",
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org:443"
    ],
    "blockExplorerUrls": [
      "https://bscscan.com"
    ],
  },
  HECO: {
    "chainId": "0x80",
    "chainName": "Huobi ECO Chain Mainnet",
    "nativeCurrency": {
      "name": "Huobi ECO Chain Native Token",
      "symbol": "HT",
      "decimals": 18
    },
    "rpcUrls": [
      "https://http-mainnet.hecochain.com",
      "https://http-mainnet-node.huobichain.com",
      "wss://ws-mainnet.hecochain.com"
    ],
    "blockExplorerUrls": [
      "https://hecoinfo.com"
    ]
  },
  POLYGON: {
    "chainId": "0x89",
    "chainName": "Matic Mainnet",
    "nativeCurrency": {
      "name": "Matic",
      "symbol": "MATIC",
      "decimals": 18
    },
    "rpcUrls": [
      "https://polygon.llamarpc.com",
      "https://rpc-mainnet.matic.network",
      "https://matic-mainnet.chainstacklabs.com",
      "https://rpc-mainnet.maticvigil.com",
      "https://rpc-mainnet.matic.quiknode.pro",
      "https://matic-mainnet-full-rpc.bwarelabs.com",
      "https://matic-mainnet-archive-rpc.bwarelabs.com",
      "wss://ws-mainnet.matic.network",
      "wss://rpc-mainnet.matic.network",
      "wss://ws-matic-mainnet.chainstacklabs.com",
      "wss://rpc-mainnet.maticvigil.com/ws",
      "wss://rpc-mainnet.matic.quiknode.pro",
      "wss://matic-mainnet-full-ws.bwarelabs.com",
      "wss://matic-mainnet-archive-ws.bwarelabs.com"
    ],
    "blockExplorerUrls": [
      "https://polygonscan.com",
      "https://polygon-explorer-mainnet.chainstacklabs.com",
      "https://explorer-mainnet.maticvigil.com",
      "https://explorer.matic.network",
      "https://backup-explorer.matic.network"
    ]
  },
  GNOSIS: {
    "chainId": "0x64",
    "chainName": "xDAI Chain",
    "nativeCurrency": {
      "name": "xDAI",
      "symbol": "xDAI",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.xdaichain.com",
      "https://xdai.poanetwork.dev",
      "wss://rpc.xdaichain.com/wss",
      "wss://xdai.poanetwork.dev/wss",
      "http://xdai.poanetwork.dev",
      "https://dai.poa.network",
      "ws://xdai.poanetwork.dev:8546"
    ],
    "blockExplorerUrls": [
      "https://blockscout.com/xdai/mainnet"
    ]
  },
  AVALANCHE: {
    "chainId": "0xA86A",
    "chainName": "Avalanche Mainnet",
    "nativeCurrency": {
      "name": "Avalanche",
      "symbol": "AVAX",
      "decimals": 18
    },
    "rpcUrls": [
      "https://api.avax.network/ext/bc/C/rpc"
    ],
    "blockExplorerUrls": [
      "https://explorer.avax.network",
      "https://cchain.explorer.avax.network"
    ]
  },
  FANTOM: {
    "chainId": "0xFA",
    "chainName": "Fantom Opera",
    "nativeCurrency": {
      "name": "Fantom",
      "symbol": "FTM",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpcapi.fantom.network"
    ],
    "blockExplorerUrls": [
      "https://ftmscan.com"
    ],
  },
  VELAS: {
    "chainId": "0x6A",
    "chainName": "Velas EVM",
    "nativeCurrency": {
      "name": "Velas",
      "symbol": "VLX",
      "decimals": 18
    },
    "rpcUrls": [
      "https://evmexplorer.velas.com/rpc"
    ],
    "blockExplorerUrls": [
      "https://evmexplorer.velas.com"
    ],
  },
  AURORA: {
    "chainId": "0x4E454152",
    "chainName": "Aurora MainNet",
    "nativeCurrency": {
      "name": "aave-eth-v1",
      "symbol": "aETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.aurora.dev"
    ],
    "blockExplorerUrls": [
      "https://evmexplorer.velas.com"
    ],
  },
  BOBA: {
    "chainId": "0x120",
    "chainName": "Boba Network",
    "nativeCurrency": {
      "name": "ethereum",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.boba.network/"
    ],
    "blockExplorerUrls": [
      "https://blockexplorer.boba.network"
    ],
  },
  HARMONY_S0: {
    "chainId": "0x63564C40",
    "chainName": "Harmony Mainnet Shard 0",
    "nativeCurrency": {
      "name": "ONE",
      "symbol": "ONE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://api.harmony.one"
    ],
    "blockExplorerUrls": [
      "https://explorer.harmony.one"
    ]
  },
  HARMONY_S1: {
    "chainId": "0x63564C41",
    "chainName": "Harmony Mainnet Shard 1",
    "nativeCurrency": {
      "name": "ONE",
      "symbol": "ONE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://s1.api.harmony.one"
    ],
    "blockExplorerUrls": [
      "https://explorer.harmony.one"
    ]
  },
  HARMONY_S2: {
    "chainId": "0x63564C42",
    "chainName": "Harmony Mainnet Shard 2",
    "nativeCurrency": {
      "name": "ONE",
      "symbol": "ONE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://s2.api.harmony.one"
    ],
    "blockExplorerUrls": [
      "https://explorer.harmony.one"
    ]
  },
  HARMONY_S3: {
    "chainId": "0x63564C43",
    "chainName": "Harmony Mainnet Shard 3",
    "nativeCurrency": {
      "name": "ONE",
      "symbol": "ONE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://s3.api.harmony.one"
    ],
    "blockExplorerUrls": [
      "https://explorer.harmony.one"
    ]
  },
  FUSE: {
    "chainId": "0x7a",
    "chainName": "Fuse Mainnet",
    "nativeCurrency": {
      "name": "FUSE",
      "symbol": "FUSE",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.fuse.io"
    ],
    "blockExplorerUrls": [
      "https://explorer.fuse.io"
    ]
  },
  CRONOS: {
    "chainId": "0x19",
    "chainName": "Cronos Mainnet",
    "nativeCurrency": {
      "name": "CRO",
      "symbol": "CRO",
      "decimals": 18
    },
    "rpcUrls": [
      "https://1rpc.io/cro"
    ],
    "blockExplorerUrls": [
      "https://cronos.crypto.org/explorer"
    ]
  },
  THUNDERCORE: {
    "chainId": "0x6c",
    "chainName": "ThunderCore",
    "nativeCurrency": {
      "name": "Thunder Token",
      "symbol": "TT",
      "decimals": 18
    },
    "rpcUrls": [
        "https://mainnet-rpc.thundercore.com",
        "https://mainnet-rpc.thundertoken.net",
        "https://mainnet-rpc.thundercore.io",
        "wss://mainnet-ws.thundercore.com"
    ],
    "blockExplorerUrls": [
        "https://scan.thundercore.com/",
        "https://viewblock.io/thundercore"
    ],
  },
  OKEX: {
    "chainId": "0x42",
    "chainName": "OKExChain Mainnet",
    "nativeCurrency": {
      "name": "okexchain",
      "symbol": "OKT",
      "decimals": 18
    },
    "rpcUrls": [
        "https://exchainrpc.okex.org"
    ],
    "blockExplorerUrls": [
        "https://www.oklink.com/okexchain"
    ],
  },
  KCC: {
    "chainId": "0x141",
    "chainName": "KuCoin Community Chain Mainnet",
    "nativeCurrency": {
      "name": "KuCoin Token",
      "symbol": "KCS",
      "decimals": 18
    },
    "rpcUrls": [
        "https://rpc-mainnet.kcc.network"
    ],
    "blockExplorerUrls": [
        "https://explorer.kcc.io/en"
    ],
  },
  CELO: {
    "chainId": "0xA4EC",
    "chainName": "Celo Mainnet",
    "nativeCurrency": {
      "name": "celo",
      "symbol": "CELO",
      "decimals": 18
    },
    "rpcUrls": [
        "https://forno.celo.org"
    ],
    "blockExplorerUrls": [
        "https://explorer.celo.org"
    ],
  },
  IOTEX: {
    "chainId": "0x1251",
    "chainName": "IoTeX Mainnet",
    "nativeCurrency": {
      "name": "IoTeX",
      "symbol": "IOTX",
      "decimals": 18
    },
    "rpcUrls": [
      "https://babel-api.mainnet.iotex.io"
    ],
    "blockExplorerUrls": [
      "https://iotexscan.io"
    ],
  },
  SMARTBCH: {
    "chainId": "0x2710",
    "chainName": "Smart Bitcoin Cash Mainnet",
    "nativeCurrency": {
      "name": "Bitcoin Cash",
      "symbol": "BCH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://global.uat.cash"
    ],
    "blockExplorerUrls": [
      "https://smartscan.cash"
    ],
  },
  POLIS: {
    "chainId": "0x518AF",
    "chainName": "Polis Olympus Chain",
    "nativeCurrency": {
      "name": "Polis",
      "symbol": "POLIS",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.polis.tech"
    ],
    "blockExplorerUrls": [
      "https://explorer.polis.tech"
    ],
  },
  METIS: {
    "chainId": "0x440",
    "chainName": "Metis Mainnet",
    "nativeCurrency": {
      "name": "Metis",
      "symbol": "METIS",
      "decimals": 18
    },
    "rpcUrls": [
      "https://andromeda.metis.io/?owner=1088"
    ],
    "blockExplorerUrls": [
      "https://andromeda-explorer.metis.io/"
    ],
  },
  METER: {
    "chainId": "0x52",
    "chainName": "Meter Mainnet",
    "nativeCurrency": {
      "name": "Meter token",
      "symbol": "MTR",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc.meter.io"
    ],
    "blockExplorerUrls": [
      "https://scan.meter.io"
    ],
  },
  TELOS: {
    "chainId": "0x28",
    "chainName": "Telos EVM Mainnet",
    "nativeCurrency": {
      "name": "Telos",
      "symbol": "TLOS",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.telos.net/evm"
    ],
    "blockExplorerUrls": [
      "https://teloscan.io"
    ],
  },
  FINDORA: {
    "chainId": "0x868",
    "chainName": "Findora EVM Mainnet",
    "nativeCurrency": {
      "name": "Findora",
      "symbol": "FRA",
      "decimals": 18
    },
    "rpcUrls": [
      "https://rpc-mainnet.findora.org"
    ],
    "blockExplorerUrls": [
      "https://evm.findorascan.io"
    ],
  },
}
