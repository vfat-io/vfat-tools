/** Variables available in all js files:
 * all the exported constants from globals.js
 */

/** Directories available as aliases
 * all the paths within Dir in globals.js
 */
import $ from "jquery"
import {ethers} from "ethers"
import * as ethcall from "ethcall"
import lodash from "lodash"
import {matchSorter} from "match-sorter"

//import dompurify from "dompurify"

import "picturefill"
import "utils/errors"
import "utils/validation"
import "utils/quick"
import "core-js/stable"
import "regenerator-runtime/runtime"
import WalletConnectProvider from "@walletconnect/web3-provider"
import Web3Modal from "web3modal"

window.$ = $
window.ethers = ethers
window.ethcall = ethcall
window.matchSorter = matchSorter
window.asciichart = require("asciichart")
window.AsciiTable = require("./ascii-table")
window.lodash = lodash
window.Diff = require("diff")
window.ETHEREUM_NODE_URL = "aHR0cHM6Ly9tYWlubmV0LmluZnVyYS5pby92My9hNmYzNmI4OWM0OGM0ZmE4YjE0NjYwNWY2ZDdhNWI2Zg=="

window.NETWORKS = {
  ETHEREUM: {
    "chainId": '0x1',
    "chainName": "Ethereum Mainnet",
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "rpcUrls": [
      "https://mainnet.infura.io/v3/${INFURA_API_KEY}",
      "wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}",
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
      "https://arb-mainnet-public.unifra.io"
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
      "https://base.publicnode.com"
    ],
    "blockExplorerUrls": [
      "https://basescan.org"
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
      "https://rpc.crodex.app/"
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

const infuraId = atob(window.ETHEREUM_NODE_URL).split('/').pop()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId,
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
        108: 'https://mainnet-rpc.thundercore.com',
        128: "https://http-mainnet.hecochain.com",
        137: "https://rpc-mainnet.matic.network",
        100: "https://rpc.xdaichain.com",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        250: "https://rpcapi.fantom.network",
        42161: "https://arb1.arbitrum.io/rpc",
        1666600000: "https://api.harmony.one",
        1666600001: "https://s1.api.harmony.one",
        1666600002: "https://s2.api.harmony.one",
        1666600003: "https://s3.api.harmony.one",
        122: "https://rpc.fuse.io",
        66: "https://exchainrpc.okex.org",
        4689: "https://babel-api.mainnet.iotex.io",
        321: "https://rpc-mainnet.kcc.network",
        10000: "https://global.uat.cash",
        333999: "https://rpc.polis.tech",
        25: "https://rpc.crodex.app/",
        82: "https://rpc.meter.io",
        40: "https://mainnet.telos.net/evm",
        2152: "https://rpc-mainnet.findora.org"
      }
    }
  }
};

window.web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
