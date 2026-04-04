import $ from "jquery"
import {ethers} from "ethers"
import * as ethcall from "ethcall"
import lodash from "lodash"
import {matchSorter} from "match-sorter"
import * as viem from "viem"

import "picturefill"
import "utils/errors"
import "utils/validation"
import "utils/quick"
import "core-js/stable"
import "regenerator-runtime/runtime"

import { createAppKitInstance, REOWN_PROJECT_ID, customNetworks, NETWORKS, ETHEREUM_NODE_URL } from './config.js'
import {store} from './appKitStore.js'
import { initializeSubscribers } from './subscribers.js'

// Sickle SDK Integration
import * as Sickle from './sickle/index.js'
import SickleRebalance from './sickle/rebalance.js'
import SickleWithdraw from './sickle/withdraw.js'
import SickleCompound from './sickle/compound.js'
import SickleLpWithdraw from './sickle/lp-withdraw.js'
import SickleLpCompound from './sickle/lp-compound.js'

// Protocol helpers (bundled, exposed via window.Sickle.protocols)
import * as UniswapV4Protocol from './sickle/protocols/uniswap_v4.js'

// Uniswap V3 Utilities
import * as UniswapV3 from './uniswap/index.js'

window.$ = $
window.ethers = ethers
window.ethcall = ethcall
window.matchSorter = matchSorter
window.viem = viem
window.asciichart = require("asciichart")
window.AsciiTable = require("./ascii-table")
window.lodash = lodash
window.Diff = require("diff")
window.ETHEREUM_NODE_URL = ETHEREUM_NODE_URL
window.customNetworks = customNetworks
window.NETWORKS = NETWORKS
window.store = store



// Attach protocol-level helpers for non-module chain scripts.
if (document.location.search === '?api=true') {
  // Sickle SDK Integration
  window.Sickle = {
    sdk: Sickle.sickle,
    ...Sickle,
    rebalance: SickleRebalance,
    withdraw: SickleWithdraw,
    compound: SickleCompound,
    lpWithdraw: SickleLpWithdraw,
    lpCompound: SickleLpCompound,
  }  
  if (document.location.href.includes('uniswap-v4')) {
    console.log('Initializing Uniswap V4 protocol helpers in Sickle...')
    window.Sickle.protocols = window.Sickle.protocols || {}
    window.Sickle.protocols.uniswapV4 = UniswapV4Protocol
  }
  // Uniswap V3 Utilities
  window.UniswapV3 = {
    ...UniswapV3,
}
}

// 3. Create a AppKit instance safely
let appKitInstance = null;

try {
  appKitInstance = window.__VFAT_APPKIT_INSTANCE__ || createAppKitInstance();
  window.appKit = appKitInstance;
  
  // Only initialize subscribers if AppKit was created successfully
  if (appKitInstance) {
    initializeSubscribers(appKitInstance);
  }
} catch (error) {
  console.error('Failed to initialize AppKit in index.js:', error);
  // Set a fallback or handle gracefully
  window.appKit = null;
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    if (!REOWN_PROJECT_ID) {
      console.warn('AppKit: Missing REOWN_PROJECT_ID. Skipping AppKit init.')
      return
    }

  } catch (error) {
    console.error('Failed to initialize AppKit:', error)
  }
})

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
