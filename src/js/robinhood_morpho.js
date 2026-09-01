/* Morpho on Robinhood Chain: canonical event discovery, direct RPC, direct EIP-1193. */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { MorphoPage.start().catch(MorphoPage.fatal) })

const MorphoPage = (function () {
  const chain = {
    id: '0x1237', number: 4663, name: 'Robinhood Chain', rpc: 'https://rpc.mainnet.chain.robinhood.com',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 }
  }
  // These are deployment roots, not a market or vault list. Every page load
  // enumerates their canonical CreateMarket/CreateVaultV2 event registries.
  const addresses = {
    morpho: '0x9D53d5E3bd5E8d4Cbfa6DB1ca238AEA02E651010',
    morphoDeployedAt: 286,
    vaultV2Factory: '0x0FBad98595b0186dA120E41f77C102beb49f803c',
    vaultV2FactoryDeployedAt: 288,
    multicall: '0xcA11bde05977b3631167028862bE2a173976CA11',
    // USDG is shown as its own loan-asset denomination in the coverage
    // summary. This page deliberately does not turn any token into a dollar
    // value without an independent onchain price source.
    usdg: '0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168'
  }
  const secondsPerYear = 365 * 24 * 60 * 60
  const registryLogBlockSpan = 20000000
  const minimumRpcReadInterval = 1000
  const wad = ethers.constants.WeiPerEther
  const zeroAddress = ethers.constants.AddressZero.toLowerCase()
  const createMarketTopic = '0xac4b2400f169220b0c0afdde7a0b32e775ba727ea1cb30b35f935cdaab8683ac'
  const createVaultV2Topic = '0x341ce009267aa0d78cc12b34155e223904a51ed49d144beb6eb8be87813edb4e'
  const morphoAbi = [
    'function market(bytes32) view returns(uint128 totalSupplyAssets,uint128 totalSupplyShares,uint128 totalBorrowAssets,uint128 totalBorrowShares,uint128 lastUpdate,uint128 fee)',
    'function position(bytes32,address) view returns(uint256 supplyShares,uint128 borrowShares,uint128 collateral)',
    'function supply((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,uint256,address,bytes) returns(uint256,uint256)',
    'function withdraw((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,uint256,address,address) returns(uint256,uint256)',
    'function supplyCollateral((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,address,bytes)',
    'function withdrawCollateral((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,address,address)',
    'function borrow((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,uint256,address,address) returns(uint256,uint256)',
    'function repay((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),uint256,uint256,address,bytes) returns(uint256,uint256)'
  ]
  const irmAbi = ['function borrowRateView((address loanToken,address collateralToken,address oracle,address irm,uint256 lltv),(uint128 totalSupplyAssets,uint128 totalSupplyShares,uint128 totalBorrowAssets,uint128 totalBorrowShares,uint128 lastUpdate,uint128 fee)) view returns(uint256)']
  const oracleAbi = ['function price() view returns(uint256)']
  const erc20Abi = [
    'function name() view returns(string)', 'function symbol() view returns(string)', 'function decimals() view returns(uint8)',
    'function balanceOf(address) view returns(uint256)', 'function allowance(address,address) view returns(uint256)',
    'function approve(address,uint256) returns(bool)'
  ]
  const vaultAbi = [
    'function name() view returns(string)', 'function symbol() view returns(string)', 'function totalAssets() view returns(uint256)',
    'function totalSupply() view returns(uint256)', 'function balanceOf(address) view returns(uint256)',
    'function deposit(uint256,address) returns(uint256)', 'function withdraw(uint256,address,address) returns(uint256)'
  ]
  const multicallAbi = ['function aggregate3((address target,bool allowFailure,bytes callData)[] calls) view returns((bool success,bytes returnData)[] returnData)']
  const morphoInterface = new ethers.utils.Interface(morphoAbi)
  const irmInterface = new ethers.utils.Interface(irmAbi)
  const oracleInterface = new ethers.utils.Interface(oracleAbi)
  const erc20Interface = new ethers.utils.Interface(erc20Abi)
  const vaultInterface = new ethers.utils.Interface(vaultAbi)
  const state = {
    rpc: null, eip1193: null, wallet: null, account: null, walletChain: null, eventsBound: false,
    markets: [], vaults: [], tokens: new Map(), showZeroRates: false, loading: false, status: '', statusType: '',
    action: null, actionInfo: null, sending: false, latestBlock: null,
    discovery: { marketEvents: 0, actionableMarkets: 0, zeroAddressMarkets: 0, vaults: 0 },
    spinner: null, spinnerFrame: 0, reownUnsubscribe: null, nextRpcReadAt: 0
  }

  const byId = function (id) { return document.getElementById(id) }
  const lower = function (value) { return String(value || '').toLowerCase() }
  const isZeroAddress = function (value) { return lower(value) === zeroAddress }
  const isUsdG = function (value) { return lower(value) === lower(addresses.usdg) }
  const short = function (value) { return value ? value.slice(0, 6) + '...' + value.slice(-4) : '-' }
  const safeText = function (value, maximum) { return String(value || '-').replace(/[\r\n|]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maximum || 54) || '-' }
  const errText = function (error) { return String(error && (error.reason || error.data && error.data.message || error.message) || error).replace(/^Error: /, '').slice(0, 450) }
  const toNumber = function (value) { try { const output = Number(value); return Number.isFinite(output) ? output : NaN } catch (error) { return NaN } }
  const format = function (amount, decimals, digits) {
    if (amount === undefined || amount === null || decimals === undefined || decimals === null) return '-'
    try {
      const parts = ethers.utils.formatUnits(amount, decimals).split('.')
      const fraction = (parts[1] || '').slice(0, digits === undefined ? 5 : digits).replace(/0+$/, '')
      return fraction ? parts[0] + '.' + fraction : parts[0]
    } catch (error) { return '-' }
  }
  const unitsNumber = function (amount, decimals) { const output = Number(format(amount, decimals, 12)); return Number.isFinite(output) ? output : NaN }
  const compact = function (value, digits) {
    if (!Number.isFinite(value) || value < 0) return '-'
    if (value >= 1e9) return (value / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'
    if (value >= 1e6) return (value / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'
    if (value >= 1e3) return (value / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'
    if (value >= 1) return value.toFixed(digits === undefined ? 2 : digits)
    if (value > 0) return value.toPrecision(3)
    return '0'
  }
  const percent = function (value) { return Number.isFinite(value) && value >= 0 ? compact(value, value >= 100 ? 1 : 2) + '%' : '-' }
  const e = function (tag, options) {
    const node = document.createElement(tag); const config = options || {}
    if (config.text !== undefined) node.textContent = config.text
    if (config.className) node.className = config.className
    if (config.id) node.id = config.id
    if (config.type) node.type = config.type
    if (config.disabled) node.disabled = true
    return node
  }
  const append = function (parent) { for (let index = 1; index < arguments.length; index += 1) parent.appendChild(arguments[index]); return parent }
  const button = function (label, fn, disabled) {
    const node = e('button', { type: 'button', text: '[ ' + label + ' ]', className: 'morpho-action-button', disabled: disabled || state.sending })
    node.addEventListener('click', function () { fn().catch(function (error) { console.error('Morpho action failed', error); setStatus(errText(error), 'error') }) })
    return node
  }
  const token = function (address) { return state.tokens.get(lower(address)) || { address: address, symbol: short(address), name: short(address), decimals: null } }
  const paramsTuple = function (market) { const p = market.params; return [p.loanToken, p.collateralToken, p.oracle, p.irm, p.lltv] }
  const hasActionableMarketParams = function (market) {
    const params = market && market.params
    return Boolean(params) && [params.loanToken, params.collateralToken, params.oracle, params.irm].every(function (address) { return !isZeroAddress(address) })
  }
  const injectedWallet = function () { return window.ethereum && typeof window.ethereum.request === 'function' ? window.ethereum : null }
  const isCorrectChain = function () { return state.walletChain === chain.id }

  function setStatus (text, type) {
    state.status = text || ''; state.statusType = type || ''
    const node = byId('morpho-status'); if (!node) return
    node.hidden = !state.status; node.textContent = state.status; node.dataset.kind = state.statusType
  }

  function setLoading (text) {
    const node = byId('morpho-loading'); const label = byId('morpho-loading-text'); const spinner = byId('morpho-loading-spinner')
    if (!node) return
    node.hidden = !text
    if (text && label) label.textContent = text
    if (text && spinner && !state.spinner) {
      const frames = ['[....]', '[=...]', '[.=..]', '[..=.]', '[...=]']
      state.spinnerFrame = 0
      const advance = function () { spinner.textContent = frames[state.spinnerFrame % frames.length]; state.spinnerFrame += 1 }
      advance(); state.spinner = window.setInterval(advance, 300)
    } else if (!text && state.spinner) { window.clearInterval(state.spinner); state.spinner = null }
  }

  async function limited (items, concurrency, fn) {
    const output = new Array(items.length); let next = 0
    const worker = async function () { while (next < items.length) { const index = next; next += 1; output[index] = await fn(items[index], index) } }
    await Promise.all(Array.from({ length: Math.min(Math.max(items.length, 1), concurrency) }, worker))
    return output
  }

  const wait = function (milliseconds) { return new Promise(function (resolve) { window.setTimeout(resolve, milliseconds) }) }
  const isRetryableRpcError = function (error) {
    const details = error && [
      error.message, error.reason, error.code, error.status,
      error.serverError && error.serverError.message, error.serverError && error.serverError.code,
      error.error && error.error.message, error.error && error.error.code
    ].filter(Boolean).join(' ').toLowerCase()
    // Browser CORS turns some HTTP 429 replies into ethers' deliberately
    // vague SERVER_ERROR / missing-response wrapper. It is still transient:
    // retry serially before declaring an otherwise complete registry absent.
    return /429|rate limit|too many requests|timeout|timed out|temporar|network error|failed to fetch|missing response|server_error|503|504/.test(details)
  }
  async function rpcRead (label, fn) {
    let failure
    for (let attempt = 0; attempt < 4; attempt += 1) {
      const delayUntilSlot = Math.max(0, state.nextRpcReadAt - Date.now())
      if (delayUntilSlot) await wait(delayUntilSlot)
      state.nextRpcReadAt = Date.now() + minimumRpcReadInterval
      try { return await fn() } catch (error) {
        failure = error
        if (!isRetryableRpcError(error) || attempt === 3) throw error
        const milliseconds = 2000 * (attempt + 1)
        setLoading(label + ' hit a temporary Robinhood RPC limit; retrying ' + (attempt + 1) + '/3...')
        await wait(milliseconds)
      }
    }
    throw failure
  }

  async function batch (calls) {
    if (!calls.length) return []
    const chunks = []
    for (let start = 0; start < calls.length; start += 80) chunks.push(calls.slice(start, start + 80))
    const multicall = new ethers.Contract(addresses.multicall, multicallAbi, state.rpc)
    const settled = await limited(chunks, 1, async function (chunk) {
      const decode = function (call, data) {
        try {
          const decoded = call.iface.decodeFunctionResult(call.method, data)
          return call.decode ? call.decode(decoded) : decoded.length === 1 ? decoded[0] : decoded
        } catch (error) { return call.fallback }
      }
      const encoded = chunk.map(function (call) {
        return { target: call.target, allowFailure: true, callData: call.iface.encodeFunctionData(call.method, call.args || []) }
      })
      try {
        const values = await rpcRead('Reading bounded Multicall3 group', function () { return multicall.aggregate3(encoded) })
        return values.map(function (result, index) { return result.success ? decode(chunk[index], result.returnData) : chunk[index].fallback })
      } catch (error) {
        // Keep one unusual RPC/Multicall failure from hiding the complete
        // registry. This remains direct official-RPC reading, is bounded, and
        // preserves an unavailable field instead of inventing a value.
        console.warn('Multicall3 group failed; reading this bounded group directly.', errText(error))
        return limited(chunk, 1, async function (call, index) {
          try {
            return decode(call, await rpcRead('Reading bounded direct contract call', function () {
              return state.rpc.call({ to: call.target, data: encoded[index].callData })
            }))
          } catch (directError) { return call.fallback }
        })
      }
    })
    return [].concat.apply([], settled)
  }

  function word (data, index) { return data.slice(2 + index * 64, 2 + (index + 1) * 64) }
  function addressWord (data, index) { return ethers.utils.getAddress('0x' + word(data, index).slice(24)) }
  function eventMarkets (logs) {
    const output = new Map()
    logs.forEach(function (log) {
      if (!log.topics || !log.topics[1] || !log.data || log.data.length < 322) return
      const id = lower(log.topics[1]); if (output.has(id)) return
      output.set(id, {
        id: log.topics[1], createdAtBlock: Number(log.blockNumber), params: {
          loanToken: addressWord(log.data, 0), collateralToken: addressWord(log.data, 1), oracle: addressWord(log.data, 2), irm: addressWord(log.data, 3), lltv: ethers.BigNumber.from('0x' + word(log.data, 4))
        }, market: null, oraclePrice: null, borrowRate: null, position: null
      })
    })
    return Array.from(output.values())
  }
  function eventVaults (logs) {
    const output = new Map()
    logs.forEach(function (log) {
      if (!log.topics || log.topics.length < 4) return
      const address = ethers.utils.getAddress('0x' + log.topics[3].slice(-40)); const key = lower(address)
      if (output.has(key)) return
      output.set(key, { address: address, owner: ethers.utils.getAddress('0x' + log.topics[1].slice(-40)), asset: ethers.utils.getAddress('0x' + log.topics[2].slice(-40)), salt: log.data, createdAtBlock: Number(log.blockNumber), totalAssets: null, totalSupply: null, name: null, symbol: null, balance: null })
    })
    return Array.from(output.values())
  }

  async function registryRangeLogs (address, topic, range, label, depth) {
    try {
      return await rpcRead('Reading ' + label + ' registry blocks ' + range.from + '-' + range.to, function () {
        return state.rpc.getLogs({ address: address, topics: [topic], fromBlock: range.from, toBlock: range.to })
      })
    } catch (error) {
      const span = range.to - range.from + 1
      // Keep the fallback finite and deterministic. It handles an RPC shard
      // that rejects a historical range without replacing canonical event
      // discovery with a third-party indexer or an incomplete static list.
      if (span <= 100000 || depth >= 8) throw error
      const middle = range.from + Math.floor((span - 1) / 2)
      setLoading('Reducing ' + label + ' registry range after RPC refusal...')
      const left = await registryRangeLogs(address, topic, { from: range.from, to: middle }, label, depth + 1)
      const right = await registryRangeLogs(address, topic, { from: middle + 1, to: range.to }, label, depth + 1)
      return left.concat(right)
    }
  }

  async function registryLogs (address, topic, deployedAt, label) {
    // Always read in bounded, chronological ranges. A long event filter can
    // work on one public RPC replica and fail on another, which would make a
    // supposedly complete registry depend on the browser's backend shard.
    const latest = state.latestBlock || await rpcRead('Reading latest Robinhood block', function () { return state.rpc.getBlockNumber() })
    const ranges = []
    for (let from = deployedAt; from <= latest; from += registryLogBlockSpan) ranges.push({ from: from, to: Math.min(latest, from + registryLogBlockSpan - 1) })
    const all = []
    for (let index = 0; index < ranges.length; index += 1) {
      const range = ranges[index]
      setLoading('Discovering ' + label + ' registry range ' + (index + 1) + '/' + ranges.length + '...')
      const logs = await registryRangeLogs(address, topic, range, label, 0)
      Array.prototype.push.apply(all, logs)
    }
    return all
  }

  async function discover () {
    setLoading('Reading canonical Morpho Blue and Vault V2 creation events...')
    state.latestBlock = await rpcRead('Reading latest Robinhood block', function () { return state.rpc.getBlockNumber() })
    const marketLogs = await registryLogs(addresses.morpho, createMarketTopic, addresses.morphoDeployedAt, 'Morpho market')
    // Avoid concurrent historic scans against the public Robinhood RPC. The
    // event filter is small, complete, and does not use any third-party API.
    const vaultLogs = await registryLogs(addresses.vaultV2Factory, createVaultV2Topic, addresses.vaultV2FactoryDeployedAt, 'Vault V2')
    const allMarkets = eventMarkets(marketLogs)
    // The canonical registry includes a few deployment/test records whose
    // market params contain a zero address. The CreateMarket ABI decode above
    // is intentional (five packed data words after the indexed market id),
    // but those records cannot safely support the oracle/IRM calls or direct
    // market actions. Keep their event count visible while never placing them
    // in the actionable state set.
    state.markets = allMarkets.filter(hasActionableMarketParams)
    state.vaults = eventVaults(vaultLogs)
    state.discovery = {
      marketEvents: allMarkets.length,
      actionableMarkets: state.markets.length,
      zeroAddressMarkets: allMarkets.length - state.markets.length,
      vaults: state.vaults.length
    }
    if (!state.markets.length) throw new Error('The canonical Morpho Blue registry returned no CreateMarket events.')
  }

  async function loadTokens () {
    const addressesToRead = new Set()
    state.markets.forEach(function (market) { addressesToRead.add(lower(market.params.loanToken)); addressesToRead.add(lower(market.params.collateralToken)) })
    state.vaults.forEach(function (vault) { addressesToRead.add(lower(vault.asset)) })
    const list = Array.from(addressesToRead)
    const calls = []
    list.forEach(function (address) {
      calls.push(
        { target: address, iface: erc20Interface, method: 'symbol', fallback: null },
        { target: address, iface: erc20Interface, method: 'name', fallback: null },
        { target: address, iface: erc20Interface, method: 'decimals', fallback: null }
      )
    })
    const values = await batch(calls)
    list.forEach(function (address, index) {
      const symbol = values[index * 3]; const name = values[index * 3 + 1]; const decimals = values[index * 3 + 2]
      state.tokens.set(lower(address), { address: ethers.utils.getAddress(address), symbol: safeText(symbol || short(address), 18), name: safeText(name || symbol || short(address), 48), decimals: decimals === null ? null : Number(decimals) })
    })
  }

  function accrued (market) {
    if (!market.market) return null
    const current = market.market; const rate = market.borrowRate
    if (!rate || !ethers.BigNumber.isBigNumber(rate)) return { supply: current.totalSupplyAssets, borrow: current.totalBorrowAssets, fee: current.fee }
    const elapsed = Math.max(0, Math.floor(Date.now() / 1000) - toNumber(current.lastUpdate))
    // Mirror Morpho Blue's wTaylorCompounded calculation to show the expected
    // current balances between writes. Fees mint supply shares; they do not
    // reduce totalSupplyAssets.
    const first = rate.mul(elapsed)
    const second = first.mul(first).div(wad.mul(2))
    const third = second.mul(first).div(wad.mul(3))
    const interest = current.totalBorrowAssets.mul(first.add(second).add(third)).div(wad)
    return { supply: current.totalSupplyAssets.add(interest), borrow: current.totalBorrowAssets.add(interest), fee: current.fee }
  }
  function marketMetrics (market) {
    const balances = accrued(market); const loan = token(market.params.loanToken); const collateral = token(market.params.collateralToken)
    const supply = balances && unitsNumber(balances.supply, loan.decimals); const borrow = balances && unitsNumber(balances.borrow, loan.decimals)
    const utilization = Number.isFinite(supply) && supply > 0 && Number.isFinite(borrow) ? borrow / supply * 100 : NaN
    const borrowRate = market.borrowRate ? unitsNumber(market.borrowRate, 18) * secondsPerYear * 100 : NaN
    const fee = balances ? unitsNumber(balances.fee, 18) : NaN
    const supplyRate = Number.isFinite(borrowRate) && Number.isFinite(utilization) ? borrowRate * utilization / 100 * (1 - (Number.isFinite(fee) ? fee : 0)) : NaN
    let oracle = NaN
    if (market.oraclePrice && loan.decimals !== null && collateral.decimals !== null) oracle = unitsNumber(market.oraclePrice, 36 + loan.decimals - collateral.decimals)
    return { balances: balances, loan: loan, collateral: collateral, supply: supply, borrow: borrow, utilization: utilization, borrowRate: borrowRate, supplyRate: supplyRate, oracle: oracle }
  }

  async function hydrateMarkets () {
    const groups = []
    for (let index = 0; index < state.markets.length; index += 24) groups.push(state.markets.slice(index, index + 24))
    for (let index = 0; index < groups.length; index += 1) {
      const group = groups[index]; setLoading('Reading live state for Morpho markets ' + Math.min((index + 1) * 24, state.markets.length) + '/' + state.markets.length + '...')
      const stateCalls = []
      group.forEach(function (market) {
        stateCalls.push({ target: addresses.morpho, iface: morphoInterface, method: 'market', args: [market.id], fallback: null, decode: function (value) { return value } })
        stateCalls.push({ target: market.params.oracle, iface: oracleInterface, method: 'price', fallback: null })
      })
      const states = await batch(stateCalls)
      group.forEach(function (market, marketIndex) { market.market = states[marketIndex * 2]; market.oraclePrice = states[marketIndex * 2 + 1] })
      const rateTargets = group.filter(function (market) { return market.market })
      const rates = await batch(rateTargets.map(function (market) {
        return { target: market.params.irm, iface: irmInterface, method: 'borrowRateView', args: [paramsTuple(market), market.market], fallback: null }
      }))
      group.forEach(function (market) { market.borrowRate = null })
      rateTargets.forEach(function (market, marketIndex) { market.borrowRate = rates[marketIndex] })
      render()
    }
  }

  async function hydrateVaults () {
    const groups = []
    for (let index = 0; index < state.vaults.length; index += 24) groups.push(state.vaults.slice(index, index + 24))
    for (let index = 0; index < groups.length; index += 1) {
      const group = groups[index]; setLoading('Reading live state for Vault V2 ' + Math.min((index + 1) * 24, state.vaults.length) + '/' + state.vaults.length + '...')
      const calls = []
      group.forEach(function (vault) {
        calls.push(
          { target: vault.address, iface: vaultInterface, method: 'name', fallback: null },
          { target: vault.address, iface: vaultInterface, method: 'symbol', fallback: null },
          { target: vault.address, iface: vaultInterface, method: 'totalAssets', fallback: null },
          { target: vault.address, iface: vaultInterface, method: 'totalSupply', fallback: null }
        )
      })
      const values = await batch(calls)
      group.forEach(function (vault, vaultIndex) {
        vault.name = values[vaultIndex * 4]; vault.symbol = values[vaultIndex * 4 + 1]
        vault.totalAssets = values[vaultIndex * 4 + 2]; vault.totalSupply = values[vaultIndex * 4 + 3]
      })
      render()
    }
  }

  async function hydrateWallet () {
    if (!state.account || !state.markets.length) return
    const calls = []
    state.markets.forEach(function (market) { calls.push({ target: addresses.morpho, iface: morphoInterface, method: 'position', args: [market.id, state.account], fallback: null, decode: function (value) { return value } }) })
    state.vaults.forEach(function (vault) { calls.push({ target: vault.address, iface: vaultInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }) })
    const values = await batch(calls)
    state.markets.forEach(function (market, index) { market.position = values[index] })
    state.vaults.forEach(function (vault, index) { vault.balance = values[state.markets.length + index] })
  }

  async function refreshMarket (market) {
    const stateValues = await batch([
      { target: addresses.morpho, iface: morphoInterface, method: 'market', args: [market.id], fallback: null, decode: function (value) { return value } },
      { target: market.params.oracle, iface: oracleInterface, method: 'price', fallback: null }
    ])
    market.market = stateValues[0]; market.oraclePrice = stateValues[1]
    market.borrowRate = market.market ? (await batch([{ target: market.params.irm, iface: irmInterface, method: 'borrowRateView', args: [paramsTuple(market), market.market], fallback: null }]))[0] : null
    if (state.account) market.position = (await batch([{ target: addresses.morpho, iface: morphoInterface, method: 'position', args: [market.id, state.account], fallback: null, decode: function (value) { return value } }]))[0]
  }
  async function refreshVault (vault) {
    const values = await batch([
      { target: vault.address, iface: vaultInterface, method: 'totalAssets', fallback: null },
      { target: vault.address, iface: vaultInterface, method: 'totalSupply', fallback: null },
      { target: vault.address, iface: vaultInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero }
    ])
    vault.totalAssets = values[0]; vault.totalSupply = values[1]; vault.balance = values[2]
  }

  function walletLabel () {
    if (state.account) return short(state.account) + (isCorrectChain() ? ' / Robinhood Chain' : ' / switch to Robinhood Chain')
    return injectedWallet() ? 'No injected account authorized for this page' : 'No injected EIP-1193 wallet found'
  }
  function renderOverview () {
    const node = byId('morpho-overview'); if (!node) return
    const rateReady = state.markets.filter(function (market) { return market.borrowRate !== null }).length
    const oracleReady = state.markets.filter(function (market) { return market.oraclePrice !== null }).length
    const usdCovered = state.markets.filter(function (market) { return isUsdG(market.params.loanToken) }).length
    const zeroCount = state.markets.filter(function (market) { const metrics = marketMetrics(market); return Number.isFinite(metrics.borrowRate) && metrics.borrowRate === 0 }).length
    const rateBearingCount = state.markets.filter(function (market) { const metrics = marketMetrics(market); return Number.isFinite(metrics.borrowRate) && metrics.borrowRate !== 0 }).length
    const unavailableRateCount = state.markets.filter(function (market) { return !Number.isFinite(marketMetrics(market).borrowRate) }).length
    node.textContent = [
      'DISCOVERY : ' + state.discovery.marketEvents + ' CreateMarket events from Morpho Blue (' + addresses.morpho + ')',
      '            ' + state.discovery.actionableMarkets + ' actionable market params / ' + state.discovery.zeroAddressMarkets + ' zero-address records excluded from reads and actions',
      '            ' + state.discovery.vaults + ' CreateVaultV2 events from canonical Vault V2 factory (' + addresses.vaultV2Factory + ')',
      'COVERAGE  : oracle quote ' + oracleReady + '/' + state.markets.length + ' / live IRM rate ' + rateReady + '/' + state.markets.length + ' / USDG loan markets ' + usdCovered + '/' + state.markets.length,
      'PRICE     : USD valuation unavailable by design; no price API or assumed peg is used',
      'DISPLAY   : ' + (state.showZeroRates ? 'all actionable markets' : rateBearingCount + ' rate-bearing + ' + unavailableRateCount + ' unavailable-rate markets; ' + zeroCount + ' zero-rate rows hidden') + ' / wallet ' + walletLabel(),
      'UPDATED   : block ' + (state.latestBlock || '-') + ' / direct official Robinhood RPC'
    ].join('\n')
    const walletNode = byId('morpho-wallet-status'); if (walletNode) walletNode.textContent = walletLabel()
  }

  function addHeader (table, labels) { const row = table.insertRow(); labels.forEach(function (label) { row.appendChild(e('th', { text: label })) }) }
  function addCell (row, text, className) { row.appendChild(e('td', { text: text, className: className })) }
  function labelForMarket (market) { const metrics = marketMetrics(market); return metrics.loan.symbol + ' / ' + metrics.collateral.symbol + ' / ' + percent(unitsNumber(market.params.lltv, 18)) }
  function marketPriceLabel (market, metrics) {
    if (!Number.isFinite(metrics.oracle)) return '-'
    const quote = '1 ' + metrics.collateral.symbol + ' = ' + compact(metrics.oracle, 6) + ' ' + metrics.loan.symbol
    return quote
  }
  function marketTvlLabel (metrics) {
    if (!metrics.balances) return '-'
    return compact(metrics.supply, 5) + ' ' + metrics.loan.symbol
  }
  function renderMarkets () {
    const container = byId('morpho-markets'); if (!container) return
    container.textContent = ''
    if (!state.markets.length) { container.appendChild(e('pre', { text: 'No Morpho markets discovered yet.' })); return }
    const visible = state.markets.filter(function (market) {
      const metrics = marketMetrics(market); return state.showZeroRates || !Number.isFinite(metrics.borrowRate) || metrics.borrowRate !== 0
    }).sort(function (left, right) { return left.createdAtBlock - right.createdAtBlock })
    const table = e('table', { className: 'morpho-table' }); addHeader(table, ['MARKET', 'ORACLE QUOTE', 'ONCHAIN ASSETS', 'UTIL.', 'SIMPLE APR', 'DIRECT WALLET'])
    visible.forEach(function (market) {
      const metrics = marketMetrics(market); const row = table.insertRow(); const marketCell = e('td')
      append(marketCell, e('span', { className: 'morpho-name', text: labelForMarket(market) }), e('span', { className: 'morpho-subline', text: short(market.id) + ' / block ' + market.createdAtBlock }))
      row.appendChild(marketCell); addCell(row, marketPriceLabel(market, metrics), Number.isFinite(metrics.oracle) ? '' : 'morpho-unpriced'); addCell(row, marketTvlLabel(metrics)); addCell(row, percent(metrics.utilization)); addCell(row, 'supply ' + percent(metrics.supplyRate) + '\nborrow ' + percent(metrics.borrowRate));
      const actions = e('td', { className: 'morpho-actions' })
      append(actions,
        button('supply', function () { return openAction('market', market, 'supply') }), button('withdraw', function () { return openAction('market', market, 'withdraw') }),
        button('supply coll.', function () { return openAction('market', market, 'collateral-supply') }), button('withdraw coll.', function () { return openAction('market', market, 'collateral-withdraw') }),
        button('borrow', function () { return openAction('market', market, 'borrow') }), button('repay', function () { return openAction('market', market, 'repay') })
      )
      row.appendChild(actions)
    })
    if (!visible.length) container.appendChild(e('pre', { text: 'Every discovered market currently reports a zero borrow rate. [ show 0-rate markets ] reveals them.' }))
    else container.appendChild(table)
  }
  function renderVaults () {
    const container = byId('morpho-vaults'); if (!container) return
    container.textContent = ''
    if (!state.vaults.length) { container.appendChild(e('pre', { text: 'No Vault V2 instances discovered yet.' })); return }
    const table = e('table', { className: 'morpho-table' }); addHeader(table, ['VAULT V2', 'ASSET', 'ONCHAIN ASSETS', 'SHARES', 'APR COVERAGE', 'DIRECT WALLET'])
    state.vaults.slice().sort(function (left, right) { return left.createdAtBlock - right.createdAtBlock }).forEach(function (vault) {
      const asset = token(vault.asset); const totalAssets = unitsNumber(vault.totalAssets, asset.decimals); const totalSupply = unitsNumber(vault.totalSupply, asset.decimals); const row = table.insertRow(); const name = safeText(vault.name || vault.symbol || short(vault.address), 42)
      const vaultCell = e('td'); append(vaultCell, e('span', { className: 'morpho-name', text: name }), e('span', { className: 'morpho-subline', text: safeText(vault.symbol || short(vault.address), 20) + ' / ' + short(vault.address) }))
      row.appendChild(vaultCell); addCell(row, asset.symbol); addCell(row, compact(totalAssets, 5) + ' ' + asset.symbol); addCell(row, compact(totalSupply, 5)); addCell(row, '-\nlive allocation return is not inferred');
      const actions = e('td', { className: 'morpho-actions' }); append(actions, button('deposit', function () { return openAction('vault', vault, 'deposit') }), button('withdraw', function () { return openAction('vault', vault, 'withdraw') })); row.appendChild(actions)
    })
    container.appendChild(table)
  }
  function render () { renderOverview(); renderMarkets(); renderVaults(); if (state.action) renderAction() }

  function actionTitle () {
    if (!state.action) return ''
    const action = state.action
    if (action.kind === 'vault') return action.mode.toUpperCase() + ' / ' + safeText(action.entry.name || action.entry.symbol || short(action.entry.address), 42)
    const labels = { supply: 'SUPPLY LOAN ASSET', withdraw: 'WITHDRAW LOAN ASSET', 'collateral-supply': 'SUPPLY COLLATERAL', 'collateral-withdraw': 'WITHDRAW COLLATERAL', borrow: 'BORROW LOAN ASSET', repay: 'REPAY LOAN ASSET' }
    return (labels[action.mode] || action.mode.toUpperCase()) + ' / ' + labelForMarket(action.entry)
  }
  function actionToken () {
    if (!state.action) return null; const action = state.action
    if (action.kind === 'vault') return token(action.entry.asset)
    return token(action.mode === 'collateral-supply' || action.mode === 'collateral-withdraw' ? action.entry.params.collateralToken : action.entry.params.loanToken)
  }
  function actionNeedsApproval () { return state.action && (state.action.kind === 'vault' && state.action.mode === 'deposit' || state.action.kind === 'market' && ['supply', 'repay', 'collateral-supply'].indexOf(state.action.mode) >= 0) }
  function actionMaxValue () {
    if (!state.action || !state.actionInfo) return null
    const action = state.action; const info = state.actionInfo
    if (action.kind === 'vault') return action.mode === 'deposit' ? info.balance : null
    if (action.mode === 'supply') return info.balance
    if (action.mode === 'collateral-supply') return info.balance
    return null
  }
  function actionAmountLabel () {
    if (!state.action) return 'Amount'; if (state.action.kind === 'vault') return state.action.mode === 'deposit' ? 'Deposit assets' : 'Withdraw assets'
    return ({ supply: 'Supply assets', withdraw: 'Withdraw assets', 'collateral-supply': 'Supply collateral', 'collateral-withdraw': 'Withdraw collateral', borrow: 'Borrow assets', repay: 'Repay assets' })[state.action.mode] || 'Amount'
  }
  function actionInputValue () { return state.action && state.action.amount || '' }
  function actionNote () {
    if (!state.action) return ''
    if (!state.account) return 'Connect an EIP-1193 wallet first. The public market view never requests wallet permissions.'
    if (!isCorrectChain()) return 'Switch the connected wallet to Robinhood Chain (4663) before preparing a transaction.'
    if (!state.actionInfo) return 'Reading the direct token balance, exact allowance, and onchain position...'
    const info = state.actionInfo; const asset = actionToken(); const balance = format(info.balance, asset.decimals)
    if (actionNeedsApproval()) return 'Wallet balance: ' + balance + ' ' + asset.symbol + '. Approval is checked against the exact typed amount; no unlimited approval is prepared.'
    return 'Every submit performs an eth_call of the exact direct transaction from this wallet before it can be sent.'
  }
  function renderAction () {
    const dialog = byId('morpho-action-dialog'); const container = byId('morpho-action-content'); if (!dialog || !container || !state.action) return
    const asset = actionToken(); container.textContent = ''
    container.appendChild(e('h2', { id: 'morpho-action-title', text: actionTitle() }))
    container.appendChild(e('p', { className: 'morpho-action-note', text: actionNote() }))
    if (!state.account || !isCorrectChain()) return
    const details = e('p', { className: 'morpho-action-balance' }); const info = state.actionInfo
    append(details, e('span', { text: 'ASSET : ' + asset.symbol }), e('span', { text: info ? 'BALANCE : ' + format(info.balance, asset.decimals) : 'BALANCE : reading...' }))
    container.appendChild(details)
    const inputRow = e('label', { className: 'morpho-input-row' }); inputRow.appendChild(document.createTextNode(actionAmountLabel() + ' : '))
    const input = e('input', { id: 'morpho-action-amount' }); input.type = 'text'; input.inputMode = 'decimal'; input.autocomplete = 'off'; input.value = actionInputValue(); input.placeholder = '0.0'; input.addEventListener('input', function () { state.action.amount = input.value; renderAction() })
    inputRow.appendChild(input)
    const max = actionMaxValue()
    if (max && (!max.isZero || !max.isZero())) inputRow.appendChild(button('max', function () { useMax().catch(function (error) { setStatus(errText(error), 'error') }) }, !info))
    container.appendChild(inputRow)
    const controls = e('div', { className: 'morpho-dialog-actions' })
    if (actionNeedsApproval()) controls.appendChild(button('approve exact amount', function () { return approveAction() }, !info || !action.amount))
    controls.appendChild(button('preflight + submit', function () { return submitAction() }, !info || !action.amount || state.sending))
    container.appendChild(controls)
  }

  async function openAction (kind, entry, mode) {
    if (kind === 'market' && !hasActionableMarketParams(entry)) throw new Error('This CreateMarket record has a zero address and is excluded from direct actions.')
    state.action = { kind: kind, entry: entry, mode: mode, amount: '' }; state.actionInfo = null; renderAction()
    const dialog = byId('morpho-action-dialog'); if (dialog && !dialog.open) dialog.showModal()
    if (!state.account || !isCorrectChain()) return
    await refreshActionInfo(); renderAction()
  }
  async function refreshActionInfo () {
    if (!state.action || !state.account) return
    const action = state.action; const asset = actionToken(); const spender = action.kind === 'vault' ? action.entry.address : addresses.morpho
    const calls = [
      { target: asset.address, iface: erc20Interface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero },
      { target: asset.address, iface: erc20Interface, method: 'allowance', args: [state.account, spender], fallback: ethers.constants.Zero }
    ]
    if (action.kind === 'vault') calls.push({ target: action.entry.address, iface: vaultInterface, method: 'balanceOf', args: [state.account], fallback: ethers.constants.Zero })
    else calls.push({ target: addresses.morpho, iface: morphoInterface, method: 'position', args: [action.entry.id, state.account], fallback: null, decode: function (value) { return value } })
    const values = await batch(calls); state.actionInfo = { balance: values[0], allowance: values[1], shares: action.kind === 'vault' ? values[2] : null, position: action.kind === 'market' ? values[2] : null }
  }
  async function useMax () {
    if (!state.actionInfo) return
    const asset = actionToken(); const max = actionMaxValue(); if (!max || max.isZero && max.isZero()) throw new Error('No max position or asset balance is available for this action.')
    state.action.amount = format(max, asset.decimals, asset.decimals); renderAction()
  }
  function parsedAmount () {
    const asset = actionToken(); const raw = state.action && String(state.action.amount || '').trim()
    if (!raw || !/^\d+(\.\d+)?$/.test(raw)) throw new Error('Enter a positive decimal amount.')
    if (asset.decimals === null) throw new Error('This token did not return usable ERC-20 decimals, so an exact amount cannot be encoded safely.')
    const value = ethers.utils.parseUnits(raw, asset.decimals); if (value.lte(0)) throw new Error('Enter an amount greater than zero.'); return value
  }
  function buildAction () {
    if (!state.action || !state.account) throw new Error('Connect a wallet first.')
    const action = state.action; const account = state.account
    if (action.kind === 'vault') {
      const vault = action.entry
      const amount = parsedAmount()
      if (action.mode === 'deposit') return { to: vault.address, data: vaultInterface.encodeFunctionData('deposit', [amount, account]), amount: amount, asset: actionToken() }
      return { to: vault.address, data: vaultInterface.encodeFunctionData('withdraw', [amount, account, account]), amount: amount, asset: actionToken() }
    }
    const amount = parsedAmount()
    if (!amount) throw new Error('No exact onchain maximum is available for this action.')
    const market = action.entry; const params = paramsTuple(market)
    if (!hasActionableMarketParams(market)) throw new Error('This CreateMarket record has a zero address and is excluded from direct actions.')
    if (action.mode === 'supply') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('supply', [params, amount, 0, account, '0x']), amount: amount, asset: actionToken() }
    if (action.mode === 'withdraw') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('withdraw', [params, amount, 0, account, account]), amount: amount, asset: actionToken() }
    if (action.mode === 'collateral-supply') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('supplyCollateral', [params, amount, account, '0x']), amount: amount, asset: actionToken() }
    if (action.mode === 'collateral-withdraw') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('withdrawCollateral', [params, amount, account, account]), amount: amount, asset: actionToken() }
    if (action.mode === 'borrow') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('borrow', [params, amount, 0, account, account]), amount: amount, asset: actionToken() }
    if (action.mode === 'repay') return { to: addresses.morpho, data: morphoInterface.encodeFunctionData('repay', [params, amount, 0, account, '0x']), amount: amount, asset: actionToken() }
    throw new Error('Unsupported direct action.')
  }
  function buildApproval () {
    const action = buildAction(); if (!actionNeedsApproval()) throw new Error('This action does not need an ERC-20 approval.')
    return { to: action.asset.address, data: erc20Interface.encodeFunctionData('approve', [action.to, action.amount]), amount: action.amount }
  }
  async function preflight (tx) {
    try { await state.eip1193.request({ method: 'eth_call', params: [{ from: state.account, to: tx.to, data: tx.data }, 'latest'] }) } catch (error) { throw new Error('Exact eth_call preflight failed: ' + errText(error)) }
  }
  async function send (tx, label) {
    await preflight(tx); setStatus('Preflight passed. Confirm ' + label + ' in the wallet...')
    const hash = await state.eip1193.request({ method: 'eth_sendTransaction', params: [{ from: state.account, to: tx.to, data: tx.data }] })
    setStatus('Submitted ' + label + ': ' + hash + '. Waiting for the direct receipt...')
    const receipt = await state.rpc.waitForTransaction(hash, 1, 180000)
    if (!receipt || receipt.status !== 1) throw new Error(label + ' did not confirm successfully.')
    return hash
  }
  async function approveAction () {
    state.sending = true; renderAction()
    try { const tx = buildApproval(); await send(tx, 'exact ERC-20 approval'); await refreshActionInfo(); setStatus('Approval confirmed. The action amount is ready for its own exact preflight.', 'success') } finally { state.sending = false; renderAction() }
  }
  async function submitAction () {
    state.sending = true; renderAction()
    try {
      const tx = buildAction(); const info = state.actionInfo
      if (actionNeedsApproval() && info && info.allowance.lt(tx.amount)) throw new Error('Approve the exact amount first. The page will not substitute an unlimited allowance.')
      if (actionNeedsApproval() && info && info.balance.lt(tx.amount)) throw new Error('The requested amount exceeds this wallet\'s direct token balance.')
      await send(tx, actionTitle())
      if (state.action.kind === 'market') await refreshMarket(state.action.entry); else await refreshVault(state.action.entry)
      await refreshActionInfo(); setStatus('Receipt confirmed and affected onchain state refreshed.', 'success')
    } finally { state.sending = false; render(); }
  }

  function bindWalletEvents (provider) {
    if (state.eventsBound || !provider || typeof provider.on !== 'function') return
    state.eventsBound = true
    provider.on('accountsChanged', function () { restoreInjectedWallet().catch(fatal) })
    provider.on('chainChanged', function () { restoreInjectedWallet().catch(fatal) })
  }
  async function adoptWallet (provider, accounts, walletChain) {
    if (!provider || !accounts || !accounts[0]) return false
    state.eip1193 = provider; state.wallet = new ethers.providers.Web3Provider(provider, 'any'); state.account = ethers.utils.getAddress(accounts[0]); state.walletChain = walletChain || await provider.request({ method: 'eth_chainId' }); bindWalletEvents(provider)
    await hydrateWallet(); render(); return true
  }
  async function restoreInjectedWallet () {
    const injected = injectedWallet(); if (!injected) { state.account = null; state.walletChain = null; render(); return false }
    try {
      const values = await Promise.all([injected.request({ method: 'eth_accounts' }), injected.request({ method: 'eth_chainId' })])
      state.walletChain = values[1]
      if (!values[0] || !values[0][0]) { state.account = null; render(); return false }
      return adoptWallet(injected, values[0], values[1])
    } catch (error) { console.warn('Passive injected-wallet check failed', error); state.account = null; render(); return false }
  }
  async function connectInjectedWallet () {
    const injected = injectedWallet(); if (!injected) { setStatus('No injected EIP-1193 wallet was found. Choose [ other wallet ] to load optional wallet support.', 'error'); return }
    const accounts = await injected.request({ method: 'eth_requestAccounts' }); const walletChain = await injected.request({ method: 'eth_chainId' }); await adoptWallet(injected, accounts, walletChain)
    if (!isCorrectChain()) setStatus('Wallet connected on a different chain. Switch it to Robinhood Chain (4663) before actions.', 'error'); else setStatus('Injected wallet connected without any intermediary.', 'success')
  }
  async function connectOtherWallet () {
    // This import contains the optional AppKit/Reown bundle. It never runs on
    // page load or when an injected wallet already has an authorized account.
    const reown = await import('./config.js'); const appKit = reown.createAppKitInstance(process.env.REOWN_PROJECT_ID || '3e6154a7158ff5f7509f24405fc3b551')
    if (!appKit) throw new Error('Optional wallet support is unavailable in this browser.')
    const connect = async function (accountState) {
      if (!accountState || !accountState.isConnected) return
      const provider = await appKit.getWalletProvider(); const accounts = await provider.request({ method: 'eth_accounts' }); const walletChain = await provider.request({ method: 'eth_chainId' })
      if (await adoptWallet(provider, accounts, walletChain) && state.reownUnsubscribe) { state.reownUnsubscribe(); state.reownUnsubscribe = null }
    }
    const existing = appKit.getAddress && appKit.getAddress(); if (existing) { await connect({ isConnected: true, address: existing }); return }
    if (!state.reownUnsubscribe && appKit.subscribeAccount) state.reownUnsubscribe = appKit.subscribeAccount(function (accountState) { connect(accountState).catch(function (error) { setStatus(errText(error), 'error') }) })
    await appKit.open()
  }

  function bindPageEvents () {
    byId('morpho-connect').addEventListener('click', function () { connectInjectedWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('morpho-other-wallet').addEventListener('click', function () { connectOtherWallet().catch(function (error) { setStatus(errText(error), 'error') }) })
    byId('morpho-zero-rate-toggle').addEventListener('click', function () { state.showZeroRates = !state.showZeroRates; byId('morpho-zero-rate-toggle').textContent = state.showZeroRates ? '[ hide 0-rate markets ]' : '[ show 0-rate markets ]'; renderMarkets(); renderOverview() })
    byId('morpho-refresh').addEventListener('click', function () { refreshAll().catch(function (error) { setStatus(errText(error), 'error') }) })
  }
  async function refreshAll () {
    state.latestBlock = await rpcRead('Reading latest Robinhood block', function () { return state.rpc.getBlockNumber() }); setLoading('Refreshing direct Morpho market and Vault V2 state...'); await hydrateMarkets(); await hydrateVaults(); await hydrateWallet(); setLoading(); render(); setStatus('Refreshed ' + state.markets.length + ' markets and ' + state.vaults.length + ' canonical Vault V2 instances from Robinhood RPC.', 'success')
  }
  async function start () {
    state.rpc = new ethers.providers.JsonRpcProvider(chain.rpc, chain.number); bindPageEvents(); render(); const passiveWallet = restoreInjectedWallet()
    state.loading = true
    try { await discover(); setLoading('Reading deduplicated ERC-20 metadata through Multicall3...'); await loadTokens(); await hydrateMarkets(); await hydrateVaults(); await passiveWallet; await hydrateWallet(); setStatus('Loaded all canonical Morpho Blue markets and Vault V2 records directly from Robinhood Chain.', 'success') } finally { state.loading = false; setLoading(); render() }
  }
  function fatal (error) {
    console.error('Morpho page load failed', error); setLoading(); const markets = byId('morpho-markets'); if (markets) { markets.textContent = ''; markets.appendChild(e('pre', { text: 'MORPHO COULD NOT LOAD\n' + errText(error) + '\nOnly the official Robinhood RPC is used. Check the connection and retry.' })) }
    setStatus(errText(error), 'error')
  }
  return { start: start, fatal: fatal }
})()
