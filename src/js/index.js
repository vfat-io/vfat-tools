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

// Import Reown AppKit with minimal dependencies approach
import { createAppKit } from '@reown/appkit'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { REOWN_PROJECT_ID, customNetworks, appKitMetadata, appKitFeatures, NETWORKS, ETHEREUM_NODE_URL } from './config.js'

// Ethers5 adapter with custom networks
const ethers5Adapter = new Ethers5Adapter()

window.$ = $
window.ethers = ethers
window.ethcall = ethcall
window.matchSorter = matchSorter
window.asciichart = require("asciichart")
window.AsciiTable = require("./ascii-table")
window.lodash = lodash
window.Diff = require("diff")
window.ETHEREUM_NODE_URL = ETHEREUM_NODE_URL

// Import NETWORKS configuration from config.js
window.NETWORKS = NETWORKS

const infuraId = atob(window.ETHEREUM_NODE_URL).split('/').pop()

// Legacy compatibility layer for backwards compatibility
window.web3Modal = {
  cachedProvider: null,
  async connect() {
    try {
      if (window.appKit) {
        await window.appKit.open()
        this.cachedProvider = 'appkit'
        return window.appKit.getProvider ? window.appKit.getProvider() : window.ethereum
      }
      throw new Error('AppKit not initialized')
    } catch (error) {
      console.error('Connection error:', error)
      throw error
    }
  },
  clearCachedProvider() {
    this.cachedProvider = null
    if (window.appKit && window.appKit.disconnect) {
      window.appKit.disconnect()
    }
  },
  setCachedProvider(provider) {
    this.cachedProvider = provider
  }
}

// Simple initialization without complex UI dependencies
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Check if we have a project ID
    if (!REOWN_PROJECT_ID || REOWN_PROJECT_ID === 'YOUR_PROJECT_ID_HERE') {
      console.warn('AppKit: No project ID provided. Using fallback wallet connection.')
      return
    }

    window.appKit = createAppKit({
      adapters: [ethers5Adapter],
      projectId: REOWN_PROJECT_ID,
      networks: customNetworks,
      metadata: appKitMetadata,
      features: appKitFeatures
    })
    
    console.log('AppKit initialized successfully')
  } catch (error) {
    console.error('Failed to initialize AppKit:', error)
    console.warn('Falling back to legacy wallet connection methods')
  }
})

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
