const { ethers } = require('ethers')

;(function () {
  'use strict'

  const chain = {
    id: '0x1237',
    name: 'Robinhood Chain',
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
  }
  const addresses = {
    factory: '0x3575Aa02Ae85D8Cd2AaE6DCaA5D8750cFc9622e6',
    sweep: '0xBfc6216915536bf83e94fB8f24Fc197adB2e3401',
    erc6909Strategy: '0x0c303F969bCE5192cF13Bc13dB5CA53c7649F267',
    fablesRegistry: '0x159A113E012593D9B3cC63ad45E30F0467e13Ef3',
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11'
  }
  const managers = [
    { name: 'Uniswap', address: '0x73991a25C818Bf1f1128dEAaB1492D45638DE0D3' },
    { name: 'Up33', address: '0x07F44c47743A2f36414A82b9F558ECFCf0EEdCEf' },
    { name: 'Ramses', address: '0x2eBd7B85a4E08D5B508b04BA147976C94afE6590' },
    { name: 'GIGA', address: '0xA79F5775b0B49E51202c48DDF03F380FaA96f641' },
    { name: 'SwapHood', address: '0xf04DF3392066E74713ABc548da3cb7Cf5bE5ae0A' }
  ]
  const uniswapV4 = {
    name: 'Uniswap-V4',
    address: '0x58daec3116aae6D93017bAAea7749052E8a04fA7',
    logStart: 9000
  }
  const fablesLogStart = 44000000
  const logBlockSpan = 10000000
  const minLogBlockSpan = 25000
  const logConcurrency = 1
  const logReorgLookback = 64
  const maxPositions = 512
  const multicallBatchSize = 100
  const transfer721Topic = ethers.utils.id('Transfer(address,address,uint256)')
  const transfer6909Topic = ethers.utils.id('Transfer(address,address,address,uint256,uint256)')
  const zeroAddress = ethers.constants.AddressZero
  const maxUint128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const factoryInterface = new ethers.utils.Interface(['function sickles(address) view returns(address)'])
  const managerInterface = new ethers.utils.Interface([
    'function balanceOf(address) view returns(uint256)',
    'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function ownerOf(uint256) view returns(address)'
  ])
  const fablesRegistryInterface = new ethers.utils.Interface([
    'function activePools() view returns(tuple(tuple(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks) key,bytes32 id,bool active)[])'
  ])
  const fablesLedgerInterface = new ethers.utils.Interface([
    'function balanceOf(address,uint256) view returns(uint256)',
    'function userPosition(uint256,address) view returns(tuple(uint128 staked,uint128 owed0,uint128 owed1,uint256 checkpoint0X128,uint256 checkpoint1X128,uint256 stakedCheckpoint0X128,uint256 stakedCheckpoint1X128,uint256 forgone0,uint256 forgone1))'
  ])
  const sweepInterface = new ethers.utils.Interface(['function sweepErc721(address[] tokens,uint256[] tokenIds)'])
  const erc6909StrategyInterface = new ethers.utils.Interface([
    'function exit(((address stakingContract,uint256 poolIndex) farm,address nft,uint256 tokenId) position,((address[] rewardTokens,uint128 amount0Max,uint128 amount1Max,bytes extraData) harvest,(address tokenApproval,address router,uint256 amountIn,uint256 desiredAmountOut,uint256 minAmountOut,address tokenIn,address tokenOut,bytes extraData)[] swaps,address[] outputTokens,address[] sweepTokens) harvestParams,(((address nft,uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint128 amount0Max,uint128 amount1Max,bytes extraData) removeLiquidityParams,(address tokenApproval,address router,uint256 amountIn,uint256 desiredAmountOut,uint256 minAmountOut,address tokenIn,address tokenOut,bytes extraData)[] swaps) zap,address[] tokensOut,bytes extraData) withdrawParams,address[] sweepTokens)'
  ])
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
    fablesPositions: [],
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
  function fablesActionButton (position) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'sickle-action'
    button.textContent = 'Exit Fables erc6909 range: ' + position.id
    button.disabled = state.sending || !correctChain()
    button.addEventListener('click', function () {
      exitFables(position).catch(function (error) { setStatus(errText(error), 'error'); setLoading() })
    })
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
    if (state.fablesPositions.length) {
      appendLine(app, 'Fables erc6909 ranges', true)
      state.fablesPositions.forEach(function (position) {
        app.appendChild(fablesActionButton(position))
        app.appendChild(document.createTextNode('\n'))
      })
      app.appendChild(document.createTextNode('\n'))
    }
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

  function cacheRead (key) {
    try {
      const value = JSON.parse(window.localStorage.getItem(key))
      if (!value || !Number.isSafeInteger(value.toBlock) || !Array.isArray(value.items)) return null
      return value
    } catch (error) {
      return null
    }
  }
  function cacheWrite (key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)) } catch (error) {}
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
      if (!retryableRateLimit(error) || retry >= 6) throw error
      await wait(Math.min(6000, 750 * Math.pow(2, retry)))
      return retryRpc(request, retry + 1)
    }
  }
  function rpcCall (transaction) { return retryRpc(function () { return state.rpc.call(transaction) }, 0) }
  function rpcBlockNumber () {
    return retryRpc(function () { return state.rpc.send('eth_blockNumber', []) }, 0)
      .then(function (blockNumber) { return ethers.BigNumber.from(blockNumber).toNumber() })
  }
  async function getLogRange (filter, fromBlock, toBlock, attempt) {
    try {
      return await state.rpc.send('eth_getLogs', [Object.assign({}, filter, {
        fromBlock: ethers.utils.hexValue(fromBlock),
        toBlock: ethers.utils.hexValue(toBlock)
      })])
    } catch (error) {
      const retry = attempt || 0
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
  async function scanTransfers (options) {
    const latest = await rpcBlockNumber()
    const cached = cacheRead(options.cacheKey)
    const items = new Map()
    if (cached) {
      cached.items.forEach(function (item) {
        const normalized = options.normalizeCached(item)
        if (normalized) items.set(options.itemKey(normalized), normalized)
      })
    }
    if (items.size > maxPositions) throw new Error('Stored position history exceeds the safe read limit.')

    let fromBlock = options.startBlock
    if (cached && cached.toBlock >= options.startBlock && cached.toBlock <= latest) {
      fromBlock = Math.max(options.startBlock, cached.toBlock - logReorgLookback)
    }
    const ranges = []
    for (let start = fromBlock; start <= latest; start += logBlockSpan) {
      ranges.push([start, Math.min(latest, start + logBlockSpan - 1)])
    }
    const filter = {
      address: options.contracts,
      topics: [options.topic, null, topicAddress(state.sickle)]
    }
    let next = 0
    let complete = 0
    async function worker () {
      while (next < ranges.length) {
        const range = ranges[next]
        next += 1
        const logs = await getLogRange(filter, range[0], range[1], 0)
        logs.forEach(function (log) {
          const item = options.fromLog(log)
          if (item) items.set(options.itemKey(item), item)
        })
        if (items.size > maxPositions) throw new Error('Position history exceeds the safe read limit of ' + maxPositions + '.')
        cacheWrite(options.cacheKey, { toBlock: range[1], items: Array.from(items.values()) })
        complete += 1
        setLoading(options.loading + ' ' + complete + '/' + ranges.length + '…')
      }
    }
    const workers = []
    for (let index = 0; index < Math.min(logConcurrency, ranges.length); index += 1) workers.push(worker())
    await Promise.all(workers)
    const result = Array.from(items.values())
    cacheWrite(options.cacheKey, { toBlock: latest, items: result })
    return result
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
        warn(manager.name + ' has more than ' + maxPositions + ' NFTs; refusing an unbounded read.')
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

  async function readUniswapV4Positions () {
    setLoading('Reading Uniswap-V4 transfer history…')
    const candidates = await scanTransfers({
      cacheKey: 'robinhood-sickle-v4-v1:' + state.sickle.toLowerCase(),
      contracts: uniswapV4.address,
      topic: transfer721Topic,
      startBlock: uniswapV4.logStart,
      loading: 'Reading Uniswap-V4 transfer history',
      normalizeCached: function (item) { return /^\d+$/.test(String(item)) ? String(item) : null },
      fromLog: function (log) { return log.topics && log.topics[3] ? ethers.BigNumber.from(log.topics[3]).toString() : null },
      itemKey: function (item) { return item }
    })
    setLoading('Validating ' + candidates.length + ' Uniswap-V4 candidate' + (candidates.length === 1 ? '…' : 's…'))
    const results = await aggregate(candidates.map(function (id) {
      return { target: uniswapV4.address, data: managerInterface.encodeFunctionData('ownerOf', [id]) }
    }))
    results.forEach(function (result, index) {
      if (!result.success) return
      const owner = managerInterface.decodeFunctionResult('ownerOf', result.returnData)[0]
      if (sameAddress(owner, state.sickle)) state.positions.push({ manager: uniswapV4, id: candidates[index] })
    })
  }

  async function fablesPools () {
    const data = fablesRegistryInterface.encodeFunctionData('activePools')
    const response = await rpcCall({ to: addresses.fablesRegistry, data })
    return fablesRegistryInterface.decodeFunctionResult('activePools', response)[0].map(function (pool) {
      const key = pool.key || pool[0]
      return {
        hook: ethers.utils.getAddress(key.hooks || key[4]),
        token0: ethers.utils.getAddress(key.currency0 || key[0]),
        token1: ethers.utils.getAddress(key.currency1 || key[1]),
        active: pool.active === undefined ? pool[2] : pool.active
      }
    }).filter(function (pool) { return pool.active })
  }
  async function readFablesPositions () {
    setLoading('Reading Fables pools…')
    const pools = await fablesPools()
    if (!pools.length) return
    const poolsByHook = new Map(pools.map(function (pool) { return [pool.hook.toLowerCase(), pool] }))
    const candidates = await scanTransfers({
      cacheKey: 'robinhood-sickle-fables-v1:' + state.sickle.toLowerCase(),
      contracts: pools.map(function (pool) { return pool.hook }),
      topic: transfer6909Topic,
      startBlock: fablesLogStart,
      loading: 'Reading Fables transfer history',
      normalizeCached: function (item) {
        if (!item || !ethers.utils.isAddress(item.hook) || !/^\d+$/.test(String(item.id))) return null
        return { hook: ethers.utils.getAddress(item.hook), id: String(item.id) }
      },
      fromLog: function (log) {
        if (!log.topics || !log.topics[3] || !poolsByHook.has(log.address.toLowerCase())) return null
        return { hook: ethers.utils.getAddress(log.address), id: ethers.BigNumber.from(log.topics[3]).toString() }
      },
      itemKey: function (item) { return item.hook.toLowerCase() + ':' + item.id }
    })
    setLoading('Validating ' + candidates.length + ' Fables range' + (candidates.length === 1 ? '…' : 's…'))
    const calls = []
    candidates.forEach(function (candidate) {
      calls.push({ target: candidate.hook, data: fablesLedgerInterface.encodeFunctionData('balanceOf', [state.sickle, candidate.id]) })
      calls.push({ target: candidate.hook, data: fablesLedgerInterface.encodeFunctionData('userPosition', [candidate.id, state.sickle]) })
    })
    const results = await aggregate(calls)
    candidates.forEach(function (candidate, index) {
      const balanceResult = results[index * 2]
      const userResult = results[index * 2 + 1]
      if (!balanceResult || !balanceResult.success) return
      const shares = fablesLedgerInterface.decodeFunctionResult('balanceOf', balanceResult.returnData)[0]
      if (shares.isZero()) return
      if (!userResult || !userResult.success) {
        warn('A Fables staking read failed; its exit was hidden.')
        return
      }
      const user = fablesLedgerInterface.decodeFunctionResult('userPosition', userResult.returnData)[0]
      const pool = poolsByHook.get(candidate.hook.toLowerCase())
      state.fablesPositions.push({
        hook: candidate.hook,
        id: candidate.id,
        shares: shares.toString(),
        staked: (user.staked || user[0]).toString(),
        token0: pool.token0,
        token1: pool.token1
      })
    })
  }

  async function refreshWallet () {
    if (!state.account || !correctChain()) {
      state.sickle = ''
      state.positions = []
      state.fablesPositions = []
      render()
      return
    }
    setLoading('Reading Sickle account…')
    setStatus('')
    state.sickle = ''
    state.positions = []
    state.fablesPositions = []
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
      try {
        await readFablesPositions()
      } catch (error) {
        warn('Fables discovery failed: ' + errText(error))
      }
      if (state.warnings.length) setStatus(state.warnings.join(' '), 'error')
    } catch (error) {
      state.positions = []
      state.fablesPositions = []
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
      state.fablesPositions = []
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
    state.fablesPositions = []
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
          rpcUrls: [chain.rpc]
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
    if (!correctChain()) throw new Error('Switch to Robinhood Chain first.')
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
  function fablesExtraData () {
    return ethers.utils.defaultAbiCoder.encode(
      ['tuple(int24 tickSpacing,uint128 liquidity,uint256 deadline,uint16 maxFeeBps,address recipient)'],
      [[0, 0, 0, 65535, zeroAddress]]
    )
  }
  async function exitFables (position) {
    if (!state.wallet || !state.account) throw new Error('Connect a wallet first.')
    if (!correctChain()) throw new Error('Switch to Robinhood Chain first.')
    if (!window.confirm('Exit this Fables range with no minimum token amounts?')) return
    const extraData = fablesExtraData()
    const farmPosition = [[position.hook, 0], position.hook, position.id]
    const harvestParams = [[[], 0, 0, extraData], [], [], []]
    const removeLiquidity = [position.hook, position.id, maxUint128, 0, 0, 0, 0, extraData]
    const unstakeData = ethers.BigNumber.from(position.staked).isZero() ? '0x' : extraData
    const tokens = Array.from(new Set([position.token0, position.token1].map(function (token) { return token.toLowerCase() })))
      .map(function (token) { return ethers.utils.getAddress(token) })
    const withdrawParams = [[removeLiquidity, []], tokens, unstakeData]
    const data = erc6909StrategyInterface.encodeFunctionData('exit', [farmPosition, harvestParams, withdrawParams, tokens])
    const transaction = { from: state.account, to: addresses.erc6909Strategy, data }
    state.sending = true
    setLoading('Checking Fables exit…')
    setStatus('')
    try {
      await sendPreflighted(transaction, 'Fables exit confirmed')
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
    state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: 4663, name: 'robinhood' })
    byId('sickle-date').textContent = new Date().toString() + '\n\n'
    bindUi()
    render()
    await restoreInjected()
  }

  document.addEventListener('DOMContentLoaded', function () {
    start().catch(function (error) { setLoading(); setStatus(errText(error), 'error') })
  })
})()
