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

const infuraId = atob(window.ETHEREUM_NODE_URL).split('/').pop()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId,
      rpc: {
        56: "https://bsc-dataseed1.binance.org",
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
