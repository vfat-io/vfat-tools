const { ethers } = require('ethers')

;(function () {
  'use strict'

  const chain = {
    id: '0x13b2',
    number: 5042,
    name: 'Arc',
    nativeCurrency: { name: 'USDC', symbol: 'USDC', decimals: 18 }
  }
  /* Arc's own RPC first; the rest are public fallbacks for when it is unreachable. ?rpc=<url> overrides them. */
  const rpcEndpoints = (function () {
    const list = ['https://rpc.mainnet.arc.io', 'https://rpc.blockdaemon.mainnet.arc.io', 'https://rpc.arc-scan.org', 'https://arc-mainnet.drpc.org']
    try {
      const custom = new URLSearchParams(window.location.search).get('rpc')
      if (custom && /^https:\/\//i.test(custom)) return [custom].concat(list)
    } catch (_) {}
    return list
  })()
  let rpcIndex = 0
  function currentRpc () { return rpcEndpoints[rpcIndex % rpcEndpoints.length] }
  function useNextRpc () { rpcIndex += 1; state.rpc = makeProvider(); return state.rpc }
  function makeProvider () { return new ethers.providers.StaticJsonRpcProvider(currentRpc(), { chainId: chain.number, name: 'arc' }) }
  // ethers wraps a dead endpoint as SERVER_ERROR, and hides it inside error.error for eth_call.
  function unreachable (error) {
    const codes = [error && error.code, error && error.error && error.error.code]
    if (codes.some(code => code === 'NETWORK_ERROR' || code === 'SERVER_ERROR' || code === 'TIMEOUT')) return true
    const message = [error && error.message, error && error.error && error.error.message].filter(Boolean).join(' ')
    return /missing response|failed to fetch|networkerror|could not detect network|connection refused/i.test(message)
  }
  const addresses = {
    factory: '0x36F89Be8cEF366a97129c7d18cFCAf860BA9Ff7C',
    sweep: '0x4fD738409D33BB9061f16c3618D63B0296395a7c',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const managers = [
    { name: 'Uniswap', address: '0x39654A85A4C05127f5Fd6ED22CAeC077A0fB1377' },
    { name: 'Aero', address: '0xc84bB45D43CD25D02b83B4C085eaA4e08da8f473' }
  ]
  const uniswapV4 = {
    name: 'Uniswap-V4',
    address: '0x6049c9a0e26405C0985f9E3685C87d0aE917f82B',
    deployBlock: 16031167
  }
  const logBlockSpan = 9999
  const logSpacing = 450
  const minLogBlockSpan = 2000
  const maxPositions = 512
  const multicallBatchSize = 100
  const transfer721Topic = ethers.utils.id('Transfer(address,address,uint256)')
  const zeroAddress = ethers.constants.AddressZero
  const factoryInterface = new ethers.utils.Interface(['function sickles(address) view returns(address)'])
  const managerInterface = new ethers.utils.Interface([
    'function balanceOf(address) view returns(uint256)',
    'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function ownerOf(uint256) view returns(address)'
  ])
  const sweepInterface = new ethers.utils.Interface(['function sweepErc721(address[] tokens,uint256[] tokenIds)'])
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const multicallInterface = new ethers.utils.Interface(multicallAbi)
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
    warnings: [],
    loading: false,
    sending: false,
    status: '',
    statusKind: ''
  }

  function byId (id) { return document.getElementById(id) }
  function errText (error) {
    if (!error) return 'Unknown error.'
    if (error.code === 4001) return 'Request rejected.'
    if (error.code === 4100) return 'This wallet is read-only.'
    return error.shortMessage || error.reason || (error.data && error.data.message) || error.message || String(error)
  }
  function shortAddress (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '' }
  function correctChain () { return String(state.walletChain || '').toLowerCase() === chain.id }
  function isZero (address) { return !address || String(address).toLowerCase() === zeroAddress.toLowerCase() }
  function sameAddress (left, right) { return String(left || '').toLowerCase() === String(right || '').toLowerCase() }
  function topicAddress (address) { return ethers.utils.hexZeroPad(address, 32) }
  function wait (milliseconds) { return new Promise(function (resolve) { window.setTimeout(resolve, milliseconds) }) }
  function warn (message) { if (state.warnings.indexOf(message) === -1) state.warnings.push(message) }
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
    button.addEventListener('click', function () {
      sweepPositions(positions).catch(function (error) { setStatus(errText(error), 'error'); setLoading() })
    })
    return button
  }

  function renderToolbar () {
    const connected = Boolean(state.account)
    byId('sickle-wallet-status').textContent = connected
      ? shortAddress(state.account) + (correctChain() ? ' · Arc' : ' · wrong network')
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
      appendLine(app, 'Switch to Arc.', true)
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
    managers.concat([uniswapV4]).forEach(function (manager) {
      const positions = state.positions.filter(function (position) { return sameAddress(position.manager.address, manager.address) })
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
    const results = []
    for (let start = 0; start < calls.length; start += multicallBatchSize) {
      const batch = calls.slice(start, start + multicallBatchSize)
      const callData = multicallInterface.encodeFunctionData('aggregate3', [batch.map(function (call) {
        return { target: call.target, allowFailure: true, callData: call.data }
      })])
      const response = await rpcCall({ to: addresses.multicall, data: callData })
      results.push.apply(results, multicallInterface.decodeFunctionResult('aggregate3', response)[0])
    }
    return results
  }

  function retryableRateLimit (error) {
    const message = [
      errText(error),
      error && error.body,
      error && error.responseText,
      error && error.error && error.error.message
    ].filter(Boolean).join(' ')
    const responseStatus = error && error.response && error.response.status
    return error && (error.code === 429 || responseStatus === 429 || /429|too many requests|rate limit|processing response error/i.test(message))
  }
  async function retryRpc (request, attempt) {
    try {
      return await request()
    } catch (error) {
      const retry = attempt || 0
      if (retry < rpcEndpoints.length && unreachable(error)) { useNextRpc(); return retryRpc(request, retry + 1) }
      if (!retryableRateLimit(error) || retry >= 6) throw error
      await wait(Math.min(6000, 750 * Math.pow(2, retry)))
      return retryRpc(request, retry + 1)
    }
  }
  // eth_getLogs has a tighter rate limit than eth_call, so log queries start at least logSpacing ms apart.
  let nextLogsAt = 0
  async function logsTurn () { const now = Date.now(); const at = Math.max(now, nextLogsAt); nextLogsAt = at + logSpacing; if (at > now) await wait(at - now) }
  function rpcCall (transaction) { return retryRpc(function () { return state.rpc.call(transaction) }, 0) }
  function rpcBlockNumber () {
    return retryRpc(function () { return state.rpc.send('eth_blockNumber', []) }, 0)
      .then(function (blockNumber) { return ethers.BigNumber.from(blockNumber).toNumber() })
  }
  async function getLogRange (filter, fromBlock, toBlock, attempt) {
    await logsTurn()
    try {
      return await state.rpc.send('eth_getLogs', [Object.assign({}, filter, {
        fromBlock: ethers.utils.hexValue(fromBlock),
        toBlock: ethers.utils.hexValue(toBlock)
      })])
    } catch (error) {
      const retry = attempt || 0
      if (retry < rpcEndpoints.length && unreachable(error)) { useNextRpc(); return getLogRange(filter, fromBlock, toBlock, retry + 1) }
      if (retryableRateLimit(error)) {
        if (retry >= 6) throw error
        await wait(Math.min(6000, 750 * Math.pow(2, retry)))
        return getLogRange(filter, fromBlock, toBlock, retry + 1)
      }
      if (toBlock - fromBlock + 1 <= minLogBlockSpan) throw error
      const middle = Math.floor((fromBlock + toBlock) / 2)
      const first = await getLogRange(filter, fromBlock, middle, 0)
      const second = await getLogRange(filter, middle + 1, toBlock, 0)
      return first.concat(second)
    }
  }
  async function readEnumerablePositions () {
    setLoading('Reading supported NFT managers…')
    const balanceResults = await aggregate(managers.map(function (manager) {
      return { target: manager.address, data: managerInterface.encodeFunctionData('balanceOf', [state.sickle]) }
    }))
    const positionCalls = []
    managers.forEach(function (manager, managerIndex) {
      const result = balanceResults[managerIndex]
      if (!result.success) {
        warn(manager.name + ' balance read failed.')
        return
      }
      const balance = managerInterface.decodeFunctionResult('balanceOf', result.returnData)[0]
      if (balance.gt(maxPositions)) {
        warn(manager.name + ': more than ' + maxPositions + ' NFTs.')
        return
      }
      for (let index = 0; index < balance.toNumber(); index += 1) {
        positionCalls.push({
          manager,
          target: manager.address,
          data: managerInterface.encodeFunctionData('tokenOfOwnerByIndex', [state.sickle, index])
        })
      }
    })
    setLoading(positionCalls.length ? 'Reading ' + positionCalls.length + ' enumerable NFT' + (positionCalls.length === 1 ? '…' : 's…') : 'Reading Uniswap-V4 history…')
    const positionResults = await aggregate(positionCalls)
    positionResults.forEach(function (result, index) {
      if (!result.success) {
        warn(positionCalls[index].manager.name + ' NFT read failed.')
        return
      }
      state.positions.push({
        manager: positionCalls[index].manager,
        id: managerInterface.decodeFunctionResult('tokenOfOwnerByIndex', result.returnData)[0].toString()
      })
    })
  }

  /* The v4 PositionManager is not enumerable: walk incoming Transfer logs back from the head until every NFT the Sickle holds is found. */
  async function readUniswapV4Positions () {
    const balanceData = managerInterface.encodeFunctionData('balanceOf', [state.sickle])
    const balance = managerInterface.decodeFunctionResult('balanceOf', await rpcCall({ to: uniswapV4.address, data: balanceData }))[0]
    if (balance.isZero()) return
    if (balance.gt(maxPositions)) { warn('Uniswap-V4: more than ' + maxPositions + ' NFTs.'); return }
    const wanted = balance.toNumber()
    const filter = { address: uniswapV4.address, topics: [transfer721Topic, null, topicAddress(state.sickle)] }
    const checked = new Set()
    const owned = []
    let toBlock = await rpcBlockNumber()
    while (owned.length < wanted && toBlock >= uniswapV4.deployBlock) {
      const fromBlock = Math.max(uniswapV4.deployBlock, toBlock - logBlockSpan + 1)
      setLoading('Reading Uniswap-V4 NFTs ' + owned.length + '/' + wanted + '…')
      const logs = await getLogRange(filter, fromBlock, toBlock, 0)
      const ids = logs.map(function (log) { return log.topics && log.topics[3] ? ethers.BigNumber.from(log.topics[3]).toString() : null })
        .filter(function (id) { return id !== null && !checked.has(id) })
      const unique = Array.from(new Set(ids))
      unique.forEach(function (id) { checked.add(id) })
      if (unique.length) {
        const results = await aggregate(unique.map(function (id) {
          return { target: uniswapV4.address, data: managerInterface.encodeFunctionData('ownerOf', [id]) }
        }))
        results.forEach(function (result, index) {
          if (!result.success) return
          const owner = managerInterface.decodeFunctionResult('ownerOf', result.returnData)[0]
          if (sameAddress(owner, state.sickle)) owned.push(unique[index])
        })
      }
      toBlock = fromBlock - 1
    }
    owned.forEach(function (id) { state.positions.push({ manager: uniswapV4, id }) })
  }

  async function refreshWallet () {
    if (!state.account || !correctChain()) {
      state.sickle = ''
      state.positions = []
      render()
      return
    }
    setLoading('Reading Sickle account…')
    setStatus('')
    state.sickle = ''
    state.positions = []
    state.warnings = []
    renderApp()
    try {
      const factoryData = factoryInterface.encodeFunctionData('sickles', [state.account])
      const response = await rpcCall({ to: addresses.factory, data: factoryData })
      state.sickle = factoryInterface.decodeFunctionResult('sickles', response)[0]
      if (isZero(state.sickle)) { state.sickle = ''; return }

      await readEnumerablePositions()
      try {
        await readUniswapV4Positions()
      } catch (error) {
        warn('Uniswap-V4 discovery failed: ' + errText(error))
      }
      if (state.warnings.length) setStatus(state.warnings.join(' '), 'error')
    } catch (error) {
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
    window.sickleWalletProvider = wallet
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
    if (!reown.REOWN_PROJECT_ID) throw new Error('Other wallet is unavailable.')
    const appKit = reown.createAppKitInstance()
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
          rpcUrls: [currentRpc()]
        }]
      })
      await state.wallet.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    }
    state.walletChain = await state.wallet.request({ method: 'eth_chainId' })
    render()
    if (correctChain()) await refreshWallet()
  }

  async function sendPreflighted (transaction, pendingMessage) {
    await state.wallet.request({ method: 'eth_call', params: [transaction, 'latest'] })
    setLoading('Waiting for wallet confirmation…')
    const hash = await state.wallet.request({ method: 'eth_sendTransaction', params: [transaction] })
    setLoading('Waiting for transaction…')
    const receipt = await state.rpc.waitForTransaction(hash)
    if (!receipt || receipt.status !== 1) throw new Error('Transaction failed.')
    setStatus(pendingMessage + ': ' + hash.slice(0, 10) + '…', 'success')
    await refreshWallet()
  }
  async function sweepPositions (positions) {
    if (!state.wallet || !state.account) throw new Error('Connect a wallet first.')
    if (!correctChain()) throw new Error('Switch to Arc first.')
    if (!positions.length) return
    const tokens = positions.map(function (position) { return position.manager.address })
    const tokenIds = positions.map(function (position) { return position.id })
    const data = sweepInterface.encodeFunctionData('sweepErc721', [tokens, tokenIds])
    const transaction = { from: state.account, to: addresses.sweep, data }
    state.sending = true
    setLoading('Checking withdrawal…')
    setStatus('')
    try {
      await sendPreflighted(transaction, 'Withdrawal confirmed')
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
    state.rpc = makeProvider()
    byId('sickle-date').textContent = new Date().toString() + '\n\n'
    bindUi()
    render()
    await restoreInjected()
  }

  document.addEventListener('DOMContentLoaded', function () {
    start().catch(function (error) { setLoading(); setStatus(errText(error), 'error') })
  })
})()
