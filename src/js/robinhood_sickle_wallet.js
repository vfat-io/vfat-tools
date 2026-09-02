const { ethers } = require('ethers')

;(function () {
  'use strict'

  const chain = {
    id: '0x1237',
    name: 'Robinhood Chain',
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://robinhoodchain.blockscout.com',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  }
  const addresses = {
    factory: '0x3575Aa02Ae85D8Cd2AaE6DCaA5D8750cFc9622e6',
    sweep: '0xBfc6216915536bf83e94fB8f24Fc197adB2e3401',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const managers = [
    { name: 'Uniswap', address: '0x73991a25C818Bf1f1128dEAaB1492D45638DE0D3' },
    { name: 'Up33', address: '0x07F44c47743A2f36414A82b9F558ECFCf0EEdCEf' },
    { name: 'Ramses', address: '0x2eBd7B85a4E08D5B508b04BA147976C94afE6590' }
  ]
  const reownProjectId = process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551'
  const zeroAddress = ethers.constants.AddressZero
  const factoryInterface = new ethers.utils.Interface(['function sickles(address) view returns(address)'])
  const managerInterface = new ethers.utils.Interface([
    'function balanceOf(address) view returns(uint256)',
    'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)'
  ])
  const sweepInterface = new ethers.utils.Interface(['function sweepErc721(address[] tokens,uint256[] tokenIds)'])
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const state = {
    rpc: null,
    wallet: null,
    walletKind: '',
    account: '',
    walletChain: '',
    boundWallet: null,
    accountListener: null,
    chainListener: null,
    reownUnsubscribe: null,
    sickle: '',
    positions: [],
    managerCoverage: 0,
    positionCoverage: 0,
    expectedPositions: 0,
    loading: false,
    sending: false,
    status: '',
    statusKind: ''
  }

  function byId (id) { return document.getElementById(id) }
  function errText (error) {
    if (!error) return 'Unknown error.'
    if (error.code === 4001) return 'Request rejected.'
    return error.shortMessage || error.reason || (error.data && error.data.message) || error.message || String(error)
  }
  function shortAddress (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '' }
  function correctChain () { return String(state.walletChain || '').toLowerCase() === chain.id }
  function isZero (address) { return !address || String(address).toLowerCase() === zeroAddress.toLowerCase() }
  function setStatus (message, kind) { state.status = message || ''; state.statusKind = kind || ''; renderStatus() }
  function setLoading (message) {
    state.loading = Boolean(message)
    const box = byId('sickle-loading')
    box.hidden = !state.loading
    box.setAttribute('aria-label', message || '')
    renderToolbar()
  }

  function appendLine (parent, text, bold) {
    if (bold) {
      const element = document.createElement('b')
      element.textContent = text
      parent.appendChild(element)
    } else {
      parent.appendChild(document.createTextNode(text))
    }
    parent.appendChild(document.createTextNode('\n'))
  }
  function actionButton (label, positions) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'sickle-action'
    button.textContent = label
    button.disabled = state.sending || !correctChain()
    button.addEventListener('click', function () { sweepPositions(positions).catch(function (error) { setStatus(errText(error), 'error'); setLoading() }) })
    return button
  }

  function renderToolbar () {
    const connected = Boolean(state.account)
    byId('sickle-wallet-status').textContent = connected
      ? shortAddress(state.account) + (correctChain() ? ' · Robinhood' : ' · wrong network')
      : 'Not connected'
    byId('sickle-connect').textContent = connected ? '[ change wallet ]' : '[ connect ]'
    byId('sickle-other-wallet').hidden = false
    byId('sickle-switch').hidden = !connected || correctChain()
    byId('sickle-refresh').hidden = !connected
    byId('sickle-connect').disabled = state.loading || state.sending
    byId('sickle-other-wallet').disabled = state.loading || state.sending
    byId('sickle-switch').disabled = state.loading || state.sending
    byId('sickle-refresh').disabled = state.loading || state.sending
  }
  function renderStatus () {
    const element = byId('sickle-status')
    element.textContent = state.status ? state.status + '\n\n' : ''
    element.hidden = !state.status
    element.dataset.kind = state.statusKind || ''
  }
  function renderApp () {
    const app = byId('sickle-app')
    app.replaceChildren()
    if (!state.account) return
    appendLine(app, 'Initialized ' + state.account)
    appendLine(app, 'Reading smart contracts...')
    appendLine(app, '')
    if (!correctChain()) {
      appendLine(app, 'Switch to Robinhood Chain.', true)
      return
    }
    if (state.loading && !state.sickle) return
    if (!state.sickle && state.statusKind === 'error') return
    if (!state.sickle) {
      appendLine(app, 'You dont have a sickle account', true)
      return
    }

    appendLine(app, 'Your Sickle Address: ' + state.sickle, true)
    appendLine(app, '')
    managers.forEach(function (manager) {
      const positions = state.positions.filter(function (position) { return position.manager.address.toLowerCase() === manager.address.toLowerCase() })
      if (!positions.length) return
      const name = manager.name.toUpperCase()
      appendLine(app, name + ' nfts', true)
      positions.forEach(function (position) {
        app.appendChild(actionButton('Withdraw ' + name + ' erc721 token: ' + position.id, [position]))
        app.appendChild(document.createTextNode('\n'))
      })
      const ids = positions.map(function (position) { return position.id }).join(' - ')
      app.appendChild(actionButton('Withdraw all ' + name + ' erc721 tokens: ' + ids, positions))
      app.appendChild(document.createTextNode('\n\n'))
    })
  }
  function render () { renderToolbar(); renderStatus(); renderApp() }

  async function aggregate (calls) {
    if (!calls.length) return []
    const multicall = new ethers.Contract(addresses.multicall, multicallAbi, state.rpc)
    return multicall.aggregate3(calls.map(function (call) {
      return { target: call.target, allowFailure: true, callData: call.data }
    }))
  }

  async function refreshWallet () {
    if (!state.account || !correctChain()) { state.sickle = ''; state.positions = []; render(); return }
    setLoading('Reading Sickle account…')
    setStatus('')
    state.sickle = ''
    state.positions = []
    state.managerCoverage = 0
    state.positionCoverage = 0
    state.expectedPositions = 0
    renderApp()
    try {
      const factoryData = factoryInterface.encodeFunctionData('sickles', [state.account])
      const response = await state.rpc.call({ to: addresses.factory, data: factoryData })
      state.sickle = factoryInterface.decodeFunctionResult('sickles', response)[0]
      if (isZero(state.sickle)) { state.sickle = ''; setStatus(''); return }

      setLoading('Reading supported NFT managers…')
      const balanceResults = await aggregate(managers.map(function (manager) {
        return { target: manager.address, data: managerInterface.encodeFunctionData('balanceOf', [state.sickle]) }
      }))
      const balances = balanceResults.map(function (result) {
        if (!result.success) return null
        state.managerCoverage += 1
        return managerInterface.decodeFunctionResult('balanceOf', result.returnData)[0].toNumber()
      })
      const positionCalls = []
      managers.forEach(function (manager, managerIndex) {
        const balance = balances[managerIndex]
        if (balance === null) return
        for (let index = 0; index < balance; index += 1) {
          positionCalls.push({
            manager: manager,
            target: manager.address,
            data: managerInterface.encodeFunctionData('tokenOfOwnerByIndex', [state.sickle, index])
          })
        }
      })
      state.expectedPositions = positionCalls.length
      setLoading(positionCalls.length ? 'Reading ' + positionCalls.length + ' position NFT' + (positionCalls.length === 1 ? '…' : 's…') : 'Finishing…')
      const positionResults = await aggregate(positionCalls)
      state.positions = positionResults.map(function (result, index) {
        if (!result.success) return null
        state.positionCoverage += 1
        return { manager: positionCalls[index].manager, id: managerInterface.decodeFunctionResult('tokenOfOwnerByIndex', result.returnData)[0].toString() }
      }).filter(Boolean)
      if (state.managerCoverage !== managers.length || state.positionCoverage !== positionCalls.length) setStatus('Some onchain reads failed. Refresh to retry.', 'error')
      else setStatus('')
    } catch (error) {
      state.sickle = ''
      state.positions = []
      setStatus('Read failed: ' + errText(error), 'error')
    } finally {
      setLoading()
      render()
    }
  }

  function unbindWallet () {
    if (!state.boundWallet || typeof state.boundWallet.removeListener !== 'function') return
    if (state.accountListener) state.boundWallet.removeListener('accountsChanged', state.accountListener)
    if (state.chainListener) state.boundWallet.removeListener('chainChanged', state.chainListener)
    state.boundWallet = null
  }
  function bindWallet (wallet) {
    unbindWallet()
    if (!wallet || typeof wallet.on !== 'function') return
    state.accountListener = function (accounts) {
      adoptWallet(wallet, accounts, null, state.walletKind).catch(function (error) { setStatus(errText(error), 'error') })
    }
    state.chainListener = function (chainId) {
      state.walletChain = chainId
      state.sickle = ''
      state.positions = []
      render()
      if (correctChain()) refreshWallet().catch(function (error) { setStatus(errText(error), 'error') })
    }
    wallet.on('accountsChanged', state.accountListener)
    wallet.on('chainChanged', state.chainListener)
    state.boundWallet = wallet
  }
  async function adoptWallet (wallet, accounts, walletChain, kind) {
    state.wallet = wallet
    state.walletKind = kind || state.walletKind || 'wallet'
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : ''
    state.walletChain = walletChain || await wallet.request({ method: 'eth_chainId' })
    state.sickle = ''
    state.positions = []
    bindWallet(wallet)
    render()
    if (state.account && correctChain()) await refreshWallet()
    return Boolean(state.account)
  }
  function injectedWallet () {
    if (!window.ethereum) return null
    if (window.ethereum.providers && window.ethereum.providers.length) {
      return window.ethereum.providers.find(function (provider) { return provider.isRabby }) || window.ethereum.providers.find(function (provider) { return provider.isMetaMask }) || window.ethereum.providers[0]
    }
    return window.ethereum
  }
  async function restoreInjected () {
    const wallet = injectedWallet()
    if (!wallet) { render(); return }
    try {
      const results = await Promise.all([
        wallet.request({ method: 'eth_accounts' }),
        wallet.request({ method: 'eth_chainId' })
      ])
      if (results[0] && results[0].length) await adoptWallet(wallet, results[0], results[1], 'injected')
    } catch (error) {
      console.warn('Passive wallet restore failed', error)
    }
  }
  async function connectInjected () {
    const wallet = injectedWallet()
    if (!wallet) return connectOther()
    const accounts = await wallet.request({ method: 'eth_requestAccounts' })
    const walletChain = await wallet.request({ method: 'eth_chainId' })
    await adoptWallet(wallet, accounts, walletChain, 'injected')
  }
  async function connectOther () {
    const reown = await import('./config.js')
    const appKit = reown.createAppKitInstance(reownProjectId)
    if (!appKit) throw new Error('Other wallet is unavailable.')
    const adopt = async function (address) {
      const wallet = await appKit.getWalletProvider()
      if (!wallet || typeof wallet.request !== 'function') throw new Error('WalletConnect did not provide a wallet.')
      const accounts = await wallet.request({ method: 'eth_accounts' })
      const walletChain = await wallet.request({ method: 'eth_chainId' })
      const connected = await adoptWallet(wallet, accounts.length ? accounts : address ? [address] : [], walletChain, 'reown')
      if (connected && state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    }
    const address = appKit.getAddress && appKit.getAddress()
    if (address) { await adopt(address); return }
    if (!state.reownUnsubscribe && appKit.subscribeAccount) {
      state.reownUnsubscribe = appKit.subscribeAccount(function (account) {
        if (!account || !account.isConnected) return
        adopt(account.address).catch(function (error) { setStatus(errText(error), 'error') })
      })
    }
    await appKit.open()
  }
  async function switchNetwork () {
    if (!state.wallet) throw new Error('Connect a wallet first.')
    try {
      await state.wallet.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    } catch (error) {
      if (error.code !== 4902) throw error
      await state.wallet.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chain.id,
          chainName: chain.name,
          nativeCurrency: chain.nativeCurrency,
          rpcUrls: [chain.rpc],
          blockExplorerUrls: [chain.explorer]
        }]
      })
      await state.wallet.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    }
    state.walletChain = await state.wallet.request({ method: 'eth_chainId' })
    render()
    if (correctChain()) await refreshWallet()
  }

  async function sweepPositions (positions) {
    if (!state.wallet || !state.account) throw new Error('Connect a wallet first.')
    if (!correctChain()) throw new Error('Switch to Robinhood Chain first.')
    if (!positions.length) return
    const tokens = positions.map(function (position) { return position.manager.address })
    const tokenIds = positions.map(function (position) { return position.id })
    const data = sweepInterface.encodeFunctionData('sweepErc721', [tokens, tokenIds])
    const transaction = { from: state.account, to: addresses.sweep, data: data }
    state.sending = true
    setLoading('Checking withdrawal…')
    setStatus('')
    try {
      await state.wallet.request({ method: 'eth_call', params: [transaction, 'latest'] })
      setLoading('Waiting for wallet confirmation…')
      const hash = await state.wallet.request({ method: 'eth_sendTransaction', params: [transaction] })
      setLoading('Waiting for transaction…')
      const receipt = await state.rpc.waitForTransaction(hash)
      if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.')
      setStatus('Withdrawal confirmed: ' + hash.slice(0, 10) + '…', 'success')
      await refreshWallet()
    } finally {
      state.sending = false
      setLoading()
      render()
    }
  }

  function bindUi () {
    byId('sickle-connect').addEventListener('click', function () { connectInjected().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-other-wallet').addEventListener('click', function () { connectOther().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-switch').addEventListener('click', function () { switchNetwork().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-refresh').addEventListener('click', function () { refreshWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
  }
  async function start () {
    state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, { chainId: 4663, name: 'robinhood' })
    byId('sickle-date').textContent = new Date().toString() + '\n\n'
    bindUi()
    render()
    await restoreInjected()
  }

  document.addEventListener('DOMContentLoaded', function () {
    start().catch(function (error) { setLoading(); setStatus(errText(error), 'error') })
  })
})()
