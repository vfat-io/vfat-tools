/** Variables available in all js files:
 * all the exported constants from globals.js
 */

/** Directories available as aliases
 * all the paths within Dir in globals.js
 */
import $ from "jquery";
import { ethers } from "ethers";
import * as ethcall from "ethcall";

//import dompurify from 'dompurify'

import 'picturefill'
import 'utils/errors'
import 'utils/validation'
import 'utils/quick';
import "core-js/stable";
import "regenerator-runtime/runtime";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

window.$ = $;
window.ethers = ethers;
window.ethcall = ethcall;
window.asciichart = require("asciichart");
window.AsciiTable = require("./ascii-table");
window.Diff = require("diff");
window.ETHEREUM_NODE_URL = 'aHR0cHM6Ly9tYWlubmV0LmluZnVyYS5pby92My9hNmYzNmI4OWM0OGM0ZmE4YjE0NjYwNWY2ZDdhNWI2Zg==';
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
  BINANCE_SMART_CHAIN: {
    "chainId": "0x38",
    "chainName": "Binance Smart Chain Mainnet",
    "nativeCurrency": {
      "name": "Binance Chain Native Token",
      "symbol": "BNB",
      "decimals": 18
    },
    "rpcUrls": [
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
      "wss://bsc-ws-node.nariox.org"
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
      "wss://ws-mainnet.hecochain.com"
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
      "https://rpc-mainnet.matic.network",
      "wss://ws-mainnet.matic.network"
    ]
  },
  XDAI: {
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
        "wss://mainnet-ws.thundercore.com"
    ],
    "blockExplorerUrls": [
        "https://scan.thundercore.com/",
        "https://viewblock.io/thundercore"
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
        1666600000: "https://api.harmony.one",
        1666600001: "https://s1.api.harmony.one",
        1666600002: "https://s2.api.harmony.one",
        1666600003: "https://s3.api.harmony.one",
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
