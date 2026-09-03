/* Up33 on Robinhood Chain: official RPC reads and direct wallet transactions only. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Up33.start().catch(Up33.fatal) })

const Up33 = (function () {
  const chain = {
    id: '0x1237', number: 4663, name: 'Robinhood', rpc: 'https://rpc.mainnet.chain.robinhood.com', explorer: 'https://robinhoodchain.blockscout.com',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  }
  const addresses = {
    voter: '0x7F749fDD351C1Ceed82d76d7699CB631Eb8332a7',
    factory: '0x1ac9dB4a2608ba45D6127B1737949b51Bb54B7F3',
    manager: '0x07F44c47743A2f36414A82b9F558ECFCf0EEdCEf',
    multicall: '0xca11bde05977b3631167028862be2a173976ca11',
    // USDG is Robinhood Chain's dollar-denominated settlement asset. It is
    // the single $1 anchor for the onchain DEX spot-price graph below.
    usdg: '0x5fc5360d0400a0fd4f2af552add042d716f1d168',
  }
  const voterAbi = ['function length() view returns(uint256)', 'function pools(uint256) view returns(address)', 'function gauges(address) view returns(address)']
  const factoryAbi = ['function isPool(address) view returns(bool)']
  const poolAbi = [
    'function token0() view returns(address)', 'function token1() view returns(address)', 'function tickSpacing() view returns(int24)',
    'function slot0() view returns(uint160 sqrtPriceX96,int24 tick,uint16 observationIndex,uint16 observationCardinality,uint16 observationCardinalityNext,bool unlocked)',
    'function liquidity() view returns(uint128)',
  ]
  const gaugeAbi = [
    'function pool() view returns(address)', 'function rewardToken() view returns(address)', 'function periodFinish() view returns(uint256)', 'function rewardRate() view returns(uint256)',
    'function stakedValues(address) view returns(uint256[])', 'function earned(address,uint256) view returns(uint256)',
    'function deposit(uint256)', 'function withdraw(uint256)', 'function getReward(uint256)',
  ]
  const erc20Abi = [
    'function symbol() view returns(string)', 'function decimals() view returns(uint8)',
    'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)',
  ]
  const managerAbi = [
    'function balanceOf(address) view returns(uint256)', 'function tokenOfOwnerByIndex(address,uint256) view returns(uint256)',
    'function positions(uint256) view returns(uint96 nonce,address operator,address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint128 liquidity,uint256 feeGrowthInside0LastX128,uint256 feeGrowthInside1LastX128,uint128 tokensOwed0,uint128 tokensOwed1)',
    'function getApproved(uint256) view returns(address)', 'function isApprovedForAll(address,address) view returns(bool)', 'function approve(address,uint256)',
    'function mint((address token0,address token1,int24 tickSpacing,int24 tickLower,int24 tickUpper,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,address recipient,uint256 deadline,uint160 sqrtPriceX96)) payable returns(uint256,uint128,uint256,uint256)',
    'function increaseLiquidity((uint256 tokenId,uint256 amount0Desired,uint256 amount1Desired,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint128,uint256,uint256)',
    'function decreaseLiquidity((uint256 tokenId,uint128 liquidity,uint256 amount0Min,uint256 amount1Min,uint256 deadline)) payable returns(uint256,uint256)',
    'function collect((uint256 tokenId,address recipient,uint128 amount0Max,uint128 amount1Max)) payable returns(uint256,uint256)', 'function burn(uint256) payable', 'function multicall(bytes[]) payable returns(bytes[])',
  ]
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const zero = ethers.constants.AddressZero.toLowerCase()
  const max128 = ethers.BigNumber.from(2).pow(128).sub(1)
  const state = { app: null, rpc: null, wallet: null, eip1193: null, walletSource: null, account: null, walletChain: null, pools: [], tokens: new Map(), prices: new Map(), selected: null, editing: null, positions: [], registryLoading: false, marketLoading: false, marketUpdatedAt: null, walletLoading: false, walletRestorePending: false, sending: false, events: false, reownUnsubscribe: null, spinnerTimer: null, spinnerIndex: 0, message: '', messageType: '', draft: {} }

  const byId = function (id) { return document.getElementById(id) }
  const short = function (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '—' }
  const num = function (value) { return ethers.BigNumber.isBigNumber(value) ? value.toNumber() : Number(value) }
  const isZero = function (address) { return !address || address.toLowerCase() === zero }
  const key = function (token0, token1, spacing) { return token0.toLowerCase() + ':' + token1.toLowerCase() + ':' + spacing }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }
  const activeWallet = function () { return state.eip1193 }
  const onRobinhood = function () { return state.walletChain === chain.id }
  const deadline = function () { return Math.floor(Date.now() / 1000) + 1200 }
  const format = function (amount, decimals, digits) {
    if (amount === undefined || amount === null) return '—'
    const parts = ethers.utils.formatUnits(amount, decimals).split('.')
    const fraction = (parts[1] || '').slice(0, digits === undefined ? 6 : digits).replace(/0+$/, '')
    return fraction ? parts[0] + '.' + fraction : parts[0]
  }
  const amountNumber = function (amount, decimals) {
    if (amount === undefined || amount === null || decimals === undefined || decimals === null) return NaN
    const value = Number(ethers.utils.formatUnits(amount, decimals))
    return Number.isFinite(value) ? value : NaN
  }
  const clean = function (value, length) { return String(value || '—').replace(/[\r\n|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length || 40) || '—' }
  const usd = function (value) {
    if (!Number.isFinite(value) || value < 0) return '—'
    if (value >= 1000000) return '$' + (value / 1000000).toFixed(2) + 'm'
    if (value >= 1000) return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 })
    if (value >= 1) return '$' + value.toFixed(2)
    if (value > 0) return '$' + value.toPrecision(3)
    return '$0.00'
  }
  const percent = function (value) { return Number.isFinite(value) && value >= 0 ? value.toFixed(value >= 1000 ? 0 : 2) + '%' : '—' }
  const errText = function (error) {
    return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 500)
  }
  const message = function (text, type) { state.message = text || ''; state.messageType = type || ''; const node = byId('up33-status'); if (node) { node.textContent = state.message; node.dataset.kind = state.messageType } }
  const setLoading = function (text) {
    const node = byId('up33-loading'); const label = byId('up33-loading-text'); const spinner = byId('up33-loading-spinner')
    if (!node) return
    node.hidden = !text
    if (text && label) label.textContent = text
    if (text && spinner && !state.spinnerTimer) {
      const frames = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]']
      const advance = function () { spinner.textContent = frames[state.spinnerIndex % frames.length]; state.spinnerIndex += 1 }
      state.spinnerIndex = 0; advance()
      state.spinnerTimer = window.setInterval(advance, 300)
    } else if (!text && state.spinnerTimer) {
      window.clearInterval(state.spinnerTimer); state.spinnerTimer = null
    }
  }
  const e = function (tag, options) {
    const node = document.createElement(tag); const config = options || {}
    if (config.text !== undefined) node.textContent = config.text
    if (config.className) node.className = config.className
    if (config.id) node.id = config.id
    if (config.type) node.type = config.type
    if (config.disabled) node.disabled = true
    return node
  }
  const add = function (parent) { for (let i = 1; i < arguments.length; i += 1) parent.appendChild(arguments[i]); return parent }
  const link = function (address) { const node = e('a', { text: short(address) }); node.href = chain.explorer + '/address/' + address; node.target = '_blank'; node.rel = 'noopener noreferrer'; return node }
  const action = function (label, fn, disabled) {
    const node = e('button', { type: 'button', text: '[ ' + label.toUpperCase() + ' ]', className: 'up33-action', disabled: disabled || state.sending })
    node.addEventListener('click', function () { fn().catch(function (error) { console.error('Up33 action failed', error); message(errText(error), 'error') }) })
    return node
  }
  const section = function (title) { const node = e('section'); node.appendChild(e('pre', { text: '\n============== ' + title.toUpperCase() + ' ==============\n' })); return node }
  const limited = async function (items, limit, fn) {
    const result = new Array(items.length); let next = 0
    const worker = async function () { while (next < items.length) { const index = next; next += 1; result[index] = await fn(items[index], index) } }
    await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker)); return result
  }
  const safe = async function (fn, fallback) { try { return await fn() } catch (error) { console.warn('Robinhood RPC read failed', error); return fallback } }
  const contract = function (address, abi, provider) { return new ethers.Contract(address, abi, provider || state.rpc) }
  const interfaceFor = function (abi) { return new ethers.utils.Interface(abi) }
  async function batch(calls, onChunk) {
    const multicall = contract(addresses.multicall, multicallAbi)
    const chunks = []
    for (let start = 0; start < calls.length; start += 100) {
      chunks.push({ start: start, calls: calls.slice(start, start + 100) })
    }
    const output = await limited(chunks, 3, async function (entry) {
      const chunk = entry.calls
      const results = await multicall.aggregate3(chunk.map(function (call) {
        return { target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }
      }))
      const decoded = results.map(function (result, index) {
        const call = chunk[index]
        if (!result.success) return call.fallback
        try {
          const value = call.iface.decodeFunctionResult(call.method, result.returnData)
          return call.decode ? call.decode(value) : value[0]
        } catch (error) {
          console.warn('Robinhood multicall decode failed', error)
          return call.fallback
        }
      })
      if (onChunk) onChunk(decoded, entry.start)
      return decoded
    })
    return [].concat.apply([], output)
  }
  const poolToken = function (pool, index) { return index ? pool.token1Info : pool.token0Info }
  const poolName = function (pool) { return pool.token0Info && pool.token1Info ? pool.token0Info.symbol + ' / ' + pool.token1Info.symbol : short(pool.address) }

  async function start() {
    state.app = byId('up33-app'); state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number)
    setLoading('Reading current Up33 farm contracts from Robinhood Chain…')
    render()
    // Passive wallet restoration deliberately comes from the injected browser
    // provider only. It never requests wallet permissions or opens Reown.
    const passiveWallet = restoreInjectedWallet()
    await loadRegistry(); await passiveWallet
    if (state.walletRestorePending) { state.walletRestorePending = false; await refreshWallet(false) }
  }

  function bindEvents(injected) {
    if (state.events || !injected || !injected.on) return
    state.events = true
    injected.on('accountsChanged', function () { refreshWallet(false).catch(fatal) })
    injected.on('chainChanged', function () { refreshWallet(false).catch(fatal) })
  }

  async function adoptWallet (provider, accounts, source) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider
    state.walletSource = source
    state.wallet = new ethers.providers.Web3Provider(provider, 'any')
    state.account = ethers.utils.getAddress(accounts[0])
    state.walletChain = await provider.request({ method: 'eth_chainId' })
    bindEvents(provider)
    render()
    if (state.pools.length) await refreshWallet(false, accounts)
    else state.walletRestorePending = true
    return true
  }

  async function restoreInjectedWallet () {
    const injected = injectedWallet()
    if (!injected) return false
    try {
      const accounts = await injected.request({ method: 'eth_accounts' })
      return adoptWallet(injected, accounts, 'injected')
    } catch (error) {
      // A public farm view must still load when a browser wallet refuses a
      // passive account read. Do not turn that into a connection prompt.
      console.warn('Passive injected-wallet restore failed', error)
      return false
    }
  }

  async function adoptReownWallet (appKit, address) {
    const provider = await appKit.getWalletProvider()
    if (!provider || typeof provider.request !== 'function') throw new Error('WalletConnect did not provide an EIP-1193 wallet.')
    const accounts = await provider.request({ method: 'eth_accounts' })
    const adopted = await adoptWallet(provider, accounts && accounts.length ? accounts : address ? [address] : [], 'reown')
    if (adopted && state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    return adopted
  }

  async function connectReown () {
    // This module is a dynamic import: neither Reown nor its connector code is
    // part of the initial Up33 page payload or startup work.
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('No injected wallet is connected and WalletConnect is unavailable in this browser.')
    const appKit = reown.createAppKitInstance()
    if (!appKit) throw new Error('No injected wallet is connected and WalletConnect is unavailable in this browser.')
    const address = appKit.getAddress && appKit.getAddress()
    if (address && await adoptReownWallet(appKit, address)) return true
    if (!state.reownUnsubscribe && appKit.subscribeAccount) {
      state.reownUnsubscribe = appKit.subscribeAccount(function (accountState) {
        if (!accountState || !accountState.isConnected || !accountState.address) return
        adoptReownWallet(appKit, accountState.address).catch(function (error) { message(errText(error), 'error') })
      })
    }
    await appKit.open()
    return false
  }

  async function loadRegistry() {
    state.registryLoading = true; setLoading('Reading the live voter, factory, pools, and gauges from Robinhood RPC…'); message('Reading the live voter, factory, pools, and gauges from the official Robinhood RPC…'); render()
    try {
      const voter = contract(addresses.voter, voterAbi); const factory = contract(addresses.factory, factoryAbi); const voterInterface = interfaceFor(voterAbi); const factoryInterface = interfaceFor(factoryAbi)
      const length = num(await voter.length())
      setLoading('Reading ' + length + ' voter pools and their gauge mappings…')
      const poolAddresses = await batch(Array.from({ length: length }, function (_, index) {
        return { target: addresses.voter, iface: voterInterface, method: 'pools', args: [index], fallback: ethers.constants.AddressZero }
      }))
      const candidateReads = []
      poolAddresses.forEach(function (address) {
        candidateReads.push({ target: addresses.factory, iface: factoryInterface, method: 'isPool', args: [address], fallback: false })
        candidateReads.push({ target: addresses.voter, iface: voterInterface, method: 'gauges', args: [address], fallback: ethers.constants.AddressZero })
      })
      const candidateValues = await batch(candidateReads)
      const candidates = poolAddresses.map(function (address, index) { return { address: address, active: candidateValues[index * 2], gauge: candidateValues[index * 2 + 1] } })
      state.pools = candidates.filter(function (candidate) { return candidate.active && !isZero(candidate.gauge) }).map(function (candidate) {
        return { address: candidate.address, gauge: candidate.gauge, ready: false, detailLoading: false }
      })
      state.selected = state.pools[0] || null
      setLoading('Reading ' + state.pools.length + ' pool contracts, tokens, and live emissions…')
      message('Found ' + state.pools.length + ' current Up33 gauges. Reading every pool, token balance, emission, and onchain USDG price path…')
      render()
      if (state.selected) {
        await hydrateAllPools()
        setLoading('Reading pool balances and resolving live USDG-anchored DEX prices…')
        await refreshMarket(false, true)
        state.selected = state.pools.slice().sort(function (left, right) { return (right.tvl || 0) - (left.tvl || 0) })[0] || state.selected
      }
      message('Loaded all ' + state.pools.length + ' current Up33 farms with live onchain TVL and emission APR.', 'success')
    } finally { state.registryLoading = false; if (!state.marketLoading && !state.walletLoading) setLoading(); render() }
  }

  async function readPools(candidates) {
    const poolInterface = interfaceFor(poolAbi); const gaugeInterface = interfaceFor(gaugeAbi); const reads = []
    candidates.forEach(function (candidate) {
      reads.push(
        { target: candidate.address, iface: poolInterface, method: 'token0', fallback: ethers.constants.AddressZero },
        { target: candidate.address, iface: poolInterface, method: 'token1', fallback: ethers.constants.AddressZero },
        { target: candidate.address, iface: poolInterface, method: 'tickSpacing', fallback: 0 },
        { target: candidate.address, iface: poolInterface, method: 'slot0', fallback: null, decode: function (result) { return result } },
        { target: candidate.address, iface: poolInterface, method: 'liquidity', fallback: ethers.constants.Zero },
        { target: candidate.gauge, iface: gaugeInterface, method: 'pool', fallback: ethers.constants.AddressZero },
        { target: candidate.gauge, iface: gaugeInterface, method: 'rewardToken', fallback: ethers.constants.AddressZero },
        { target: candidate.gauge, iface: gaugeInterface, method: 'periodFinish', fallback: ethers.constants.Zero },
        { target: candidate.gauge, iface: gaugeInterface, method: 'rewardRate', fallback: ethers.constants.Zero }
      )
    })
    const values = await batch(reads)
    return candidates.map(function (candidate, index) {
      const offset = index * 9
      const slot0 = values[offset + 3]
      if (!slot0 || isZero(values[offset]) || isZero(values[offset + 1]) || !values[offset + 2]) throw new Error('A voter entry did not expose the expected concentrated-pool interface: ' + candidate.address)
      return { address: candidate.address, gauge: candidate.gauge, token0: values[offset], token1: values[offset + 1], tickSpacing: num(values[offset + 2]), slot0: slot0, liquidity: values[offset + 4], gaugePool: values[offset + 5], rewardToken: values[offset + 6], periodFinish: values[offset + 7], rewardRate: values[offset + 8] }
    })
  }

  async function loadTokens(pools) {
    const source = pools || state.pools.filter(function (pool) { return pool.ready })
    const addressesToRead = Array.from(new Set([].concat.apply([], source.map(function (pool) { return [pool.token0, pool.token1].concat(isZero(pool.rewardToken) ? [] : [pool.rewardToken]) })).map(function (address) { return address.toLowerCase() }))).filter(function (address) { return !state.tokens.has(address) })
    if (!addressesToRead.length) return
    const tokenInterface = interfaceFor(erc20Abi); const reads = []
    addressesToRead.forEach(function (address) {
      reads.push({ target: address, iface: tokenInterface, method: 'symbol', fallback: short(address) }, { target: address, iface: tokenInterface, method: 'decimals', fallback: 18 })
    })
    const values = await batch(reads)
    addressesToRead.forEach(function (address, index) {
      const offset = index * 2
      state.tokens.set(address, { address: address, symbol: values[offset], decimals: num(values[offset + 1]) })
    })
  }

  async function hydratePool(pool) {
    if (pool.ready || pool.detailLoading) return pool
    pool.detailLoading = true
    try {
      const loaded = (await readPools([pool]))[0]
      Object.assign(pool, loaded, { ready: false, detailLoading: true })
      await Promise.all([loadTokens([pool]), readPoolBalances([pool])])
      pool.token0Info = state.tokens.get(pool.token0.toLowerCase())
      pool.token1Info = state.tokens.get(pool.token1.toLowerCase())
      pool.rewardInfo = state.tokens.get(pool.rewardToken.toLowerCase())
      pool.ready = true; pool.detailLoading = false
      priceMarkets()
      return pool
    } catch (error) {
      pool.detailLoading = false
      pool.detailError = errText(error)
      throw error
    }
  }

  async function hydrateAllPools() {
    const pending = state.pools.filter(function (pool) { return !pool.ready })
    if (!pending.length) return
    const groups = []
    for (let start = 0; start < pending.length; start += 10) groups.push(pending.slice(start, start + 10))
    await limited(groups, 3, async function (group) {
      const loaded = await readPools(group)
      loaded.forEach(function (detail, index) { Object.assign(group[index], detail, { ready: false, detailLoading: true }) })
      // Token symbols/decimals and pool balances share no dependency once the
      // detail addresses are known, so start both RPC phases together.
      await Promise.all([loadTokens(group), readPoolBalances(group)])
      group.forEach(function (pool) {
        pool.token0Info = state.tokens.get(pool.token0.toLowerCase())
        pool.token1Info = state.tokens.get(pool.token1.toLowerCase())
        pool.rewardInfo = state.tokens.get(pool.rewardToken.toLowerCase())
        pool.ready = true; pool.detailLoading = false
      })
      priceMarkets()
      state.marketUpdatedAt = new Date()
      const ready = state.pools.filter(function (pool) { return pool.ready }).length
      setLoading('Loaded ' + ready + '/' + state.pools.length + ' farms; resolving live USDG-anchored TVLs and APRs…')
      render()
    })
  }

  function poolSpotPrice (pool) {
    if (!pool.slot0 || !pool.token0Info || !pool.token1Info || !pool.liquidity || pool.liquidity.isZero()) return NaN
    const sqrtPriceX96 = Number((pool.slot0.sqrtPriceX96 || pool.slot0[0]).toString())
    const ratio = (sqrtPriceX96 / (2 ** 96)) ** 2 * (10 ** (pool.token0Info.decimals - pool.token1Info.decimals))
    return Number.isFinite(ratio) && ratio > 0 ? ratio : NaN
  }

  async function readPoolBalances (pools) {
    const tokenInterface = interfaceFor(erc20Abi)
    const reads = []
    pools.forEach(function (pool) {
      reads.push(
        { target: pool.token0, iface: tokenInterface, method: 'balanceOf', args: [pool.address], fallback: ethers.constants.Zero },
        { target: pool.token1, iface: tokenInterface, method: 'balanceOf', args: [pool.address], fallback: ethers.constants.Zero }
      )
    })
    const values = await batch(reads)
    pools.forEach(function (pool, index) {
      pool.balance0 = values[index * 2]
      pool.balance1 = values[index * 2 + 1]
    })
  }

  function priceMarkets () {
    // Every price comes from a live concentrated-pool slot0. Starting at the
    // USDG $1 anchor, this resolves WETH → UP and the rest of the live farm
    // graph without a price service, token list, or router quote.
    const prices = new Map([[addresses.usdg.toLowerCase(), 1]])
    const aliases = {
      // sNET is the 1:1 staking receipt for NET. Robinhood's staking contract
      // exchanges matching raw NET and sNET amounts, so it inherits NET/USDG.
      '0xb773ec2c326b7f98a5a83fc098825492f020a4c7': '0xca9c78dd337a67f6e0077f65f5e9218719d30edf'
    }
    const routes = state.pools.filter(function (pool) { return pool.ready && Number.isFinite(poolSpotPrice(pool)) })
    for (let pass = 0; pass < routes.length + 2; pass += 1) {
      let changed = false
      routes.forEach(function (pool) {
        const token0 = pool.token0.toLowerCase(); const token1 = pool.token1.toLowerCase(); const spot = poolSpotPrice(pool)
        const price0 = prices.get(token0); const price1 = prices.get(token1)
        // spot is token1 units for one token0. A token0 USD price therefore
        // prices token1 by division; a token1 USD price prices token0 by multiplication.
        if (price0 && !price1) { prices.set(token1, price0 / spot); changed = true }
        else if (price1 && !price0) { prices.set(token0, price1 * spot); changed = true }
      })
      Object.keys(aliases).forEach(function (alias) {
        const underlying = prices.get(aliases[alias])
        if (underlying && !prices.has(alias)) { prices.set(alias, underlying); changed = true }
      })
      if (!changed) break
    }
    state.prices = prices
    const now = Math.floor(Date.now() / 1000)
    state.pools.filter(function (pool) { return pool.ready }).forEach(function (pool) {
      pool.price0 = prices.get(pool.token0.toLowerCase())
      pool.price1 = prices.get(pool.token1.toLowerCase())
      pool.rewardPrice = prices.get(pool.rewardToken.toLowerCase())
      const value0 = amountNumber(pool.balance0, pool.token0Info.decimals)
      const value1 = amountNumber(pool.balance1, pool.token1Info.decimals)
      pool.tvl = pool.price0 > 0 && pool.price1 > 0 ? value0 * pool.price0 + value1 * pool.price1 : NaN
      const emissionsLive = pool.periodFinish && num(pool.periodFinish) > now && pool.rewardRate && !pool.rewardRate.isZero()
      pool.weeklyRewards = emissionsLive ? amountNumber(pool.rewardRate.mul(604800), pool.rewardInfo.decimals) : 0
      pool.weeklyRewardsUsd = emissionsLive && pool.rewardPrice > 0 ? pool.weeklyRewards * pool.rewardPrice : NaN
      pool.apr = emissionsLive && pool.tvl > 0 && pool.rewardPrice > 0
        ? amountNumber(pool.rewardRate.mul(31536000), pool.rewardInfo.decimals) * pool.rewardPrice / pool.tvl * 100
        : emissionsLive ? NaN : 0
    })
  }

  async function refreshMarket (announce, balancesAlreadyRead) {
    if (!state.pools.length) return
    state.marketLoading = true
    setLoading('Reading all ' + state.pools.length + ' pool balances and USDG-anchored DEX prices…')
    if (announce !== false) message('Refreshing every live farm balance, emission, and USDG-anchored DEX price path…')
    render()
    try {
      if (!balancesAlreadyRead) await readPoolBalances(state.pools)
      priceMarkets()
      state.marketUpdatedAt = new Date()
      if (announce !== false) message('Refreshed all ' + state.pools.length + ' live Up33 farms directly from Robinhood Chain.', 'success')
    } finally {
      state.marketLoading = false
      if (!state.registryLoading && !state.walletLoading) setLoading()
      render()
    }
  }

  async function connect() {
    // Page load is passive. This is the user-initiated path that may ask the
    // injected browser wallet for permission to expose an account.
    const injected = injectedWallet()
    if (injected) {
      const accounts = await injected.request({ method: 'eth_requestAccounts' })
      if (!accounts || !accounts[0]) throw new Error('No browser-wallet account was selected.')
      await adoptWallet(injected, accounts, 'injected')
      message('Wallet positions, balances, and approvals refreshed from Robinhood Chain.', 'success')
      return
    }
    await connectReown()
  }

  async function switchNetwork() {
    const provider = activeWallet(); if (!provider) throw new Error('Connect a wallet first.')
    try { await provider.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] }) } catch (error) {
      if (error.code !== 4902) throw error
      await provider.request({ method: 'wallet_addEthereumChain', params: [{ chainId: chain.id, chainName: chain.name, nativeCurrency: chain.nativeCurrency, rpcUrls: [chain.rpc], blockExplorerUrls: [chain.explorer] }] })
    }
    await refreshWallet(true)
  }

  async function refreshWallet(announce, knownAccounts) {
    const provider = activeWallet(); if (!state.wallet || !provider) return
    state.walletLoading = true; setLoading('Reading wallet balances, position-manager NFTs, and gauge stakes…'); render()
    try {
      const accounts = knownAccounts || await provider.request({ method: 'eth_accounts' })
      state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
      state.walletChain = await provider.request({ method: 'eth_chainId' })
      state.positions = []
      if (state.account && onRobinhood() && state.pools.length) { await hydrateAllPools(); await loadPositions(); await loadSelectedWalletData(); if (announce) message('Wallet positions, balances, and approvals refreshed from Robinhood Chain.', 'success') }
      else if (state.account && announce) message('Switch the wallet to Robinhood Chain before signing.', 'error')
    } finally { state.walletLoading = false; if (!state.registryLoading && !state.marketLoading) setLoading(); render() }
  }

  async function loadPositions() {
    const managerInterface = interfaceFor(managerAbi); const gaugeInterface = interfaceFor(gaugeAbi)
    const byKey = new Map(state.pools.map(function (pool) { return [key(pool.token0, pool.token1, pool.tickSpacing), pool] }))
    const count = num((await batch([{ target: addresses.manager, iface: managerInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }]))[0])
    const ids = count ? await batch(Array.from({ length: count }, function (_, index) {
      return { target: addresses.manager, iface: managerInterface, method: 'tokenOfOwnerByIndex', args: [state.account, index], fallback: ethers.constants.Zero }
    })) : []
    const directPositions = ids.length ? await batch(ids.map(function (id) {
      // positions() has several return values, not one tuple return. Keep the
      // whole decoded Result so its token0/token1/tickSpacing properties stay
      // available to the pool lookup below.
      return { target: addresses.manager, iface: managerInterface, method: 'positions', args: [id], fallback: null, decode: function (result) { return result } }
    })) : []
    const direct = directPositions.map(function (position, index) {
      const pool = position && byKey.get(key(position.token0, position.token1, num(position.tickSpacing)))
      return pool ? { id: ids[index], position: position, pool: pool, status: 'wallet' } : null
    })
    const stakedIds = await batch(state.pools.map(function (pool) {
      return { target: pool.gauge, iface: gaugeInterface, method: 'stakedValues', args: [state.account], fallback: [], decode: function (result) { return result[0] } }
    }))
    const stakedReferences = []
    stakedIds.forEach(function (idsInGauge, poolIndex) {
      Array.from(idsInGauge || []).forEach(function (id) { stakedReferences.push({ id: id, pool: state.pools[poolIndex] }) })
    })
    const stakedReads = stakedReferences.flatMap(function (entry) {
      return [
        { target: addresses.manager, iface: managerInterface, method: 'positions', args: [entry.id], fallback: null, decode: function (result) { return result } },
        { target: entry.pool.gauge, iface: gaugeInterface, method: 'earned', args: [state.account, entry.id], fallback: ethers.constants.Zero }
      ]
    })
    const stakedValues = stakedReads.length ? await batch(stakedReads) : []
    const staked = stakedReferences.map(function (entry, index) {
      const position = stakedValues[index * 2]
      return position ? { id: entry.id, position: position, pool: entry.pool, status: 'staked', earned: stakedValues[index * 2 + 1] } : null
    })
    state.positions = direct.filter(Boolean).concat(staked.filter(Boolean))
  }

  async function loadSelectedWalletData() {
    if (!state.selected || !state.account) return
    const tokenInterface = interfaceFor(erc20Abi)
    const values = await batch([
      { target: state.selected.token0, iface: tokenInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: state.selected.token1, iface: tokenInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: state.selected.token0, iface: tokenInterface, method: 'allowance', args: [state.account, addresses.manager], fallback: ethers.constants.Zero },
      { target: state.selected.token1, iface: tokenInterface, method: 'allowance', args: [state.account, addresses.manager], fallback: ethers.constants.Zero }
    ])
    state.selected.walletData = { balance0: values[0], balance1: values[1], allowance0: values[2], allowance1: values[3] }
  }

  function needWallet() { if (!state.account) throw new Error('Connect a wallet first.'); if (!onRobinhood()) throw new Error('Switch the wallet to Robinhood Chain first.'); if (state.sending) throw new Error('Wait for the pending transaction.') }
  async function send(instance, method, args, label) {
    needWallet(); state.sending = true; render()
    try {
      message('Simulating ' + label + ' against the wallet before sending…')
      const signer = state.wallet.getSigner(); const connected = instance.connect(signer); const request = await connected.populateTransaction[method].apply(connected.populateTransaction, args)
      request.from = state.account; await state.wallet.call(request)
      message('Wallet confirmation requested for ' + label + '…')
      const tx = await signer.sendTransaction(request); message(label + ' sent: ' + tx.hash + '. Waiting for confirmation…')
      await state.wallet.waitForTransaction(tx.hash); message(label + ' confirmed: ' + tx.hash, 'success'); await refreshWallet(false); return tx
    } finally { state.sending = false; render() }
  }

  function draftValues() {
    const pool = state.selected; if (!pool) throw new Error('Choose an Up33 pool first.')
    const token0 = poolToken(pool, 0); const token1 = poolToken(pool, 1)
    const parse = function (value, token, label) { try { if (!String(value || '').trim()) throw new Error('missing'); return ethers.utils.parseUnits(String(value).trim(), token.decimals) } catch (error) { throw new Error(label + ' must be a non-negative ' + token.symbol + ' amount.') } }
    const values = { pool: pool, token0: token0, token1: token1, amount0: parse(byId('up33-amount0').value, token0, token0.symbol + ' desired'), amount1: parse(byId('up33-amount1').value, token1, token1.symbol + ' desired'), min0: parse(byId('up33-min0').value || '0', token0, token0.symbol + ' minimum'), min1: parse(byId('up33-min1').value || '0', token1, token1.symbol + ' minimum') }
    state.draft = { amount0: byId('up33-amount0').value, amount1: byId('up33-amount1').value, min0: byId('up33-min0').value, min1: byId('up33-min1').value, lower: byId('up33-tick-lower') && byId('up33-tick-lower').value, upper: byId('up33-tick-upper') && byId('up33-tick-upper').value }
    return values
  }

  async function approveToken(index) {
    needWallet(); const values = draftValues(); const token = index ? values.token1 : values.token0; const amount = index ? values.amount1 : values.amount0
    if (amount.isZero()) throw new Error('Enter a non-zero ' + token.symbol + ' amount before approving it.')
    await send(contract(token.address, erc20Abi, state.wallet), 'approve', [addresses.manager, amount], 'Approve ' + token.symbol + ' for the position manager')
  }

  function ticks(pool) {
    const lower = Number(byId('up33-tick-lower').value); const upper = Number(byId('up33-tick-upper').value)
    if (!Number.isInteger(lower) || !Number.isInteger(upper)) throw new Error('Tick bounds must be whole numbers.')
    if (lower >= upper) throw new Error('Lower tick must be smaller than upper tick.')
    if (lower % pool.tickSpacing || upper % pool.tickSpacing) throw new Error('Tick bounds must be multiples of ' + pool.tickSpacing + '.')
    return { lower: lower, upper: upper }
  }

  async function mintOrIncrease() {
    needWallet(); const values = draftValues(); const walletData = values.pool.walletData
    if (!walletData || values.amount0.gt(walletData.allowance0) || values.amount1.gt(walletData.allowance1)) throw new Error('Approve each desired token amount before submitting.')
    if ((values.min0.isZero() || values.min1.isZero()) && !window.confirm('A zero minimum amount has no slippage protection for that token. vfat.tools does not provide a quote here. Continue?')) return
    const manager = contract(addresses.manager, managerAbi, state.wallet)
    if (state.editing) return send(manager, 'increaseLiquidity', [{ tokenId: state.editing.id, amount0Desired: values.amount0, amount1Desired: values.amount1, amount0Min: values.min0, amount1Min: values.min1, deadline: deadline() }], 'Increase liquidity for position #' + state.editing.id.toString())
    const range = ticks(values.pool)
    return send(manager, 'mint', [{ token0: values.pool.token0, token1: values.pool.token1, tickSpacing: values.pool.tickSpacing, tickLower: range.lower, tickUpper: range.upper, amount0Desired: values.amount0, amount1Desired: values.amount1, amount0Min: values.min0, amount1Min: values.min1, recipient: state.account, deadline: deadline(), sqrtPriceX96: 0 }], 'Mint a new position')
  }

  async function stake(position) {
    needWallet(); const manager = contract(addresses.manager, managerAbi, state.wallet); const gauge = contract(position.pool.gauge, gaugeAbi, state.wallet)
    const approved = await manager.getApproved(position.id); const allApproved = await manager.isApprovedForAll(state.account, position.pool.gauge)
    if (approved.toLowerCase() !== position.pool.gauge.toLowerCase() && !allApproved) await send(manager, 'approve', [position.pool.gauge, position.id], 'Approve position #' + position.id.toString() + ' for its Up33 gauge')
    return send(gauge, 'deposit', [position.id], 'Stake position #' + position.id.toString())
  }
  const claim = function (position) { return send(contract(position.pool.gauge, gaugeAbi, state.wallet), 'getReward', [position.id], 'Claim rewards for position #' + position.id.toString()) }
  const unstake = function (position) { return send(contract(position.pool.gauge, gaugeAbi, state.wallet), 'withdraw', [position.id], 'Unstake position #' + position.id.toString()) }
  const collect = function (position) { return send(contract(addresses.manager, managerAbi, state.wallet), 'collect', [{ tokenId: position.id, recipient: state.account, amount0Max: max128, amount1Max: max128 }], 'Collect fees for position #' + position.id.toString()) }

  async function exit(position) {
    needWallet(); const token0 = poolToken(position.pool, 0); const token1 = poolToken(position.pool, 1)
    const readMin = function (token) { const entry = window.prompt('Minimum ' + token.symbol + ' when exiting #' + position.id.toString() + ' (enter 0 only if you accept no protection):', '0'); if (entry === null) return null; try { return ethers.utils.parseUnits(entry.trim(), token.decimals) } catch (error) { throw new Error('Minimum must be a valid ' + token.symbol + ' amount.') } }
    const min0 = readMin(token0); if (min0 === null) return; const min1 = readMin(token1); if (min1 === null) return
    if ((min0.isZero() || min1.isZero()) && !window.confirm('At least one exit minimum is zero. This direct transaction is not price-protected for that token. Continue?')) return
    const manager = contract(addresses.manager, managerAbi, state.wallet); const calls = []
    if (!position.position.liquidity.isZero()) calls.push(manager.interface.encodeFunctionData('decreaseLiquidity', [{ tokenId: position.id, liquidity: position.position.liquidity, amount0Min: min0, amount1Min: min1, deadline: deadline() }]))
    calls.push(manager.interface.encodeFunctionData('collect', [{ tokenId: position.id, recipient: state.account, amount0Max: max128, amount1Max: max128 }]))
    calls.push(manager.interface.encodeFunctionData('burn', [position.id]))
    return send(manager, 'multicall', [calls], 'Exit position #' + position.id.toString())
  }

  async function choose(pool, position) {
    state.selected = pool; state.editing = position || null; render()
    if (!pool.ready) {
      message('Reading ' + short(pool.address) + ' directly from Robinhood Chain…')
      await hydratePool(pool)
    }
    await loadSelectedWalletData()
    render()
  }

  function render() {
    if (!state.app) return; state.app.textContent = ''
    state.app.appendChild(renderStatus()); state.app.appendChild(renderRegistry()); state.app.appendChild(renderWallet()); state.app.appendChild(renderComposer()); state.app.appendChild(renderPositions())
  }
  function renderStatus() { const node = e('pre', { id: 'up33-status', text: state.message }); node.dataset.kind = state.messageType; return node }
  function renderWallet() {
    const node = section('Wallet'); const injected = injectedWallet()
    if (!state.account) {
      node.appendChild(e('pre', { text: injected ? 'No authorized browser-wallet account was found. You can still inspect the live farm registry below.' : 'No browser wallet detected. You can still inspect the live farm registry below.' }))
      node.appendChild(action('Connect wallet', connect))
      if (injected) { node.appendChild(document.createTextNode(' ')); node.appendChild(action('Other wallet', connectReown)) }
      return node
    }
    node.appendChild(e('pre', { text: short(state.account) + ' — ' + (onRobinhood() ? 'connected to Robinhood Chain.' : 'connected on ' + (state.walletChain || 'an unknown network') + '.') }))
    add(node, action('Refresh wallet data', function () { return refreshWallet(true) }), document.createTextNode(' ')); if (!onRobinhood()) node.appendChild(action('Switch to Robinhood', switchNetwork)); return node
  }
  function asciiTable (heading, rows) {
    const values = [heading].concat(rows).map(function (row) { return row.map(function (value) { return String(value) }) })
    const widths = heading.map(function (_, index) { return values.reduce(function (width, row) { return Math.max(width, row[index].length) }, 0) })
    const rule = '+' + widths.map(function (width) { return '-'.repeat(width + 2) }).join('+') + '+'
    const row = function (values) { return '| ' + values.map(function (value, index) { return value.padEnd(widths[index]) }).join(' | ') + ' |' }
    return [rule, row(heading), rule].concat(rows.map(row), [rule]).join('\n')
  }
  function farmTable (pools) {
    const ordered = pools.slice().sort(function (left, right) {
      const leftValue = Number.isFinite(left.tvl) ? left.tvl : -1
      const rightValue = Number.isFinite(right.tvl) ? right.tvl : -1
      return rightValue - leftValue
    })
    const rows = ordered.map(function (pool, index) {
      const rewardSymbol = clean(pool.rewardInfo && pool.rewardInfo.symbol, 16)
      const reward = pool.weeklyRewards > 0
        ? pool.weeklyRewards.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' ' + rewardSymbol + (Number.isFinite(pool.weeklyRewardsUsd) ? ' (' + usd(pool.weeklyRewardsUsd) + ')' : '')
        : 'No active emissions'
      const finish = pool.periodFinish && num(pool.periodFinish) > Math.floor(Date.now() / 1000)
        ? new Date(num(pool.periodFinish) * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Ended'
      return [String(index + 1), clean(poolName(pool), 30), usd(pool.tvl), reward, percent(pool.apr), finish]
    })
    return asciiTable(['#', 'Farm', 'TVL', 'Rewards / week', 'APR', 'Period end'], rows)
  }

  function renderRegistry() {
    const node = section('All current Up33 farms')
    if (state.registryLoading && !state.pools.length) { node.appendChild(e('pre', { text: 'Reading voter → factory → gauge data from Robinhood RPC…' })); return node }
    if (!state.pools.length) { node.appendChild(e('pre', { text: 'No current Up33 pool/gauge pairs were returned by the voter and factory.' })); return node }
    const ready = state.pools.filter(function (pool) { return pool.ready })
    if (!ready.length) {
      node.appendChild(e('pre', { text: 'FARMS : ' + state.pools.length + ' current gauge-backed pools\nREADING: pool contracts, token balances, emissions, and the USDG-anchored onchain price graph…' }))
      return node
    }
    const priced = ready.filter(function (pool) { return Number.isFinite(pool.tvl) }).length
    const active = ready.filter(function (pool) { return pool.periodFinish && num(pool.periodFinish) > Math.floor(Date.now() / 1000) && pool.rewardRate && !pool.rewardRate.isZero() })
    const pricedApr = active.filter(function (pool) { return Number.isFinite(pool.apr) }).length
    const totalTvl = ready.reduce(function (sum, pool) { return sum + (Number.isFinite(pool.tvl) ? pool.tvl : 0) }, 0)
    const progress = ready.length === state.pools.length ? 'all current farms loaded' : ready.length + '/' + state.pools.length + ' farms loaded; rows will update as RPC batches settle'
    node.appendChild(e('pre', { text: 'FARMS : ' + progress + ' · ' + priced + '/' + ready.length + ' TVLs priced onchain · ' + pricedApr + '/' + active.length + ' live emission APRs priced onchain\nTVL   : ' + usd(totalTvl) + ' across visible farms with a live USDG path\nSOURCE: voter + factory + gauge + pool balances + pool slot0, all on Robinhood RPC\n' }))
    node.appendChild(e('pre', { className: 'up33-market-table', text: farmTable(ready) }))
    const controls = e('div')
    add(controls, action('Refresh all farms', function () { return refreshMarket(true) }), document.createTextNode('  '))
    controls.appendChild(document.createTextNode('USE FARM : '))
    const selector = document.createElement('select')
    ready.slice().sort(function (left, right) { return (right.tvl || 0) - (left.tvl || 0) }).forEach(function (pool) {
      const option = document.createElement('option')
      option.value = pool.address
      option.textContent = poolName(pool) + ' · ' + usd(pool.tvl) + ' TVL · ' + percent(pool.apr)
      if (state.selected && pool.address.toLowerCase() === state.selected.address.toLowerCase()) option.selected = true
      selector.appendChild(option)
    })
    selector.addEventListener('change', function () {
      const pool = state.pools.find(function (entry) { return entry.address.toLowerCase() === selector.value.toLowerCase() })
      if (pool) choose(pool, null).catch(function (error) { message(errText(error), 'error') })
    })
    controls.appendChild(selector)
    node.appendChild(controls)
    const pool = state.selected
    if (!pool || !pool.ready) return node
    const reward = pool.weeklyRewards > 0 ? format(pool.rewardRate, pool.rewardInfo.decimals, 6) + ' ' + clean(pool.rewardInfo.symbol, 16) + ' / second' : 'No active emissions'
    node.appendChild(e('pre', { text: '\nSELECTED: ' + poolName(pool) + ' · TVL ' + usd(pool.tvl) + ' · APR ' + percent(pool.apr) + '\nREWARD : ' + reward + ' · ends ' + (pool.periodFinish && num(pool.periodFinish) > Math.floor(Date.now() / 1000) ? new Date(num(pool.periodFinish) * 1000).toLocaleString() : 'Ended') + '\nPRICE  : ' + clean(pool.token0Info.symbol, 16) + ' ' + usd(pool.price0) + ' · ' + clean(pool.token1Info.symbol, 16) + ' ' + usd(pool.price1) + ' · ' + clean(pool.rewardInfo.symbol, 16) + ' ' + usd(pool.rewardPrice) }))
    const contracts = e('div'); add(contracts, document.createTextNode('LINKS  : '), link(pool.address), document.createTextNode(' pool · '), link(pool.gauge), document.createTextNode(' gauge')); node.appendChild(contracts)
    return node
  }
  function input(label, id, value, hint) { const field = e('label', { className: 'up33-form-label' }); field.appendChild(document.createTextNode(label + ' : ')); const node = e('input', { id: id }); node.type = 'text'; node.inputMode = 'decimal'; node.autocomplete = 'off'; node.value = value || ''; field.appendChild(node); if (hint) field.appendChild(document.createTextNode('  ' + hint)); return field }
  function renderComposer() {
    const node = section(state.editing ? 'Increase position #' + state.editing.id.toString() : 'Mint a new position'); const pool = state.selected
    if (!pool || !pool.ready) { node.appendChild(e('pre', { text: pool && pool.detailLoading ? 'Reading the selected pool’s direct onchain metadata…' : 'Choose a live pool above to create a direct position.' })); return node }
    const token0 = poolToken(pool, 0); const token1 = poolToken(pool, 1); node.appendChild(e('pre', { text: state.editing ? 'Adding liquidity to ' + poolName(pool) + '. Tick bounds are fixed by this NFT.' : 'Minting a wallet-owned ' + poolName(pool) + ' NFT. It is not staked automatically.' }))
    node.appendChild(e('pre', { text: 'Pool tick ' + pool.slot0.tick + ' · spacing ' + pool.tickSpacing + ' · pool ' + short(pool.address) + ' · gauge ' + short(pool.gauge) }))
    if (state.account && onRobinhood() && pool.walletData) { node.appendChild(e('pre', { text: 'Wallet balances: ' + format(pool.walletData.balance0, token0.decimals) + ' ' + token0.symbol + ' · ' + format(pool.walletData.balance1, token1.decimals) + ' ' + token1.symbol })); node.appendChild(e('pre', { text: 'Manager allowance: ' + format(pool.walletData.allowance0, token0.decimals) + ' ' + token0.symbol + ' · ' + format(pool.walletData.allowance1, token1.decimals) + ' ' + token1.symbol })) }
    const fields = e('div', { className: 'up33-fields' }); add(fields, input(token0.symbol + ' desired', 'up33-amount0', state.draft.amount0, 'Direct ERC-20 amount'), input(token1.symbol + ' desired', 'up33-amount1', state.draft.amount1, 'Direct ERC-20 amount'), input(token0.symbol + ' minimum', 'up33-min0', state.draft.min0 || '0', 'Your slippage floor'), input(token1.symbol + ' minimum', 'up33-min1', state.draft.min1 || '0', 'Your slippage floor'))
    if (!state.editing) { const center = Math.floor(num(pool.slot0.tick) / pool.tickSpacing) * pool.tickSpacing; add(fields, input('Lower tick', 'up33-tick-lower', state.draft.lower || String(center - 10 * pool.tickSpacing), 'Multiple of ' + pool.tickSpacing), input('Upper tick', 'up33-tick-upper', state.draft.upper || String(center + 10 * pool.tickSpacing), 'Multiple of ' + pool.tickSpacing)) }
    node.appendChild(fields); const controls = e('div'); const disabled = !state.account || !onRobinhood(); add(controls, action('Approve ' + token0.symbol, function () { return approveToken(0) }, disabled), document.createTextNode(' '), action('Approve ' + token1.symbol, function () { return approveToken(1) }, disabled), document.createTextNode(' '), action(state.editing ? 'Increase liquidity' : 'Mint position', mintOrIncrease, disabled)); node.appendChild(controls)
    node.appendChild(e('pre', { text: '\nThe form does not quote or swap. Minimum amounts are supplied exactly as entered; zero minimums require confirmation before signing.' })); if (state.editing) node.appendChild(action('Create a new position instead', function () { return choose(pool, null) })); return node
  }
  function describe(position) {
    const token0 = poolToken(position.pool, 0); const token1 = poolToken(position.pool, 1); const values = ['#' + position.id.toString(), token0.symbol + ' / ' + token1.symbol, 'range ' + position.position.tickLower + ' to ' + position.position.tickUpper, 'liquidity ' + position.position.liquidity.toString()]
    if (position.status === 'staked' && position.pool.rewardInfo) values.push('earned ' + format(position.earned, position.pool.rewardInfo.decimals) + ' ' + position.pool.rewardInfo.symbol); return values.join(' · ')
  }
  function renderPositions() {
    const node = section('Your direct Up33 positions')
    if (!state.account) { node.appendChild(e('pre', { text: 'Connect a wallet on Robinhood Chain to find direct position-manager NFTs and gauge-staked NFTs.' })); return node }
    if (!onRobinhood()) { node.appendChild(e('pre', { text: 'Switch to Robinhood Chain to load and transact with this wallet’s positions.' })); return node }
    if (state.walletLoading) { node.appendChild(e('pre', { text: 'Reading direct wallet NFTs and gauge stakes…' })); return node }
    if (!state.positions.length) { node.appendChild(e('pre', { text: 'No direct wallet-owned or gauge-staked Up33 NFTs were found. NFTs held by another smart wallet are intentionally not inferred here.' })); return node }
    state.positions.forEach(function (position) {
      node.appendChild(e('pre', { text: '\nPOSITION: ' + describe(position) + '\nSTATE   : ' + (position.status === 'staked' ? 'Staked in Up33 gauge' : 'In this wallet') }))
      const controls = e('div'); add(controls, document.createTextNode('ACTIONS : '))
      if (position.status === 'staked') add(controls, action('Claim', function () { return claim(position) }), document.createTextNode(' '), action('Unstake', function () { return unstake(position) }))
      else add(controls, action('Stake', function () { return stake(position) }), document.createTextNode(' '), action('Collect fees', function () { return collect(position) }), document.createTextNode(' '), action('Increase', function () { return choose(position.pool, position) }), document.createTextNode(' '), action('Exit all', function () { return exit(position) }))
      node.appendChild(controls)
    })
    node.appendChild(e('pre', { text: '\nExit all removes all NFT liquidity, collects, and burns the NFT in one position-manager multicall. It asks for explicit token minimums before the wallet request.' })); return node
  }
  function fatal(error) { setLoading(); const app = byId('up33-app'); if (!app) return; app.textContent = ''; app.appendChild(e('pre', { text: 'UP33 COULD NOT LOAD\n' + errText(error) + '\nThis page only uses the official Robinhood RPC. Check the connection and try again.' })) }
  return { start: start, fatal: fatal }
})()
