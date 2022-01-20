const DLP_ABI = [{"inputs":[{"internalType":"address","name":"_originToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferPrepared","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_NEW_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_OWNER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"originToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const DLP_DUAL_TOKEN_ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"increaseShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalShares","type":"uint256"}],"name":"BuyShares","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"borrower","type":"address"},{"indexed":false,"internalType":"address","name":"assetTo","type":"address"},{"indexed":false,"internalType":"uint256","name":"baseAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"name":"DODOFlashLoan","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"fromToken","type":"address"},{"indexed":false,"internalType":"address","name":"toToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"fromAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"toAmount","type":"uint256"},{"indexed":false,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"}],"name":"DODOSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"payer","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"decreaseShares","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalShares","type":"uint256"}],"name":"SellShares","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_PRICE_CUMULATIVE_LAST_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_RESERVE_","outputs":[{"internalType":"uint112","name":"","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BASE_TOKEN_","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_BLOCK_TIMESTAMP_LAST_","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_IS_OPEN_TWAP_","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_I_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_K_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_LP_FEE_RATE_","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_MAINTAINER_","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_MT_FEE_RATE_MODEL_","outputs":[{"internalType":"contract IFeeRateModel","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_QUOTE_RESERVE_","outputs":[{"internalType":"uint112","name":"","type":"uint112"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_QUOTE_TOKEN_","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"addressToShortString","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"buyShares","outputs":[{"internalType":"uint256","name":"shares","type":"uint256"},{"internalType":"uint256","name":"baseInput","type":"uint256"},{"internalType":"uint256","name":"quoteInput","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"uint256","name":"quoteAmount","type":"uint256"},{"internalType":"address","name":"assetTo","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"flashLoan","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getBaseInput","outputs":[{"internalType":"uint256","name":"input","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMidPrice","outputs":[{"internalType":"uint256","name":"midPrice","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPMMState","outputs":[{"components":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"K","type":"uint256"},{"internalType":"uint256","name":"B","type":"uint256"},{"internalType":"uint256","name":"Q","type":"uint256"},{"internalType":"uint256","name":"B0","type":"uint256"},{"internalType":"uint256","name":"Q0","type":"uint256"},{"internalType":"enum PMMPricing.RState","name":"R","type":"uint8"}],"internalType":"struct PMMPricing.PMMState","name":"state","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPMMStateForCall","outputs":[{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"K","type":"uint256"},{"internalType":"uint256","name":"B","type":"uint256"},{"internalType":"uint256","name":"Q","type":"uint256"},{"internalType":"uint256","name":"B0","type":"uint256"},{"internalType":"uint256","name":"Q0","type":"uint256"},{"internalType":"uint256","name":"R","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getQuoteInput","outputs":[{"internalType":"uint256","name":"input","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getUserFeeRate","outputs":[{"internalType":"uint256","name":"lpFeeRate","type":"uint256"},{"internalType":"uint256","name":"mtFeeRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVaultReserve","outputs":[{"internalType":"uint256","name":"baseReserve","type":"uint256"},{"internalType":"uint256","name":"quoteReserve","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"maintainer","type":"address"},{"internalType":"address","name":"baseTokenAddress","type":"address"},{"internalType":"address","name":"quoteTokenAddress","type":"address"},{"internalType":"uint256","name":"lpFeeRate","type":"uint256"},{"internalType":"address","name":"mtFeeRateModel","type":"address"},{"internalType":"uint256","name":"i","type":"uint256"},{"internalType":"uint256","name":"k","type":"uint256"},{"internalType":"bool","name":"isOpenTWAP","type":"bool"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint256","name":"payBaseAmount","type":"uint256"}],"name":"querySellBase","outputs":[{"internalType":"uint256","name":"receiveQuoteAmount","type":"uint256"},{"internalType":"uint256","name":"mtFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"trader","type":"address"},{"internalType":"uint256","name":"payQuoteAmount","type":"uint256"}],"name":"querySellQuote","outputs":[{"internalType":"uint256","name":"receiveBaseAmount","type":"uint256"},{"internalType":"uint256","name":"mtFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"sellBase","outputs":[{"internalType":"uint256","name":"receiveQuoteAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"sellQuote","outputs":[{"internalType":"uint256","name":"receiveBaseAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"shareAmount","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"baseMinAmount","type":"uint256"},{"internalType":"uint256","name":"quoteMinAmount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"sellShares","outputs":[{"internalType":"uint256","name":"baseAmount","type":"uint256"},{"internalType":"uint256","name":"quoteAmount","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"}]

let walletProvider = undefined

const networkNameFromId = function (id) {
  for(let network of Object.values(window.NETWORKS)) {
    let networkId = parseInt(network.chainId, 16)
    if (networkId === id) {
      return network.chainName
    }
  }
  return "Unknown Network"
}

const pageNetwork = function() {
  let network = window.location.pathname.split("/")[1]
  if (network.toLowerCase() === 'bsc') {
    return window.NETWORKS.BINANCE_SMART_CHAIN
  }
  if (network.toLowerCase() === 'arbitrum') {
    return window.NETWORKS.ARBITRUM
  }
  if (network.toLowerCase() === 'moonriver') {
    return window.NETWORKS.MOONRIVER
  }
  if (network.toLowerCase() === 'optimism') {
    return window.NETWORKS.OPTIMISM
  }
  if (network.toLowerCase() === 'heco') {
    return window.NETWORKS.HECO
  }
  if (network.toLowerCase() === 'polygon') {
    return window.NETWORKS.POLYGON
  }
  if (network.toLowerCase() === 'okex') {
    return window.NETWORKS.OKEX
  }
  if (network.toLowerCase() === 'emerald') {
    return window.NETWORKS.EMERALD
  }
  if (network.toLowerCase() === 'kcc') {
    return window.NETWORKS.KCC
  }
  if (network.toLowerCase() === 'xdai') {
    return window.NETWORKS.XDAI
  }
  if (network.toLowerCase() === 'fantom') {
    return window.NETWORKS.FANTOM
  }
  if (network.toLowerCase() === 'cronos') {
    return window.NETWORKS.CRONOS
  }
  if (network.toLowerCase() === 'harmony') {
    return window.NETWORKS.HARMONY_S0
  }
  if (network.toLowerCase() === 'velas') {
    return window.NETWORKS.VELAS
  }
  if (network.toLowerCase() === 'aurora') {
    return window.NETWORKS.AURORA
  }
  if (network.toLowerCase() === 'boba') {
    return window.NETWORKS.BOBA
  }
  if (network.toLowerCase() === 'avax') {
    return window.NETWORKS.AVALANCHE
  }
  if (network.toLowerCase() === 'fuse') {
    return window.NETWORKS.FUSE
  }
  if (network.toLowerCase() === 'thundercore') {
    return window.NETWORKS.THUNDERCORE
  }
  if (network.toLowerCase() === 'celo') {
    return window.NETWORKS.CELO
  }
  if (network.toLowerCase() === 'iotex') {
    return window.NETWORKS.IOTEX
  }
  if (network.toLowerCase() === 'smartbch') {
    return window.NETWORKS.SMARTBCH
  }
  if (network.toLowerCase() === 'polis') {
    return window.NETWORKS.POLIS
  }
  if (network.toLowerCase() === 'metis') {
    return window.NETWORKS.METIS
  }
  if (network.toLowerCase() === 'meter') {
    return window.NETWORKS.METER
  }

  return window.NETWORKS.ETHEREUM
}

const init_wallet = async function (callback) {

  let targetNetwork = pageNetwork()

  if (window.web3Modal.cachedProvider) {
    await connectWallet(() => {})
  }

  if (walletProvider) {

    let provider = new ethers.providers.Web3Provider(walletProvider)
    let connectedNetwork = await provider.getNetwork()
    let targetNetworkId = parseInt(targetNetwork.chainId, 16)

    if (connectedNetwork.chainId === targetNetworkId) {
      _print_link("[CHANGE WALLET]", changeWallet, "connect_wallet_button", false);
      _print_inline(' -=- ');
      _print_link("[CLEAR BROWSER STORAGE]", clearLocalStorage, "clear_browser_storage");
      start(callback);
    } else {
      _print(`You are connected to ${networkNameFromId(connectedNetwork.chainId)}, please switch to ${targetNetwork.chainName} network`)
      _print('')
      _print_link("[SWITCH NETWORK]", () => switchNetwork(targetNetwork), "connect_wallet_button", false)
      _print_inline(' -=- ');
      _print_link("[CLEAR BROWSER STORAGE]", clearLocalStorage, "clear_browser_storage");

      hideLoading()
    }
  } else {
    _print_link("[CONNECT WALLET]", () => connectWallet(callback), "connect_wallet_button", false);
    _print_inline(' -=- ');
    _print_link("[CLEAR BROWSER STORAGE]", clearLocalStorage, "clear_browser_storage");
    hideLoading()
  }
  _print('')
}

function clearLocalStorage() {
  localStorage.clear()
}

async function init_ethers() {
  const App = {}

  let isMetaMaskInstalled = true

  try {

    // Modern dapp browsers...
    if (walletProvider) {
      App.web3Provider = walletProvider
      App.provider = new ethers.providers.Web3Provider(walletProvider)
      try {
        // Request account access
        const accounts = await walletProvider.request({ method: 'eth_requestAccounts' })
        App.YOUR_ADDRESS = accounts[0];
      } catch (error) {
        // User denied account access...
        console.error('User denied account access')
      }
    }
    // If no injected web3 instance is detected, fall back to backup node
    else {
      App.provider = new ethers.providers.JsonRpcProvider(atob(window.ETHEREUM_NODE_URL))
      isMetaMaskInstalled = false
      _print(
        "You don't have MetaMask installed! Falling back to backup node...\n (will likely to fail. Please install MetaMask extension).\n"
      )
      sleep(10)
    }
    App.ethcallProvider = new ethcall.Provider();
    await App.ethcallProvider.init(App.provider);

    let addr = getUrlParameter('addr')

    //resolve ENS domain if possible
    if(typeof addr !== "undefined")
    {
      if (addr.includes('.eth')) {
        addr = await App.provider.resolveName(addr)
        if(addr == null)
        {
          _print("Could not initialize your ENS domain.\n")
        }
      }
      App.YOUR_ADDRESS = addr
    }

    // Could not load URL parameter
    if (!App.YOUR_ADDRESS) {
      if (!isMetaMaskInstalled) {
        if (localStorage.hasOwnProperty('addr')) {
          App.YOUR_ADDRESS = localStorage.getItem('addr')
        } else {
          App.YOUR_ADDRESS = window.prompt('Enter your eth address.')
        }
      } else {
        let accounts = await App.provider.listAccounts()
        App.YOUR_ADDRESS = accounts[0]
      }
    }

  } catch (e) {

  }

  if (!App.YOUR_ADDRESS || !ethers.utils.isAddress(App.YOUR_ADDRESS)) {
    throw 'Could not initialize your address. Make sure your address is checksum valid.'
  }

  localStorage.setItem('addr', App.YOUR_ADDRESS)

  return App
}

const switchNetwork = async function(network) {
    if (network.chainId === '0x1') {
        await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{chainId: network.chainId }]}).catch()
    } else {
        await window.ethereum.request({method: 'wallet_addEthereumChain', params: [network]}).catch()
    }
  window.location.reload()
}

const changeWallet = async function() {
  let cached = window.web3Modal.cachedProvider
  window.web3Modal.clearCachedProvider()
  await connectWallet(()=> window.location.reload() )
  if (!window.web3Modal.cachedProvider) {
    window.web3Modal.setCachedProvider(cached)
  }
}

const connectWallet = async function(callback) {
  try {
    walletProvider = await window.web3Modal.connect()

    walletProvider.on("accountsChanged", (accounts) => {
      if (accounts === undefined || accounts.length === 0) {
        window.web3Modal.clearCachedProvider()
      }
      window.location.reload()
    });

    walletProvider.on("chainChanged", (networkId) => {
      window.location.reload()
    });

    let targetNetwork = pageNetwork()
    let provider = new ethers.providers.Web3Provider(walletProvider)
    let connectedNetwork = await provider.getNetwork()
    let targetNetworkId = parseInt(targetNetwork.chainId, 16)

    if (connectedNetwork.chainId === targetNetworkId) {
      let button = document.getElementById('connect_wallet_button')
      button.textContent = "[CHANGE WALLET]"
      $(document).off('click', '#connect_wallet_button')
      $(document).on('click', '#connect_wallet_button', changeWallet)

      showLoading()

      start(callback)
    } else {

      let button = document.getElementById('connect_wallet_button')
      $(document).off('click', '#connect_wallet_button')
      button.remove()

      _print(`You are connected to ${networkNameFromId(connectedNetwork.chainId)}, please switch to ${targetNetwork.chainName} network`)
      if (window.ethereum && targetNetwork.chainId !== '0x1') {
        _print('')
        _print_link("[SWITCH NETWORK]", () => switchNetwork(targetNetwork), "connect_wallet_button")
      }
      hideLoading()
    }

  } catch(e) {}
}

const getUrlParameter = function(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i

  for (let i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
    }
  }
}

const toFixed = function(num, fixed) {
  const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
  const arr = num.toString().match(re)
  if (arr && arr.length > 0) {
    return arr[0]
  } else {
    return '0'
  }
}

const start = function(f) {
  f().catch(e => {
    _print(e)
    console.error(e)
    _print('Oops something went wrong. Try refreshing the page.')
  })
}

let logger

const consoleInit = function(callback) {
  logger = document.getElementById('log')
  _print(new Date().toString())
  _print('')
  return init_wallet(callback)
}

const _print_inline = function(message) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i])
    } else {
      logger.innerHTML += arguments[i]
    }
  }
}

const _print = function(message) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />'
    } else {
      logger.innerHTML += arguments[i] + '<br />'
    }
  }
}

const _print_bold = function(message) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] == 'object') {
      logger.innerHTML +=
        '<b>' + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '</b><br />'
    } else {
      logger.innerHTML += '<b>' + arguments[i] + '</b><br />'
    }
  }
}

const _print_link = function(message, onclickFunction, uuid = ID(), add_carriage = true) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  logger.innerHTML += '<a href="#" id=' + uuid + '>' + message + '</a>'
  if (add_carriage) {
    logger.innerHTML += '<br />'
  }

  $(document).on('click', '#' + uuid, function() {
    console.log('clicked')
    onclickFunction()
    return false
  })
}

const _print_href = function(message, href) {
  if (!logger) {
    logger = document.getElementById('log')
  }

  const uuid = ID()

  logger.innerHTML += `<a href="${href}" target="_blank" id="${uuid}">${message}</a><br />`
}

const sleep = function(milliseconds) {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : []

const lookUpPrices = async function(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/price?ids=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v;
    }
  }
  return prices
}

const lookUpTokenPrices = async function(id_array) {
  const prices = {}
  for (const id_chunk of chunk(id_array, 50)) {
    let ids = id_chunk.join('%2C')
    let res = await $.ajax({
      url: 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd',
      type: 'GET',
    })
    for (const [key, v] of Object.entries(res)) {
      if (v.usd) prices[key] = v;
    }
  }
  return prices
}

const lookUpPricesHistorical = async function(id, from, to) {
  return $.ajax({
    url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
    type: 'GET',
  })
}

const getBlockNumberFromTimestamp = async function(timestamp) {
    const res = await $.ajax({
        url: `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=XRFWK1IDBR545CXNJ6NQSYAVINUQB7IDV1`,
        type: 'GET',
    })

    return res.result;
}

const getSourceCode = async function(address) {
    return $.ajax({
        url: `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${address}&apikey=XRFWK1IDBR545CXNJ6NQSYAVINUQB7IDV1`,
        type: 'GET',
    })
}

const lookUpPricesSevenDays = async function(id) {
  const to = Date.now() / 1000
  const from = to - 604800
  return await lookUpPricesHistorical(id, from, to)
}

const getPricesSevenDaysStripped = async function(id) {
  const prices = await lookUpPricesSevenDays(id)
  return prices.prices.map(x => x[1])
}

const getHistoricalPricesStripped = async function(id, from, to) {
  const prices = await lookUpPricesHistorical(id, from, to)
  return prices.prices.map(x => x[1])
}

const getPrices24HoursStripped = async function(id) {
  const to = Date.now() / 1000
  const from = to - 24 * 60 * 60
  const prices = (await lookUpPricesHistorical(id, from, to)).prices

  let skipEveryTwo = 0

  const reducedArr = []

  for (let i = 0; i < prices.length; i++) {
    if (skipEveryTwo === 0) {
      reducedArr.push(prices[i][1])
    }
    skipEveryTwo++
    if (skipEveryTwo > 1) {
      skipEveryTwo = 0
    }
  }

  return reducedArr
}

const _print24HourPrice = async function(id, ticker) {
  _print('')
  try {
    const historicalPrices = await getPrices24HoursStripped(id)
    console.log(historicalPrices)
    const config = {
      height: 20, // any height you want,
    }

    const plotString = asciichart.plot(historicalPrices, config)
    _print(plotString)

    let i = 0
    while (plotString[i] !== '\n') {
      i++
    }

    const msg = `${ticker} chart past 24 hours`
    const space = i - msg.length > 0 ? (i - msg.length) / 2 : 0
    let leftSpacing = ''

    for (let i = 0; i < space; i++) {
      leftSpacing += ' '
    }

    _print(`${leftSpacing}${msg}\n`)
  } catch (e) {
    _print('Could not load historical price.')
    console.log(e)
  }
}

const getBlockTime = function() {
  _print('Fetching current block time...')
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://etherchain.org/api/basic_stats',
      type: 'GET',
      success: function(data, text) {
        if (data['currentStats'] && data['currentStats']['block_time']) {
          resolve(data['currentStats']['block_time'])
          return
        }

        _print(`Etherchain basic stats is invalid. ${data}`)
        _print('Using backup data...')
        resolve(BLOCK_TIME)
      },
      error: function(request, status, error) {
        _print('Could not get etherchain basic stats.')
        _print(request.responseText)
        _print('Using backup data...')
        resolve(BLOCK_TIME)
      },
    })
  })
}

const printBALRewards = async function(synthStakingPoolAddr, BALPrice, percentageOfBalancerPool) {}

const getLatestTotalBALAmount = async function(addr) {
  const bal_earnings = await getBALEarnings(addr, BAL_DISTRIBUTION_WEEK - 1)
  return bal_earnings[0]
}

const safeParseFloat = function(str) {
  let res = parseFloat(str)
  return res ? res : 0
}

const getBALEarnings = async function(addr, startWeek) {
  // SNX-usdc Redirect
  if (addr.toLowerCase() === '0xfbaedde70732540ce2b11a8ac58eb2dc0d69de10') {
    addr = '0xEb3107117FEAd7de89Cd14D463D340A2E6917769'
  }

  const bal_earnings = []

  for (let i = startWeek; i < BAL_DISTRIBUTION_WEEK; i++) {
    const data = await $.getJSON(`../../js/bal_rewards/week${i + 1}.json`)
    const earning_checksum = safeParseFloat(data[addr])

    if (earning_checksum === 0) {
      const earning = safeParseFloat(data[addr.toLowerCase()]) + earning_checksum
      bal_earnings.push(earning)
    } else {
      bal_earnings.push(earning_checksum)
    }
  }

  return bal_earnings
}

const get_synth_weekly_rewards = async function(synth_contract_instance) {
  if (await isRewardPeriodOver(synth_contract_instance)) {
    return 0
  }

  const rewardRate = await synth_contract_instance.rewardRate()
  return rewardRate / 1e18 * 604800;
}

const isRewardPeriodOver = async function(reward_contract_instance) {
  const now = Date.now() / 1000
  const periodFinish = await getPeriodFinishForReward(reward_contract_instance)
  return periodFinish < now
}

const getPeriodFinishForReward = async function(reward_contract_instance) {
  return await reward_contract_instance.periodFinish()
}

const ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

function sleep_async(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the the amount of time
 */
const forHumans = function(seconds) {
  const levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) % 60), 'seconds'],
  ]
  let returntext = ''

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue
    returntext +=
      ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1].substr(0, levels[i][1].length - 1) : levels[i][1])
  }

  return returntext.trim()
}

const showLoading = function() {
  $('.loader--1')
    .eq(0)
    .show()
}

const hideLoading = function() {
  $('.loader--1')
    .eq(0)
    .hide()
}

const toDollar = formatter.format

const rewardsContract_resetApprove = async function(stakeTokenAddr, rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)

  showLoading()

  STAKING_TOKEN.approve(rewardPoolAddr, 0)
    .then(function(t) {
      return App.provider.waitForTransaction(t.hash)
    })
    .catch(function() {
      hideLoading()
    })
}

const trimOrFillTo = function(str, n) {
  str = str + ''

  if (str.length < n) {
    str = str.padEnd(n, ' ')
  } else {
    str = str.substr(0, n - 4).padEnd(n, '.')
  }

  return str
}

const dao_deposit = async (App, DAO, DOLLAR) => {
  const signer = App.provider.getSigner();
  const balance = await DOLLAR.balanceOf(App.YOUR_ADDRESS);
  const allowed = await DOLLAR.allowance(App.YOUR_ADDRESS, DAO.address);
  if (allowed < balance) {
    showLoading();
    const tx = await DOLLAR.connect(signer).approve(DAO.address, ethers.constants.MaxUint256);
    await tx.wait();
  }
  if (balance > 0) {
    try {
      await DAO.connect(signer).deposit(balance, {gasLimit: 500000});
      hideLoading();
    }
    catch (ex) {
      hideLoading();
      console.log(ex);
      _print('Something went wrong.');
    }
  } else {
    alaert(`You have no tokens to deposit!`);
  }
}

const rewardsContract_stake = async function(stakeTokenAddr, rewardPoolAddr, App, maxAllowance) {
  const signer = App.provider.getSigner()

  const TEND_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const WEEBTEND_V2_TOKEN = new ethers.Contract(rewardPoolAddr, YFFI_REWARD_CONTRACT_ABI, signer)

  const balanceOf = await TEND_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const currentTEND =  maxAllowance ? (maxAllowance / 1e18 < balanceOf / 1e18
    ? maxAllowance : balanceOf) : balanceOf
  const allowedTEND = await TEND_TOKEN.allowance(App.YOUR_ADDRESS, rewardPoolAddr)

  let allow = Promise.resolve()

  if (allowedTEND / 1e18 < currentTEND / 1e18) {
    showLoading()
    allow = TEND_TOKEN.approve(rewardPoolAddr, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTEND / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
        WEEBTEND_V2_TOKEN.stake(currentTEND, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(x => {
            hideLoading()
            console.log(x);
            _print('Something went wrong.')
          })
      })
      .catch(x => {
        hideLoading()
        console.log(x);
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const rewardsContract_unstake = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.withdraw(currentStakedAmount, {gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsContract_movetoboardroom = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentEarnedAmount = await REWARD_POOL.earned(App.YOUR_ADDRESS)

  if (currentEarnedAmount > 0) {
    showLoading()
    REWARD_POOL.stakeInBoardroom({gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsContract_exit = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)
  const currentStakedAmount = (await REWARD_POOL.balanceOf(App.YOUR_ADDRESS)) / 1e18

  if (currentStakedAmount > 0) {
    showLoading()
    REWARD_POOL.exit({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const rewardsContract_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, Y_STAKING_POOL_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.getReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const boardroom_claim = async function(rewardPoolAddr, App) {
  const signer = App.provider.getSigner()

  const REWARD_POOL = new ethers.Contract(rewardPoolAddr, BOARDROOM_ABI, signer)

  console.log(App.YOUR_ADDRESS)

  const earnedYFFI = (await REWARD_POOL.earned(App.YOUR_ADDRESS)) / 1e18

  if (earnedYFFI > 0) {
    showLoading()
    REWARD_POOL.claimReward({gasLimit: 250000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const print_warning = function() {
  _print_bold('WARNING: DO NOT USE STAKE IN THIS POOL UNLESS YOU HAVE REVIEWED THE CONTRACTS.')
  _print_bold('         YOU ARE RESPONSIBLE FOR ANY FUNDS THAT YOU LOSE BY INTERACTING WITH THIS CONTRACT.\n')
}



const chefContract_stake = async function(chefAbi, chefAddress, poolIndex, stakeTokenAddr, App) {
  const signer = App.provider.getSigner()

  const STAKING_TOKEN = new ethers.Contract(stakeTokenAddr, ERC20_ABI, signer)
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentTokens = await STAKING_TOKEN.balanceOf(App.YOUR_ADDRESS)
  const allowedTokens = await STAKING_TOKEN.allowance(App.YOUR_ADDRESS, chefAddress)

  let allow = Promise.resolve()

  if (allowedTokens / 1e18 < currentTokens / 1e18) {
    showLoading()
    allow = STAKING_TOKEN.approve(chefAddress, ethers.constants.MaxUint256)
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
        alert('Try resetting your approval to 0 first')
      })
  }

  if (currentTokens / 1e18 > 0) {
    showLoading()
    allow
      .then(async function() {
          CHEF_CONTRACT.deposit(poolIndex, currentTokens, {gasLimit: 500000})
          .then(function(t) {
            App.provider.waitForTransaction(t.hash).then(function() {
              hideLoading()
            })
          })
          .catch(function() {
            hideLoading()
            _print('Something went wrong.')
          })
      })
      .catch(function() {
        hideLoading()
        _print('Something went wrong.')
      })
  } else {
    alert('You have no tokens to stake!!')
  }
}

const chefContract_unstake = async function(chefAbi, chefAddress, poolIndex, App, pendingRewardsFunction) {
  const signer = App.provider.getSigner()
  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount / 1e18 > 0) {
    showLoading()
    CHEF_CONTRACT.withdraw(poolIndex, currentStakedAmount, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

const chefContract_claim = async function(chefAbi, chefAddress, poolIndex, App,
    pendingRewardsFunction, claimFunction) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const earnedTokenAmount = await CHEF_CONTRACT.callStatic[pendingRewardsFunction](poolIndex, App.YOUR_ADDRESS) / 1e18

  if (earnedTokenAmount > 0) {
    showLoading()
    if (claimFunction) {
      claimFunction(poolIndex, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
    }
    else {
      CHEF_CONTRACT.deposit(poolIndex, 0, {gasLimit: 500000})
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
        })
    }
  }
}

const chefContract_emergencyWithdraw = async function(chefAbi, chefAddress, poolIndex, App) {
  const signer = App.provider.getSigner()

  const CHEF_CONTRACT = new ethers.Contract(chefAddress, chefAbi, signer)

  const currentStakedAmount = (await CHEF_CONTRACT.userInfo(poolIndex, App.YOUR_ADDRESS)).amount

  if (currentStakedAmount > 0) {
    showLoading()
    CHEF_CONTRACT.emergencyWithdraw(poolIndex, {gasLimit: 500000})
      .then(function(t) {
        return App.provider.waitForTransaction(t.hash)
      })
      .catch(function() {
        hideLoading()
      })
  }
}

async function getUniPool(app, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked]
    = await app.ethcallProvider.all(calls);
  let q0, q1, is1inch;
  try {
    const [reserves] = await app.ethcallProvider.all([pool.getReserves()]);
    q0 = reserves._reserve0;
    q1 = reserves._reserve1;
    is1inch = false;
  }
  catch { //for 1inch
    if (token0 == "0x0000000000000000000000000000000000000000") {
      q0 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c0 = new ethers.Contract(token0, ERC20_ABI, app.provider);
      q0 = await c0.balanceOf(poolAddress);
    }
    if (token1 == "0x0000000000000000000000000000000000000000") {
      q1 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c1 = new ethers.Contract(token1, ERC20_ABI, app.provider);
      q1 = await c1.balanceOf(poolAddress);
    }
    is1inch = true;
  }
  return {
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch
  };
}

async function getLixirPool(app, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked]
    = await app.ethcallProvider.all(calls);
  let q0, q1;
  const [reserves] = await app.ethcallProvider.all([pool.calculateTotals()]);
  q0 = reserves.total0;
  q1 = reserves.total1;
  return {
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
  };
}

async function getDodoDualPoolToken(app, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool._BASE_TOKEN_(), pool._QUOTE_TOKEN_(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked]
    = await app.ethcallProvider.all(calls);
  let q0, q1, is1inch;
  try {
    const [reserves] = await app.ethcallProvider.all([pool.getVaultReserve()]);
    q0 = reserves.baseReserve;
    q1 = reserves.quoteReserve;
    is1inch = false;
  }
  catch { //for 1inch
    if (token0 == "0x0000000000000000000000000000000000000000") {
      q0 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c0 = new ethers.Contract(token0, ERC20_ABI, app.provider);
      q0 = await c0.balanceOf(poolAddress);
    }
    if (token1 == "0x0000000000000000000000000000000000000000") {
      q1 = await app.provider.getBalance(poolAddress);
    }
    else {
      const c1 = new ethers.Contract(token1, ERC20_ABI, app.provider);
      q1 = await c1.balanceOf(poolAddress);
    }
    is1inch = true;
  }
  return {
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0,
      token1: token1,
      q1,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      is1inch
  };
}

async function getDlpPool(App, dlpPool, tokenAddress, originTokenAddress, stakingAddress){
  const ownerAddress = await dlpPool._OWNER_();
  const originToken = await getToken(App, originTokenAddress, ownerAddress);
  const totalSupply = await dlpPool.totalSupply();
  const name = await dlpPool.name();
  const decimals = await dlpPool.decimals();
  return {
    address : tokenAddress,
    name : name,
    symbol : name,
    totalSupply : totalSupply,
    decimals : decimals,
    staked : totalSupply / 10 ** decimals,
    unstaked : await dlpPool.balanceOf(App.YOUR_ADDRESS) / 10 ** decimals,
    token : originToken,
    balance : originToken.staked  * 10 ** originToken.decimals,
    contract : dlpPool,
    tokens : [originTokenAddress]
  }
}

async function getGelatoPool(app, pool, poolAddress, stakingAddress) {
  const calls = [
    pool.decimals(), pool.token0(), pool.token1(), pool.symbol(), pool.name(),
    pool.totalSupply(), pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS),
    pool.getUnderlyingBalances()
  ];
  const [decimals, token0, token1, symbol, name, totalSupply, staked, unstaked, reserves]
    = await app.ethcallProvider.all(calls);
  return {
      symbol,
      name,
      address: poolAddress,
      token0: token0,
      q0 : reserves.amount0Current,
      token1: token1,
      q1 : reserves.amount1Current,
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress: stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens : [token0, token1],
      isGelato : true
  };
}

async function getBalancerPool(app, pool, poolAddress, stakingAddress, tokens, smartToken) {
  const tokenCalls = tokens.map(t => [pool.getNormalizedWeight(t), pool.getBalance(t)]).flat();
  const calls = [pool.decimals(), pool.symbol(), pool.name(), pool.totalSupply(),
    pool.balanceOf(stakingAddress), pool.balanceOf(app.YOUR_ADDRESS)].concat(tokenCalls);
  const results = await app.ethcallProvider.all(calls);
  let [decimals, symbol, name, totalSupply, staked, unstaked, ] = results
  let poolTokens = [];
  let j = 0;
  for (let i = 6; i < results.length; i+=2) {
    poolTokens.push({
      address : tokens[j],
      weight: results[i] / 1e18,
      balance : results[i+1]
    })
    j++;
  };
  if (smartToken) {
    [totalSupply, staked, unstaked] = await app.ethcallProvider.all([smartToken.totalSupply(),
      smartToken.balanceOf(stakingAddress), smartToken.balanceOf(app.YOUR_ADDRESS)]);
  }
  return {
      symbol,
      name,
      address: poolAddress,
      poolTokens, //address, weight and balance
      totalSupply: totalSupply / 10 ** decimals,
      stakingAddress,
      staked: staked / 10 ** decimals,
      decimals: decimals,
      unstaked: unstaked / 10 ** decimals,
      contract: pool,
      tokens
  };
}

async function getJar(app, jar, address, stakingAddress) {
  const calls = [jar.decimals(), jar.token(), jar.name(), jar.symbol(), jar.totalSupply(),
    jar.balanceOf(stakingAddress), jar.balanceOf(app.YOUR_ADDRESS), jar.balance()];
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, token_, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : balance,
    contract: jar,
    tokens : [address].concat(token.tokens)
  }
}

async function getCurveToken(app, curve, address, stakingAddress, minterAddress) {
  const minter = new ethcall.Contract(minterAddress, MINTER_ABI)
  const [virtualPrice, coin0] = await app.ethcallProvider.all([minter.get_virtual_price(), minter.coins(0)]);
  const token = await getToken(app, coin0, address);
  const calls = [curve.decimals(), curve.balanceOf(stakingAddress), curve.balanceOf(app.YOUR_ADDRESS),
    curve.name(), curve.symbol(), curve.totalSupply()];
  const [decimals_, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  const decimals =  decimals_ / 1;
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getSaddleToken(app, saddle, address, stakingAddress, swapAddress) {
  const swap = new ethcall.Contract(swapAddress, SADDLE_SWAP_ABI)
  const [virtualPrice, coin0] = await app.ethcallProvider.all([swap.getVirtualPrice(), swap.getToken(0)]);
  const token = await getToken(app, coin0, address);
  const calls = [saddle.decimals(), saddle.balanceOf(stakingAddress), saddle.balanceOf(app.YOUR_ADDRESS),
    saddle.name(), saddle.symbol(), saddle.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: saddle,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getStableswapToken(app, stable, address, stakingAddress) {
  const calls = [stable.decimals(), stable.balanceOf(stakingAddress), stable.balanceOf(app.YOUR_ADDRESS),
    stable.name(), stable.symbol(), stable.totalSupply(), stable.get_virtual_price(), stable.coins(0)];
  const [decimals, staked, unstaked, name, symbol, totalSupply, virtualPrice, coin0]
    = await app.ethcallProvider.all(calls);
  const token = await getToken(app, coin0, address);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: stable,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getErc20(app, token, address, stakingAddress) {
  if (address == "0x0000000000000000000000000000000000000000" ||
      address == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
    return {
      address,
      name : "Ethereum",
      symbol : "ETH",
      totalSupply: 1e8,
      decimals: 18,
      staked: await app.provider.getBalance(stakingAddress) / 1e18,
      unstaked: await app.provider.getBalance(app.YOUR_ADDRESS) / 1e18,
      contract: null,
      tokens:[address]
    }
  }
  const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
    token.name(), token.symbol(), token.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: token,
      tokens : [address]
  };
}

async function getDSToken(app, token, address, stakingAddress) {
  const calls = [token.decimals(), token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
    token.name(), token.symbol(), token.totalSupply()];
  const [decimals, staked, unstaked, name, symbol, totalSupply] =
    await app.ethcallProvider.all(calls);
  return {
    address,
    name : hex_to_ascii(name),
    symbol : hex_to_ascii(symbol),
    totalSupply : totalSupply,
    decimals : decimals,
    staked:  staked / 10 ** decimals,
    unstaked: unstaked  / 10 ** decimals,
    contract: token,
    tokens : [address]
  };
}

async function getVault(app, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.underlying(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(app.YOUR_ADDRESS),
    vault.underlyingBalanceWithInvestment()];
  const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked, balance] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance,
    contract: vault,
    tokens : token.tokens
  }
}

async function getTokemakVault(app, vault, address, stakingAddress) {
  const calls = [vault.decimals(), vault.underlyer(), vault.name(), vault.symbol(),
    vault.totalSupply(), vault.balanceOf(stakingAddress), vault.balanceOf(app.YOUR_ADDRESS)];
  const [ decimals, underlying, name, symbol, totalSupply, staked, unstaked] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : totalSupply,
    contract: vault,
    tokens : token.tokens
  }
}

async function getCToken(app, cToken, address, stakingAddress) {
  const calls = [cToken.decimals(), cToken.underlying(), cToken.totalSupply(),
    cToken.name(), cToken.symbol(), cToken.balanceOf(stakingAddress),
    cToken.balanceOf(app.YOUR_ADDRESS), cToken.exchangeRateStored()];
  const [decimals, underlying, totalSupply, name, symbol, staked, unstaked, exchangeRate] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, underlying, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance: totalSupply * exchangeRate / 1e18,
    contract: cToken,
    tokens : [address].concat(token.tokens)
  }
}

async function getAngleToken(app, angelToken, address, stakingAddress) {
  const calls = [angelToken.decimals(), angelToken.totalSupply(),
    angelToken.name(), angelToken.symbol(), angelToken.balanceOf(stakingAddress),
    angelToken.balanceOf(app.YOUR_ADDRESS), angelToken.poolManager()];
  const [decimals, totalSupply, name, symbol, staked, unstaked, poolManager] =
    await app.ethcallProvider.all(calls);
  const POOL_MANAGER_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amountDistributed","type":"uint256"}],"name":"FeesDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"strategy","type":"address"},{"indexed":false,"internalType":"uint256","name":"debtRatio","type":"uint256"}],"name":"StrategyAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"strategy","type":"address"},{"indexed":false,"internalType":"uint256","name":"gain","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"loss","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"debtPayment","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalDebt","type":"uint256"}],"name":"StrategyReported","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"strategy","type":"address"}],"name":"StrategyRevoked","type":"event"},{"inputs":[],"name":"BASE_PARAMS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BASE_TOKENS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GOVERNOR_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GUARDIAN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STABLEMASTER_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"STRATEGY_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"addGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"uint256","name":"_debtRatio","type":"uint256"}],"name":"addStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"creditAvailable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"debtOutstanding","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"debtRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"governorList","type":"address[]"},{"internalType":"address","name":"guardian","type":"address"},{"internalType":"contract IPerpetualManager","name":"_perpetualManager","type":"address"},{"internalType":"contract IFeeManager","name":"_feeManager","type":"address"},{"internalType":"contract IOracle","name":"_oracle","type":"address"}],"name":"deployCollateral","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"estimatedAPR","outputs":[{"internalType":"uint256","name":"apr","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeManager","outputs":[{"internalType":"contract IFeeManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalAsset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"contract IStableMaster","name":"_stableMaster","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"perpetualManager","outputs":[{"internalType":"contract IPerpetualManager","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amountToRecover","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_governor","type":"address"}],"name":"removeGovernor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"gain","type":"uint256"},{"internalType":"uint256","name":"loss","type":"uint256"},{"internalType":"uint256","name":"debtPayment","type":"uint256"}],"name":"report","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"guardian","type":"address"}],"name":"revokeGuardian","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"}],"name":"revokeStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IFeeManager","name":"_feeManager","type":"address"}],"name":"setFeeManager","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_guardian","type":"address"},{"internalType":"address","name":"guardian","type":"address"}],"name":"setGuardian","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"}],"name":"setStrategyEmergencyExit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stableMaster","outputs":[{"internalType":"contract IStableMaster","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"strategies","outputs":[{"internalType":"uint256","name":"lastReport","type":"uint256"},{"internalType":"uint256","name":"totalStrategyDebt","type":"uint256"},{"internalType":"uint256","name":"debtRatio","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"strategyList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"strategy","type":"address"},{"internalType":"uint256","name":"_debtRatio","type":"uint256"}],"name":"updateStrategyDebtRatio","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IStrategy","name":"strategy","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawFromStrategy","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const poolManagerContract = new ethcall.Contract(poolManager, POOL_MANAGER_ABI);
  const [_token] = await app.ethcallProvider.all([poolManagerContract.token()]);
  const token = await getToken(app, _token, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance: totalSupply,
    contract: angelToken,
    tokens : [address].concat(token.tokens)
  }
}

function hex_to_ascii(str1)
{
 var hex  = str1.toString();
 var str = '';
 for (var n = 0; n < hex.length; n += 2) {
   str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
 }
 return str;
}

async function getNToken(app, token, address, stakingAddress) {
  const calls = [token.balanceOf(stakingAddress), token.balanceOf(app.YOUR_ADDRESS),
    token.name(), token.symbol(), token.totalSupply()];
  const [staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals : 0,
      staked:  staked * 1,
      unstaked: unstaked * 1,
      contract: token,
      tokens : [address]
  };
}

async function getYearnVault(app, yearn, address, stakingAddress) {
  const calls = [yearn.decimals(), yearn.token(), yearn.name(), yearn.symbol(), yearn.totalSupply(),
    yearn.balanceOf(stakingAddress), yearn.balanceOf(app.YOUR_ADDRESS), yearn.totalAssets(), yearn.pricePerShare()];
  const [decimals, token_, name, symbol, totalSupply, staked, unstaked, balance, ppfs] =
    await app.ethcallProvider.all(calls);
  const token = await getToken(app, token_, address);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals : decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    token: token,
    balance : balance / 10 ** decimals,
    contract: yearn,
    tokens : [address].concat(token.tokens),
    ppfs : ppfs / 10 ** decimals,
    yearn : true
  }
}

async function getCurveMinterToken(app, curve, address, stakingAddress) {
  const calls = [curve.get_virtual_price(), curve.coins(0), curve.decimals(), curve.balanceOf(stakingAddress),
                 curve.balanceOf(app.YOUR_ADDRESS), curve.name(), curve.symbol(), curve.totalSupply()];
  const [virtualPrice, coin0, decimals_, staked, unstaked, name, symbol, totalSupply] = await app.ethcallProvider.all(calls);
  const token = await getToken(app, coin0, address);
  const decimals =  decimals_ / 1;
  return {
      address,
      name,
      symbol,
      totalSupply,
      decimals,
      staked:  staked / 10 ** decimals,
      unstaked: unstaked  / 10 ** decimals,
      contract: curve,
      tokens : [address, coin0],
      token,
      virtualPrice : virtualPrice / 1e18
  };
}

async function getIronBankToken(app, ibToken, address, stakingAddress) {
  const calls = [ibToken.decimals(), ibToken.name(), ibToken.symbol(),
    ibToken.totalSupply(), ibToken.balanceOf(stakingAddress), ibToken.balanceOf(app.YOUR_ADDRESS)];
  const [ decimals, name, symbol, totalSupply, staked, unstaked] =
    await app.ethcallProvider.all(calls);
  return {
    address,
    name,
    symbol,
    totalSupply,
    decimals,
    staked: staked / 10 ** decimals,
    unstaked: unstaked / 10 ** decimals,
    balance : totalSupply,
    contract: ibToken
  }
}

async function getStoredToken(app, tokenAddress, stakingAddress, type) {
  switch (type) {
    case "uniswap":
      const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
      return await getUniPool(app, pool, tokenAddress, stakingAddress);
    case "lixir":
      const lixirPool = new ethcall.Contract(tokenAddress, LIXIR_TOKEN_ABI);
      return await getLixirPool(app, lixirPool, tokenAddress, stakingAddress);
    case "ironBank":
      const ironBankPool = new ethcall.Contract(tokenAddress, IRONBANK_TOKEN_ABI);
      return await getIronBankToken(app, ironBankPool, tokenAddress, stakingAddress);
    case "yearn":
      const yearnVault = new ethcall.Contract(tokenAddress, YEARN_VAULT_ABI);
      return await getYearnVault(app, yearnVault, tokenAddress, stakingAddress);
    case "doualDlp":
      const doualDlpPool = new ethcall.Contract(tokenAddress, DLP_DUAL_TOKEN_ABI);
      return await getDodoDualPoolToken(app, doualDlpPool, tokenAddress, stakingAddress);
    case "balancer":
      const bal = new ethcall.Contract(tokenAddress, BALANCER_POOL_ABI);
      const [tokens] = await app.ethcallProvider.all([bal.getFinalTokens()]);
      return await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
    case "angle":
      const angle = new ethcall.Contract(tokenAddress, ANGLE_POOL_ABI);
      return await getAngleToken(app, angle, tokenAddress, stakingAddress);
    case "balancerSmart":
      const sbal = new ethcall.Contract(tokenAddress, BPOOL_TOKEN_ABI);
      const [bPool] = await app.ethcallProvider.all([sbal.bPool()]);
      const bal2 = new ethcall.Contract(bPool, BPOOL_ABI);
      const [tokens2] = await app.ethcallProvider.all([bal2.getCurrentTokens()]);
      return await getBalancerPool(app, bal2, tokenAddress, stakingAddress, tokens2, sbal);
    case "jar":
      const jar = new ethcall.Contract(tokenAddress, JAR_ABI);
      return await getJar(app, jar, tokenAddress, stakingAddress);
    case "cToken":
      const cToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
      return await getCToken(app, cToken, tokenAddress, stakingAddress);
    case "dlp":
      const dlpPool = new ethers.Contract(tokenAddress, DLP_ABI, app.provider);
      const originTokenAddress = await dlpPool.originToken();
      return await getDlpPool(app, dlpPool, tokenAddress, originTokenAddress, stakingAddress);
    case "tokemak":
      const tokemak = new ethcall.Contract(tokenAddress, TOKEMAK_VAULT_ABI);
      return await getTokemakVault(app, tokemak, tokenAddress, stakingAddress);
    case "gelato":
      const gelato = new ethcall.Contract(tokenAddress, GELATO_ABI);
      return await getGelatoPool(app, gelato, tokenAddress, stakingAddress);
    case "vault":
      const vault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
      return await getVault(app, vault, tokenAddress, stakingAddress);
    case "erc20":
      const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
      return await getErc20(app, erc20, tokenAddress, stakingAddress);
    case "dsToken":
      const dsToken = new ethcall.Contract(tokenAddress, DSTOKEN_ABI);
      return await getDSToken(app, dsToken, tokenAddress, stakingAddress);
    case "NToken":
      const nToken = new ethcall.Contract(tokenAddress, N_TOKEN_ABI);
      return await getNToken(app, nToken, tokenAddress, stakingAddress);
    case "saddle":
      const saddle = new ethcall.Contract(tokenAddress, SADDLE_LP_TOKEN_ABI);
      const [swap] = await app.ethcallProvider.all([saddle.swap()]);
      return await getSaddleToken(app, saddle, tokenAddress, stakingAddress, swap);
    case "curve":
      const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
      if (tokenAddress.toLowerCase() == "0x88E11412BB21d137C217fd8b73982Dc0ED3665d7".toLowerCase()) {
        const minter = "0x3333333ACdEdBbC9Ad7bda0876e60714195681c5";
        return await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
      }
      const [minter] = await app.ethcallProvider.all([crv.minter()]);
      return await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
    case "curveRegistry":
      const crvRegistry = new ethcall.Contract(tokenAddress, CURVE_ABI);
      const registryAddress = "0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5";
      const registry = new ethcall.Contract(registryAddress, REGISTRY_ABI);
      const [minterAddress] = await app.ethcallProvider.all([registry.get_pool_from_lp_token(tokenAddress)]);
      return await getCurveToken(app, crvRegistry, tokenAddress, stakingAddress, minterAddress);
    case "curveWithMinter":
      const crvMinter = new ethcall.Contract(tokenAddress, CURVE_WITH_MINTER_ABI);
      const [virtualPrice] = await app.ethcallProvider.all([crvMinter.get_virtual_price()]);
      return await getCurveMinterToken(app, crvMinter, tokenAddress, stakingAddress);
    case "stableswap":
      const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
      return await getStableswapToken(app, stable, tokenAddress, stakingAddress);
  }
}

async function getToken(app, tokenAddress, stakingAddress) {
  if (tokenAddress == "0x0000000000000000000000000000000000000000" ||
      tokenAddress == "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
    return getErc20(app, null, tokenAddress, stakingAddress)
  }
  const type = window.localStorage.getItem(tokenAddress);
  //getTokenWeights
  if (type) return getStoredToken(app, tokenAddress, stakingAddress, type);
  try {
    const gelato = new ethcall.Contract(tokenAddress, GELATO_ABI);
    const [gelatoFactory] = await app.ethcallProvider.all([gelato.GELATO()]);
    const gelatoPool = await getGelatoPool(app, gelato, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "gelato");
    return gelatoPool;
  }
  catch(err) {
  }
  try {
    const lixirPool = new ethcall.Contract(tokenAddress, LIXIR_TOKEN_ABI);
    const _weth9 = await app.ethcallProvider.all([lixirPool.weth9()]);
    const lixir = await getLixirPool(app, lixirPool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "lixir");
    return lixir;
  }
  catch(err) {
  }
  try {
    const ironBankPool = new ethcall.Contract(tokenAddress, IRONBANK_TOKEN_ABI);
    const _ib = await app.ethcallProvider.all([ironBankPool.ib()]);
    const ironBank = await getIronBankToken(app, ironBankPool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "ironBank");
    return ironBank;
  }
  catch(err) {
  }
  try {
    const yearnVault = new ethcall.Contract(tokenAddress, YEARN_VAULT_ABI);
    const _domainSep = await app.ethcallProvider.all([yearnVault.DOMAIN_SEPARATOR()]);
    const yearn = await getYearnVault(app, yearnVault, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "yearn");
    return yearn;
  }
  catch(err) {
  }
  try {
    const nPool = new ethcall.Contract(tokenAddress, N_TOKEN_ABI);
    const _tokenByIndex = await app.ethcallProvider.all([nPool.tokenByIndex(0)]);
    const nToken = await getNToken(app, nPool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "NToken");
    return nToken;
  }
  catch(err) {
  }
  try {
    const pool = new ethcall.Contract(tokenAddress, UNI_ABI);
    const _token0 = await app.ethcallProvider.all([pool.token0()]);
    const uniPool = await getUniPool(app, pool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "uniswap");
    return uniPool;
  }
  catch(err) {
  }
  try {
    const pool = new ethcall.Contract(tokenAddress, DLP_DUAL_TOKEN_ABI);
    const _baseToken = await app.ethcallProvider.all([pool._BASE_TOKEN_()]);
    const doualDlpPool = await getDodoDualPoolToken(app, pool, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "doualDlp");
    return doualDlpPool;
  }
  catch(err) {
  }
  try {
    const bal = new ethcall.Contract(tokenAddress, BALANCER_POOL_ABI);
    const [tokens] = await app.ethcallProvider.all([bal.getFinalTokens()]);
    const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens);
    window.localStorage.setItem(tokenAddress, "balancer");
    return balPool;
  }
  catch(err) {
  }
  try {
    const angle = new ethcall.Contract(tokenAddress, ANGLE_POOL_ABI);
    const [_poolManager] = await app.ethcallProvider.all([angle.poolManager()]);
    const anglePool = await getAngleToken(app, angle, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "angle");
    return anglePool;
  }
  catch(err) {
  }
  try {
    const sbal = new ethcall.Contract(tokenAddress, BPOOL_TOKEN_ABI);
    const [bPool] = await app.ethcallProvider.all([sbal.bPool(), sbal.totalSupply()]);
    const bal = new ethcall.Contract(bPool, BPOOL_ABI);
    const [tokens] = await app.ethcallProvider.all([bal.getCurrentTokens()]);
    const balPool = await getBalancerPool(app, bal, tokenAddress, stakingAddress, tokens, sbal);
    window.localStorage.setItem(tokenAddress, "balancerSmart");
    return balPool;
  }
  catch(err) {
  }
  try {
    const pool = new ethers.Contract(tokenAddress, DLP_ABI, app.provider);
    const originTokenAddress = await pool.originToken();
    const dlpPool = await getDlpPool(app, pool, tokenAddress, originTokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "dlp");
    return dlpPool;
  }
  catch(err) {
  }
  try {
    const jar = new ethcall.Contract(tokenAddress, JAR_ABI);
    const _token = await app.ethcallProvider.all([jar.token()]);
    const res = await getJar(app, jar, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "jar");
    return res;
  }
  catch(err) {
  }
  try {
    const cToken = new ethcall.Contract(tokenAddress, CTOKEN_ABI);
    const _token = await app.ethcallProvider.all([cToken.underlying()]);
    const res = await getCToken(app, cToken, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "cToken");
    return res;
  }
  catch(err) {
  }
  try {
    const vault = new ethcall.Contract(tokenAddress, HARVEST_VAULT_ABI);
    const _token = await app.ethcallProvider.all([vault.underlying()]);
    const res = await getVault(app, vault, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "vault");
    return res;
  }
  catch(err) {
  }
  try {
    const vaultTokemak = new ethcall.Contract(tokenAddress, TOKEMAK_VAULT_ABI);
    const _token = await app.ethcallProvider.all([vaultTokemak.underlyer()]);
    const res = await getTokemakVault(app, vaultTokemak, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "tokemak");
    return res;
  }
  catch(err) {
  }
  try {
    const saddle = new ethcall.Contract(tokenAddress, SADDLE_LP_TOKEN_ABI);
    const [swap] = await app.ethcallProvider.all([saddle.swap()]);
    const res = await getSaddleToken(app, saddle, tokenAddress, stakingAddress, swap);
    window.localStorage.setItem(tokenAddress, "saddle");
    return res;
  }
  catch(err) {
  }
  try {
    const crv = new ethcall.Contract(tokenAddress, CURVE_ABI);
    if (tokenAddress.toLowerCase() == "0x88E11412BB21d137C217fd8b73982Dc0ED3665d7".toLowerCase()) {
      const minter = "0x3333333ACdEdBbC9Ad7bda0876e60714195681c5";
      const res = await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
      window.localStorage.setItem(tokenAddress, "curve");
      return res;
    }
    const [minter] = await app.ethcallProvider.all([crv.minter()]);
    const res = await getCurveToken(app, crv, tokenAddress, stakingAddress, minter);
    window.localStorage.setItem(tokenAddress, "curve");
    return res;
  }
  catch(err) {
  }
  try{
    const curveToken = new ethcall.Contract(tokenAddress, CURVE_ABI);
    const registryAddress = "0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5";
    const registry = new ethcall.Contract(registryAddress, REGISTRY_ABI);
    const [minterAddress] = await app.ethcallProvider.all([registry.get_pool_from_lp_token(tokenAddress)]);
    const res = await getCurveToken(app, curveToken, tokenAddress, stakingAddress, minterAddress);
    window.localStorage.setItem(tokenAddress, "curveRegistry");
    return res;
  }
  catch(err){
  }
  try{
    const curveMinterToken = new ethcall.Contract(tokenAddress, CURVE_WITH_MINTER_ABI);
    const [virtualPrice] = await app.ethcallProvider.all([curveMinterToken.get_virtual_price()]);
    const res = await getCurveMinterToken(app, curveMinterToken, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "curveWithMinter");
    return res;
  }
  catch(err){
  }
  try {
    const stable = new ethcall.Contract(tokenAddress, STABLESWAP_ABI);
    const _coin0 = await app.ethcallProvider.all([stable.coins(0)]);
    window.localStorage.setItem(tokenAddress, "stableswap");
    return await getStableswapToken(app, stable, tokenAddress, stakingAddress);
  }
  catch (err) {
  }
  try {
    const erc20 = new ethcall.Contract(tokenAddress, ERC20_ABI);
    const _name = await app.ethcallProvider.all([erc20.name()]);
    const erc20tok = await getErc20(app, erc20, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "erc20");
    return erc20tok;
  }
  catch(err) {
  }
  try {
    const dsToken = new ethcall.Contract(tokenAddress, DSTOKEN_ABI);
    const res = await getDSToken(app, dsToken, tokenAddress, stakingAddress);
    window.localStorage.setItem(tokenAddress, "dsToken");
    return res;
  }
  catch(err) {
    console.log(`Couldn't match ${tokenAddress} to any known token type.`);
  }
}

function getParameterCaseInsensitive(object, key) {
  return object[Object.keys(object)
    .find(k => k.toLowerCase() === key.toLowerCase())
  ];
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e)
  }
}

function getGelatoPrices(tokens, prices, pool, chain="eth")
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null || p1 == null) {
    console.log(`Missing prices for tokens ${pool.token0} and ${pool.token1}.`);
    return undefined;
  }
  if (t0?.decimals == null) {
    console.log(`Missing information for token ${pool.token0}.`);
    return undefined;
  }
  if (t1?.decimals == null) {
    console.log(`Missing information for token ${pool.token1}.`);
    return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${pool.name}]`;
  return {
    t0: t0,
    p0: p0,
    q0  : q0,
    t1: t1,
    p1: p1,
    q1  : q1,
    price: price,
    tvl : tvl,
    staked_tvl : staked_tvl,
    stakeTokenTicker : stakeTokenTicker,
    print_price(chain="eth") {
      const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
      const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
      const poolUrl = getChainExplorerUrl(chain, pool.address);
      _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a> Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
      _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
      _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price(userStaked) {
      var userPct = userStaked / pool.totalSupply;
      var q0user = userPct * q0;
      var q1user = userPct * q1;
      _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
    }
  }
}



function getUniPrices(tokens, prices, pool, chain="eth")
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null && p1 == null) {
    console.log(`Missing prices for tokens ${pool.token0} and ${pool.token1}.`);
    return undefined;
  }
  if (t0?.decimals == null) {
    console.log(`Missing information for token ${pool.token0}.`);
    return undefined;
  }
  if (t1?.decimals == null) {
    console.log(`Missing information for token ${pool.token1}.`);
    return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null)
  {
      p0 = q1 * p1 / q0;
      prices[pool.token0] = { usd : p0 };
  }
  if (p1 == null)
  {
      p1 = q0 * p0 / q1;
      prices[pool.token1] = { usd : p1 };
  }
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${t0.symbol}]-[${t1.symbol}]`;
  if (pool.is1inch) stakeTokenTicker += " 1INCH LP";
  else if (pool.symbol.includes("TETHYSLP")) stakeTokenTicker += " TETHYS LP";
  else if (pool.symbol.includes("LSLP")) stakeTokenTicker += " LSLP";
  else if (pool.symbol.includes("HBLP")) stakeTokenTicker += " Huckleberry LP";
  else if (pool.symbol.includes("BLP")) stakeTokenTicker += " BLP";
  else if (pool.symbol.includes("ZDEXLP")) stakeTokenTicker += " ZooDex LP";
  else if (pool.symbol.includes("OperaSwap")) stakeTokenTicker += " Opera Swap LP";
  else if (pool.symbol.includes("SLP")) stakeTokenTicker += " SLP";
  else if (pool.symbol.includes("Cake")) stakeTokenTicker += " Cake LP";
  else if (pool.name.includes("Value LP")) stakeTokenTicker += " Value LP";
  else if (pool.name.includes("Duneswap LP Token")) stakeTokenTicker += " Duneswap LP";
  else if (pool.symbol.includes("PGL")) stakeTokenTicker += " PGL";
  else if (pool.symbol.includes("JLP")) stakeTokenTicker += " JLP";
  else if (pool.symbol.includes("CS-LP")) stakeTokenTicker += " CSS LP";
  else if (pool.symbol.includes("DFYN")) stakeTokenTicker += " DFYN LP";
  else if (pool.symbol.includes("SPIRIT")) stakeTokenTicker += " SPIRIT LP";
  else if (pool.symbol.includes("spLP")) stakeTokenTicker += " SPOOKY LP";
  else if (pool.symbol.includes("Lv1")) stakeTokenTicker += " STEAK LP";
  else if (pool.symbol.includes("PLP")) stakeTokenTicker += " Pure Swap LP";
  else if (pool.symbol.includes("Field-LP")) stakeTokenTicker += " Yield Fields LP";
  else if (pool.symbol.includes("UPT")) stakeTokenTicker += " Unic Swap LP";
  else if (pool.symbol.includes("ELP")) stakeTokenTicker += " ELK LP";
  else if (pool.symbol.includes("BenSwap")) stakeTokenTicker += " BenSwap LP";
  else if (pool.name.includes("MISTswap LP Token")) stakeTokenTicker += " MistSwap LP";
  else if (pool.name.includes("TANGOswap LP Token")) stakeTokenTicker += " TangoSwap LP";
  else if (pool.symbol.includes("BRUSH-LP")) stakeTokenTicker += " BRUSH LP";
  else if (pool.symbol.includes("APE-LP")) stakeTokenTicker += " APE LP";
  else if (pool.symbol.includes("Galaxy-LP")) stakeTokenTicker += " Galaxy LP";
  else if (pool.symbol.includes("KUS-LP")) stakeTokenTicker += " KUS LP";
  else if (pool.symbol.includes("KoffeeMug")) stakeTokenTicker += " KoffeeMug";
  else if (pool.symbol.includes("DMM-LP")) stakeTokenTicker += " DMM-LP";
  else if (pool.symbol.includes("CAT-LP")) stakeTokenTicker += " PolyCat LP";
  else if (pool.symbol.includes("VLP")) stakeTokenTicker += " AURO LP";
  else if (pool.symbol.includes("DLP")) stakeTokenTicker += " DLP";
  else if (pool.symbol.includes("ULP")) stakeTokenTicker += " Ubeswap LP Token";
  else if (pool.symbol.includes("LOVE LP")) stakeTokenTicker += " Love Boat Love LP Token";
  else if (pool.symbol.includes("Proto-LP")) stakeTokenTicker += " ProtoFi LP Token";
  else if (pool.symbol.includes("SOUL-LP")) stakeTokenTicker += " Soulswap LP Token";
  else if (pool.symbol.includes("lv_")) stakeTokenTicker += " Lixir LP Token";
  else if (pool.symbol.includes("LOOT-LP")) stakeTokenTicker += " Loot LP Token";
  else if (pool.symbol.includes("MIMO-LP")) stakeTokenTicker += " Mimo LP Token";
  else if (pool.symbol.includes("HLP")) stakeTokenTicker += " Hades Swap LP Token";
  else if (pool.name.includes("1BCH LP Token")) stakeTokenTicker += " 1BCH LP";
  else if (pool.symbol.includes("MOCHI-LP")) stakeTokenTicker += " Mochi LP Token";
  else if (pool.symbol.includes("SMUG-LP")) stakeTokenTicker += " Smug LP Token";
  else if (pool.symbol.includes("VVS-LP")) stakeTokenTicker += " VVS LP Token";
  else if (pool.symbol.includes("Crona-LP")) stakeTokenTicker += " Crona LP Token";
  else if (pool.symbol.includes("Genesis-LP")) stakeTokenTicker += " Genesis LP Token";
  else if (pool.symbol.includes("Wagyu-LP")) stakeTokenTicker += " Wagyu LP Token";
  else if (pool.symbol.includes("OLP")) stakeTokenTicker += " Oolong LP Token";
  else if (pool.symbol.includes("TLP") && !pool.name.includes("Thorus LP")) stakeTokenTicker += " Trisolaris LP Token";
  else if (pool.symbol.includes("TLP") && pool.name.includes("Thorus LP")) stakeTokenTicker += " Thorus LP Token";
  else if (pool.symbol.includes("SCLP")) stakeTokenTicker += " SwapperChan LP Token";
  else stakeTokenTicker += " Uni LP";
  return {
      t0: t0,
      p0: p0,
      q0  : q0,
      t1: t1,
      p1: p1,
      q1  : q1,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price(chain="eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          const helperHrefs = helperUrls.length == 0 ? "" :
            ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
          _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
          _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
          _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
          _print(`Staked: ${pool.staked.toFixed(decimals ?? 4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);

        }
        else {
          const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
          pool.symbol.includes("TETHYSLP") ?  `https://info.tethys.finance/pair/${pool.address}` :
          pool.symbol.includes("LSLP") ? `https://info.linkswap.app/pair/${pool.address}` :
            pool.symbol.includes("SLP") ? (
              {
                "eth": `http://analytics.sushi.com/pairs/${pool.address}`,
                "arbitrum": `http://analytics-arbitrum.sushi.com/pairs/${pool.address}`,
                "bsc": `http://analytics-ftm.sushi.com/pairs/${pool.address}`,
                "fantom": `http://analytics-ftm.sushi.com/pairs/${pool.address}`,
                "matic": `http://analytics-polygon.sushi.com/pairs/${pool.address}`,
                "xdai": `https://analytics-xdai.sushi.com/pairs/${pool.address}`,
                "harmony": `https://analytics-harmony.sushi.com/pairs/${pool.address}`
              }[chain]) :
              pool.symbol.includes("Cake") ?  `https://pancakeswap.info/pair/${pool.address}` :
              pool.symbol.includes("CAT-LP") ?  `https://polycat.finance` :
              pool.symbol.includes("PGL") ?  `https://info.pangolin.exchange/#/pair/${pool.address}` :
              pool.symbol.includes("DMM-LP") ?  (
                {
                  "eth": `https://info.dmm.exchange/pair/${t0address}_${t1address}`,
                  "avax": `https://avax-info.dmm.exchange/pair/${t0address}_${t1address}`,
                  "bsc": `https://bsc-info.dmm.exchange/pair/${t0address}_${t1address}`,
                  "matic": `https://polygon-info.dmm.exchange/pair/${t0address}_${t1address}`
                }
              [chain]):
              pool.symbol.includes("CS-LP") ?  `https://app.coinswap.space/#/` :
              pool.name.includes("Value LP") ?  `https://info.vswap.fi/pool/${pool.address}` :
              pool.name.includes("Duneswap LP Token") ?  `https://explorer.emerald.oasis.dev/token/${pool.address}` :
              pool.symbol.includes("SCLP") ?  `https://analytics.swapperchan.com/pairs/${pool.address}` :
              pool.name.includes("Ubeswap") ?  `https://info.ubeswap.org/pair/${pool.address}` :
              pool.name.includes("OperaSwap") ?  `https://www.operaswap.finance/` :
              pool.symbol.includes("SPIRIT") ?  `https://swap.spiritswap.finance/#/swap` :
              pool.symbol.includes("spLP") ?  `https://info.spookyswap.finance/pair/${pool.address}` :
              pool.symbol.includes("Lv1") ?  `https://info.steakhouse.finance/pair/${pool.address}` :
              pool.symbol.includes("JLP") ?  `https://cchain.explorer.avax.network/address/${pool.address}` :
              pool.symbol.includes("ELP") ?  `https://app.elk.finance/#/swap` :
              pool.symbol.includes("BRUSH-LP") ?  `https://paintswap.finance` :
              pool.symbol.includes("PLP") ?  `https://exchange.pureswap.finance/#/swap` :
              pool.symbol.includes("HBLP") ?  `https://info.huckleberry.finance/pair/${pool.address}` :
              pool.symbol.includes("BLP") ?  `https://info.bakeryswap.org/#/pair/${pool.address}` :
              pool.symbol.includes("KUS-LP") ?  `https://kuswap.info/pair/#/${pool.address}` :
              pool.symbol.includes("Wagyu-LP") ?  `https://exchange.wagyuswap.app/info/pool/${pool.address}` :
              pool.symbol.includes("OLP") ?  `https://info.oolongswap.com/#/pair/${pool.address}` :
              pool.symbol.includes("KoffeeMug") ?  `https://koffeeswap.exchange/#/pro` :
              pool.symbol.includes("APE-LP") ?  `https://info.apeswap.finance/pair/${pool.address}` :
              pool.symbol.includes("VLP") ?  `https://info.viralata.finance/pair/${pool.address}` :
              pool.symbol.includes("DLP") ?  `https://app.dodoex.io/pool/list?${pool.address}` :
              pool.symbol.includes("ZDEXLP") ?  `https://charts.zoocoin.cash/?exchange=ZooDex&pair=${t0.symbol}-${t1.symbol}` :
              pool.symbol.includes("Field-LP") ?  `https://exchange.yieldfields.finance/#/swap` :
              pool.symbol.includes("MIMO-LP") ?  `https://v2.info.mimo.exchange/pair/${pool.address}` :
              pool.symbol.includes("MOCHI-LP") ?  `https://harmony.mochiswap.io/` :
              pool.symbol.includes("SMUG-LP") ?  `https://smugswap.com/` :
              pool.symbol.includes("UPT") ?  `https://www.app.unic.ly/#/discover` :
              pool.symbol.includes("lv_") ?  `https://app.lixir.finance/vaults/${pool.address}` :
              pool.symbol.includes("HLP") ?  `https://analytics.hadesswap.finance/pairs/${pool.address}` :
              pool.symbol.includes("LOOT-LP") ?  `https://analytics.lootswap.finance/pair/${pool.address}` :
              pool.symbol.includes("VVS-LP") ?  `https://vvs.finance/info/farm/${pool.address}` :
              pool.symbol.includes("TLP") && !pool.name.includes("Thorus LP") ?  `https://explorer.mainnet.aurora.dev/address/${pool.address}` :
              pool.symbol.includes("TLP") && !pool.name.includes("Thorus LP") ?  `https://snowtrace.io/address/${pool.address}` :
              pool.symbol.includes("Crona-LP") ?  `https://app.cronaswap.org/info/${pool.address}` : //wait for real version
              pool.symbol.includes("Genesis-LP") ?  `https://app.cronaswap.org/info/${pool.address}` : //wait for real version
              pool.symbol.includes("BenSwap") ? ({
                "bsc": `https://info.benswap.finance/pair/${pool.address}`,
                "smartbch": `https://info.benswap.cash/pair/${pool.address}`
              }[chain]) :
              pool.name.includes("MISTswap LP Token") ?  `https://analytics.mistswap.fi/pairs/${pool.address}` :
              pool.symbol.includes("Proto-LP") ? `https://polygonscan.com/${pool.address}` :
              pool.symbol.includes("Galaxy-LP") ? (
                {
                    "bsc": `https://bsc-exchange.galaxyfinance.one/#/swap`,
                    "heco": `https://heco-exchange.galaxyfinance.one/#/swap`,
                    "matic": `https://polygon-exchange.galaxyfinance.one/#/swap`,
                    "fantom": `https://fantom-exchange.galaxyfinance.one/#/swap`,
                }[chain]) :
              pool.symbol.includes("LOVE LP") ? ({
                "matic": `https://info.loveboat.exchange/pair/${pool.address}`
              }[chain]) :
              chain == "matic" ? `https://info.quickswap.exchange/pair/${pool.address}` :
            `http://v2.uniswap.info/pair/${pool.address}`;
          const helperUrls = pool.is1inch ? [] :
          pool.symbol.includes("LSLP") ? [
            `https://linkswap.app/#/add/${t0address}/${t1address}`,
            `https://linkswap.app/#/remove/${t0address}/${t1address}`,
            `https://linkswap.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("HBLP") ? [
            `https://www.huckleberry.finance/#/add/${t0address}/${t1address}`,
            `https://www.huckleberry.finance/#/remove/${t0address}/${t1address}`,
            `https://www.huckleberry.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("TLP") && !pool.name.includes("Thorus LP") ? [
            `https://www.trisolaris.io/#/add/${t0address}/${t1address}`,
            `https://www.trisolaris.io/#/remove/${t0address}/${t1address}`,
            `https://www.trisolaris.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("TLP") && pool.name.includes("Thorus LP") ? [
            `https://app.thorus.fi/add/${t0address}/${t1address}`,
            `https://app.thorus.fi/remove/${t0address}/${t1address}`,
            `https://app.thorus.fi/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("VVS") ? [
            `https://vvs.finance/add/${t0address}/${t1address}`,
            `https://vvs.finance/remove/${t0address}/${t1address}`,
            `https://vvs.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("OLP") ? [
            `https://oolongswap.com/#/add/${t0address}/${t1address}`,
            `https://oolongswap.com/#/remove/${t0address}/${t1address}`,
            `https://oolongswap.com/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SCLP") ? [
            `https://swapperchan.com/add/${t0address}/${t1address}`,
            `https://swapperchan.com/remove/${t0address}/${t1address}`,
            `https://swapperchan.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Crona-LP") ? [
            `https://app.cronaswap.org/add/${t0address}/${t1address}`,
            `https://app.cronaswap.org/remove/${t0address}/${t1address}`,
            `https://app.cronaswap.org/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Genesis-LP") ? [
            `https://app.cronaswap.org/add/${t0address}/${t1address}`,
            `https://app.cronaswap.org/remove/${t0address}/${t1address}`,
            `https://app.cronaswap.org/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BLP") ? [
            `https://www.bakeryswap.org/#/add/${t0address}/${t1address}`,
            `https://www.bakeryswap.org/#/remove/${t0address}/${t1address}`,
            `https://www.bakeryswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("HLP") ? [
            `https://hadesswap.finance/add/${t0address}/${t1address}`,
            `https://hadesswap.finance/remove/${t0address}/${t1address}`,
            `https://hadesswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("MOCHI-LP") ? [
            `https://harmony.mochiswap.io/add/${t0address}/${t1address}`,
            `https://harmony.mochiswap.io/remove/${t0address}/${t1address}`,
            `https://harmony.mochiswap.io/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("TETHYSLP") ? [
            `https://tethys.finance/pool/add?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://tethys.finance/pool/remove?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://tethys.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.name.includes("Duneswap LP Token") ? [
            `https://www.duneswap.com/exchange/add/${t0address}/${t1address}`,
            `https://www.duneswap.com/exchange/remove/${t0address}/${t1address}`,
            `https://www.duneswap.com/exchange/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SMUG-LP") ? [
            `https://smugswap.com/add/${t0address}/${t1address}`,
            `https://smugswap.com/remove/${t0address}/${t1address}`,
            `https://smugswap.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("lv_") ? [
            `https://app.lixir.finance/vaults/${pool.address}`,
            `https://app.lixir.finance/vaults/${pool.address}`,
            `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}&use=v2`
          ] :
          pool.symbol.includes("DMM-LP") ? [
            `https://dmm.exchange/#/add/${t0address}/${t1address}/${pool.address}`,
            `https://dmm.exchange/#/remove/${t0address}/${t1address}/${pool.address}`,
            `https://dmm.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]:
          pool.symbol.includes("Wagyu-LP") ? [
            `https://exchange.wagyuswap.app/add/${t0address}/${t1address}`,
            `https://exchange.wagyuswap.app/remove/${t0address}/${t1address}`,
            `https://exchange.wagyuswap.app/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]:
          pool.symbol.includes("LOOT-LP") ? [
            `https://legacy.lootswap.finance/#/add/${t0address}/${t1address}`,
            `https://legacy.lootswap.finance/#/remove/${t0address}/${t1address}`,
            `https://legacy.lootswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]:
          pool.symbol.includes("CAT-LP") ? [
            `https://trade.polycat.finance/#/add/${t0address}/${t1address}`,
            `https://trade.polycat.finance/#/remove/${t0address}/${t1address}`,
            `https://trade.polycat.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("APE-LP") ? [
            `https://app.apeswap.finance/add/${t0address}/${t1address}`,
            `https://app.apeswap.finance/remove/${t0address}/${t1address}`,
            `https://app.apeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ULP") ? [
            `https://app.ubeswap.org/#/add/${t0address}/${t1address}`,
            `https://app.ubeswap.org/#/remove/${t0address}/${t1address}`,
            `https://app.ubeswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("VLP") ? [
            `https://app.viralata.finance/add/${t0address}/${t1address}`,
            `https://app.viralata.finance/remove/${t0address}/${t1address}`,
            `https://app.viralata.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ZDEXLP") ? [
            `https://dex.zoocoin.cash/pool/add?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://dex.zoocoin.cash/pool/remove?inputCurrency=${t0address}&outputCurrency=${t1address}`,
            `https://dex.zoocoin.cash/orders/market?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Cake") ? [
            `https://pancakeswap.finance/add/${t0address}/${t1address}`,
            `https://pancakeswap.finance/remove/${t0address}/${t1address}`,
            `https://pancakeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Lv1") ? [ // adding before matic
            `https://swap.steakhouse.finance/#/add/${t0address}/${t1address}`,
            `https://swap.steakhouse.finance/#/remove/${t0address}/${t1address}`,
            `https://swap.steakhouse.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.name.includes("Value LP") ? [
            `https://bsc.valuedefi.io/#/add/${t0address}/${t1address}`,
            `https://bsc.valuedefi.io/#/remove/${t0address}/${t1address}`,
            `https://bsc.valuedefi.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("PGL") ? [
            `https://app.pangolin.exchange/#/add/${t0address}/${t1address}`,
            `https://app.pangolin.exchange/#/remove/${t0address}/${t1address}`,
            `https://app.pangolin.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("OperaSwap") ? [
            `https://exchange.operaswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.operaswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.operaswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("ELP") ? [
            `https://app.elk.finance/#/add/${t0address}/${t1address}`,
            `hhttps://app.elk.finance/#/remove/${t0address}/${t1address}`,
            `https://app.elk.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("DLP") ? [
            `https://app.dodoex.io/pool/list?${pool.address}`,
            `https://app.dodoex.io/pool/list?${pool.address}`,
            `https://app.dodoex.io/exchange/${t0address}-${t1address}`
          ] :
          pool.symbol.includes("CS-LP") ? [
            `https://app.coinswap.space/#/add/${t0address}/${t1address}`,
            `https://app.coinswap.space/#/remove/${t0address}/${t1address}`,
            `https://app.coinswap.space/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SLP") ? [
            `https://app.sushi.com/add/${t0address}/${t1address}`,
            `https://app.sushi.com/remove/${t0address}/${t1address}`,
            `https://app.sushi.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SPIRIT") ? [
            `https://swap.spiritswap.finance/add/${t0address}/${t1address}`,
            `https://swap.spiritswap.finance/remove/${t0address}/${t1address}`,
            `https://swap.spiritswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("SOUL-LP") ? [
            `https://app.soulswap.finance/add/${t0address}/${t1address}`,
            `https://app.soulswap.finance/remove/${t0address}/${t1address}`,
            `https://app.soulswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("spLP") ? [
            `https://spookyswap.finance/add/${t0address}/${t1address}`,
            `https://spookyswap.finance/remove/${t0address}/${t1address}`,
            `https://spookyswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("PLP") ? [
            `https://exchange.pureswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.pureswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.pureswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Proto-LP") ? [
            `https://dex.protofi.app/#/add/${t0address}/${t1address}`,
            `https://dex.protofi.app/#/remove/${t0address}/${t1address}`,
            `https://dex.protofi.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Field-LP") ? [
            `https://exchange.yieldfields.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.yieldfields.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.yieldfields.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("UPT") ? [
            `https://www.app.unic.ly/#/add/${t0address}/${t1address}`,
            `https://www.app.unic.ly/#/remove/${t0address}/${t1address}`,
            `https://www.app.unic.ly/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("MIMO-LP") ? [
            `https://exchange.zoomswap.io/#/add/${t0address}/${t1address}`,
            `https://exchange.zoomswap.io/#/remove/${t0address}/${t1address}`,
            `https://exchange.zoomswap.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BRUSH-LP") ? [
            `https://exchange.paintswap.finance/#/add/${t0address}/${t1address}`,
            `https://exchange.paintswap.finance/#/remove/${t0address}/${t1address}`,
            `https://exchange.paintswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("BenSwap") ? ({
            "bsc": [
              `https://dex.benswap.finance/#/add/${t0address}/${t1address}`,
              `https://dex.benswap.finance/#/remove/${t0address}/${t1address}`,
              `https://dex.benswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "smartbch": [
              `https://dex.benswap.cash/#/add/${t0address}/${t1address}`,
              `https://dex.benswap.cash/#/remove/${t0address}/${t1address}`,
              `https://dex.benswap.cash/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ]
          }[chain]) :
          pool.name.includes("MISTswap LP Token") ? [
            `https://app.mistswap.fi/add/${t0address}/${t1address}`,
            `https://app.mistswap.fi/remove/${t0address}/${t1address}`,
            `https://app.mistswap.fi/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.name.includes("TANGOswap LP Token") ? [
            `https://tangoswap.cash/add/${t0address}/${t1address}`,
            `https://tangoswap.cash/remove/${t0address}/${t1address}`,
            `https://tangoswap.cash/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.name.includes("1BCH LP Token") ? [
            `https://1bch.com/add/${t0address}/${t1address}`,
            `https://1bch.com/remove/${t0address}/${t1address}`,
            `https://1bch.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("Galaxy-LP") ? ({
            "bsc": [
              `https://bsc-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://bsc-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://bsc-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "heco": [
              `https://heco-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://heco-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://heco-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "polygon": [
              `https://polygon-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://polygon-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://polygon-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ],
            "fantom": [
              `https://fantom-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
              `https://fantom-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
              `https://fantom-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ]
          }[chain]) :
          chain=='matic'? [
            `https://quickswap.exchange/#/add/${t0address}/${t1address}`,
            `https://quickswap.exchange/#/remove/${t0address}/${t1address}`,
            `https://quickswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("KUS-LP") ? [
              `https://kuswap.finance/#/add/${t0address}/${t1address}`,
              `https://kuswap.finance/#/remove/${t0address}/${t1address}`,
              `https://kuswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ] :
          pool.symbol.includes("KoffeeMug") ? [
            `https://koffeeswap.exchange/#/add/${t0address}/${t1address}`,
            `https://koffeeswap.exchange/#/remove/${t0address}/${t1address}`,
            `https://koffeeswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
        ] :
          pool.symbol.includes("LOVE LP") ? ({
            "matic": [
              `https://loveboat.exchange/#/add/${t0address}/${t1address}`,
              `https://loveboat.exchange/#/remove/${t0address}/${t1address}`,
              `https://loveboat.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
            ]
          }[chain]) :
          [ `https://app.uniswap.org/#/add/v2/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/remove/v2/${t0address}/${t1address}`,
            `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}&use=v2` ]

          const helperHrefs = helperUrls.length == 0 ? "" :
            ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
          _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
          _print(`${t0.symbol} Price: $${displayPrice(p0)}`);
          _print(`${t1.symbol} Price: $${displayPrice(p1)}`);
          _print(`Staked: ${pool.staked.toFixed(decimals ?? 4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
        }
      },
      pair_links(chain="eth", decimals, customURLs) {
        const t0address = t0.symbol == "ETH" ? "ETH" : t0.address;
        const t1address = t1.symbol == "ETH" ? "ETH" : t1.address;
        if (customURLs) {
          const poolUrl = `${customURLs.info}/${pool.address}`
          const helperUrls = [
            `${customURLs.add}/${t0address}/${t1address}`,
            `${customURLs.remove}/${t0address}/${t1address}`,
            `${customURLs.swap}?inputCurrency=${t0address}&outputCurrency=${t1address}`
          ]
          return {
            pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
            add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
            remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
            swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
            token0: t0.symbol,
            price0: `$${displayPrice(p0)}`,
            token1: t1.symbol,
            price1: `$${displayPrice(p1)}`,
            total_staked: `${pool.staked.toFixed(4)}`,
            total_staked_dollars: `$${formatMoney(staked_tvl)}`,
            tvl: `$${formatMoney(tvl)}`
          }
        }
        else {
          const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
            pool.symbol.includes("LSLP") ? `https://info.linkswap.app/pair/${pool.address}` :
              pool.symbol.includes("SLP") ?  `http://analytics.sushi.com/pairs/${pool.address}` :
                pool.symbol.includes("Cake") ?  `https://pancakeswap.info/pair/${pool.address}` :
                  pool.symbol.includes("PGL") ?  `https://info.pangolin.exchange/#/pair/${pool.address}` :
                    pool.symbol.includes("CS-LP") ?  `https://app.coinswap.space/#/` :
                      pool.name.includes("Value LP") ?  `https://info.vswap.fi/pool/${pool.address}` :
                        pool.name.includes("BLP") ?  `https://info.bakeryswap.org/#/pair/${pool.address}` :
                          pool.symbol.includes("BenSwap") ? ({
                            "bsc": `https://info.benswap.finance/pair/${pool.address}`,
                            "smartbch": `https://info.benswap.cash/pair/${pool.address}`
                          }[chain]) :
                          pool.name.includes("MISTswap LP Token") ?  `http://analytics.mistswap.fi/pairs/${pool.address}` :
                          pool.symbol.includes("Galaxy-LP") ? ({
                            "bsc": `https://bsc-exchange.galaxyfinance.one/#/swap`,
                            "heco": `https://heco-exchange.galaxyfinance.one/#/swap`,
                            "polygon": `https://polygon-exchange.galaxyfinance.one/#/swap`,
                            "fantom": `https://fantom-exchange.galaxyfinance.one/#/swap`
                          }[chain]) :
                            chain == "matic" ? `https://info.quickswap.exchange/pair/${pool.address}` :
                              `http://v2.uniswap.info/pair/${pool.address}`;
          const helperUrls = pool.is1inch ? [] :
            pool.symbol.includes("LSLP") ? [
                `https://linkswap.app/#/add/${t0address}/${t1address}`,
                `https://linkswap.app/#/remove/${t0address}/${t1address}`,
                `https://linkswap.app/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
              ] :
              pool.symbol.includes("Cake") ? [
                  `https://pancakeswap.finance/add/${t0address}/${t1address}`,
                  `https://pancakeswap.finance/remove/${t0address}/${t1address}`,
                  `https://pancakeswap.finance/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                ] :
                chain=='matic'? [
                    `https://quickswap.exchange/#/add/${t0address}/${t1address}`,
                    `https://quickswap.exchange/#/remove/${t0address}/${t1address}`,
                    `https://quickswap.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                  ] :
                  pool.name.includes("Value LP") ? [
                      `https://bsc.valuedefi.io/#/add/${t0address}/${t1address}`,
                      `https://bsc.valuedefi.io/#/remove/${t0address}/${t1address}`,
                      `https://bsc.valuedefi.io/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                    ] :
                    pool.symbol.includes("PGL") ? [
                        `https://app.pangolin.exchange/#/add/${t0address}/${t1address}`,
                        `https://app.pangolin.exchange/#/remove/${t0address}/${t1address}`,
                        `https://app.pangolin.exchange/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                      ] :
                      pool.symbol.includes("CS-LP") ? [
                          `https://app.coinswap.space/#/add/${t0address}/${t1address}`,
                          `https://app.coinswap.space/#/remove/${t0address}/${t1address}`,
                          `https://app.coinswap.space/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                        ] :
                        pool.symbol.includes("SLP") ? [
                            `https://app.sushi.com/add/${t0address}/${t1address}`,
                            `https://app.sushi.com/remove/${t0address}/${t1address}`,
                            `https://app.sushi.com/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                          ] :
                          pool.symbol.includes("BenSwap") ? ({
                            "bsc": [
                              `https://dex.benswap.finance/#/add/${t0address}/${t1address}`,
                              `https://dex.benswap.finance/#/remove/${t0address}/${t1address}`,
                              `https://dex.benswap.finance/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "smartbch": [
                              `https://dex.benswap.cash/#/add/${t0address}/${t1address}`,
                              `https://dex.benswap.cash/#/remove/${t0address}/${t1address}`,
                              `https://dex.benswap.cash/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ]
                          }[chain]) :
                        pool.name.includes("MISTswap LP Token") ? [
                          `https://app.mistswap.fi/add/${t0address}/${t1address}`,
                          `https://app.mistswap.fi/remove/${t0address}/${t1address}`,
                          `https://app.mistswap.fi/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                        ] :
                        pool.name.includes("TANGOswap LP Token") ? [
                          `https://tangoswap.cash/add/${t0address}/${t1address}`,
                          `https://tangoswap.cash/remove/${t0address}/${t1address}`,
                          `https://tangoswap.cash/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                        ] :
                        pool.symbol.includes("Galaxy-LP") ? ({
                            "bsc": [
                            `https://bsc-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://bsc-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://bsc-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "heco": [
                            `https://heco-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://heco-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://heco-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "polygon": [
                            `https://polygon-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://polygon-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://polygon-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ],
                            "fantom": [
                            `https://fantom-exchange.galaxyfinance.one/#/add/${t0address}/${t1address}`,
                            `https://fantom-exchange.galaxyfinance.one/#/remove/${t0address}/${t1address}`,
                            `https://fantom-exchange.galaxyfinance.one/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}`
                            ]
                        }[chain]) :
                            [ `https://app.uniswap.org/#/add/v2/${t0address}/${t1address}`,
                              `https://app.uniswap.org/#/remove/v2/${t0address}/${t1address}`,
                              `https://app.uniswap.org/#/swap?inputCurrency=${t0address}&outputCurrency=${t1address}&use=v2` ]

          return {
            pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
            add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
            remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
            swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
            token0: t0.symbol,
            price0: `$${displayPrice(p0)}`,
            token1: t1.symbol,
            price1: `$${displayPrice(p1)}`,
            total_staked: `${pool.staked.toFixed(4)}`,
            total_staked_dollars: `$${formatMoney(staked_tvl)}`,
            tvl: `$${formatMoney(tvl)}`
          }

        }
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
  }
}

function getValuePrices(tokens, prices, pool)
{
  var t0 = getParameterCaseInsensitive(tokens,pool.token0);
  var p0 = getParameterCaseInsensitive(prices,pool.token0)?.usd;
  var t1 = getParameterCaseInsensitive(tokens,pool.token1);
  var p1 = getParameterCaseInsensitive(prices,pool.token1)?.usd;
  if (p0 == null && p1 == null) {
      return undefined;
  }
  var q0 = pool.q0 / 10 ** t0.decimals;
  var q1 = pool.q1 / 10 ** t1.decimals;
  if (p0 == null)
  {
      p0 = q1 * p1 / pool.w1 / q0 * pool.w0;
      prices[pool.token0] = { usd : p0 };
  }
  if (p1 == null)
  {
      p1 = q0 * p0 / pool.w0 / q1 * pool.w1;
      prices[pool.token1] = { usd : p1 };
  }
  var tvl = q0 * p0 + q1 * p1;
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  let stakeTokenTicker = `[${t0.symbol} ${pool.w0}%]-[${t1.symbol} ${pool.w1}%] Value-LP`;
  return {
      t0, p0, q0, w0 : pool.w0,
      t1, p1, q1, w1 : pool.w1,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price() {
        const poolUrl = `https://info.vswap.fi/pool/${pool.address}`
        const t0address = t0.address;
        const t1address =  t1.address;
        const helperUrls = [
          `https://bsc.valuedefi.io/#/add/${pool.address}`,
          `https://bsc.valuedefi.io/#/remove/${pool.address}`,
          `https://bsc.valuedefi.io/#/vswap?inputCurrency=${t0address}&outputCurrency=${t1address}`
        ]
        const helperHrefs = helperUrls.length == 0 ? "" :
          ` <a href='${helperUrls[0]}' target='_blank'>[+]</a> <a href='${helperUrls[1]}' target='_blank'>[-]</a> <a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`
        _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>${helperHrefs} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`${t0.symbol} Price: $${formatMoney(p0)}`)
        _print(`${t1.symbol} Price: $${formatMoney(p1)}`)
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      pair_links() {
        const poolUrl = `https://info.vswap.fi/pool/${pool.address}`
        const t0address = t0.address;
        const t1address =  t1.address;
        const helperUrls = [
          `https://bsc.valuedefi.io/#/add/${pool.address}`,
          `https://bsc.valuedefi.io/#/remove/${pool.address}`,
          `https://bsc.valuedefi.io/#/vswap?inputCurrency=${t0address}&outputCurrency=${t1address}`
        ]
        return {
          pair_link: `<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a>`,
          add_liquidity_link: `<a href='${helperUrls[0]}' target='_blank'>[+]</a>`,
          remove_liquidity_link: `<a href='${helperUrls[1]}' target='_blank'>[-]</a>`,
          swap_link: `<a href='${helperUrls[2]}' target='_blank'>[<=>]</a>`,
          token0: t0.symbol,
          price0: `$${displayPrice(p0)}`,
          token1: t1.symbol,
          price1: `$${displayPrice(p1)}`,
          total_staked: `${pool.staked.toFixed(4)}`,
          total_staked_dollars: `$${formatMoney(staked_tvl)}`,
          tvl: `$${formatMoney(tvl)}`,
        }
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var q0user = userPct * q0;
        var q1user = userPct * q1;
        _print(`Your LP tokens comprise of ${q0user.toFixed(4)} ${t0.symbol} + ${q1user.toFixed(4)} ${t1.symbol}`);
      }
  }
}

function getBalancerPrices(tokens, prices, pool)
{
  var poolTokens = pool.poolTokens.map(t => getParameterCaseInsensitive(tokens, t.address));
  var poolPrices = pool.poolTokens.map(t => getParameterCaseInsensitive(prices, t.address)?.usd);
  var quantities = poolTokens.map((t, i) => pool.poolTokens[i].balance / 10 ** t.decimals);
  var missing = poolPrices.map((x, i) => x ? -1 : i).filter(x => x >= 0);
  if (missing.length == poolPrices.length) {
    throw 'Every price is missing';
  }
  var notMissing = poolPrices.findIndex(p => p);
  const getMissingPrice = (missingQuantity, missingWeight) =>
    quantities[notMissing] * poolPrices[notMissing] * missingWeight
     / pool.poolTokens[notMissing].weight / missingQuantity;
  missing.map(i => {
    const newPrice = getMissingPrice(quantities[i], pool.poolTokens[i].weight);
    poolPrices[i] = newPrice;
    prices[poolTokens[i].address] = { usd : newPrice };
  });

  var tvl = poolPrices.map((p, i) => p * quantities[i]).reduce((x,y)=>x+y, 0);
  var price = tvl / pool.totalSupply;
  prices[pool.address] = { usd : price };
  var staked_tvl = pool.staked * price;
  var tickers = pool.poolTokens.map((pt, i) => `[${poolTokens[i].symbol} ${(pt.weight*100).toFixed(2)}%]`)
  const stakeTokenTicker = tickers.join('-');
  return {
      tokens : poolTokens,
      prices : poolPrices,
      quantities : quantities,
      price: price,
      tvl : tvl,
      staked_tvl : staked_tvl,
      stakeTokenTicker : stakeTokenTicker,
      print_price() {
        let poolUrl = `http://pools.balancer.exchange/#/pool/${pool.address}`;
        _print(`<a href='${poolUrl}' target='_blank'>${stakeTokenTicker}</a> BPT Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        poolPrices.forEach((p, i) =>
          _print(`${poolTokens[i].symbol} Price: $${formatMoney(p)}`)
        );
        _print(`Staked: ${pool.staked.toFixed(4)} ${stakeTokenTicker} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(userStaked) {
        var userPct = userStaked / pool.totalSupply;
        var userQs = quantities.map((q, i) => `${(q * userPct).toFixed(4)} ${poolTokens[i].symbol}`);
        _print(`Your LP tokens comprise of ${userQs.join(' + ')}`);
      }
  }
}

function getBunicornPrices(tokens, prices, pool)
{
    const result = getBalancerPrices(tokens, prices, pool);
    return { ...result, ...{
        print_price() {
            let poolUrl = `https://www.bunicorn.exchange/#/liquidity/tokens/detail/${pool.address}`;

            let lpPrice = result.price;
            if (pool.poolType && pool.poolType === 'stable') {
                const pairStr = pool.tokens.join('_');
                poolUrl = `https://www.bunicorn.exchange/#/liquidity/stablecoins/detail/${pairStr.toLowerCase()}/${pool.address}`;
                lpPrice = result.price / 2
            }
            _print(`<a href='${poolUrl}' target='_blank'>${result.stakeTokenTicker}</a> BPT Price: $${formatMoney(lpPrice)} TVL: $${formatMoney(result.tvl)}`);
            result.prices.forEach((p, i) =>
                _print(`${result.tokens[i].symbol} Price: $${formatMoney(p)}`)
            );
            _print(`Staked: ${pool.staked.toFixed(4)} ${result.stakeTokenTicker} ($${formatMoney(result.staked_tvl)})`);
        },
    }}
}

function getWrapPrices(tokens, prices, pool, chain)
{
  const wrappedToken = pool.token;
  if (wrappedToken.token0 != null) { //Uniswap
    const uniPrices = getUniPrices(tokens, prices, wrappedToken);
    const contractUrl = getChainExplorerUrl(chain, pool.address)
    const poolUrl = pool.is1inch ? "https://1inch.exchange/#/dao/pools" :
    pool.symbol.includes("SLP") ?  `http://analytics.sushi.com/pairs/${wrappedToken.address}` :
    (pool.symbol.includes("Cake") || pool.symbol.includes("Pancake")) ?  `http://pancakeswap.info/pair/${wrappedToken.address}`
      : `http://v2.uniswap.info/pair/${wrappedToken.address}`;
    const name = `<a href='${contractUrl}' target='_blank'>${pool.symbol}</a> (Wrapped <a href='${poolUrl}' target='_blank'>${uniPrices.stakeTokenTicker}</a>)`;
    const price = (pool.balance / 10 ** wrappedToken.decimals) * uniPrices.price / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.balance / 10 ** wrappedToken.decimals * price;
    const staked_tvl = pool.staked * price;

    prices[pool.address] = { usd : price };
    return {
      name : name,
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakeTokenTicker : pool.symbol,
      print_price() {
        _print(`${name} Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(_) {
      }
    }
  }
  else {
    let tokenPrice = 0;
    if (wrappedToken.token != null) { //e.g. stakedao crv token vault
      const pp = getPoolPrices(tokens, prices, wrappedToken.token)
      tokenPrice = pp.price;
    }
    else {
      tokenPrice = getParameterCaseInsensitive(prices, wrappedToken.address)?.usd;
    }
    const poolUrl = getChainExplorerUrl(chain, pool.token.address)
    const contractUrl = getChainExplorerUrl(chain, pool.address)
    const name = `<a href='${contractUrl}' target='_blank'>${pool.symbol}</a> (Wrapped <a href='${poolUrl}' target='_blank'>${wrappedToken.symbol}</a>)`;
    const price = (pool.balance / 10 ** wrappedToken.decimals) * tokenPrice / (pool.totalSupply / 10 ** pool.decimals);
    const tvl = pool.totalSupply / 10 ** pool.decimals * price
    const staked_tvl = pool.staked * price;
    prices[pool.address] = { usd : price };
    return {
      name: name,
      tvl : tvl,
      staked_tvl : staked_tvl,
      price : price,
      stakeTokenTicker : pool.symbol,
      print_price() {
        _print(`<a href='${poolUrl}' target='_blank'>${pool.symbol}</a> (Wrapped ${pool.token.name}) Price: $${formatMoney(price)} TVL: $${formatMoney(tvl)}`);
        _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
      },
      print_contained_price(_) {
      }
    }
  }
}

function getErc20Prices(prices, pool, chain="eth") {
  var price = getParameterCaseInsensitive(prices,pool.address)?.usd;
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  let poolUrl;
  switch (chain) {
    case "eth":
      poolUrl=`https://etherscan.io/token/${pool.address}`;
      break;
    case "bsc":
      poolUrl=`https://bscscan.com/token/${pool.address}`;
      break;
    case "heco":
      poolUrl=`https://hecoinfo.com//token/${pool.address}`;
      break;
    case "matic":
      poolUrl=`https://explorer-mainnet.maticvigil.com/address/${pool.address}`;
      break;
    case "okex":
      poolUrl=`https://www.oklink.com/okexchain/address/${pool.address}`;
      break;
    case "kcc":
      poolUrl=`https://explorer.kcc.io/en/address/${pool.address}`;
      break;
    case "avax":
      poolUrl=`https://cchain.explorer.avax.network/address/${pool.address}`;
      break;
    case "fantom":
      poolUrl=`https://ftmscan.com/token/${pool.address}`;
      break;
    case "emerald":
      poolUrl=`https://explorer.emerald.oasis.dev/token/${pool.address}`;
      break;
    case "metis":
      poolUrl=`https://andromeda-explorer.metis.io/token/${pool.address}`;
      break;
    case "meter":
      poolUrl=`https://scan.meter.io/token/${pool.address}`;
      break;
    case "cronos":
      poolUrl=`https://cronos.crypto.org/explorer/address/${pool.address}`;
      break;
    case "velas":
      poolUrl=`https://evmexplorer.velas.com/address/${pool.address}`;
      break;
    case "aurora":
      poolUrl=`https://explorer.mainnet.aurora.dev/address/${pool.address}`;
      break;
    case "boba":
      poolUrl=`https://blockexplorer.boba.network/address/${pool.address}`;
      break;
    case "optimism":
      poolUrl=`https://optimistic.etherscan.io/token/${pool.address}`;
      break;
    case "fuse":
      poolUrl=`https://explorer.fuse.io/address/${pool.address}`;
      break;
    case "xdai":
      poolUrl=`https://blockscout.com/xdai/mainnet/tokens/${pool.address}`;
      break;
    case "celo":
      poolUrl=`https://explorer.celo.org/address/${pool.address}`;
      break;
    case "iotex":
      poolUrl=`https://iotexscan.io/token/${pool.address}`;
      break;
    case "moonriver":
      poolUrl=`https://blockscout.moonriver.moonbeam.network/address/${pool.address}`;
      break;
    case "arbitrum":
      poolUrl=`https://arbiscan.io/address/${pool.address}`;
      break;
    case "smartbch":
      poolUrl=`https://smartscan.cash/address/${pool.address}`;
      break;
    case "harmony":
      poolUrl=`https://explorer.harmony.one/address/${pool.address}`;
      break;
    case "polis":
      poolUrl=`https://explorer.polis.tech/address/${pool.address}`;
      break;
  }

  const getDexguruTokenlink =  function() {
    const network = window.location.pathname.split("/")[1]
    let dexguruTokenlink = '';
    if (tvl > 0) {
      if (network && (network.toLowerCase() === 'bsc' || network.toLowerCase() === 'eth' || network.toLowerCase() === 'polygon')) {
        dexguruTokenlink =   `<a href='https://dex.guru/token/${pool.address.toLowerCase()}-${network.toLowerCase()}' rel='noopener' target='_blank'>[%]</a>`;
      }
      if (chain && (chain.toLowerCase() === 'bsc' || chain.toLowerCase() === 'eth' || chain.toLowerCase() === 'polygon')) {
        dexguruTokenlink =   `<a href='https://dex.guru/token/${pool.address.toLowerCase()}-${chain.toLowerCase()}' rel='noopener' target='_blank'>[%]</a>`;
      }
    }
    return dexguruTokenlink
  }

  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    tvl : tvl,
    print_price() {
      _print(`${name} Price: $${displayPrice(price)} Market Cap: $${formatMoney(tvl)} ${getDexguruTokenlink()}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    pair_links() {
      return {
        pair_link: name,
        add_liquidity_link: "",
        remove_liquidity_link: "",
        swap_link: "",
        price0: "",
        price1: "",
        total_staked: `${pool.staked.toFixed(4)}`,
        total_staked_dollars: `$${formatMoney(staked_tvl)}`,
        tvl: `$${formatMoney(tvl)}`
      }
    },
    print_contained_price() {
    }
  }
}

function getCurvePrices(prices, pool, chain) {
  var price;
    if(pool.token !=undefined){
        price = (getParameterCaseInsensitive(prices,pool.token.address)?.usd);
    }else{
        return {}
    }
  if(price){
    price = price * pool.virtualPrice;
  }else{
    switch(pool.token.address){
      case "0x8751D4196027d4e6DA63716fA7786B5174F04C15" : //wibBTC
        pool.token.address = "0xc4e15973e6ff2a35cc804c2cf9d2a1b817a8b40f" //ibBTC
    }
    price = getPoolPrices(pool.token.tokens, prices, pool.token, chain).price * pool.virtualPrice;
  }
  if (getParameterCaseInsensitive(prices, pool.address)?.usd ?? 0 == 0) {
    prices[pool.address] = { usd : price };
  }
  var tvl = pool.totalSupply * price / 10 ** pool.decimals;
  var staked_tvl = pool.staked * price;
  const poolUrl = getChainExplorerUrl(chain, pool.address);
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  const getDexguruTokenlink =  function() {
    const network = window.location.pathname.split("/")[1]
    let dexguruTokenlink = '';
    if (tvl > 0) {
      if (network && (network.toLowerCase() === 'bsc' || network.toLowerCase() === 'eth' || network.toLowerCase() === 'polygon')) {
        dexguruTokenlink =   `<a href='https://dex.guru/token/${pool.address.toLowerCase()}-${network.toLowerCase()}' rel='noopener' target='_blank'>[%]</a>`;
      }
    }
    return dexguruTokenlink
  }

  return {
    staked_tvl : staked_tvl,
    price : price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)} ${getDexguruTokenlink()}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    },
    tvl : tvl
  }
}

function getTriCryptoPrices(prices, pool, chain){
  let tvl = 0;
  for(let i = 0; i < pool.coins.length; i++){
    const price = (getParameterCaseInsensitive(prices,pool.coins[i].address).usd);
    if (getParameterCaseInsensitive(prices, pool.address)?.usd ?? 0 == 0) {
      prices[pool.address] = { usd : price };
    }
    tvl += pool.coins[i].balance * price;
  }
  const price = tvl / pool.totalSupply;
  const staked_tvl = pool.staked * price;
  const poolUrl = getChainExplorerUrl(chain, pool.address);
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  return {
    staked_tvl : staked_tvl,
    price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${formatMoney(price)} Market Cap: $${formatMoney(tvl)}`);
      _print(`Staked: ${pool.staked.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    },
    tvl : tvl
  }
}

function getYearnPrices(prices, pool, chain){
  let price = 0
  let underlyingPrice = getParameterCaseInsensitive(prices, pool.token.address)?.usd;
  if(underlyingPrice){
    price = underlyingPrice * pool.ppfs;
  }else{
    underlyingPrice = getPoolPrices(pool.token.tokens, prices, pool.token, chain).price;
    price = underlyingPrice * pool.ppfs;
  }
  const tvl = (pool.token.totalSupply / 10 ** pool.token.decimals) * price
  const staked_tvl = pool.balance * price;
  const poolUrl = getChainExplorerUrl(chain, pool.address);
  const name = `<a href='${poolUrl}' target='_blank'>${pool.symbol}</a>`;
  let decimals = 0

  if(price > 0.1){
    decimals = 2
  }else if(price > 0.01){
    decimals = 4
  }else if(price > 0.001){
    decimals = 5
  }else if(price > 0.0001){
    decimals = 6
  }else if(price > 0.00001){
    decimals = 7
  }else { decimals = 2; }

  return {
    staked_tvl : staked_tvl,
    price,
    stakeTokenTicker : pool.symbol,
    print_price() {
      _print(`${name} Price: $${price.toFixed(decimals)} Market Cap: $${formatMoney(tvl)}`);
      _print(`Staked: ${pool.balance.toFixed(4)} ${pool.symbol} ($${formatMoney(staked_tvl)})`);
    },
    print_contained_price() {
    },
    staked_tvl,
    tvl
  }
}

function getPoolPrices(tokens, prices, pool, chain = "eth") {
  if (pool.w0 != null) return getValuePrices(tokens, prices, pool);
  if (pool.buniPoolTokens != null) return getBunicornPrices(tokens, prices, pool);
  if (pool.poolTokens != null) return getBalancerPrices(tokens, prices, pool);
  if (pool.isGelato) return getGelatoPrices(tokens, prices, pool, chain);
  if (pool.token0 != null) return getUniPrices(tokens, prices, pool, chain);
  if (pool.xcp_profit != null) return getTriCryptoPrices(prices, pool, chain);
  if (pool.yearn) return getYearnPrices(prices, pool, chain);
  if (pool.virtualPrice != null) return getCurvePrices(prices, pool, chain); //should work for saddle too
  if (pool.token != null) return getWrapPrices(tokens, prices, pool, chain);
  return getErc20Prices(prices, pool, chain);
}

async function getPoolInfo(app, chefContract, chefAddress, poolIndex, pendingRewardsFunction, showAll=false) {
  const poolInfo = await chefContract.poolInfo(poolIndex);
  if (poolInfo.allocPoint == 0 && !showAll) {
    return {
      address: poolInfo.lpToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: null,
      userStaked : 0,
      pendingRewardTokens : 0,
      stakedToken : null,
      userLPStaked : 0,
      lastRewardBlock : poolInfo.lastRewardBlock
    };
  }
  const poolToken = await getToken(app, poolInfo.lpToken ?? poolInfo.stakingToken, chefAddress);
  const userInfo = await chefContract.userInfo(poolIndex, app.YOUR_ADDRESS);
  const pendingRewardTokens = await chefContract.callStatic[pendingRewardsFunction](poolIndex, app.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;
  var stakedToken;
  var userLPStaked;
  if (poolInfo.stakedHoldableToken != null &&
    poolInfo.stakedHoldableToken != "0x0000000000000000000000000000000000000000") {
    stakedToken = await getToken(app, poolInfo.stakedHoldableToken, chefAddress);
    userLPStaked = userInfo.stakedLPAmount / 10 ** poolToken.decimals
  }
  return {
      address: poolInfo.lpToken ?? poolInfo.stakingToken,
      allocPoints: poolInfo.allocPoint ?? 1,
      poolToken: poolToken,
      userStaked : staked,
      pendingRewardTokens : pendingRewardTokens / 10 ** 18,
      stakedToken : stakedToken,
      userLPStaked : userLPStaked,
      lastRewardBlock : poolInfo.lastRewardBlock
  };
}

function printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdPerWeek = poolRewardsPerWeek * rewardPrice;
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker} Per Week: ${poolRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdPerWeek)})`);
  var weeklyAPR = usdPerWeek / staked_tvl * 100;
  var dailyAPR = weeklyAPR / 7;
  var yearlyAPR = weeklyAPR * 52;
  _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userWeeklyRewards = userStakedPct * poolRewardsPerWeek / 100;
  var userDailyRewards = userWeeklyRewards / 7;
  var userYearlyRewards = userWeeklyRewards * 52;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${userDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(userDailyRewards*rewardPrice)})`
        + ` Week ${userWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(userWeeklyRewards*rewardPrice)})`
        + ` Year ${userYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(userYearlyRewards*rewardPrice)})`);
  }
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    yearlyAPR,
    userYearlyUsd : userYearlyRewards * rewardPrice
  }
}

function printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolAddress, pendingRewardsFunction,
    rewardTokenTicker, stakeTokenTicker, unstaked, userStaked, pendingRewardTokens, fixedDecimals,
    claimFunction, rewardTokenPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolIndex, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, poolIndex, App, pendingRewardsFunction, claimFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingRewardTokens.toFixed(fixedDecimals)} ${rewardTokenTicker} ($${formatMoney(pendingRewardTokens*rewardTokenPrice)})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

function printChefPool(App, chefAbi, chefAddr, prices, tokens, poolInfo, poolIndex, poolPrices,
                       totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
                       pendingRewardsFunction, fixedDecimals, claimFunction, chain="eth", depositFee=0, withdrawFee=0) {
  fixedDecimals = fixedDecimals ?? 2;
  const sp = (poolInfo.stakedToken == null) ? null : getPoolPrices(tokens, prices, poolInfo.stakedToken, chain);
  var poolRewardsPerWeek = poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek;
  if (poolRewardsPerWeek == 0 && rewardsPerWeek != 0) return;
  const userStaked = poolInfo.userLPStaked ?? poolInfo.userStaked;
  const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;
  const staked_tvl = sp?.staked_tvl ?? poolPrices.staked_tvl;
  _print_inline(`${poolIndex} - `);
  poolPrices.print_price(chain);
  sp?.print_price(chain);
  const apr = printAPR(rewardTokenTicker, rewardPrice, poolRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (poolInfo.userLPStaked > 0) sp?.print_contained_price(userStaked);
  if (poolInfo.userStaked > 0) poolPrices.print_contained_price(userStaked);
  printChefContractLinks(App, chefAbi, chefAddr, poolIndex, poolInfo.address, pendingRewardsFunction,
    rewardTokenTicker, poolPrices.stakeTokenTicker, poolInfo.poolToken.unstaked,
    poolInfo.userStaked, poolInfo.pendingRewardTokens, fixedDecimals, claimFunction, rewardPrice, chain, depositFee, withdrawFee);
  return apr;
}

async function loadChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction,
    extraPrices, deathPoolIndices, showAll) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const poolCount = parseInt(await chefContract.poolLength(), 10);
  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Found ${poolCount} pools.\n`)

  _print(`Showing incentivized pools only.\n`);

  var tokens = {};

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfos = await Promise.all([...Array(poolCount).keys()].map(async (x) => {
    try {
      return await getPoolInfo(App, chefContract, chefAddress, x, pendingRewardsFunction, showAll);
    }
    catch (ex) {
      console.log(`Error loading pool ${x}: ${ex}`);
      return null;
    }
  }));

  var tokenAddresses = [].concat.apply([], poolInfos.filter(x => x?.poolToken).map(x => x.poolToken.tokens));
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }
  //prices["0x194ebd173f6cdace046c53eacce9b953f28411d1"] = { usd : 1.22 } //"temporary" solution

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  if (deathPoolIndices) {   //load prices for the deathpool assets
    deathPoolIndices.map(i => poolInfos[i])
                     .map(poolInfo =>
      poolInfo.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken, "eth") : undefined);
  }

  const poolPrices = poolInfos.map(poolInfo => poolInfo?.poolToken ? getPoolPrices(tokens, prices, poolInfo.poolToken) : undefined);

  _print("Finished reading smart contracts.\n");

  let aprs = []
  for (let i = 0; i < poolCount; i++) {
    if (poolPrices[i]) {
      const apr = printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfos[i], i, poolPrices[i],
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction)
      aprs.push(apr);
    }
  }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

async function loadSingleChefPool(App, tokens, prices, chef, chefAddress, chefAbi, rewardTokenTicker,
    rewardTokenFunction, rewardsPerBlockFunction, rewardsPerWeekFixed, pendingRewardsFunction, poolIndex) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  const totalAllocPoints = await chefContract.totalAllocPoint();

  _print(`<a href='https://etherscan.io/address/${chefAddress}' target='_blank'>Staking Contract</a>`);
  _print(`Showing pool ${poolIndex} only.\n`);

  const rewardTokenAddress = await chefContract.callStatic[rewardTokenFunction]();
  const rewardToken = await getToken(App, rewardTokenAddress, chefAddress);
  const rewardsPerWeek = rewardsPerWeekFixed ??
    await chefContract.callStatic[rewardsPerBlockFunction]()
    / 10 ** rewardToken.decimals * 604800 / 13.5

  const poolInfo = await getPoolInfo(App, chefContract, chefAddress, poolIndex, pendingRewardsFunction);

  await getNewPricesAndTokens(App, tokens, prices, poolInfo.poolToken.tokens.concat([rewardTokenAddress]), chefAddress);

  const poolPrices = getPoolPrices(tokens, prices, poolInfo.poolToken);

  printChefPool(App, chefAbi, chefAddress, prices, tokens, poolInfo, poolIndex, poolPrices,
        totalAllocPoints, rewardsPerWeek, rewardTokenTicker, rewardTokenAddress,
        pendingRewardsFunction);
}

//ratio is used for multi-boardroom setups
async function loadBoardroom(App, prices, boardroomAddress, oracleAddress, lptAddress, rewardTokenAddress, stakeTicker, rewardTicker,
        epochsPerDay, maxSupplyIncrease, decimals, ratio, targetMantissa) {
    const BOARDROOM = new ethers.Contract(boardroomAddress, BOARDROOM_ABI, App.provider);
    const ORACLE = new ethers.Contract(oracleAddress, BASIS_ORACLE_ABI, App.provider);
    const share = await BOARDROOM.share();
    const SHARE = new ethers.Contract(share, ERC20_ABI, App.provider);
    const userUnstaked = await SHARE.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const sharePrice = getParameterCaseInsensitive(prices, share)?.usd;
    const userStaked = await BOARDROOM.balanceOf(App.YOUR_ADDRESS) / 1e18;
    const userStakedUsd = userStaked * sharePrice;
    const totalStaked = await BOARDROOM.totalSupply() / 1e18;
    const totalStakedUsd = totalStaked * sharePrice;
    const userPct = userStaked / totalStaked * 100;
    const earned = await BOARDROOM.earned(App.YOUR_ADDRESS) / 1e18;
    _print(`Boardroom`);
    _print(`There is a total ${totalStaked.toFixed(2)} ${stakeTicker} ($${formatMoney(totalStakedUsd)}) staked in the Boardroom.`)
    _print(`You are staking ${userStaked} ${stakeTicker} ($${formatMoney(userStakedUsd)}), ${userPct.toFixed(2)}% of the pool.`);

    const rewardPrice = getParameterCaseInsensitive(prices, rewardTokenAddress).usd;
    const oldTimestamp = await ORACLE.blockTimestampLast();
    const token0 = await ORACLE.token0();
    const token1 = await ORACLE.token1();
    let twap;
    if (token0.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice0 = await ORACLE.price0CumulativeLast();
        const [price0, , timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice0, oldTimestamp, price0, timestamp, targetMantissa);
    }
    else if (token1.toLowerCase() == rewardTokenAddress.toLowerCase()) {
        const oldPrice1 = await ORACLE.price1CumulativeLast();
        const [, price1, timestamp] = await getCurrentPriceAndTimestamp(App, lptAddress);
        twap = await calculateTwap(oldPrice1, oldTimestamp, price1, timestamp, targetMantissa);
    }
    if (twap > 1) {
        const REWARD_TOKEN = new ethers.Contract(rewardTokenAddress, ERC20_ABI, App.provider);
        const totalSupply = await REWARD_TOKEN.totalSupply() / (10 ** await REWARD_TOKEN.decimals());
        const newTokens = totalSupply *  Math.min(twap - 1, maxSupplyIncrease)  * ratio;
        _print(`There will be ${newTokens.toFixed(decimals)} ${rewardTicker} issued at next expansion.`);
        const boardReturn = newTokens * rewardPrice / totalStakedUsd * 100 * epochsPerDay;
        _print(`Boardroom APR: Day ${(boardReturn).toFixed(2)}% Week ${(boardReturn * 7).toFixed(2)}% Year ${(boardReturn * 365).toFixed(2)}%`)
    }

    const approveTENDAndStake = async () => rewardsContract_stake(share, boardroomAddress, App);
    const unstake = async () => rewardsContract_unstake(boardroomAddress, App);
    const claim = async () => boardroom_claim(boardroomAddress, App);
    const exit = async () =>  rewardsContract_exit(boardroomAddress, App);
    const revoke = async () => rewardsContract_resetApprove(share, boardroomAddress, App);

    _print_link(`Stake ${userUnstaked.toFixed(decimals)} ${stakeTicker}`, approveTENDAndStake)
    _print_link(`Unstake ${userStaked.toFixed(decimals)} ${stakeTicker}`, unstake)
    _print_link(`Claim ${earned.toFixed(decimals)} ${rewardTicker} ($${formatMoney(earned*rewardPrice)})`, claim)
    _print_link(`Revoke (set approval to 0)`, revoke)
    _print_link(`Exit`, exit)
    _print(`\n`);

    return { staked_tvl : totalStakedUsd };
}

async function loadSynthetixPoolInfo(App, tokens, prices, stakingAbi, stakingAddress,
  rewardTokenFunction, stakeTokenFunction) {
    const STAKING_POOL = new ethers.Contract(stakingAddress, stakingAbi, App.provider);
    const STAKING_MULTI = new ethcall.Contract(stakingAddress, stakingAbi);

    if (!STAKING_POOL.callStatic[stakeTokenFunction]) {
      console.log("Couldn't find stake function ", stakeTokenFunction);
    }
    const stakeTokenAddress = await STAKING_POOL.callStatic[stakeTokenFunction]();

    const rewardTokenAddress = await STAKING_POOL.callStatic[rewardTokenFunction]();

    var stakeToken = await getToken(App, stakeTokenAddress, stakingAddress);

    if (stakeTokenAddress.toLowerCase() === rewardTokenAddress.toLowerCase()) {
      stakeToken.staked = await STAKING_POOL.totalSupply() / 10 ** stakeToken.decimals;
    }

    var newPriceAddresses = stakeToken.tokens.filter(x =>
      x.toLowerCase() !=  "0xb34ab2f65c6e4f764ffe740ab83f982021faed6d" && //BSG can't be retrieved from Coingecko
      !getParameterCaseInsensitive(prices, x));
    var newPrices = await lookUpTokenPrices(newPriceAddresses);
    for (const key in newPrices) {
      if (newPrices[key]?.usd)
          prices[key] = newPrices[key];
    }
    var newTokenAddresses = stakeToken.tokens.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
    for (const address of newTokenAddresses) {
        tokens[address] = await getToken(App, address, stakingAddress);
    }
    if (!getParameterCaseInsensitive(tokens, rewardTokenAddress)) {
        tokens[rewardTokenAddress] = await getToken(App, rewardTokenAddress, stakingAddress);
    }
    const rewardToken = getParameterCaseInsensitive(tokens, rewardTokenAddress);

    const rewardTokenTicker = rewardToken.symbol;

    const poolPrices = getPoolPrices(tokens, prices, stakeToken);

    const stakeTokenTicker = poolPrices.stakeTokenTicker;

    const stakeTokenPrice =
        prices[stakeTokenAddress]?.usd ?? getParameterCaseInsensitive(prices, stakeTokenAddress)?.usd;
    const rewardTokenPrice = getParameterCaseInsensitive(prices, rewardTokenAddress)?.usd;

    const calls = [STAKING_MULTI.periodFinish(), STAKING_MULTI.rewardRate(),
      STAKING_MULTI.balanceOf(App.YOUR_ADDRESS), STAKING_MULTI.earned(App.YOUR_ADDRESS)]
    const [periodFinish, rewardRate, balance, earned_] = await App.ethcallProvider.all(calls);
    const weeklyRewards = (Date.now() / 1000 > periodFinish) ? 0 : rewardRate / 1e18 * 604800;

    const usdPerWeek = weeklyRewards * rewardTokenPrice;

    const staked_tvl = poolPrices.staked_tvl;

    const userStaked = balance / 10 ** stakeToken.decimals;

    const userUnstaked = stakeToken.unstaked;

    const earned = earned_ / 10 ** rewardToken.decimals;

    return  {
      stakingAddress,
      poolPrices,
      stakeTokenAddress,
      rewardTokenAddress,
      stakeTokenTicker,
      rewardTokenTicker,
      stakeTokenPrice,
      rewardTokenPrice,
      weeklyRewards,
      usdPerWeek,
      staked_tvl,
      userStaked,
      userUnstaked,
      earned
    }
}

async function printSynthetixPool(App, info, chain="eth", customURLs) {
    info.poolPrices.print_price(chain, 4, customURLs);
    _print(`${info.rewardTokenTicker} Per Week: ${info.weeklyRewards.toFixed(2)} ($${formatMoney(info.usdPerWeek)})`);
    const weeklyAPR = info.usdPerWeek / info.staked_tvl * 100;
    const dailyAPR = weeklyAPR / 7;
    const yearlyAPR = weeklyAPR * 52;
    _print(`APR: Day ${dailyAPR.toFixed(2)}% Week ${weeklyAPR.toFixed(2)}% Year ${yearlyAPR.toFixed(2)}%`);
    const userStakedUsd = info.userStaked * info.stakeTokenPrice;
    const userStakedPct = userStakedUsd / info.staked_tvl * 100;
    _print(`You are staking ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker} ` +
           `$${formatMoney(userStakedUsd)} (${userStakedPct.toFixed(2)}% of the pool).`);
    if (info.userStaked > 0) {
      info.poolPrices.print_contained_price(info.userStaked);
        const userWeeklyRewards = userStakedPct * info.weeklyRewards / 100;
        const userDailyRewards = userWeeklyRewards / 7;
        const userYearlyRewards = userWeeklyRewards * 52;
        _print(`Estimated ${info.rewardTokenTicker} earnings:`
            + ` Day ${userDailyRewards.toFixed(2)} ($${formatMoney(userDailyRewards*info.rewardTokenPrice)})`
            + ` Week ${userWeeklyRewards.toFixed(2)} ($${formatMoney(userWeeklyRewards*info.rewardTokenPrice)})`
            + ` Year ${userYearlyRewards.toFixed(2)} ($${formatMoney(userYearlyRewards*info.rewardTokenPrice)})`);
    }
    const approveTENDAndStake = async function() {
      return rewardsContract_stake(info.stakeTokenAddress, info.stakingAddress, App)
    }
    const unstake = async function() {
      return rewardsContract_unstake(info.stakingAddress, App)
    }
    const claim = async function() {
      return rewardsContract_claim(info.stakingAddress, App)
    }
    const exit = async function() {
      return rewardsContract_exit(info.stakingAddress, App)
    }
    const revoke = async function() {
      return rewardsContract_resetApprove(info.stakeTokenAddress, info.stakingAddress, App)
    }
    switch (chain) {
      case "eth":
        _print(`<a target="_blank" href="https://etherscan.io/address/${info.stakingAddress}#code">Etherscan</a>`);
        break;
      case "optimism":
        _print(`<a target="_blank" href="https://optimistic.etherscan.io/address/${info.stakingAddress}#code">Optimism</a>`);
        break;
      case "avax":
        _print(`<a target="_blank" href="https://cchain.explorer.avax.network/address/${info.stakingAddress}#code">Explorer</a>`);
        break;
      case "bsc":
        _print(`<a target="_blank" href="https://bscscan.com/address/${info.stakingAddress}#code">BSC Scan</a>`);
        break;
      case "heco":
        _print(`<a target="_blank" href="https://hecoinfo.com/address/${info.stakingAddress}#code">Heco Scan</a>`);
        break;
      case "matic":
        _print(`<a target="_blank" href="https://explorer-mainnet.maticvigil.com/address/${info.stakingAddress}#code">Polygon Explorer</a>`);
        break;
      case "okex":
        _print(`<a target="_blank" href="https://www.oklink.com/okexchain/address/${info.stakingAddress}#code">Okex Explorer</a>`);
        break;
      case "kcc":
        _print(`<a target="_blank" href="https://explorer.kcc.io/en/address/${info.stakingAddress}#code">KUCOIN Explorer</a>`);
        break;
      case "fantom":
        _print(`<a target="_blank" href="https://ftmscan.com/address/${info.stakingAddress}#code">FTM Scan</a>`);
        break;
      case "emerald":
        _print(`<a target="_blank" href="https://explorer.emerald.oasis.dev/address/${info.stakingAddress}#code">FTM Scan</a>`);
        break;
      case "metis":
        _print(`<a target="_blank" href="https://andromeda-explorer.metis.io/address/${info.stakingAddress}#code">Andromeda Explorer</a>`);
        break;
      case "meter":
        _print(`<a target="_blank" href="https://scan.meter.io/address/${info.stakingAddress}#code">Andromeda Explorer</a>`);
        break;
      case "cronos":
        _print(`<a target="_blank" href="https://cronos.crypto.org/explorer/address/${info.stakingAddress}#code">Cronos Scan</a>`);
        break;
      case "velas":
        _print(`<a target="_blank" href="https://evmexplorer.velas.com/address/${info.stakingAddress}#code">Velas Scan</a>`);
        break;
      case "aurora":
        _print(`<a target="_blank" href="https://explorer.mainnet.aurora.dev/address/${info.stakingAddress}#code">Aurora Explorer</a>`);
        break;
      case "boba":
        _print(`<a target="_blank" href="https://blockexplorer.boba.network/address/${info.stakingAddress}#code">Boba Explorer</a>`);
        break;
      case "fuse":
        _print(`<a target="_blank" href="https://explorer.fuse.io/address/${info.stakingAddress}#code">FUSE Scan</a>`);
        break;
      case "xdai":
        _print(`<a target="_blank" href="https://blockscout.com/xdai/mainnet/address/${info.stakingAddress}/contracts">Explorer</a>`);
        break;
      case "celo":
        _print(`<a target="_blank" href="https://explorer.celo.org/address/${info.stakingAddress}/contracts">Celo Explorer</a>`);
        break;
      case "iotex":
          _print(`<a target="_blank" href="https://iotexscan.io/address/${info.stakingAddress}#code">IoTeX Explorer</a>`);
          break;
      case "arbitrum":
        _print(`<a target="_blank" href="https://arbiscan.io/address/${info.stakingAddress}#code">Arbitrum Explorer</a>`);
        break;
      case "smartbch":
        _print(`<a target="_blank" href="https://smartscan.cash/address/${info.stakingAddress}#code">SmartScan</a>`);
        break;
      case "harmony":
        _print(`<a target="_blank" href="https://explorer.harmony.one/address/${info.stakingAddress}#code">Harmony Explorer</a>`);
        break;
    }
    if (info.stakeTokenAddress != "0x0000000000000000000000000000000000000000") {
      _print_link(`Stake ${info.userUnstaked.toFixed(6)} ${info.stakeTokenTicker}`, approveTENDAndStake)
    }
    else {
      _print(`Please use the official website to stake ${info.stakeTokenTicker}.`);
    }
    _print_link(`Unstake ${info.userStaked.toFixed(6)} ${info.stakeTokenTicker}`, unstake)
    _print_link(`Claim ${info.earned.toFixed(6)} ${info.rewardTokenTicker} ($${formatMoney(info.earned*info.rewardTokenPrice)})`, claim)
    if (info.stakeTokenTicker != "ETH") {
      _print_link(`Revoke (set approval to 0)`, revoke)
    }
    _print_link(`Exit`, exit)
    _print("");

    return {
        staked_tvl: info.poolPrices.staked_tvl,
        userStaked : userStakedUsd,
        apr : yearlyAPR
    }
}

async function loadSynthetixPool(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction) {
  const info = await loadSynthetixPoolInfo(App, tokens, prices, abi, address, rewardTokenFunction, stakeTokenFunction);
  return await printSynthetixPool(App, info);
}

async function loadMultipleSynthetixPools(App, tokens, prices, pools) {
  let totalStaked  = 0, totalUserStaked = 0, individualAPRs = [];
  const infos = await Promise.all(pools.map(p =>
    loadSynthetixPoolInfo(App, tokens, prices, p.abi, p.address, p.rewardTokenFunction, p.stakeTokenFunction)));
  for (const i of infos) {
    let p = await printSynthetixPool(App, i);
    totalStaked += p.staked_tvl || 0;
    totalUserStaked += p.userStaked || 0;
    if (p.userStaked > 0) {
      individualAPRs.push(p.userStaked * p.apr / 100);
    }
  }
  let totalAPR = totalUserStaked == 0 ? 0 : individualAPRs.reduce((x,y)=>x+y, 0) / totalUserStaked;
  return { staked_tvl : totalStaked, totalUserStaked, totalAPR };
}

async function loadBasisFork(data) {
    const App = await init_ethers();

    _print(`Initialized ${App.YOUR_ADDRESS}`);
    _print("Reading smart contracts...\n");

    var tokens = {};
    var prices = {};
    var totalStaked = 0;

    let p1 = await loadSynthetixPool(App, tokens, prices, data.PoolABI,
        data.SharePool.address, data.SharePool.rewardToken, data.SharePool.stakeToken);
    totalStaked += p1.staked_tvl;

    if (data.SharePool2) {
      let p3 = await loadSynthetixPool(App, tokens, prices, data.PoolABI,
          data.SharePool2.address, data.SharePool2.rewardToken, data.SharePool2.stakeToken);
      totalStaked += p3.staked_tvl;
    }

    let p2 = await loadSynthetixPool(App, tokens, prices, data.PoolABI,
        data.CashPool.address, data.CashPool.rewardToken, data.CashPool.stakeToken);
    totalStaked += p2.staked_tvl;

    if (data.SeedBanks) {
      let p = await loadMultipleSynthetixPools(App, tokens, prices, data.SeedBanks)
      totalStaked += p.staked_tvl;
      if (p.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p.totalUserStaked)} at an APR of ${(p.totalAPR * 100).toFixed(2)}%\n`);
      }
    }

    if (!data.SeedBanks)
    {
      if (data.Boardrooms) {
        for (const boardroom of data.Boardrooms) {
          let br = await loadBoardroom(App, prices, boardroom.address, data.Oracle, data.UniswapLP, data.Cash,
              data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
              data.Decimals, boardroom.ratio, data.TargetMantissa);
          totalStaked += br.staked_tvl;
        }
      }
      else {
        let br = await loadBoardroom(App, prices, data.Boardroom, data.Oracle, data.UniswapLP, data.Cash,
            data.ShareTicker, data.CashTicker, data.ExpansionsPerDay, data.MaximumExpansion,
            data.Decimals, 1, data.TargetMantissa);
        totalStaked += br.staked_tvl;
      }
    }

    _print_bold(`Total staked: $${formatMoney(totalStaked)}`)

    hideLoading();
}

async function getNewPricesAndTokens(App, tokens, prices, newAddresses, stakingAddress) {
  var newPriceAddresses = newAddresses.filter(x =>
    !getParameterCaseInsensitive(prices, x));
  var newPrices = await lookUpTokenPrices(newPriceAddresses);
  for (const key in newPrices) {
      if (newPrices[key])
          prices[key] = newPrices[key];
  }
  var newTokenAddresses = newAddresses.filter(x =>
      !getParameterCaseInsensitive(tokens,x));
  for (const address of newTokenAddresses) {
      tokens[address] = await getToken(App, address, stakingAddress);
  }
}

async function getAverageBlockTime(App){
  const currentBlockNumber = await App.provider.getBlockNumber();
  const currentBlock = await App.provider.getBlock(currentBlockNumber);
  const previousBlock = await App.provider.getBlock(currentBlockNumber - 15000);
  const differenceTimestamp = currentBlock.timestamp - previousBlock.timestamp;
  return differenceTimestamp / 15000;
}

const displayPrice = price => {
  const priceDecimals = price == 0 ? 2 : price < 0.0001 ? 10 : price < 0.01 ? 6 : 2;
  return priceDecimals == 2 ? formatMoney(price) : price.toFixed(priceDecimals);
}

function getChainExplorerUrl(chain, address){
  switch(chain){
    case "eth" :
      return `https://etherscan.io/token/${address}`;
    case "bsc" :
      return `https://bscscan.com/token/${address}`;
    case "fantom" :
      return `https://ftmscan.com/token/${address}`;
    case "harmony" :
      return `https://explorer.harmony.one/address/${address}`;
    case "arbitrum" :
      return `https://arbiscan.io/address/${address}`;
    case "cronos" :
      return `https://cronos.crypto.org/explorer/address/${address}`;
    case "velas" :
      return `https://evmexplorer.velas.com/address/${address}`;
    case "aurora" :
      return `https://explorer.mainnet.aurora.dev/address/${address}`;
    case "boba" :
      return `https://blockexplorer.boba.network/address/${address}`;
    case "metis" :
      return `https://andromeda-explorer.metis.io/address/${address}`;
    case "meter" :
      return `https://scan.meter.io/address/${address}`;
    case "emerald" :
      return `https://explorer.emerald.oasis.dev/token/${address}`;
  }
}
