/* Raphael Exchange on Robinhood Chain: official RPC reads and direct EIP-1193 writes only. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Raphael.start().catch(Raphael.fatal) })

const Raphael = (function () {
  const chain = { id: '0x1237', number: 4663, name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com' }
  // Deployment roots published by Raphael's contract-deployments documentation.
  // Pool lists, gauges, balances, votes, and rewards are always read afresh
  // from these onchain registries; nothing below is a static farm list.
  const addresses = {
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    voter: '0x81024323a84Ae2DCaCee4E1d4087Cc2fb424fb27',
    poolFactory: '0x1A6745F84099Fa7E84D1f3B34c23482865194bd1',
    router: '0x2F0E010edC989bB4Dc3BFaF07750480bC16285d4',
    votingEscrow: '0x5B04d092E3FEAaC0717e2eBC07817e43bb53D2C7',
    minter: '0x8f5bb65f70406da361C54C9e65E726F6cd391846',
    rewardsDistributor: '0xf7f1A5903828884Bf716f88F82cd23A4fc195EeD',
    raph: '0x325Ed5a3617B1EaAB6ebeEfCc2Af084beEf49ecE',
    weth: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73',
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'
  }
  const voterAbi = [
    'function length() view returns(uint256)', 'function pools(uint256) view returns(address)', 'function gauges(address) view returns(address)', 'function isAlive(address) view returns(bool)',
    'function weights(address) view returns(uint256)', 'function totalWeight() view returns(uint256)', 'function lastVoted(uint256) view returns(uint256)', 'function maxVotingNum() view returns(uint256)',
    'function claimRewards(address[])', 'function vote(uint256,address[],uint256[])', 'function reset(uint256)'
  ]
  const factoryAbi = ['function allPoolsLength() view returns(uint256)', 'function allPools(uint256) view returns(address)']
  const poolAbi = [
    'function metadata() view returns(uint256 dec0,uint256 dec1,uint256 r0,uint256 r1,bool st,address t0,address t1)', 'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)',
    'function claimable0(address) view returns(uint256)', 'function claimable1(address) view returns(uint256)', 'function index0() view returns(uint256)', 'function index1() view returns(uint256)',
    'function supplyIndex0(address) view returns(uint256)', 'function supplyIndex1(address) view returns(uint256)', 'function claimFees() returns(uint256,uint256)'
  ]
  const gaugeAbi = ['function rewardRate() view returns(uint256)', 'function periodFinish() view returns(uint256)', 'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)', 'function earned(address) view returns(uint256)', 'function deposit(uint256)', 'function withdraw(uint256)']
  const routerAbi = [
    'function quoteAddLiquidity(address,address,bool,address,uint256,uint256) view returns(uint256 amountA,uint256 amountB,uint256 liquidity)', 'function quoteRemoveLiquidity(address,address,bool,address,uint256) view returns(uint256 amountA,uint256 amountB)',
    'function addLiquidity(address,address,bool,uint256,uint256,uint256,uint256,address,uint256) returns(uint256,uint256,uint256)', 'function removeLiquidity(address,address,bool,uint256,uint256,uint256,address,uint256) returns(uint256,uint256)'
  ]
  const escrowAbi = [
    'function balanceOf(address) view returns(uint256)', 'function ownerToNFTokenIdList(address,uint256) view returns(uint256)', 'function locked(uint256) view returns(int128 amount,uint256 end,bool isPermanent)', 'function balanceOfNFT(uint256) view returns(uint256)',
    'function voted(uint256) view returns(bool)', 'function escrowType(uint256) view returns(uint8)', 'function supply() view returns(uint256)', 'function totalSupply() view returns(uint256)',
    'function createLock(uint256,uint256) returns(uint256)', 'function increaseAmount(uint256,uint256)', 'function increaseUnlockTime(uint256,uint256)', 'function withdraw(uint256)'
  ]
  const minterAbi = ['function weekly() view returns(uint256)', 'function epochCount() view returns(uint256)']
  const distributorAbi = ['function claimable(uint256) view returns(uint256)', 'function claim(uint256) returns(uint256)']
  const erc20Abi = ['function symbol() view returns(string)', 'function decimals() view returns(uint8)', 'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)', 'function approve(address,uint256) returns(bool)']
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const zero = ethers.constants.AddressZero.toLowerCase()
  const week = 7 * 24 * 60 * 60
  const voteBuffer = 60 * 60
  const maxLockWeeks = 208
  const minAnchorUsd = 10
  const iface = function (abi) { return new ethers.utils.Interface(abi) }
  const voterInterface = iface(voterAbi); const factoryInterface = iface(factoryAbi); const poolInterface = iface(poolAbi); const gaugeInterface = iface(gaugeAbi); const routerInterface = iface(routerAbi)
  const escrowInterface = iface(escrowAbi); const minterInterface = iface(minterAbi); const distributorInterface = iface(distributorAbi); const erc20Interface = iface(erc20Abi)
  // The existing vfat.io AppKit project is intentionally referenced only by
  // connectReown(), whose config module is dynamically imported after intent.
  const state = {
    rpc: null, eip1193: null, walletSource: null, account: null, walletChain: null, walletListenerCleanup: [], reownUnsubscribe: null,
    farms: [], tokens: new Map(), prices: new Map(), overview: null, locks: [], walletTokenBalances: new Map(),
    showInactive: false, loading: false, status: '', statusType: '', walletLoading: false, sending: false
  }

  const byId = function (id) { return document.getElementById(id) }
  const lower = function (address) { return String(address || '').toLowerCase() }
  const isZero = function (address) { return !address || lower(address) === zero }
  const clean = function (value, length) { return String(value || '—').replace(/[\r\n|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, length || 44) || '—' }
  const short = function (address) { return address ? address.slice(0, 6) + '…' + address.slice(-4) : '—' }
  const nowSeconds = function () { return Math.floor(Date.now() / 1000) }
  // Epochs mirror the Voter's pure time functions: they start on week
  // boundaries, and voting is closed for the first and last hour of each one.
  const epochStart = function () { return nowSeconds() - nowSeconds() % week }
  const epochNext = function () { return epochStart() + week }
  const deadline = function () { return nowSeconds() + 1200 }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }
  // Custom errors raised by the Raphael contracts, keyed by selector so a
  // simulated revert reads as a sentence instead of four opaque bytes.
  const revertReasons = {}
  ;[
    ['LockDurationNotInFuture()', 'the new unlock time must be later than the current one'], ['LockDurationTooLong()', 'locks cannot exceed ' + maxLockWeeks + ' weeks'], ['PermanentLock()', 'this lock is permanent'],
    ['NotApprovedOrOwner()', 'the wallet does not own this veRAPH'], ['AlreadyVoted()', 'reset the votes on this veRAPH first'], ['LockNotExpired()', 'the lock has not expired'], ['LockExpired()', 'the lock has expired; withdraw it instead'],
    ['ZeroAmount()', 'the amount is zero'], ['ZeroBalance()', 'the veRAPH has no voting power'], ['AlreadyVotedOrDeposited()', 'this veRAPH already voted this epoch'], ['NotWhitelistedNFT()', 'voting is closed for the last hour of the epoch'],
    ['DistributeWindow()', 'the epoch has just flipped; try again after the first hour'], ['GaugeNotAlive(address)', 'the gauge is not alive'], ['NonZeroVotes()', 'the veRAPH still has active votes'], ['TooManyPools()', 'too many pools in one vote'],
    ['UnequalLengths()', 'pools and weights do not match'], ['NotAlive()', 'the gauge is not alive'], ['NotAuthorized()', 'the wallet is not authorized for this call'], ['Expired()', 'the transaction deadline passed'],
    ['InsufficientAmountA()', 'the first token amount fell below the minimum'], ['InsufficientAmountB()', 'the second token amount fell below the minimum'], ['InsufficientLiquidity()', 'the pool has insufficient liquidity'],
    ['InsufficientLiquidityMinted()', 'the deposit is too small to mint LP'], ['InsufficientLiquidityBurned()', 'the LP amount is too small to burn'], ['UpdatePeriod()', 'the rewards distributor needs its weekly checkpoint first'], ['NotOwner()', 'the wallet does not own this veRAPH'],
    ['NotManagedOrNormalNFT()', 'this veRAPH is deposited in a managed lock'], ['NotNormalNFT()', 'this action needs a normal veRAPH'], ['InactiveManagedNFT()', 'the managed lock is inactive']
  ].forEach(function (entry) { revertReasons[ethers.utils.id(entry[0]).slice(0, 10)] = entry[0].replace(/\(.*$/, '') + ': ' + entry[1] })
  const revertData = function (error) {
    const candidates = [error && error.data, error && error.data && error.data.data, error && error.data && error.data.originalError && error.data.originalError.data, error && error.error && error.error.data, error && error.info && error.info.error && error.info.error.data]
    for (let i = 0; i < candidates.length; i += 1) if (typeof candidates[i] === 'string' && /^0x[0-9a-fA-F]{8}/.test(candidates[i])) return candidates[i].slice(0, 10).toLowerCase()
    return null
  }
  const errText = function (error) {
    const selector = revertData(error); if (selector && revertReasons[selector]) return revertReasons[selector]
    return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 500)
  }
  const asNumber = function (amount, decimals) {
    if (amount === undefined || amount === null || decimals === undefined || decimals === null) return NaN
    const value = Number(ethers.utils.formatUnits(amount, decimals))
    return Number.isFinite(value) ? value : NaN
  }
  const formatAmount = function (amount, decimals, digits) {
    if (amount === undefined || amount === null) return '—'
    const parts = ethers.utils.formatUnits(amount, decimals).split('.')
    const fraction = (parts[1] || '').slice(0, digits === undefined ? 5 : digits).replace(/0+$/, '')
    return fraction ? parts[0] + '.' + fraction : parts[0]
  }
  const compact = function (value, digits) {
    if (!Number.isFinite(value) || value < 0) return '—'
    const places = digits === undefined ? 2 : digits
    if (value >= 1e9) return (value / 1e9).toFixed(places) + 'b'
    if (value >= 1e6) return (value / 1e6).toFixed(places) + 'm'
    if (value >= 1e3) return (value / 1e3).toFixed(places) + 'k'
    if (value >= 1) return value.toFixed(places)
    return value > 0 ? value.toPrecision(3) : '0'
  }
  const usd = function (value) { if (!Number.isFinite(value) || value < 0) return '—'; if (value === 0) return '$0'; return value < 0.01 ? '<$0.01' : '$' + compact(value) }
  const percent = function (value) { return Number.isFinite(value) && value >= 0 ? compact(value) + '%' : '—' }
  const duration = function (seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) return 'now'
    const days = Math.floor(seconds / 86400); const hours = Math.floor((seconds % 86400) / 3600); const minutes = Math.floor((seconds % 3600) / 60)
    return days ? days + 'd ' + hours + 'h' : hours ? hours + 'h ' + minutes + 'm' : minutes + 'm'
  }
  const dateText = function (seconds) { return new Date(seconds * 1000).toISOString().slice(0, 10) }
  const e = function (tag, options) {
    const node = document.createElement(tag); const config = options || {}
    if (config.text !== undefined) node.textContent = config.text
    if (config.className) node.className = config.className
    if (config.id) node.id = config.id
    if (config.type) node.type = config.type
    if (config.hidden) node.hidden = true
    if (config.disabled) node.disabled = true
    return node
  }
  const add = function (parent) { for (let i = 1; i < arguments.length; i += 1) parent.appendChild(arguments[i]); return parent }
  const button = function (text, handler, disabled) { const node = e('button', { text: text, className: 'raphael-action-button', type: 'button', disabled: disabled }); node.addEventListener('click', handler); return node }
  const input = function (value, placeholder) { const node = e('input'); node.type = 'text'; node.inputMode = 'decimal'; node.autocomplete = 'off'; node.value = value || ''; node.placeholder = placeholder || '0.0'; return node }

  function setStatus (text, type) { state.status = text || ''; state.statusType = type || ''; const node = byId('raphael-status'); if (node) { node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = state.statusType } }
  function setLoading (text) { state.loading = !!text; const node = byId('raphael-loading'); const label = byId('raphael-loading-text'); if (node) node.hidden = !text; if (label && text) label.textContent = text }
  function token (address) { return state.tokens.get(lower(address)) || { address: address, symbol: short(address), decimals: 18 } }
  function price (address) { return state.prices.get(lower(address)) }
  function tokenValue (amount, address) { const data = token(address); const current = price(address); const number = asNumber(amount, data.decimals); return Number.isFinite(number) && Number.isFinite(current) ? number * current : NaN }
  function pairName (farm) { return token(farm.token0).symbol + ' / ' + token(farm.token1).symbol }

  // The page never performs one HTTP request per row. Every independent phase
  // is deduplicated, chunked below the RPC payload limit, and read through the
  // canonical Multicall3 contract. Failure stays local to one optional call.
  async function batch (calls) {
    const results = []
    const deduped = new Map()
    calls.forEach(function (call, index) {
      const data = call.iface.encodeFunctionData(call.method, call.args || [])
      const id = lower(call.target) + ':' + data
      if (!deduped.has(id)) deduped.set(id, { call: call, data: data, indexes: [] })
      deduped.get(id).indexes.push(index)
    })
    const entries = Array.from(deduped.values())
    for (let cursor = 0; cursor < entries.length; cursor += 320) {
      const slices = [entries.slice(cursor, cursor + 160), entries.slice(cursor + 160, cursor + 320)].filter(function (slice) { return slice.length })
      const groups = await Promise.all(slices.map(aggregateSlice))
      groups.forEach(function (decoded, groupIndex) {
        const slice = slices[groupIndex]
        decoded.forEach(function (reply, offset) {
          const entry = slice[offset]; let value = entry.call.fallback
          if (reply.success) {
            try { value = entry.call.iface.decodeFunctionResult(entry.call.method, reply.returnData) } catch (_) {}
          }
          entry.indexes.forEach(function (index) { results[index] = value })
        })
      })
    }
    return results
  }

  async function aggregateSlice (slice) {
    const multicallInterface = iface(multicallAbi)
    const data = multicallInterface.encodeFunctionData('aggregate3', [slice.map(function (entry) { return { target: entry.call.target, allowFailure: true, callData: entry.data } })])
    let lastError
    // The Robinhood RPC occasionally closes a large eth_call response. Retry
    // the exact Multicall payload first, then make progress with two smaller
    // Multicall calls. No direct per-contract fallback is used.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const response = await state.rpc.call({ to: addresses.multicall, data: data })
        return multicallInterface.decodeFunctionResult('aggregate3', response)[0]
      } catch (error) { lastError = error; await new Promise(function (resolve) { window.setTimeout(resolve, 250 * (attempt + 1)) }) }
    }
    if (slice.length === 1) throw lastError
    const midpoint = Math.ceil(slice.length / 2)
    const left = await aggregateSlice(slice.slice(0, midpoint))
    const right = await aggregateSlice(slice.slice(midpoint))
    return left.concat(right)
  }

  function clearProviderListeners () {
    state.walletListenerCleanup.forEach(function (cleanup) { cleanup() })
    state.walletListenerCleanup = []
  }
  function clearReownSubscription () {
    if (state.reownUnsubscribe) state.reownUnsubscribe()
    state.reownUnsubscribe = null
  }
  function clearWalletEvents () { clearProviderListeners(); clearReownSubscription() }
  function bindProviderEvents (provider) {
    clearProviderListeners()
    if (!provider || typeof provider.on !== 'function') return
    const accountsChanged = function (accounts) {
      if (state.eip1193 !== provider) return
      state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
      if (!state.account) { clearWalletState(); render(); return }
      refreshWallet().catch(fatal)
    }
    const chainChanged = function (walletChain) {
      if (state.eip1193 !== provider) return
      state.walletChain = walletChain
      refreshWallet().catch(fatal)
    }
    provider.on('accountsChanged', accountsChanged); provider.on('chainChanged', chainChanged)
    const remove = typeof provider.removeListener === 'function' ? provider.removeListener.bind(provider) : typeof provider.off === 'function' ? provider.off.bind(provider) : null
    if (remove) {
      state.walletListenerCleanup.push(function () { remove('accountsChanged', accountsChanged) })
      state.walletListenerCleanup.push(function () { remove('chainChanged', chainChanged) })
    }
  }
  function clearWalletState () {
    state.locks = []; state.walletTokenBalances = new Map()
    state.farms.forEach(function (farm) { farm.wallet = null })
  }
  async function adoptWallet (provider, accounts, source, walletChain) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider; state.walletSource = source; state.walletChain = walletChain
    state.account = ethers.utils.getAddress(accounts[0]); bindProviderEvents(provider); render()
    return true
  }
  async function passiveWallet () {
    const injected = injectedWallet()
    if (!injected) return false
    try {
      // Startup is intentionally limited to the injected provider's passive
      // account and chain reads. Reown is neither imported nor probed here.
      const values = await Promise.all([injected.request({ method: 'eth_accounts' }), injected.request({ method: 'eth_chainId' })])
      return adoptWallet(injected, values[0], 'injected', values[1])
    } catch (error) { console.warn('Passive injected-wallet read failed', error); return false }
  }
  async function connectWallet () {
    const injected = injectedWallet()
    if (!injected) throw new Error('No injected EIP-1193 wallet was found in this browser. Use Other wallet for WalletConnect.')
    const accounts = await injected.request({ method: 'eth_requestAccounts' }); let walletChain = await injected.request({ method: 'eth_chainId' })
    if (walletChain !== chain.id) {
      await injected.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
      walletChain = await injected.request({ method: 'eth_chainId' })
    }
    if (walletChain !== chain.id) throw new Error('Switch the wallet to Robinhood Chain before sending a transaction.')
    if (!await adoptWallet(injected, accounts, 'injected', walletChain)) throw new Error('The wallet did not return an account.')
    clearReownSubscription(); await refreshWallet()
  }
  async function adoptReownWallet (appKit, address) {
    const provider = await appKit.getWalletProvider()
    if (!provider || typeof provider.request !== 'function') throw new Error('WalletConnect did not provide an EIP-1193 wallet.')
    const values = await Promise.all([provider.request({ method: 'eth_accounts' }), provider.request({ method: 'eth_chainId' })])
    const accounts = values[0] && values[0].length ? values[0] : address ? [address] : []
    const adopted = await adoptWallet(provider, accounts, 'reown', values[1])
    if (adopted) { clearReownSubscription(); await refreshWallet() }
    return adopted
  }
  async function connectReown () {
    // This dynamic import is the only path that loads the established AppKit
    // and WalletConnect code. It is never present in the first-load waterfall.
    const reown = await import('./config.js')
    if (!reown.REOWN_PROJECT_ID) throw new Error('Optional wallet support is unavailable.')
    const appKit = reown.createAppKitInstance()
    if (!appKit) throw new Error('WalletConnect is unavailable in this browser.')
    const address = appKit.getAddress && appKit.getAddress()
    if (address && await adoptReownWallet(appKit, address)) return true
    if (!state.reownUnsubscribe && appKit.subscribeAccount) {
      state.reownUnsubscribe = appKit.subscribeAccount(function (accountState) {
        if (!accountState || !accountState.isConnected || !accountState.address) return
        adoptReownWallet(appKit, accountState.address).catch(function (error) { setStatus(errText(error), 'error') })
      })
    }
    await appKit.open(); return false
  }

  async function loadRegistry () {
    setLoading('Reading Raphael pools…'); render()
    const overview = await batch([
      { target: addresses.voter, iface: voterInterface, method: 'length', fallback: [ethers.constants.Zero] },
      { target: addresses.poolFactory, iface: factoryInterface, method: 'allPoolsLength', fallback: [ethers.constants.Zero] },
      { target: addresses.voter, iface: voterInterface, method: 'totalWeight', fallback: [ethers.constants.Zero] },
      { target: addresses.voter, iface: voterInterface, method: 'maxVotingNum', fallback: [ethers.BigNumber.from(30)] },
      { target: addresses.minter, iface: minterInterface, method: 'weekly', fallback: null },
      { target: addresses.minter, iface: minterInterface, method: 'epochCount', fallback: null },
      { target: addresses.votingEscrow, iface: escrowInterface, method: 'supply', fallback: null },
      { target: addresses.raph, iface: erc20Interface, method: 'totalSupply', fallback: null }
    ])
    state.overview = {
      totalWeight: overview[2][0], maxVotingNum: overview[3][0].toNumber(), weekly: overview[4] ? overview[4][0] : null, epochCount: overview[5] ? overview[5][0].toNumber() : null,
      lockedRaph: overview[6] ? overview[6][0] : null, raphSupply: overview[7] ? overview[7][0] : null
    }
    const voterLength = overview[0][0].toNumber(); const factoryLength = overview[1][0].toNumber()
    setLoading('Enumerating all ' + voterLength + ' voter pools and all ' + factoryLength + ' factory pools…'); render()
    const registryCalls = []
    for (let index = 0; index < voterLength; index += 1) registryCalls.push({ target: addresses.voter, iface: voterInterface, method: 'pools', args: [index], fallback: [ethers.constants.AddressZero] })
    for (let index = 0; index < factoryLength; index += 1) registryCalls.push({ target: addresses.poolFactory, iface: factoryInterface, method: 'allPools', args: [index], fallback: [ethers.constants.AddressZero] })
    const registry = await batch(registryCalls)
    const seen = new Set(); state.farms = []
    // Voter pools come first in voter order; factory pools that have no gauge
    // yet are appended so the table covers every canonical pool.
    registry.forEach(function (result) {
      const pool = result[0]
      if (isZero(pool) || seen.has(lower(pool))) return
      seen.add(lower(pool)); state.farms.push({ pool: ethers.utils.getAddress(pool), registryIndex: state.farms.length, gauge: null, alive: false, wallet: null })
    })
    await hydrateFarms()
  }

  async function hydrateFarms () {
    setLoading('Reading pool, gauge, vote, and emission state…'); render()
    const poolCalls = []
    state.farms.forEach(function (farm) {
      poolCalls.push({ target: addresses.voter, iface: voterInterface, method: 'gauges', args: [farm.pool], fallback: [ethers.constants.AddressZero] })
      poolCalls.push({ target: farm.pool, iface: poolInterface, method: 'metadata', fallback: null })
      poolCalls.push({ target: farm.pool, iface: poolInterface, method: 'totalSupply', fallback: [ethers.constants.Zero] })
      poolCalls.push({ target: addresses.voter, iface: voterInterface, method: 'weights', args: [farm.pool], fallback: [ethers.constants.Zero] })
    })
    const poolValues = await batch(poolCalls); let cursor = 0
    state.farms.forEach(function (farm) {
      const gauge = poolValues[cursor++][0]; const metadata = poolValues[cursor++]; farm.lpSupply = poolValues[cursor++][0]; farm.weight = poolValues[cursor++][0]
      farm.gauge = isZero(gauge) ? null : ethers.utils.getAddress(gauge)
      if (metadata) { farm.reserve0 = metadata.r0; farm.reserve1 = metadata.r1; farm.stable = Boolean(metadata.st); farm.token0 = metadata.t0; farm.token1 = metadata.t1 }
    })
    state.farms = state.farms.filter(function (farm) { return farm.token0 && farm.token1 })
    const gaugeCalls = []
    state.farms.forEach(function (farm) {
      if (!farm.gauge) return
      gaugeCalls.push({ target: addresses.voter, iface: voterInterface, method: 'isAlive', args: [farm.gauge], fallback: [false] })
      gaugeCalls.push({ target: farm.gauge, iface: gaugeInterface, method: 'rewardRate', fallback: [ethers.constants.Zero] })
      gaugeCalls.push({ target: farm.gauge, iface: gaugeInterface, method: 'periodFinish', fallback: [ethers.constants.Zero] })
      gaugeCalls.push({ target: farm.gauge, iface: gaugeInterface, method: 'totalSupply', fallback: [ethers.constants.Zero] })
    })
    const gaugeValues = await batch(gaugeCalls); cursor = 0
    state.farms.forEach(function (farm) {
      if (!farm.gauge) { farm.alive = false; farm.rewardRate = ethers.constants.Zero; farm.periodFinish = 0; farm.gaugeSupply = ethers.constants.Zero; return }
      farm.alive = Boolean(gaugeValues[cursor++][0]); farm.rewardRate = gaugeValues[cursor++][0]; farm.periodFinish = gaugeValues[cursor++][0].toNumber(); farm.gaugeSupply = gaugeValues[cursor++][0]
    })
    await hydrateTokens()
    resolvePrices(); revalueFarms()
    setLoading(); setStatus(''); render()
  }

  async function hydrateTokens () {
    const addressesToRead = new Set([lower(addresses.raph), lower(addresses.usdg), lower(addresses.weth)])
    state.farms.forEach(function (farm) { addressesToRead.add(lower(farm.token0)); addressesToRead.add(lower(farm.token1)) })
    const list = Array.from(addressesToRead); const calls = []
    list.forEach(function (address) {
      calls.push({ target: address, iface: erc20Interface, method: 'symbol', fallback: ['TOKEN'] })
      calls.push({ target: address, iface: erc20Interface, method: 'decimals', fallback: [18] })
    })
    const values = await batch(calls); let cursor = 0
    list.forEach(function (address) {
      const symbol = clean(values[cursor++][0], 20); const decimals = Number(values[cursor++][0])
      state.tokens.set(address, { address: ethers.utils.getAddress(address), symbol: symbol, decimals: Number.isInteger(decimals) ? decimals : 18 })
    })
  }

  // Dollar values anchor to USDG. Every other token takes the price implied by
  // the reserves of the most liquid path back to that anchor; a pool can only
  // set a price when the already-priced side holds a minimum dollar depth, so
  // dust pools never outrank a real market.
  function resolvePrices () {
    state.prices = new Map([[lower(addresses.usdg), 1]])
    const depth = new Map([[lower(addresses.usdg), Number.MAX_SAFE_INTEGER]])
    for (let round = 0; round < 24; round += 1) {
      let changed = false
      state.farms.forEach(function (farm) {
        const zeroToken = token(farm.token0); const oneToken = token(farm.token1)
        const amount0 = asNumber(farm.reserve0, zeroToken.decimals); const amount1 = asNumber(farm.reserve1, oneToken.decimals)
        if (!(amount0 > 0) || !(amount1 > 0)) return
        const sides = [[lower(farm.token0), lower(farm.token1), amount0, amount1], [lower(farm.token1), lower(farm.token0), amount1, amount0]]
        sides.forEach(function (side) {
          const from = side[0]; const to = side[1]; const fromAmount = side[2]; const toAmount = side[3]
          const fromPrice = state.prices.get(from); if (!Number.isFinite(fromPrice)) return
          const fromValue = fromAmount * fromPrice; if (!(fromValue >= minAnchorUsd)) return
          const candidateDepth = Math.min(depth.get(from) || 0, fromValue)
          if (candidateDepth <= (depth.get(to) || 0)) return
          const candidate = fromValue / toAmount
          if (!Number.isFinite(candidate) || candidate <= 0) return
          state.prices.set(to, candidate); depth.set(to, candidateDepth); changed = true
        })
      })
      if (!changed) break
    }
  }

  function revalueFarms () {
    const now = nowSeconds(); const totalWeight = state.overview ? asNumber(state.overview.totalWeight, 18) : NaN
    state.farms.forEach(function (farm) {
      const value0 = tokenValue(farm.reserve0, farm.token0); const value1 = tokenValue(farm.reserve1, farm.token1)
      farm.poolTvl = Number.isFinite(value0) && Number.isFinite(value1) ? value0 + value1 : NaN
      const stakedShare = farm.lpSupply && !farm.lpSupply.isZero() ? asNumber(farm.gaugeSupply, 18) / asNumber(farm.lpSupply, 18) : 0
      farm.stakedTvl = Number.isFinite(farm.poolTvl) ? farm.poolTvl * stakedShare : NaN
      farm.unstakedTvl = Number.isFinite(farm.poolTvl) ? Math.max(0, farm.poolTvl - farm.stakedTvl) : NaN
      farm.distributing = !!farm.gauge && farm.alive && farm.periodFinish > now && !farm.rewardRate.isZero()
      farm.emission = farm.distributing ? farm.rewardRate.mul(week) : ethers.constants.Zero
      farm.emissionUsd = tokenValue(farm.emission, addresses.raph)
      farm.apr = Number.isFinite(farm.emissionUsd) && Number.isFinite(farm.stakedTvl) && farm.stakedTvl > 0 ? farm.emissionUsd * 52.142857 / farm.stakedTvl * 100 : NaN
      farm.voteShare = Number.isFinite(totalWeight) && totalWeight > 0 ? asNumber(farm.weight, 18) / totalWeight * 100 : NaN
    })
  }

  async function refreshWallet () {
    const status = byId('raphael-wallet-status')
    if (!state.account || !state.eip1193 || state.walletChain !== chain.id || !state.farms.length) {
      if (status) status.textContent = state.account ? 'Switch wallet to Robinhood Chain' : 'Wallet not connected'
      clearWalletState(); render(); return
    }
    state.walletLoading = true; setLoading('Reading wallet balances, stakes, fees, rewards, and veRAPH locks…'); if (status) status.textContent = short(state.account); render()
    try {
      const calls = []; const knownTokens = Array.from(state.tokens.values())
      knownTokens.forEach(function (data) { calls.push({ target: data.address, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] }) })
      state.farms.forEach(function (farm) {
        calls.push({ target: farm.pool, iface: poolInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'claimable0', args: [state.account], fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'claimable1', args: [state.account], fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'index0', fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'index1', fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'supplyIndex0', args: [state.account], fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'supplyIndex1', args: [state.account], fallback: [ethers.constants.Zero] })
        if (!farm.gauge) return
        calls.push({ target: farm.gauge, iface: gaugeInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
        calls.push({ target: farm.gauge, iface: gaugeInterface, method: 'earned', args: [state.account], fallback: [ethers.constants.Zero] })
      })
      calls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] })
      const values = await batch(calls); let cursor = 0; state.walletTokenBalances = new Map()
      knownTokens.forEach(function (data) { state.walletTokenBalances.set(lower(data.address), values[cursor++][0]) })
      state.farms.forEach(function (farm) {
        const lp = values[cursor++][0]; const claimable0 = values[cursor++][0]; const claimable1 = values[cursor++][0]; const index0 = values[cursor++][0]; const index1 = values[cursor++][0]; const supplyIndex0 = values[cursor++][0]; const supplyIndex1 = values[cursor++][0]
        const staked = farm.gauge ? values[cursor++][0] : ethers.constants.Zero; const earned = farm.gauge ? values[cursor++][0] : ethers.constants.Zero
        // Unstaked LP accrues swap fees lazily; add the fee index growth since
        // the wallet's last pool interaction to the stored claimable amounts.
        const accrue = function (stored, index, supplyIndex) { return index.gt(supplyIndex) ? stored.add(lp.mul(index.sub(supplyIndex)).div(ethers.constants.WeiPerEther)) : stored }
        farm.wallet = { lp: lp, staked: staked, earned: earned, fees0: accrue(claimable0, index0, supplyIndex0), fees1: accrue(claimable1, index1, supplyIndex1) }
      })
      const lockCount = values[cursor][0].toNumber(); state.locks = []
      render()
      for (let offset = 0; offset < lockCount; offset += 32) {
        const width = Math.min(32, lockCount - offset); const idCalls = []
        for (let index = 0; index < width; index += 1) idCalls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'ownerToNFTokenIdList', args: [state.account, offset + index], fallback: [ethers.constants.Zero] })
        const ids = (await batch(idCalls)).map(function (entry) { return entry[0] }).filter(function (id) { return !id.isZero() })
        const detailCalls = []
        ids.forEach(function (id) {
          detailCalls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'locked', args: [id], fallback: null })
          detailCalls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'balanceOfNFT', args: [id], fallback: [ethers.constants.Zero] })
          detailCalls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'voted', args: [id], fallback: [false] })
          detailCalls.push({ target: addresses.votingEscrow, iface: escrowInterface, method: 'escrowType', args: [id], fallback: [0] })
          detailCalls.push({ target: addresses.rewardsDistributor, iface: distributorInterface, method: 'claimable', args: [id], fallback: [ethers.constants.Zero] })
          detailCalls.push({ target: addresses.voter, iface: voterInterface, method: 'lastVoted', args: [id], fallback: [ethers.constants.Zero] })
        })
        const details = await batch(detailCalls); let detailCursor = 0
        ids.forEach(function (id) {
          const locked = details[detailCursor++]; const power = details[detailCursor++][0]; const voted = Boolean(details[detailCursor++][0]); const escrowType = Number(details[detailCursor++][0]); const rebase = details[detailCursor++][0]; const lastVoted = details[detailCursor++][0].toNumber()
          if (!locked) return
          state.locks.push({ id: id, amount: ethers.BigNumber.from(locked.amount.toString()), end: locked.end.toNumber(), permanent: Boolean(locked.isPermanent), power: power, voted: voted, escrowType: escrowType, rebase: rebase, lastVoted: lastVoted })
        })
        render()
      }
    } finally { state.walletLoading = false; setLoading(); render() }
  }

  function showDialog (title, description) {
    const dialog = byId('raphael-action-dialog'); const content = byId('raphael-action-content'); content.textContent = ''
    content.appendChild(e('h2', { id: 'raphael-action-title', text: title })); if (description) content.appendChild(e('p', { text: description }))
    if (dialog.open) dialog.close(); dialog.showModal(); return content
  }
  function dialogNote (content) { const note = e('pre', { className: 'raphael-action-note', text: '' }); content.appendChild(note); return note }
  function label (content, text) { content.appendChild(e('label', { className: 'raphael-form-label', text: text })) }
  function amountRow (content, text, available, decimals) {
    label(content, text + (available !== undefined ? ' (available ' + formatAmount(available, decimals) + ')' : '')); const row = e('div', { className: 'raphael-input-row' }); const field = input('', '0.0')
    if (available !== undefined) add(row, field, button('[ max ]', function () { field.value = formatAmount(available || ethers.constants.Zero, decimals, 18); field.dispatchEvent(new Event('input')) })); else row.appendChild(field)
    content.appendChild(row); return field
  }
  function parseAmount (field, decimals) { const value = String(field.value || '').trim(); if (!value || !/^\d+(\.\d+)?$/.test(value)) throw new Error('Enter a valid positive amount.'); const parsed = ethers.utils.parseUnits(value, decimals); if (parsed.lte(0)) throw new Error('Enter an amount greater than zero.'); return parsed }
  function parseSlippage (field) { const value = Number(String(field.value || '').trim()); if (!Number.isFinite(value) || value < 0 || value > 50) throw new Error('Enter a slippage between 0 and 50 percent.'); return Math.round(value * 100) }
  function applySlippage (amount, basisPoints) { return amount.mul(10000 - basisPoints).div(10000) }
  function parseWeeks (field) { const value = Number(String(field.value || '').trim()); if (!Number.isInteger(value) || value < 1 || value > maxLockWeeks) throw new Error('Enter a whole number of weeks between 1 and ' + maxLockWeeks + '.'); return value }
  function requireWallet () { if (!state.account || !state.eip1193) throw new Error('Connect a wallet first.'); if (state.walletChain !== chain.id) throw new Error('Switch the wallet to Robinhood Chain before sending a transaction.') }
  async function waitForReceipt (hash) {
    for (let attempt = 0; attempt < 120; attempt += 1) { const receipt = await state.eip1193.request({ method: 'eth_getTransactionReceipt', params: [hash] }); if (receipt) return receipt; await new Promise(function (resolve) { window.setTimeout(resolve, 1000) }) }
    throw new Error('Timed out waiting for the transaction receipt.')
  }
  // Every write is simulated with its exact calldata, sent through the
  // connected EIP-1193 provider, and only reported as confirmed once a mined
  // receipt carries a success status. Only one transaction is sent at a time.
  async function sendExact (title, target, contractInterface, method, args) {
    requireWallet(); if (state.sending) throw new Error('Wait for the pending transaction to finish first.')
    const transaction = { from: state.account, to: target, data: contractInterface.encodeFunctionData(method, args || []) }
    state.sending = true; setStatus('Simulating ' + title + ' with exact calldata…'); render()
    try {
      await state.eip1193.request({ method: 'eth_call', params: [transaction, 'latest'] })
      setStatus('Submitting ' + title + '…'); render()
      const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [transaction] }); const receipt = await waitForReceipt(hash)
      if (lower(receipt.status) !== '0x1') throw new Error(title + ' reverted on Robinhood Chain.')
      setStatus(title + ' confirmed. Refreshing direct RPC and wallet state…', 'success'); return receipt
    } catch (error) { setStatus(title + ' failed: ' + errText(error), 'error'); throw error } finally { state.sending = false; render() }
  }
  async function afterTransaction () { await refreshWallet(); await refreshFarms() }
  async function refreshFarms () {
    try {
      const calls = []
      state.farms.forEach(function (farm) {
        calls.push({ target: farm.pool, iface: poolInterface, method: 'metadata', fallback: null })
        calls.push({ target: farm.pool, iface: poolInterface, method: 'totalSupply', fallback: [farm.lpSupply] })
        if (farm.gauge) calls.push({ target: farm.gauge, iface: gaugeInterface, method: 'totalSupply', fallback: [farm.gaugeSupply] })
      })
      const values = await batch(calls); let cursor = 0
      state.farms.forEach(function (farm) { const metadata = values[cursor++]; farm.lpSupply = values[cursor++][0]; if (farm.gauge) farm.gaugeSupply = values[cursor++][0]; if (metadata) { farm.reserve0 = metadata.r0; farm.reserve1 = metadata.r1 } })
      resolvePrices(); revalueFarms(); render()
    } catch (error) { console.warn('Farm refresh after transaction failed', error) }
  }
  async function ensureApproval (asset, spender, amount) {
    const allowance = await batch([{ target: asset, iface: erc20Interface, method: 'allowance', args: [state.account, spender], fallback: [ethers.constants.Zero] }])
    if (allowance[0][0].lt(amount)) await sendExact('approval of ' + formatAmount(amount, token(asset).decimals) + ' ' + token(asset).symbol, asset, erc20Interface, 'approve', [spender, amount])
  }
  function run (note, work) { return work().then(function (text) { if (text) note.textContent = text; return afterTransaction() }).catch(function (error) { note.textContent = errText(error) }) }
  async function claimFarm (farm) { if (!farm.gauge) throw new Error('This pool has no gauge.'); await sendExact('RAPH reward claim', addresses.voter, voterInterface, 'claimRewards', [[farm.gauge]]) }
  async function claimAll () {
    const gauges = state.farms.filter(function (farm) { return farm.gauge && farm.wallet && !farm.wallet.earned.isZero() }).map(function (farm) { return farm.gauge })
    if (!gauges.length) throw new Error('No earned RAPH to claim.')
    await sendExact('RAPH reward claim for ' + gauges.length + ' gauge' + (gauges.length === 1 ? '' : 's'), addresses.voter, voterInterface, 'claimRewards', [gauges]); await afterTransaction()
  }

  function openFarmActions (farm) {
    const zeroToken = token(farm.token0); const oneToken = token(farm.token1); const wallet = farm.wallet || { lp: ethers.constants.Zero, staked: ethers.constants.Zero, earned: ethers.constants.Zero, fees0: ethers.constants.Zero, fees1: ethers.constants.Zero }
    const content = showDialog(pairName(farm) + ' · ' + (farm.stable ? 'sAMM' : 'vAMM'), 'Pool ' + farm.pool + (farm.gauge ? ' · gauge ' + farm.gauge : ' · no gauge'))
    const note = dialogNote(content)
    content.appendChild(e('p', { className: 'raphael-dialog-heading', text: 'Add liquidity' }))
    const balance0 = state.walletTokenBalances.get(lower(farm.token0)) || ethers.constants.Zero; const balance1 = state.walletTokenBalances.get(lower(farm.token1)) || ethers.constants.Zero
    const amount0 = amountRow(content, zeroToken.symbol, balance0, zeroToken.decimals); const amount1 = amountRow(content, oneToken.symbol, balance1, oneToken.decimals)
    label(content, 'Slippage %'); const slippage = input('0.5', '0.5'); content.appendChild(add(e('div', { className: 'raphael-input-row' }), slippage))
    const quoteLine = e('p', { className: 'raphael-quote', text: 'Enter amounts to quote the deposit.' }); content.appendChild(quoteLine)
    const ratio0 = asNumber(farm.reserve0, zeroToken.decimals); const ratio1 = asNumber(farm.reserve1, oneToken.decimals); let quoting = null
    // Typing one side fills the other from the live reserve ratio; the router
    // quote then reports the exact amounts the pool would take.
    const pairFrom = function (source, target, targetDecimals, factor) {
      if (!farm.stable && Number.isFinite(factor) && factor > 0 && /^\d+(\.\d+)?$/.test(source.value)) target.value = (Number(source.value) * factor).toFixed(Math.min(8, targetDecimals)).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '')
      quote()
    }
    const quote = function () {
      if (quoting) window.clearTimeout(quoting)
      quoting = window.setTimeout(async function () {
        try {
          const value0 = parseAmount(amount0, zeroToken.decimals); const value1 = parseAmount(amount1, oneToken.decimals)
          const result = await batch([{ target: addresses.router, iface: routerInterface, method: 'quoteAddLiquidity', args: [farm.token0, farm.token1, farm.stable, addresses.poolFactory, value0, value1], fallback: null }])
          if (!result[0]) throw new Error('The router could not quote this deposit.')
          quoteLine.textContent = 'Pool would take ' + formatAmount(result[0].amountA, zeroToken.decimals) + ' ' + zeroToken.symbol + ' + ' + formatAmount(result[0].amountB, oneToken.decimals) + ' ' + oneToken.symbol + ' for ' + formatAmount(result[0].liquidity, 18) + ' LP.'
        } catch (error) { quoteLine.textContent = errText(error) }
      }, 350)
    }
    amount0.addEventListener('input', function () { pairFrom(amount0, amount1, oneToken.decimals, ratio1 / ratio0) })
    amount1.addEventListener('input', function () { pairFrom(amount1, amount0, zeroToken.decimals, ratio0 / ratio1) })
    const addActions = e('div', { className: 'raphael-dialog-actions' })
    const addLiquidity = async function (stakeAfter) {
      const value0 = parseAmount(amount0, zeroToken.decimals); const value1 = parseAmount(amount1, oneToken.decimals); const basisPoints = parseSlippage(slippage)
      const quoted = await batch([{ target: addresses.router, iface: routerInterface, method: 'quoteAddLiquidity', args: [farm.token0, farm.token1, farm.stable, addresses.poolFactory, value0, value1], fallback: null }])
      if (!quoted[0]) throw new Error('The router could not quote this deposit.')
      const lpBalance = function () { return batch([{ target: farm.pool, iface: poolInterface, method: 'balanceOf', args: [state.account], fallback: [ethers.constants.Zero] }]).then(function (result) { return result[0][0] }) }
      const before = stakeAfter ? await lpBalance() : ethers.constants.Zero
      await ensureApproval(farm.token0, addresses.router, value0); await ensureApproval(farm.token1, addresses.router, value1)
      await sendExact('liquidity add', addresses.router, routerInterface, 'addLiquidity', [farm.token0, farm.token1, farm.stable, value0, value1, applySlippage(quoted[0].amountA, basisPoints), applySlippage(quoted[0].amountB, basisPoints), state.account, deadline()])
      if (!stakeAfter) return 'LP minted.'
      // Only the LP minted by this deposit is staked; LP the wallet already
      // held stays where the user left it.
      const after = await lpBalance(); const minted = after.gt(before) ? after.sub(before) : ethers.constants.Zero
      if (minted.isZero()) return 'LP minted, but no new LP balance was found to stake.'
      await ensureApproval(farm.pool, farm.gauge, minted); await sendExact('LP stake', farm.gauge, gaugeInterface, 'deposit', [minted]); return 'LP minted and staked.'
    }
    addActions.appendChild(button('[ add liquidity ]', function () { run(note, function () { return addLiquidity(false) }) }))
    if (farm.gauge && farm.alive) addActions.appendChild(button('[ add + stake ]', function () { run(note, function () { return addLiquidity(true) }) }))
    content.appendChild(addActions)
    if (farm.gauge) {
      content.appendChild(e('p', { className: 'raphael-dialog-heading', text: 'Gauge · wallet LP ' + formatAmount(wallet.lp, 18) + ' · staked ' + formatAmount(wallet.staked, 18) + ' · earned ' + formatAmount(wallet.earned, 18) + ' RAPH' }))
      const stakeAmount = amountRow(content, 'LP to stake', wallet.lp, 18); const unstakeAmount = amountRow(content, 'LP to unstake', wallet.staked, 18)
      const gaugeActions = e('div', { className: 'raphael-dialog-actions' })
      gaugeActions.appendChild(button('[ stake ]', function () { run(note, async function () { if (!farm.alive) throw new Error('This gauge is not alive; staking is disabled.'); const value = parseAmount(stakeAmount, 18); await ensureApproval(farm.pool, farm.gauge, value); await sendExact('LP stake', farm.gauge, gaugeInterface, 'deposit', [value]); return 'LP staked.' }) }))
      gaugeActions.appendChild(button('[ unstake ]', function () { run(note, async function () { const value = parseAmount(unstakeAmount, 18); await sendExact('LP unstake', farm.gauge, gaugeInterface, 'withdraw', [value]); return 'LP unstaked.' }) }))
      gaugeActions.appendChild(button('[ claim RAPH ]', function () { run(note, async function () { await claimFarm(farm); return 'RAPH claimed.' }) }))
      content.appendChild(gaugeActions)
    }
    content.appendChild(e('p', { className: 'raphael-dialog-heading', text: 'Remove liquidity · unclaimed fees ' + formatAmount(wallet.fees0, zeroToken.decimals) + ' ' + zeroToken.symbol + ' + ' + formatAmount(wallet.fees1, oneToken.decimals) + ' ' + oneToken.symbol }))
    const removeAmount = amountRow(content, 'LP to remove', wallet.lp, 18); const removeActions = e('div', { className: 'raphael-dialog-actions' })
    removeActions.appendChild(button('[ remove liquidity ]', function () {
      run(note, async function () {
        const value = parseAmount(removeAmount, 18); const basisPoints = parseSlippage(slippage)
        const quoted = await batch([{ target: addresses.router, iface: routerInterface, method: 'quoteRemoveLiquidity', args: [farm.token0, farm.token1, farm.stable, addresses.poolFactory, value], fallback: null }])
        if (!quoted[0]) throw new Error('The router could not quote this withdrawal.')
        await ensureApproval(farm.pool, addresses.router, value)
        await sendExact('liquidity remove', addresses.router, routerInterface, 'removeLiquidity', [farm.token0, farm.token1, farm.stable, value, applySlippage(quoted[0].amountA, basisPoints), applySlippage(quoted[0].amountB, basisPoints), state.account, deadline()]); return 'LP removed.'
      })
    }))
    removeActions.appendChild(button('[ claim fees ]', function () { run(note, async function () { if (wallet.fees0.isZero() && wallet.fees1.isZero()) throw new Error('No unclaimed fees on unstaked LP.'); await sendExact('pool fee claim', farm.pool, poolInterface, 'claimFees', []); return 'Fees claimed.' }) }))
    content.appendChild(removeActions)
  }

  function openCreateLock () {
    const content = showDialog('Create veRAPH lock', 'Locks RAPH for a whole number of weeks, up to ' + maxLockWeeks + ' weeks. Longer locks receive more voting power.')
    const note = dialogNote(content); const balance = state.walletTokenBalances.get(lower(addresses.raph)) || ethers.constants.Zero
    const amount = amountRow(content, 'RAPH', balance, 18); label(content, 'Weeks'); const weeks = input('52', '52'); content.appendChild(add(e('div', { className: 'raphael-input-row' }), weeks))
    const actions = e('div', { className: 'raphael-dialog-actions' })
    actions.appendChild(button('[ create lock ]', function () { run(note, async function () { const value = parseAmount(amount, 18); const count = parseWeeks(weeks); await ensureApproval(addresses.raph, addresses.votingEscrow, value); await sendExact('veRAPH lock creation', addresses.votingEscrow, escrowInterface, 'createLock', [value, count * week]); return 'Lock created.' }) }))
    content.appendChild(actions)
  }

  function lockStatus (lock) {
    const now = nowSeconds()
    if (lock.escrowType === 1) return 'deposited in a managed lock'
    if (lock.escrowType === 2) return 'managed lock'
    if (lock.permanent) return 'permanent'
    if (lock.end <= now) return 'expired ' + dateText(lock.end)
    return 'unlocks ' + dateText(lock.end)
  }
  function votedThisEpoch (lock) { return lock.lastVoted >= epochStart() }
  function voteWindowText () {
    const now = nowSeconds(); const voteStart = epochStart() + voteBuffer; const voteEnd = epochNext() - voteBuffer
    if (now < voteStart) return 'Voting opens in ' + duration(voteStart - now) + '.'
    if (now > voteEnd) return 'Voting is closed for the last hour of this epoch; it reopens in ' + duration(epochNext() + voteBuffer - now) + '.'
    return 'Voting is open for another ' + duration(voteEnd - now) + '.'
  }

  function openLockActions (lock) {
    const content = showDialog('veRAPH #' + lock.id.toString(), formatAmount(lock.amount, 18) + ' RAPH locked · ' + lockStatus(lock) + ' · voting power ' + formatAmount(lock.power, 18) + ' · claimable rebase ' + formatAmount(lock.rebase, 18) + ' RAPH')
    const note = dialogNote(content); const now = nowSeconds()
    const balance = state.walletTokenBalances.get(lower(addresses.raph)) || ethers.constants.Zero
    const amount = amountRow(content, 'RAPH to add', balance, 18); label(content, 'New lock length in weeks from now'); const weeks = input('', String(maxLockWeeks)); content.appendChild(add(e('div', { className: 'raphael-input-row' }), weeks))
    const actions = e('div', { className: 'raphael-dialog-actions' })
    actions.appendChild(button('[ add RAPH ]', function () { run(note, async function () { const value = parseAmount(amount, 18); await ensureApproval(addresses.raph, addresses.votingEscrow, value); await sendExact('veRAPH amount increase', addresses.votingEscrow, escrowInterface, 'increaseAmount', [lock.id, value]); return 'RAPH added to the lock.' }) }))
    if (!lock.permanent) actions.appendChild(button('[ extend ]', function () { run(note, async function () { const count = parseWeeks(weeks); await sendExact('veRAPH lock extension', addresses.votingEscrow, escrowInterface, 'increaseUnlockTime', [lock.id, count * week]); return 'Lock extended.' }) }))
    actions.appendChild(button('[ claim rebase ]', function () { run(note, async function () { if (lock.rebase.isZero()) throw new Error('No claimable rebase on this lock.'); await sendExact('rebase claim', addresses.rewardsDistributor, distributorInterface, 'claim', [lock.id]); return 'Rebase claimed. Active locks receive it as additional locked RAPH.' }) }))
    if (!lock.permanent && lock.end <= now) actions.appendChild(button('[ withdraw ]', function () { run(note, async function () { if (lock.voted) throw new Error('Reset the lock\'s votes before withdrawing.'); await sendExact('expired lock withdrawal', addresses.votingEscrow, escrowInterface, 'withdraw', [lock.id]); return 'RAPH withdrawn.' }) }))
    content.appendChild(actions)
    content.appendChild(e('p', { className: 'raphael-dialog-heading', text: 'Votes · ' + (votedThisEpoch(lock) ? 'already voted this epoch. ' : lock.voted ? 'carrying votes from an earlier epoch. ' : 'no active votes. ') + voteWindowText() }))
    const voteActions = e('div', { className: 'raphael-dialog-actions' })
    voteActions.appendChild(button('[ vote ]', function () { openVote(lock) }, votedThisEpoch(lock)))
    voteActions.appendChild(button('[ reset votes ]', function () { run(note, async function () { await sendExact('vote reset', addresses.voter, voterInterface, 'reset', [lock.id]); return 'Votes reset.' }) }, votedThisEpoch(lock) || !lock.voted))
    content.appendChild(voteActions)
  }

  function openVote (lock) {
    const candidates = state.farms.filter(function (farm) { return farm.gauge && farm.alive }).slice().sort(function (left, right) { return (right.stakedTvl || 0) - (left.stakedTvl || 0) || left.registryIndex - right.registryIndex })
    const content = showDialog('Vote with veRAPH #' + lock.id.toString(), 'Weights are relative; the lock\'s full voting power is split in proportion. Up to ' + state.overview.maxVotingNum + ' pools per vote, one vote per epoch. ' + voteWindowText())
    const note = dialogNote(content); const fields = []
    const list = e('div', { className: 'raphael-vote-list' })
    candidates.forEach(function (farm) {
      const row = e('div', { className: 'raphael-vote-row' }); const field = input('', '0'); field.inputMode = 'numeric'
      add(row, e('span', { text: pairName(farm) + ' · ' + percent(farm.voteShare) + ' of votes' }), field); list.appendChild(row); fields.push({ farm: farm, field: field })
    })
    content.appendChild(list)
    const actions = e('div', { className: 'raphael-dialog-actions' })
    actions.appendChild(button('[ submit vote ]', function () {
      run(note, async function () {
        const pools = []; const weights = []
        fields.forEach(function (entry) { const raw = String(entry.field.value || '').trim(); if (!raw) return; if (!/^\d+$/.test(raw)) throw new Error('Weights must be whole numbers.'); const weight = Number(raw); if (weight > 0) { pools.push(entry.farm.pool); weights.push(weight) } })
        if (!pools.length) throw new Error('Enter a weight for at least one pool.')
        if (pools.length > state.overview.maxVotingNum) throw new Error('At most ' + state.overview.maxVotingNum + ' pools per vote.')
        await sendExact('vote across ' + pools.length + ' pool' + (pools.length === 1 ? '' : 's'), addresses.voter, voterInterface, 'vote', [lock.id, pools, weights]); return 'Vote submitted.'
      })
    }))
    content.appendChild(actions)
  }

  function renderWallet () {
    const node = byId('raphael-wallet-status'); const connect = byId('raphael-connect'); const other = byId('raphael-other-wallet'); const claim = byId('raphael-claim-all'); if (!node || !connect || !other) return
    const injected = injectedWallet(); connect.textContent = '[ connect ]'; other.textContent = '[ other wallet ]'
    connect.disabled = state.sending || state.walletLoading || !injected; other.disabled = state.sending || state.walletLoading
    if (claim) { const earned = state.farms.some(function (farm) { return farm.wallet && !farm.wallet.earned.isZero() }); claim.hidden = !state.account; claim.disabled = state.sending || state.walletLoading || !earned }
    if (!state.account) { node.textContent = ''; return }
    node.textContent = state.walletChain === chain.id ? short(state.account) : short(state.account) + ' · wrong chain'
  }
  function renderOverview () {
    const node = byId('raphael-overview'); const overview = state.overview; if (!node || !overview) return
    const now = nowSeconds(); const parts = []
    parts.push('RAPH ' + usd(price(addresses.raph)))
    const poolTvl = state.farms.reduce(function (sum, farm) { return sum + (Number.isFinite(farm.poolTvl) ? farm.poolTvl : 0) }, 0)
    const stakedTvl = state.farms.reduce(function (sum, farm) { return sum + (Number.isFinite(farm.stakedTvl) ? farm.stakedTvl : 0) }, 0)
    parts.push('pools ' + usd(poolTvl) + ' (staked ' + usd(stakedTvl) + ')')
    if (overview.weekly) parts.push(compact(asNumber(overview.weekly, 18)) + ' RAPH emitted per epoch')
    parts.push('epoch ' + (overview.epochCount === null ? '' : overview.epochCount + ' ') + 'flips in ' + duration(epochNext() - now))
    if (overview.lockedRaph && overview.raphSupply && !overview.raphSupply.isZero()) parts.push(compact(asNumber(overview.lockedRaph, 18)) + ' RAPH locked (' + percent(asNumber(overview.lockedRaph, 18) / asNumber(overview.raphSupply, 18) * 100) + ' of supply)')
    node.hidden = false; node.textContent = parts.join(' · ')
  }
  function farmActive (farm) { return !!farm.gauge && farm.alive && (!farm.emission.isZero() || (Number.isFinite(farm.voteShare) && farm.voteShare > 0)) }
  function visibleFarms () { return state.farms.filter(function (farm) { return state.showInactive || farmActive(farm) }) }
  function sortedFarms (farms) { return farms.slice().sort(function (left, right) { return (right.stakedTvl || 0) - (left.stakedTvl || 0) || (right.poolTvl || 0) - (left.poolTvl || 0) || left.registryIndex - right.registryIndex }) }
  function farmLabel (farm) {
    const notes = []
    if (!farm.gauge) notes.push('no gauge')
    else if (!farm.alive) notes.push('gauge killed')
    else if (!farm.distributing) notes.push('no emission this epoch')
    if (!Number.isFinite(farm.poolTvl)) notes.push('no USDG price route')
    return notes.join(' · ')
  }
  function tableHead (table, names) { const head = e('thead'); const header = e('tr'); names.forEach(function (name) { header.appendChild(e('th', { text: name })) }); head.appendChild(header); table.appendChild(head) }
  function renderFarms () {
    const host = byId('raphael-farms'); const toggle = byId('raphael-inactive-toggle'); if (!host) return
    if (toggle) toggle.textContent = state.showInactive ? '[ hide inactive ]' : '[ show inactive ]'
    host.textContent = ''; const farms = sortedFarms(visibleFarms())
    if (!farms.length) { if (!state.loading) host.appendChild(e('pre', { text: 'No live farms.' })); return }
    const table = e('table', { className: 'raphael-table raphael-farm-table' }); tableHead(table, ['Farm', 'Staked', 'Unstaked', 'APR', 'RAPH / week', 'Votes', 'Actions']); const body = e('tbody')
    farms.forEach(function (farm) {
      const row = e('tr'); const farmCell = e('td')
      add(farmCell, e('span', { className: 'raphael-pair', text: pairName(farm) + ' · ' + (farm.stable ? 'sAMM' : 'vAMM') + ' #' + (farm.registryIndex + 1) }), e('span', { className: 'raphael-kind', text: farmLabel(farm) })); row.appendChild(farmCell)
      row.appendChild(e('td', { text: usd(farm.stakedTvl) }))
      row.appendChild(e('td', { text: usd(farm.unstakedTvl) }))
      row.appendChild(e('td', { text: percent(farm.apr) }))
      const emissionCell = e('td', { className: 'raphael-values' }); emissionCell.appendChild(e('span', { text: compact(asNumber(farm.emission, 18)) + ' RAPH' })); emissionCell.appendChild(e('span', { text: usd(farm.emissionUsd) })); row.appendChild(emissionCell)
      row.appendChild(e('td', { text: percent(farm.voteShare) }))
      const actionCell = e('td', { className: 'raphael-actions' })
      actionCell.appendChild(button('[ manage ]', function () { try { requireWallet(); openFarmActions(farm) } catch (error) { setStatus(errText(error), 'error') } }, state.sending))
      if (farm.gauge) actionCell.appendChild(button('[ claim ]', function () { claimFarm(farm).then(afterTransaction).catch(function (error) { setStatus(errText(error), 'error') }) }, state.sending || !state.account || !farm.wallet || farm.wallet.earned.isZero()))
      row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }
  function renderPositions () {
    const section = byId('raphael-positions-section'); const host = byId('raphael-positions'); if (!section || !host) return
    section.hidden = !state.account; host.textContent = ''; if (!state.account) return
    const farms = sortedFarms(state.farms.filter(function (farm) { return farm.wallet && (!farm.wallet.lp.isZero() || !farm.wallet.staked.isZero() || !farm.wallet.earned.isZero() || !farm.wallet.fees0.isZero() || !farm.wallet.fees1.isZero()) }))
    if (!farms.length) { host.appendChild(e('pre', { text: state.walletLoading ? 'Reading wallet positions…' : 'No Raphael LP, stakes, or rewards in this wallet.' })); return }
    const table = e('table', { className: 'raphael-table raphael-wallet-table' }); tableHead(table, ['Your farm', 'Staked LP', 'Wallet LP', 'Earned', 'Unclaimed fees', 'Actions']); const body = e('tbody')
    farms.forEach(function (farm) {
      const wallet = farm.wallet; const lpValue = function (amount) { return Number.isFinite(farm.poolTvl) && farm.lpSupply && !farm.lpSupply.isZero() ? farm.poolTvl * asNumber(amount, 18) / asNumber(farm.lpSupply, 18) : NaN }
      const row = e('tr'); row.appendChild(e('td', { text: pairName(farm) + ' · ' + (farm.stable ? 'sAMM' : 'vAMM') }))
      const stakedCell = e('td', { className: 'raphael-values' }); add(stakedCell, e('span', { text: formatAmount(wallet.staked, 18) }), e('span', { text: usd(lpValue(wallet.staked)) })); row.appendChild(stakedCell)
      const walletCell = e('td', { className: 'raphael-values' }); add(walletCell, e('span', { text: formatAmount(wallet.lp, 18) }), e('span', { text: usd(lpValue(wallet.lp)) })); row.appendChild(walletCell)
      const earnedCell = e('td', { className: 'raphael-values' }); add(earnedCell, e('span', { text: formatAmount(wallet.earned, 18) + ' RAPH' }), e('span', { text: usd(tokenValue(wallet.earned, addresses.raph)) })); row.appendChild(earnedCell)
      const feeCell = e('td', { className: 'raphael-values' }); add(feeCell, e('span', { text: formatAmount(wallet.fees0, token(farm.token0).decimals) + ' ' + token(farm.token0).symbol }), e('span', { text: formatAmount(wallet.fees1, token(farm.token1).decimals) + ' ' + token(farm.token1).symbol })); row.appendChild(feeCell)
      const actionCell = e('td', { className: 'raphael-actions' }); actionCell.appendChild(button('[ manage ]', function () { try { requireWallet(); openFarmActions(farm) } catch (error) { setStatus(errText(error), 'error') } }, state.sending)); row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }
  function renderLocks () {
    const section = byId('raphael-locks-section'); const host = byId('raphael-locks'); const create = byId('raphael-create-lock'); if (!section || !host) return
    section.hidden = !state.account; host.textContent = ''; if (!state.account) return
    if (create) create.disabled = state.sending || state.walletLoading
    if (!state.locks.length) { host.appendChild(e('pre', { text: state.walletLoading ? 'Reading veRAPH locks…' : 'No veRAPH locks in this wallet.' })); return }
    const table = e('table', { className: 'raphael-table raphael-wallet-table' }); tableHead(table, ['veRAPH', 'Locked RAPH', 'Voting power', 'Status', 'Rebase', 'Actions']); const body = e('tbody')
    state.locks.slice().sort(function (left, right) { return right.amount.gt(left.amount) ? 1 : right.amount.lt(left.amount) ? -1 : 0 }).forEach(function (lock) {
      const row = e('tr'); row.appendChild(e('td', { text: '#' + lock.id.toString() }))
      const lockedCell = e('td', { className: 'raphael-values' }); add(lockedCell, e('span', { text: formatAmount(lock.amount, 18) }), e('span', { text: usd(tokenValue(lock.amount, addresses.raph)) })); row.appendChild(lockedCell)
      row.appendChild(e('td', { text: formatAmount(lock.power, 18) }))
      row.appendChild(e('td', { text: lockStatus(lock) + (votedThisEpoch(lock) ? ' · voted this epoch' : lock.voted ? ' · votes carried' : '') }))
      row.appendChild(e('td', { text: formatAmount(lock.rebase, 18) + ' RAPH' }))
      const actionCell = e('td', { className: 'raphael-actions' }); actionCell.appendChild(button('[ manage ]', function () { try { requireWallet(); openLockActions(lock) } catch (error) { setStatus(errText(error), 'error') } }, state.sending)); row.appendChild(actionCell); body.appendChild(row)
    })
    table.appendChild(body); host.appendChild(table)
  }
  function bindEvents () {
    const connect = byId('raphael-connect'); const other = byId('raphael-other-wallet'); const toggle = byId('raphael-inactive-toggle'); const claim = byId('raphael-claim-all'); const create = byId('raphael-create-lock')
    if (connect) connect.addEventListener('click', function () { connectWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (other) other.addEventListener('click', function () { connectReown().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (toggle) toggle.addEventListener('click', function () { state.showInactive = !state.showInactive; renderFarms() })
    if (claim) claim.addEventListener('click', function () { claimAll().catch(function (error) { setStatus(errText(error), 'error') }) })
    if (create) create.addEventListener('click', function () { try { requireWallet(); openCreateLock() } catch (error) { setStatus(errText(error), 'error') } })
  }
  function render () { renderWallet(); renderOverview(); renderFarms(); renderPositions(); renderLocks() }
  async function start () { state.rpc = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' }); bindEvents(); window.addEventListener('pagehide', clearWalletEvents, { once: true }); render(); const wallet = passiveWallet(); await loadRegistry(); await wallet; if (state.account) await refreshWallet() }
  function fatal (error) { console.error(error); setLoading(); setStatus(errText(error), 'error'); render() }
  return { start: start, fatal: fatal }
})()
