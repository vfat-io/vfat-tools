import $ from "jquery"
import {ethers} from "ethers"
import * as ethcall from "ethcall"
import lodash from "lodash"
import {matchSorter} from "match-sorter"

import "picturefill"
import "utils/errors"
import "utils/validation"
import "utils/quick"
import "core-js/stable"
import "regenerator-runtime/runtime"

import { createAppKit } from '@reown/appkit'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { REOWN_PROJECT_ID, customNetworks, appKitMetadata, appKitFeatures, NETWORKS, ETHEREUM_NODE_URL } from './config.js'

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

window.NETWORKS = NETWORKS

const infuraId = atob(window.ETHEREUM_NODE_URL).split('/').pop()

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
  },
  
  async autoReconnect() {
    try {
      if (window.appKit && window.appKit.getAccount) {
        const account = window.appKit.getAccount()
        if (account && account.isConnected && account.address) {
          this.cachedProvider = 'appkit'
          return window.appKit.getProvider ? window.appKit.getProvider() : window.ethereum
        }
      }
      
      const hasStoredConnection = localStorage.getItem('@w3m/connected_wallet_image_url') || 
                                   localStorage.getItem('@w3m/wallet_id') ||
                                   localStorage.getItem('@w3m/connected_connector')
      
      if (hasStoredConnection && window.appKit) {
        return new Promise((resolve) => {
          setTimeout(() => {
            const account = window.appKit.getAccount()
            if (account && account.isConnected && account.address) {
              this.cachedProvider = 'appkit'
              resolve(window.appKit.getProvider ? window.appKit.getProvider() : window.ethereum)
            } else {
              resolve(null)
            }
          }, 500)
        })
      }
    } catch (error) {
      console.error('Auto-reconnect not available:', error)
    }
    return null
  }
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    if (!REOWN_PROJECT_ID || REOWN_PROJECT_ID === '') {
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
    
    setTimeout(async () => {
      try {
        if (!window.appKit || !window.appKit.getAccount) {
          setTimeout(async () => {
            try {
              const provider = await window.web3Modal.autoReconnect()
              if (provider) {
                const account = window.appKit?.getAccount()
                if (account && account.address) {
                  window.dispatchEvent(new CustomEvent('walletConnected', { 
                    detail: { address: account.address, provider: 'appkit' }
                  }))
                }
              }
            } catch (error) {
              console.error('Auto-reconnect check failed (retry):', error)
            }
          }, 1000)
          return
        }
        
        const provider = await window.web3Modal.autoReconnect()
        if (provider) {
          const account = window.appKit?.getAccount()
          if (account && account.address) {
            window.dispatchEvent(new CustomEvent('walletConnected', { 
              detail: { address: account.address, provider: 'appkit' }
            }))
          }
        }
      } catch (error) {
        console.error('Auto-reconnect check failed:', error)
      }
    }, 1000)

  } catch (error) {
    console.error('Failed to initialize AppKit:', error)
    console.warn('Falling back to legacy wallet connection methods')
  }
})

// eslint-disable-next-line no-console
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
