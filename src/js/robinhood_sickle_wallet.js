const { ethers } = require('ethers')
const createErc20Sweep = require('./sickle_erc20_sweep')

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
  // Backward log scans start with a small chunk near the head, where recent
  // positions are, and double up to logBlockSpan while chunks succeed.
  const firstLogBlockSpan = 1000000
  const logBlockSpan = 10000000
  const minLogBlockSpan = 25000
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
    scans: [],
    generation: 0,
    warnings: [],
    loading: false,
    sending: false,
    status: '',
    statusKind: ''
  }
  const erc20 = createErc20Sweep({
    chainId: 4663,
    sweep: addresses.sweep,
    aggregate,
    sickle: function () { return state.sickle },
    account: function () { return state.account },
    disabled: function () { return state.sending || !correctChain() },
    send: sweepErc20,
    fail: function (error) { setStatus(errText(error), 'error'); setLoading() },
    render: renderApp
  })

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
  function warn (message) {
    if (state.warnings.indexOf(message) !== -1) return
    state.warnings.push(message)
    renderScans()
  }
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
    erc20.render(app)
  }
  function scanLine (scan) {
    const start = scan.startBlock.toLocaleString('en-US')
    if (scan.done) {
      return scan.label + ': done' + (scan.gaps ? ', ' + scan.gaps + ' block range' + (scan.gaps === 1 ? '' : 's') + ' unreadable; refresh to retry' : '')
    }
    if (scan.stopped) return scan.label + ': stopped at block ' + (scan.cursor === null ? 'head' : scan.cursor.toLocaleString('en-US')) + '; refresh to retry'
    if (scan.cursor === null) return scan.label + ': reading from the latest block…'
    return scan.label + ': scanned back to block ' + scan.cursor.toLocaleString('en-US') + ' of ' + start + '…'
  }
  function renderScans () {
    const element = byId('sickle-scan')
    element.replaceChildren()
    if (!state.sickle || !correctChain()) return
    state.scans.forEach(function (scan) { appendLine(element, scanLine(scan)) })
    state.warnings.forEach(function (message) {
      const line = document.createElement('span')
      line.className = 'sickle-warning'
      line.textContent = 'WARN  : ' + message + '\n'
      element.appendChild(line)
    })
  }
  function render () { renderToolbar(); renderStatus(); renderApp(); renderScans() }

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
      if (!value || !Array.isArray(value.items)) return null
      const covered = Number.isSafeInteger(value.low) && Number.isSafeInteger(value.high) && value.low <= value.high
      return { items: value.items, low: covered ? value.low : null, high: covered ? value.high : null }
    } catch (error) {
      return null
    }
  }
  function cacheWrite (key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)) } catch (error) {}
  }
  function retryableRpcError (error) {
    if (!error) return false
    const status = error.status || (error.response && error.response.status)
    if (error.code === 429 || status === 429) return true
    if (status >= 400 && status < 500) return false
    // ethers reports a dropped or CORS-blocked 429 as SERVER_ERROR "missing response".
    if (error.code === 'SERVER_ERROR' || error.code === 'TIMEOUT' || error.code === 'NETWORK_ERROR') return true
    const message = [
      errText(error),
      error.body,
      error.responseText,
      error.error && error.error.message
    ].filter(Boolean).join(' ')
    return /429|too many requests|rate limit|missing response|bad response|timeout|processing response error|failed to fetch/i.test(message)
  }
  async function retryRpc (request, attempt) {
    try {
      return await request()
    } catch (error) {
      const retry = attempt || 0
      if (!retryableRpcError(error) || retry >= 6) throw error
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
      if (retryableRpcError(error)) {
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
  function discoveryCurrent (generation) { return generation === state.generation }
  // Reads transfer logs from the chain head back to startBlock. Each chunk's
  // new candidates are handed to onCandidates before the next chunk is read,
  // so positions confirmed by live state render while older history is still
  // being scanned. The cache records the contiguous block interval [low, high]
  // that has been read, so a revisit only reads head -> high and low -> start.
  async function scanTransfers (options) {
    const scan = { label: options.label, startBlock: options.startBlock, cursor: null, done: false, stopped: false, gaps: 0 }
    state.scans.push(scan)
    renderScans()
    try {
      await scanTransferRanges(options, scan)
    } catch (error) {
      scan.stopped = true
      throw error
    } finally {
      if (discoveryCurrent(options.generation)) renderScans()
    }
  }
  async function scanTransferRanges (options, scan) {
    const current = function () { return discoveryCurrent(options.generation) }
    const items = new Map()
    function collect (list) {
      const fresh = []
      list.forEach(function (item) {
        if (!item) return
        const key = options.itemKey(item)
        if (items.has(key)) return
        items.set(key, item)
        fresh.push(item)
      })
      if (items.size > maxPositions) throw new Error('Position history exceeds the safe read limit of ' + maxPositions + '.')
      return fresh
    }
    async function validate (candidates) {
      if (!candidates.length) return
      try {
        await options.onCandidates(candidates)
      } catch (error) {
        if (current()) warn(options.label + ': ' + candidates.length + ' candidate(s) could not be checked: ' + errText(error))
      }
    }

    const cached = cacheRead(options.cacheKey)
    const latest = await rpcBlockNumber()
    if (!current()) return
    await validate(collect(cached ? cached.items.map(options.normalizeCached) : []))
    if (!current()) return

    let covered = null
    const segments = []
    if (cached && cached.low !== null && cached.low >= options.startBlock && cached.high <= latest) {
      covered = [cached.low, cached.high]
      segments.push([Math.max(cached.low, cached.high - logReorgLookback), latest])
      if (cached.low > options.startBlock) segments.push([options.startBlock, cached.low - 1])
    } else {
      segments.push([options.startBlock, latest])
    }
    function save () {
      const value = { items: Array.from(items.values()) }
      if (covered) { value.low = covered[0]; value.high = covered[1] }
      cacheWrite(options.cacheKey, value)
    }
    const filter = { address: options.contracts, topics: [options.topic, null, topicAddress(state.sickle)] }
    let span = firstLogBlockSpan
    let gapsInRow = 0
    let retrying = false
    for (const segment of segments) {
      let upper = segment[1]
      let contiguous = true
      while (upper >= segment[0]) {
        const lower = Math.max(segment[0], upper - span + 1)
        let logs
        try {
          logs = await getLogRange(filter, lower, upper, 0)
        } catch (error) {
          if (!current()) return
          // After a good chunk, retry the failure once as a smaller chunk.
          if (!retrying && !gapsInRow && span > firstLogBlockSpan) {
            retrying = true
            span = Math.max(firstLogBlockSpan, Math.floor(span / 4))
            continue
          }
          // Otherwise skip the range and keep going. The cached interval stops
          // growing at the gap so a later visit reads it again, and the chunk
          // keeps growing so an unreachable RPC does not stall on tiny ranges.
          retrying = false
          scan.gaps += 1
          gapsInRow += 1
          contiguous = false
          span = Math.min(logBlockSpan, span * 2)
          warn(options.label + ': blocks ' + lower + '-' + upper + ' could not be read: ' + errText(error))
          scan.cursor = lower
          upper = lower - 1
          renderScans()
          continue
        }
        if (!current()) return
        gapsInRow = 0
        retrying = false
        span = Math.min(logBlockSpan, span * 2)
        const fresh = collect(logs.map(options.fromLog))
        if (contiguous) {
          if (!covered) {
            if (segment[1] === latest) covered = [lower, latest]
          } else if (lower <= covered[1] + 1 && segment[1] >= covered[0] - 1) {
            covered = [Math.min(lower, covered[0]), Math.max(segment[1], covered[1])]
          }
        }
        save()
        scan.cursor = lower
        renderScans()
        await validate(fresh)
        if (!current()) return
        upper = lower - 1
      }
    }
    save()
    scan.done = true
  }

  async function readEnumerablePositions (generation) {
    setLoading('Reading supported NFT managers…')
    const balanceResults = await aggregate(managers.map(function (manager) {
      return { target: manager.address, data: managerInterface.encodeFunctionData('balanceOf', [state.sickle]) }
    }))
    if (!discoveryCurrent(generation)) return
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
    if (positionCalls.length) setLoading('Reading ' + positionCalls.length + ' enumerable NFT' + (positionCalls.length === 1 ? '…' : 's…'))
    const positionResults = await aggregate(positionCalls)
    if (!discoveryCurrent(generation)) return
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

  async function readUniswapV4Positions (generation) {
    await scanTransfers({
      generation,
      label: 'Uniswap-V4 history',
      // v2: v1 stored a forward-scan toBlock rather than a [low, high] interval.
      cacheKey: 'robinhood-sickle-v4-v2:' + state.sickle.toLowerCase(),
      contracts: uniswapV4.address,
      topic: transfer721Topic,
      startBlock: uniswapV4.logStart,
      normalizeCached: function (item) { return /^\d+$/.test(String(item)) ? String(item) : null },
      fromLog: function (log) { return log.topics && log.topics[3] ? ethers.BigNumber.from(log.topics[3]).toString() : null },
      itemKey: function (item) { return item },
      onCandidates: async function (ids) {
        const results = await aggregate(ids.map(function (id) {
          return { target: uniswapV4.address, data: managerInterface.encodeFunctionData('ownerOf', [id]) }
        }))
        if (!discoveryCurrent(generation)) return
        results.forEach(function (result, index) {
          if (!result.success) return
          const owner = managerInterface.decodeFunctionResult('ownerOf', result.returnData)[0]
          if (!sameAddress(owner, state.sickle)) return
          if (state.positions.some(function (position) { return position.manager === uniswapV4 && position.id === ids[index] })) return
          state.positions.push({ manager: uniswapV4, id: ids[index] })
        })
        renderApp()
      }
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
  async function validateFables (generation, candidates, poolsByHook) {
    const calls = []
    candidates.forEach(function (candidate) {
      calls.push({ target: candidate.hook, data: fablesLedgerInterface.encodeFunctionData('balanceOf', [state.sickle, candidate.id]) })
      calls.push({ target: candidate.hook, data: fablesLedgerInterface.encodeFunctionData('userPosition', [candidate.id, state.sickle]) })
    })
    const results = await aggregate(calls)
    if (!discoveryCurrent(generation)) return
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
      if (state.fablesPositions.some(function (position) { return sameAddress(position.hook, candidate.hook) && position.id === candidate.id })) return
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
    renderApp()
  }
  async function readFablesPositions (generation) {
    const pools = await fablesPools()
    if (!discoveryCurrent(generation) || !pools.length) return
    const poolsByHook = new Map(pools.map(function (pool) { return [pool.hook.toLowerCase(), pool] }))
    await scanTransfers({
      generation,
      label: 'Fables history',
      // ERC-6909 Transfer(caller, sender indexed, receiver indexed, id indexed,
      // amount): every share the Sickle holds arrived with the Sickle as the
      // receiver topic, so the node filters on it. v3: earlier versions stored
      // a forward-scan toBlock, and v1 filtered on the sender topic.
      cacheKey: 'robinhood-sickle-fables-v3:' + state.sickle.toLowerCase(),
      contracts: pools.map(function (pool) { return pool.hook }),
      topic: transfer6909Topic,
      startBlock: fablesLogStart,
      normalizeCached: function (item) {
        if (!item || !ethers.utils.isAddress(item.hook) || !/^\d+$/.test(String(item.id))) return null
        if (!poolsByHook.has(item.hook.toLowerCase())) return null
        return { hook: ethers.utils.getAddress(item.hook), id: String(item.id) }
      },
      fromLog: function (log) {
        if (!log.topics || !log.topics[3] || !poolsByHook.has(log.address.toLowerCase())) return null
        return { hook: ethers.utils.getAddress(log.address), id: ethers.BigNumber.from(log.topics[3]).toString() }
      },
      itemKey: function (item) { return item.hook.toLowerCase() + ':' + item.id },
      onCandidates: function (candidates) { return validateFables(generation, candidates, poolsByHook) }
    })
  }

  // Runs the log-based discoveries side by side in the background. A failure
  // in one only adds a warning; the other keeps scanning.
  function discoverHistory (generation) {
    return Promise.all([
      ['Uniswap-V4', readUniswapV4Positions],
      ['Fables', readFablesPositions]
    ].map(function (task) {
      return task[1](generation).catch(function (error) {
        if (!discoveryCurrent(generation)) return
        warn(task[0] + ' discovery failed: ' + errText(error))
        renderScans()
      })
    }))
  }
  function resetDiscovery () {
    state.generation += 1
    state.sickle = ''
    state.positions = []
    state.fablesPositions = []
    state.scans = []
    state.warnings = []
    return state.generation
  }
  // Token balances load alongside the NFT reads and render when they arrive.
  function loadErc20 (generation) {
    erc20.load(state.sickle)
      .catch(function (error) { if (discoveryCurrent(generation)) warn('ERC-20 balance read failed: ' + errText(error)) })
      .then(function () { if (discoveryCurrent(generation)) renderApp() })
  }
  async function refreshWallet () {
    const generation = resetDiscovery()
    if (!state.account || !correctChain()) {
      render()
      return
    }
    setLoading('Reading Sickle account…')
    setStatus('')
    renderApp()
    renderScans()
    let found = false
    try {
      const factoryData = factoryInterface.encodeFunctionData('sickles', [state.account])
      const response = await rpcCall({ to: addresses.factory, data: factoryData })
      if (!discoveryCurrent(generation)) return
      const sickle = factoryInterface.decodeFunctionResult('sickles', response)[0]
      if (isZero(sickle)) return
      state.sickle = sickle
      found = true
      renderApp()
      loadErc20(generation)
      try {
        await readEnumerablePositions(generation)
      } catch (error) {
        if (discoveryCurrent(generation)) warn('NFT manager read failed: ' + errText(error))
      }
    } catch (error) {
      if (!discoveryCurrent(generation)) return
      state.sickle = ''
      state.positions = []
      state.fablesPositions = []
      setStatus('Read failed: ' + errText(error), 'error')
    } finally {
      if (discoveryCurrent(generation)) {
        setLoading()
        render()
      }
    }
    if (found && discoveryCurrent(generation)) discoverHistory(generation)
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
      resetDiscovery()
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
    resetDiscovery()
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
  async function sendAction (transaction, checkingMessage, confirmedMessage) {
    state.sending = true
    setLoading(checkingMessage)
    setStatus('')
    try {
      await sendPreflighted(transaction, confirmedMessage)
    } finally {
      state.sending = false
      setLoading()
      render()
    }
  }
  async function sweepPositions (positions) {
    if (!state.wallet || !state.account) throw new Error('Connect a wallet first.')
    if (!correctChain()) throw new Error('Switch to Robinhood Chain first.')
    if (!positions.length) return
    const tokens = positions.map(function (position) { return position.manager.address })
    const tokenIds = positions.map(function (position) { return position.id })
    const data = sweepInterface.encodeFunctionData('sweepErc721', [tokens, tokenIds])
    await sendAction({ from: state.account, to: addresses.sweep, data }, 'Checking withdrawal…', 'Withdrawal confirmed')
  }
  async function sweepErc20 (transaction) {
    if (!state.wallet || !state.account) throw new Error('Connect a wallet first.')
    if (!correctChain()) throw new Error('Switch to Robinhood Chain first.')
    if (!sameAddress(transaction.from, state.account)) throw new Error('Wallet changed; check the balances again.')
    await sendAction(transaction, 'Checking token sweep…', 'Token sweep confirmed')
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
    await sendAction({ from: state.account, to: addresses.erc6909Strategy, data }, 'Checking Fables exit…', 'Fables exit confirmed')
  }

  function bindUi () {
    byId('sickle-connect').addEventListener('click', function () { connectInjected().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-other-wallet').addEventListener('click', function () { connectOther().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-switch').addEventListener('click', function () { switchNetwork().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('sickle-refresh').addEventListener('click', function () { refreshWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
  }
  async function start () {
    // retryRpc/getLogRange own 429 backoff; ethers' own throttle would retry
    // up to 12 times with growing delays before they ever see the error.
    state.rpc = new ethers.providers.StaticJsonRpcProvider({ url: chain.rpc, throttleLimit: 1 }, { chainId: 4663, name: 'robinhood' })
    byId('sickle-date').textContent = new Date().toString() + '\n\n'
    bindUi()
    render()
    await restoreInjected()
  }

  document.addEventListener('DOMContentLoaded', function () {
    start().catch(function (error) { setLoading(); setStatus(errText(error), 'error') })
  })
})()
