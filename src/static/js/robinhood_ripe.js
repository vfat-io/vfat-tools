(function () {
const ROBINHOOD_RPC_URL = 'https://rpc.mainnet.chain.robinhood.com'
const ROBINHOOD_CHAIN_ID = '0x1237'
const BLOCKS_PER_YEAR = Math.round(365 * 24 * 60 * 60 * 1000 / 12032)

// Ripe's public Robinhood Chain deployment. Farm discovery, balances, and
// rewards below are read directly from these contracts over RPC.
const RIPE = {
  missionControl: '0xb05f928BAA860ef4548aeB6cF7BB901E402BF8B6',
  vaultBook: '0x559E53F42b68b4995732Dba4aF300796761DBC19',
  ripeToken: '0x4D3f37a965b21aB4122e92Dd41D2693E742c883b',
  teller: '0x2D3Cb2B39289f402187D7DC9B609ead6646f2506',
  // Canonical Multicall3 deployment. This keeps every independent onchain
  // read in a phase to one RPC request rather than a browser fetch per call.
  multicall3: '0xcA11bde05977b3631167028862bE2a173976CA11'
}

// These are the live, liquid UP33 pools that form the USDG price graph for
// Ripe's protocol assets and community farms. Pool addresses/ids are fixed
// contract identifiers; every price and liquidity value is read fresh from
// Robinhood Chain. USDG is the chain's dollar-denominated settlement asset,
// so it is the $1 anchor rather than an offchain price API.
const DEX = {
  stateViewV4: '0xF3334192D15450CdD385c8B70e03f9A6bD9E673b',
  usdg: '0x5fc5360d0400a0fd4f2af552add042d716f1d168',
  // sNET is the 1:1 staking receipt for NET. Its staking contract transfers
  // matching raw amounts of NET and sNET on stake/unstake, so it inherits
  // the live NET/USDG market price below.
  priceAliases: {
    '0xb773ec2c326b7f98a5a83fc098825492f020a4c7': '0xca9c78dd337a67f6e0077f65f5e9218719d30edf'
  },
  routes: [
    {
      kind: 'v4',
      poolId: '0x43f85cfbee5d1a9b1e4392f340396156a14d9246d7c31a6cca65943d924224cb',
      token0: RIPE.ripeToken, token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    // GREEN/USDG is Ripe's own live Curve pool. GREEN is coin 1 and USDG
    // coin 0, so get_dy(1, 0, 1 GREEN) produces an onchain USDG price.
    {
      kind: 'curve', pool: '0x2fd13b49f970e8c6d89283056c1c6281214b7eb6',
      token0: '0x355bb7f0f6c730e4460d620420a300fa08ff82f3', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6,
      inputIndex: 1, outputIndex: 0
    },
    {
      kind: 'v3', pool: '0x9d590437abaae12cf9fe0627caf4cfd633152599',
      token0: '0x4a0e65a3eccec6dbe60ae065f2e7bb85fae35eea', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x18a5af4e442f8be68968cc1f00d537f8af2d12cd',
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec', token1Decimals: 18
    },
    {
      kind: 'v3', pool: '0x77bf6d7d6f18c2c0ca0673f95af96a8812a3cb86',
      token0: '0x322f0929c4625ed5bad873c95208d54e1c003b2d', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x19d55aba3e5d2c389b7011c634725136dfdcae33',
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0xaf3d76f1834a1d425780943c99ea8a608f8a93f9', token1Decimals: 18
    },
    {
      kind: 'v3', pool: '0xe279774b0bf7e23e4f4aaf3c7bbc552bc5a92a28',
      token0: '0x2e0847e8910a9732eb3fb1bb4b70a580adad4fe3', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0xda0ee6b8ef5d3a2338a15621fabf6619070f1b64',
      token0: '0x1b0e319c6a659f002271b69db8a7df2f911c153e', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x79D40884f1033b6439cDd3f8b0c34b22B0dbD942',
      token0: '0x020bfc650a365f8bb26819deaabf3e21291018b4', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x2F393B60eF0CFAf669af63284e5592DC3a657B73',
      token0: '0x39dbed3a2bd333467115de45665cc57f813c4571', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x3319CaF98A5C6C947Cb7e6eC6D45d0a8CA090668',
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0xe934e36a439c94017b64a3fece66af12099abf50', token1Decimals: 18
    },
    {
      kind: 'v3', pool: '0x99e70a5b06215e5d2f3bec773b4f59c008fc1673',
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0xca9c78dd337a67f6e0077f65f5e9218719d30edf', token1Decimals: 9
    },
    {
      kind: 'v4',
      poolId: '0xf6c9f0a8bf94ecda6751465a3097bc4c69914421126d2cbc3df723e36b8cf47b',
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0x85a574f2ff0795685f58d1d7b0d4b51f148ac489', token1Decimals: 18
    },
    {
      kind: 'v3', pool: '0x5480d9f41570017257dFe216ab35b46ACdb802A3',
      token0: '0x56910d4409f3a0c78c64dd8d0545ff0705389870', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v3', pool: '0x16679e2ac1a798865ecf1c1639e67693ddb1c220',
      token0: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73', token0Decimals: 18,
      token1: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token1Decimals: 6
    },
    {
      kind: 'v4',
      poolId: '0x0b142aaf734f1b063355bfe854e282a13b26dcac86e2e564e74540f9b218d069',
      token0: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73', token0Decimals: 18,
      token1: '0x5a86828efd322bfb16d93cfed16ee9bc14940d7f', token1Decimals: 18
    },
    {
      kind: 'v3', pool: '0x1e49a549e9FbbC09e95f7126dCe2071511868aDe',
      token0: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73', token0Decimals: 18,
      token1: '0x2e8c31162b855a2ffa90f6f8634643ad6f111e18', token1Decimals: 18
    }
  ],
  // These two governance-vault assets are Uniswap V2 LP tokens. Their value
  // is calculated directly from each pair's reserves and total LP supply,
  // using the same onchain price graph as every other row.
  lpTokens: {
    '0x9b8537be0fd5cf9b2ad495c5a85130d5bae4769d': {
      token0: RIPE.ripeToken, token0Decimals: 18,
      token1: '0xd0601ce157db5bdc3162bbac2a2c8af5320d9eec', token1Decimals: 18,
      decimals: 18
    },
    '0xba6f6cba1a4104000847d4fdccb676e99166cece': {
      token0: '0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73', token0Decimals: 18,
      token1: RIPE.ripeToken, token1Decimals: 18,
      decimals: 18
    }
  },
  // The GREEN/USDG Curve pool is also the LP token Ripe accepts in its
  // stability vault. Value one LP share from its live reserves, not an API.
  curveLpTokens: {
    '0x2fd13b49f970e8c6d89283056c1c6281214b7eb6': {
      token0: '0x5fc5360d0400a0fd4f2af552add042d716f1d168', token0Decimals: 6,
      token1: '0x355bb7f0f6c730e4460d620420a300fa08ff82f3', token1Decimals: 18,
      decimals: 18
    }
  },
  // sGREEN is an ERC-4626 receipt for GREEN. Its conversion rate is read
  // every refresh, rather than assuming a 1:1 share price.
  conversions: [{
    token: '0x290a52380a88f743813b8c3e9f6b0e61db5fdf73', tokenDecimals: 18,
    underlying: '0x355bb7f0f6c730e4460d620420a300fa08ff82f3', underlyingDecimals: 18,
    converter: '0x290a52380a88f743813b8c3e9f6b0e61db5fdf73'
  }]
}

const SELECTORS = {
  numAssets: '0xa46fe83b',
  assets: '0xcf35bdd0',
  assetConfig: '0xd6dbaf58',
  getRewardsConfig: '0x5c3af1ba',
  getAddr: '0xd81f84b7',
  getAddrDescription: '0x3c361b43',
  slot0: '0x3850c7bd',
  liquidity: '0x1a686502',
  getV4Slot0: '0xc815641c',
  getV4Liquidity: '0xfa6793d5',
  getReserves: '0x0902f1ac',
  totalSupply: '0x18160ddd',
  curveBalance: '0x4903b0d1',
  getCurveDy: '0x5e0d443f',
  convertToAssets: '0x07a2d13a',
  symbol: '0x95d89b41',
  decimals: '0x313ce567',
  balanceOf: '0x70a08231',
  allowance: '0xdd62ed3e',
  approve: '0x095ea7b3',
  getTotalAmountForUser: '0x96c3a427',
  getTotalAmountForVault: '0xa3c4faa5',
  deposit: '0x3fb7de52',
  withdraw: '0x5501f1c6'
}

// Ripe's registry labels its Community vault and its community rebase vault
// with these descriptions. The descriptions themselves are read onchain.
const COMMUNITY_VAULT_DESCRIPTIONS = new Set(['Community', 'RebaseErc20'])

const state = {
  farms: [],
  protocolAssets: [],
  communityFarms: [],
  ripePrice: 0,
  pricedFarmCount: 0,
  pricedFarmTvl: 0,
  pricedProtocolTvl: 0,
  pricedCommunityTvl: 0,
  showZeroAprAssets: false,
  account: null,
  action: null
}

async function rpcRequest (method, params) {
  const response = await fetch(ROBINHOOD_RPC_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: 1, method, params})
  })

  if (!response.ok) throw new Error(`Robinhood RPC returned ${response.status}`)
  const body = await response.json()
  if (body.error) throw new Error(body.error.message || 'Robinhood RPC request failed')
  return body.result
}

async function ethCall (to, data) {
  return rpcRequest('eth_call', [{to, data}, 'latest'])
}

function encodeBytes (data) {
  const value = String(data).replace(/^0x/, '')
  return `${encodeUint(value.length / 2)}${value.padEnd(Math.ceil(value.length / 64) * 64, '0')}`
}

function encodeMulticall3 (calls) {
  const encodedCalls = calls.map(({to, data, allowFailure = false}) => {
    const callData = encodeBytes(data)
    return `${encodeAddress(to)}${encodeUint(allowFailure ? 1 : 0)}${encodeUint(96)}${callData}`
  })
  let offset = calls.length * 32
  const offsets = encodedCalls.map(call => {
    const current = encodeUint(offset)
    offset += call.length / 2
    return current
  })
  // aggregate3((address,bool,bytes)[]) — offsets in an array are relative to
  // the element-head section, immediately after the array length word.
  return `0x82ad56cb${encodeUint(32)}${encodeUint(calls.length)}${offsets.join('')}${encodedCalls.join('')}`
}

function decodeMulticall3 (result) {
  const hex = String(result || '').replace(/^0x/, '')
  const words = getWords(result)
  const arrayStart = Number(wordUint(words, 0) / 32n)
  const length = Number(wordUint(words, arrayStart))
  const elementHeads = arrayStart + 1
  return [...Array(length).keys()].map(index => {
    const elementStart = elementHeads + Number(wordUint(words, elementHeads + index) / 32n)
    const success = wordUint(words, elementStart) !== 0n
    const bytesStart = elementStart + Number(wordUint(words, elementStart + 1) / 32n)
    const byteLength = Number(wordUint(words, bytesStart))
    const dataStart = (bytesStart + 1) * 64
    return {success, data: `0x${hex.slice(dataStart, dataStart + byteLength * 2)}`}
  })
}

async function multicall (calls) {
  if (!calls.length) return []
  const results = await multicallResults(calls)
  return results.map((result, index) => {
    if (!result.success) throw new Error(`Onchain read ${index + 1} failed in Multicall3`)
    return result.data
  })
}

async function multicallResults (calls) {
  if (!calls.length) return []
  return decodeMulticall3(await ethCall(RIPE.multicall3, encodeMulticall3(calls)))
}

async function waitForReceipt (txHash, attempts = 30) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const receipt = await rpcRequest('eth_getTransactionReceipt', [txHash])
    if (receipt) return receipt
    await new Promise(resolve => window.setTimeout(resolve, 2000))
  }

  return null
}

function getWords (result) {
  const hex = String(result || '').replace(/^0x/, '')
  if (!hex || hex.length % 64) throw new Error('Robinhood RPC returned invalid contract data')
  return hex.match(/.{64}/g) || []
}

function wordUint (words, index) {
  if (!words[index]) throw new Error('Robinhood RPC returned incomplete contract data')
  return BigInt(`0x${words[index]}`)
}

function decodeUint (result) {
  return wordUint(getWords(result), 0)
}

function decodeAddress (result) {
  const words = getWords(result)
  if (!words[0]) throw new Error('Robinhood RPC returned incomplete address data')
  return `0x${words[0].slice(-40)}`
}

function decodeString (result) {
  const hex = String(result || '').replace(/^0x/, '')
  const words = getWords(result)
  const offset = Number(wordUint(words, 0))
  const lengthWord = hex.slice(offset * 2, offset * 2 + 64)
  const length = Number(BigInt(`0x${lengthWord}`))
  const value = hex.slice(offset * 2 + 64, offset * 2 + 64 + length * 2)
  const bytes = new Uint8Array(value.match(/.{1,2}/g)?.map(byte => Number.parseInt(byte, 16)) || [])
  return new TextDecoder().decode(bytes)
}

function decodeAssetConfig (result) {
  const words = getWords(result)
  const tupleStart = Number(wordUint(words, 0) / 32n)
  const vaultOffset = Number(wordUint(words, tupleStart) / 32n)
  const vaultStart = tupleStart + vaultOffset
  const vaultLength = Number(wordUint(words, vaultStart))
  const vaultIds = [...Array(vaultLength).keys()].map(index => wordUint(words, vaultStart + index + 1).toString())

  return {
    vaultIds,
    stakersPointsAlloc: wordUint(words, tupleStart + 1),
    voterPointsAlloc: wordUint(words, tupleStart + 2),
    perUserDepositLimit: wordUint(words, tupleStart + 3),
    globalDepositLimit: wordUint(words, tupleStart + 4),
    minDepositBalance: wordUint(words, tupleStart + 5),
    canDeposit: wordUint(words, tupleStart + 16) !== 0n,
    canWithdraw: wordUint(words, tupleStart + 17) !== 0n
  }
}

function decodeRewardsConfig (result) {
  const words = getWords(result)
  return {
    ripePerBlock: wordUint(words, 1),
    borrowersAlloc: wordUint(words, 2),
    stakersAlloc: wordUint(words, 3),
    votersAlloc: wordUint(words, 4),
    genDepositorsAlloc: wordUint(words, 5),
    stakersPointsAllocTotal: wordUint(words, 6),
    voterPointsAllocTotal: wordUint(words, 7)
  }
}

function decodeReserves (result) {
  const words = getWords(result)
  return [wordUint(words, 0), wordUint(words, 1)]
}

function annualRipeRewards (farm, rewardsConfig) {
  const totalAllocation = rewardsConfig.borrowersAlloc
    + rewardsConfig.stakersAlloc
    + rewardsConfig.votersAlloc
    + rewardsConfig.genDepositorsAlloc
  if (totalAllocation === 0n) return 0n

  const annualEmissions = rewardsConfig.ripePerBlock * BigInt(BLOCKS_PER_YEAR)
  let rewards = 0n
  if (rewardsConfig.stakersPointsAllocTotal !== 0n) {
    rewards += annualEmissions * rewardsConfig.stakersAlloc * farm.stakersPointsAlloc
      / totalAllocation / rewardsConfig.stakersPointsAllocTotal
  }
  if (rewardsConfig.voterPointsAllocTotal !== 0n) {
    rewards += annualEmissions * rewardsConfig.votersAlloc * farm.voterPointsAlloc
      / totalAllocation / rewardsConfig.voterPointsAllocTotal
  }
  return rewards
}

function unitsToNumber (amount, decimals) {
  return Number(BigInt(amount)) / 10 ** Number(decimals)
}

function formatTokenAmount (amount, decimals, maximumFractionDigits = 4) {
  const raw = BigInt(amount)
  const base = 10n ** BigInt(decimals)
  const whole = raw / base
  const fraction = (raw % base).toString().padStart(Number(decimals), '0').slice(0, maximumFractionDigits).replace(/0+$/, '')
  return fraction ? `${whole.toLocaleString()}.${fraction}` : whole.toLocaleString()
}

function formatUsd (value) {
  if (!Number.isFinite(value) || value <= 0) return '—'
  if (value >= 1e6) return `$${(value / 1e6).toLocaleString(undefined, {maximumFractionDigits: 2})}M`
  if (value >= 1e3) return `$${(value / 1e3).toLocaleString(undefined, {maximumFractionDigits: 1})}K`
  return `$${value.toLocaleString(undefined, {maximumFractionDigits: 2})}`
}

function formatPrice (value) {
  if (!Number.isFinite(value) || value <= 0) return '—'
  if (value < 1) return `$${value.toLocaleString(undefined, {maximumFractionDigits: 4})}`
  return formatUsd(value)
}

function formatApy (value) {
  if (!Number.isFinite(value) || value < 0) return '—'
  return `${value.toLocaleString(undefined, {maximumFractionDigits: 2})}%`
}

function escapeHtml (value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]))
}

function shortAddress (address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

function encodeAddress (address) {
  return address.toLowerCase().replace('0x', '').padStart(64, '0')
}

function encodeUint (value) {
  return BigInt(value).toString(16).padStart(64, '0')
}

function encodeCall (selector, values) {
  return `${selector}${values.join('')}`
}

function parseAmount (value, decimals) {
  const normalized = value.trim()
  if (!/^\d+(\.\d+)?$/.test(normalized)) throw new Error('Enter a valid amount')
  const [whole, fraction = ''] = normalized.split('.')
  if (fraction.length > decimals) throw new Error(`This token supports up to ${decimals} decimal places`)
  return BigInt(whole) * 10n ** BigInt(decimals)
    + BigInt(`${fraction}${'0'.repeat(decimals - fraction.length)}` || '0')
}

function setStatus (message, isError = false) {
  const status = document.getElementById('ripe-refresh-status')
  status.textContent = message
  status.hidden = !isError
  status.style.color = isError ? '#d95757' : ''
}

function setLoading (message = '') {
  const loading = document.getElementById('ripe-loading')
  if (!loading) return
  loading.hidden = !message
  if (message) document.getElementById('ripe-loading-text').textContent = message
}

function renderWallet () {
  const button = document.getElementById('ripe-connect')
  const status = document.getElementById('ripe-wallet-status')
  if (state.account) {
    status.textContent = `Connected: ${shortAddress(state.account)}`
    button.textContent = '[ Refresh wallet ]'
  } else if (!window.ethereum) {
    status.textContent = 'No browser wallet detected'
    button.textContent = '[ Open in wallet browser ]'
  } else {
    status.textContent = 'Wallet not connected'
    button.textContent = '[ Connect Robinhood wallet ]'
  }
}

function userAmount (farm, field) {
  if (!state.account || farm.user?.[field] === undefined) return 'Connect wallet'
  return `${formatTokenAmount(farm.user[field], farm.decimals)} ${farm.symbol}`
}

function renderOverview () {
  const overview = document.getElementById('ripe-overview')
  if (!overview) return
  overview.textContent = [
    '========== LIVE ONCHAIN SNAPSHOT ==========',
    `RIPE PRICE : ${formatPrice(state.ripePrice)}  [UP33 DEX spot]`,
    `PROTOCOL TVL : ${formatUsd(state.pricedProtocolTvl)}`,
    `COMMUNITY TVL: ${formatUsd(state.pricedCommunityTvl)}`,
    `PRICED TVL : ${formatUsd(state.pricedFarmTvl)}  [${state.pricedFarmCount}/${state.farms.length} enabled assets]`,
    'APR        : annual RIPE emissions × live RIPE price ÷ farm TVL'
  ].join('\n')
  overview.hidden = false
}

function hasYield (farm) {
  return BigInt(farm.annualRipeRewards || 0) > 0n
}

function shouldShowFarm (farm) {
  return state.showZeroAprAssets || hasYield(farm) || BigInt(farm.user?.deposited || 0) > 0n
}

function renderZeroAprToggle () {
  const button = document.getElementById('ripe-zero-apr-toggle')
  if (!button) return
  const hiddenCount = state.farms.filter(farm => !hasYield(farm) && BigInt(farm.user?.deposited || 0) === 0n).length
  const label = state.showZeroAprAssets ? 'hide' : 'show'
  button.textContent = `[ ${label} ${hiddenCount} 0 APR ${hiddenCount === 1 ? 'asset' : 'assets'} ]`
}

function renderFarmTable (containerId, farms) {
  const container = document.getElementById(containerId)
  if (!container) return
  const visibleFarms = farms.filter(shouldShowFarm)
  container.innerHTML = `<table class="ripe-farm-table"><thead><tr>
    <th>Farm</th><th>Price / TVL</th><th>Est. RIPE APR</th><th>Total staked</th><th>RIPE / year</th><th>In wallet</th><th>My deposit</th><th>Actions</th>
  </tr></thead><tbody>${visibleFarms.map(farm => {
    const userHasDeposit = farm.user?.deposited && BigInt(farm.user.deposited) > 0n
    const canWithdraw = farm.canWithdraw && userHasDeposit
    return `<tr${userHasDeposit ? ' class="ripe-farm-mine"' : ''}>
      <td><span class="ripe-farm-name">${escapeHtml(farm.symbol)}</span><span class="ripe-farm-symbol">${escapeHtml(farm.vaultDescription)} · ${escapeHtml(shortAddress(farm.tokenAddress))}</span></td>
      <td class="ripe-price-tvl" title="Live UP33 onchain DEX spot valuation"><span>${formatPrice(farm.price)}</span><span>${formatUsd(farm.tvl)} TVL</span></td>
      <td title="Annual RIPE emissions at the live onchain RIPE and farm-token spot prices">${formatApy(farm.apy)}</td>
      <td class="ripe-total-staked"><span>${formatTokenAmount(farm.totalBalance, farm.decimals)}</span><span>${escapeHtml(farm.symbol)}</span></td>
      <td>${formatTokenAmount(farm.annualRipeRewards, 18, 2)}</td>
      <td>${escapeHtml(userAmount(farm, 'wallet'))}</td>
      <td>${escapeHtml(userAmount(farm, 'deposited'))}</td>
      <td class="ripe-actions">
        <button class="ripe-action-button" type="button" data-ripe-action="deposit" data-ripe-token="${escapeHtml(farm.tokenAddress)}"${farm.canDeposit ? '' : ' disabled'}>[ ${farm.canDeposit ? 'deposit' : 'deposits closed'} ]</button>
        <button class="ripe-action-button" type="button" data-ripe-action="withdraw" data-ripe-token="${escapeHtml(farm.tokenAddress)}"${canWithdraw ? '' : ' disabled'}>[ ${farm.canWithdraw ? 'withdraw' : 'withdraw closed'} ]</button>
        <a href="https://app.ripe.finance/robinhood/earn" target="_blank" rel="noopener noreferrer">Ripe</a>
      </td>
    </tr>`
  }).join('')}</tbody></table>`
  container.querySelectorAll('[data-ripe-action]').forEach(button => {
    button.addEventListener('click', () => openAction(button.dataset.ripeToken, button.dataset.ripeAction))
  })
}

function renderFarms () {
  renderZeroAprToggle()
  renderFarmTable('ripe-protocol-assets', state.protocolAssets)
  renderFarmTable('ripe-farms', state.communityFarms)
}

async function currentChainId () {
  if (!window.ethereum) return null
  return window.ethereum.request({method: 'eth_chainId'})
}

async function ensureRobinhoodChain () {
  const chainId = await currentChainId()
  if (chainId === ROBINHOOD_CHAIN_ID) return
  try {
    await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{chainId: ROBINHOOD_CHAIN_ID}]})
  } catch (error) {
    if (error.code !== 4902) throw error
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: ROBINHOOD_CHAIN_ID,
        chainName: 'Robinhood Chain',
        nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
        rpcUrls: [ROBINHOOD_RPC_URL],
        blockExplorerUrls: ['https://robinhoodchain.blockscout.com']
      }]
    })
  }
}

async function connectWallet () {
  if (!window.ethereum) {
    setStatus('No browser wallet was detected. Open this page in your wallet browser.', true)
    return false
  }
  try {
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    if (!accounts?.[0]) throw new Error('No account was selected')
    await ensureRobinhoodChain()
    state.account = accounts[0]
    renderWallet()
    await refreshUserBalances()
    return true
  } catch (error) {
    setStatus(`Wallet connection failed: ${error.message || 'request rejected'}`, true)
    return false
  }
}

async function restoreWallet () {
  if (!window.ethereum) return
  try {
    const accounts = await window.ethereum.request({method: 'eth_accounts'})
    if (!accounts?.[0] || await currentChainId() !== ROBINHOOD_CHAIN_ID) return
    state.account = accounts[0]
    renderWallet()
    await refreshUserBalances()
  } catch (_) {
    // Wallet state is optional for the public farm view.
  }
}

async function refreshUserBalances () {
  if (!state.account) return
  setStatus(`Reading ${shortAddress(state.account)}’s deposits from Robinhood Chain…`)
  try {
    const reads = await multicall(state.farms.flatMap(farm => [
      {to: farm.tokenAddress, data: encodeCall(SELECTORS.balanceOf, [encodeAddress(state.account)])},
      {to: farm.vaultAddress, data: encodeCall(SELECTORS.getTotalAmountForUser, [encodeAddress(state.account), encodeAddress(farm.tokenAddress)])}
    ]))
    state.farms.forEach((farm, index) => {
      farm.user = {wallet: decodeUint(reads[index * 2]).toString(), deposited: decodeUint(reads[index * 2 + 1]).toString()}
    })
  } catch (_) {
    state.farms.forEach(farm => { farm.user = {wallet: '0', deposited: '0'} })
  }
  renderFarms()
  setStatus(`Onchain configuration · wallet ${shortAddress(state.account)} · updated just now`)
}

async function openAction (tokenAddress, type) {
  const farm = state.farms.find(item => item.tokenAddress.toLowerCase() === tokenAddress.toLowerCase())
  if (!farm) return
  if (type === 'deposit' && !farm.canDeposit) {
    setStatus(`Ripe has closed deposits for ${farm.symbol}; withdrawals remain available for existing deposits.`, true)
    return
  }
  if (!state.account && !(await connectWallet())) return
  try {
    await ensureRobinhoodChain()
  } catch (error) {
    setStatus(`Switch to Robinhood Chain to use farm actions: ${error.message || 'request rejected'}`, true)
    return
  }
  state.action = {farm, type, allowance: 0n, amount: '', pendingApproval: false, txHash: null}
  renderActionDialog()
  document.getElementById('ripe-action-dialog').showModal()
  try {
    state.action.allowance = BigInt(await ethCall(farm.tokenAddress, encodeCall(SELECTORS.allowance, [encodeAddress(state.account), encodeAddress(RIPE.teller)])))
  } catch (_) {
    state.action.allowance = 0n
  }
  renderActionDialog()
}

function actionAmount () {
  return parseAmount(state.action.amount, state.action.farm.decimals)
}

function renderActionDialog () {
  const {farm, type, txHash, amount} = state.action
  const isDeposit = type === 'deposit'
  const available = isDeposit ? BigInt(farm.user?.wallet || 0) : BigInt(farm.user?.deposited || 0)
  const actionLabel = isDeposit ? 'Deposit' : 'Withdraw'
  const availableLabel = isDeposit ? 'Available in wallet' : 'Available to withdraw'
  const minimumDeposit = BigInt(farm.minDepositBalance)
  const vaultLabel = farm.community ? 'community farm' : `${farm.vaultDescription} protocol vault`
  const content = document.getElementById('ripe-action-content')
  content.innerHTML = `
    <div class="ripe-eyebrow">${isDeposit ? 'PLANT' : 'HARVEST'} ${escapeHtml(farm.symbol)}</div>
    <h2>${actionLabel} ${escapeHtml(farm.symbol)}</h2>
    <p>${isDeposit
      ? `Deposit directly into Ripe’s ${escapeHtml(vaultLabel)}. Minimum deposit: ${formatTokenAmount(minimumDeposit, farm.decimals, 6)} ${escapeHtml(farm.symbol)}.`
      : `Withdraw your ${escapeHtml(farm.symbol)} ${escapeHtml(vaultLabel)} deposit back to your wallet.`}</p>
    <div class="ripe-action-balance"><span>${availableLabel}</span><strong>${formatTokenAmount(available, farm.decimals)} ${escapeHtml(farm.symbol)}</strong></div>
    <div class="ripe-input-row"><input id="ripe-action-amount" inputmode="decimal" autocomplete="off" placeholder="0.0" value="${escapeHtml(amount)}" aria-label="${actionLabel} amount" /><button id="ripe-action-max" type="button">MAX</button></div>
    <div id="ripe-action-note" class="ripe-action-note">${isDeposit ? 'Enter an amount to check your approval.' : 'Enter the amount you would like to withdraw.'}</div>
    <div class="ripe-dialog-actions">${isDeposit ? '<button id="ripe-action-approve" type="button">Approve Teller</button>' : ''}<button id="ripe-action-submit" class="ripe-button--primary" type="button">${actionLabel} ${escapeHtml(farm.symbol)}</button></div>
    ${txHash ? `<a class="ripe-action-tx" href="https://robinhoodchain.blockscout.com/tx/${txHash}" target="_blank" rel="noopener noreferrer">View submitted transaction ↗</a>` : ''}`
  const input = document.getElementById('ripe-action-amount')
  const maxButton = document.getElementById('ripe-action-max')
  const submitButton = document.getElementById('ripe-action-submit')
  const approveButton = document.getElementById('ripe-action-approve')
  maxButton.addEventListener('click', () => {
    input.value = formatTokenAmount(available, farm.decimals, farm.decimals)
    state.action.amount = input.value
    updateActionControls()
  })
  input.addEventListener('input', () => {
    state.action.amount = input.value
    updateActionControls()
  })
  submitButton.addEventListener('click', submitAction)
  approveButton?.addEventListener('click', approveAction)
  updateActionControls()
}

function updateActionControls () {
  if (!state.action) return
  const {farm, type, allowance} = state.action
  const isDeposit = type === 'deposit'
  const available = isDeposit ? BigInt(farm.user?.wallet || 0) : BigInt(farm.user?.deposited || 0)
  const note = document.getElementById('ripe-action-note')
  const submitButton = document.getElementById('ripe-action-submit')
  const approveButton = document.getElementById('ripe-action-approve')
  if (state.action.pendingApproval) {
    note.textContent = 'Approval submitted. Waiting for Robinhood Chain confirmation…'
    submitButton.disabled = true
    if (approveButton) approveButton.disabled = true
    return
  }
  try {
    const amount = actionAmount()
    if (amount === 0n) throw new Error('Amount must be greater than zero')
    if (amount > available) throw new Error(`Amount exceeds the ${isDeposit ? 'wallet' : 'withdrawable'} balance`)
    if (isDeposit) {
      const minimumDeposit = BigInt(farm.minDepositBalance)
      const globalRoom = BigInt(farm.globalDepositLimit) - BigInt(farm.totalBalance)
      const userRoom = BigInt(farm.perUserDepositLimit) - BigInt(farm.user?.deposited || 0)
      if (amount < minimumDeposit) throw new Error(`Minimum deposit is ${formatTokenAmount(minimumDeposit, farm.decimals, 6)} ${farm.symbol}`)
      if (amount > globalRoom) throw new Error('This farm has reached its remaining global deposit limit')
      if (amount > userRoom) throw new Error('Amount exceeds Ripe’s per-wallet deposit limit')
    } else {
      const remaining = available - amount
      const minimumDeposit = BigInt(farm.minDepositBalance)
      if (remaining !== 0n && remaining < minimumDeposit) throw new Error(`Withdraw the full position or leave at least ${formatTokenAmount(minimumDeposit, farm.decimals, 6)} ${farm.symbol}`)
    }
    if (isDeposit && allowance < amount) {
      note.textContent = 'Approve this exact amount for Ripe’s Teller first. The approval request will be sent to your wallet separately.'
      submitButton.disabled = true
      approveButton.disabled = false
      return
    }
    note.textContent = `Ready to ${isDeposit ? 'deposit' : 'withdraw'}. Confirm the Ripe Teller transaction in your wallet.`
    submitButton.disabled = false
    if (approveButton) approveButton.disabled = true
  } catch (error) {
    note.textContent = error.message
    submitButton.disabled = true
    if (approveButton) approveButton.disabled = true
  }
}

async function approveAction () {
  const {farm} = state.action
  const button = document.getElementById('ripe-action-approve')
  try {
    const amount = actionAmount()
    await ensureRobinhoodChain()
    button.disabled = true
    button.textContent = 'Waiting for wallet…'
    const txHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [{
      from: state.account,
      to: farm.tokenAddress,
      data: encodeCall(SELECTORS.approve, [encodeAddress(RIPE.teller), encodeUint(amount)])
    }]})
    state.action.pendingApproval = true
    state.action.txHash = txHash
    renderActionDialog()
    setStatus(`Approval submitted for ${farm.symbol}. Waiting for confirmation.`)
    const receipt = await waitForReceipt(txHash)
    state.action.pendingApproval = false
    if (receipt?.status === '0x1') {
      state.action.allowance = amount
      renderActionDialog()
      setStatus(`Approval confirmed for ${farm.symbol}. You can now deposit.`)
    } else {
      renderActionDialog()
      setStatus(`Approval is still pending for ${farm.symbol}. Wait for confirmation before depositing.`, true)
    }
  } catch (error) {
    state.action.pendingApproval = false
    button.disabled = false
    button.textContent = 'Approve Teller'
    setStatus(`Approval failed: ${error.message || 'request rejected'}`, true)
  }
}

async function submitAction () {
  const {farm, type} = state.action
  const amount = actionAmount()
  const isDeposit = type === 'deposit'
  const button = document.getElementById('ripe-action-submit')
  try {
    await ensureRobinhoodChain()
    button.disabled = true
    button.textContent = 'Waiting for wallet…'
    const data = encodeCall(isDeposit ? SELECTORS.deposit : SELECTORS.withdraw, [
      encodeAddress(farm.tokenAddress), encodeUint(amount), encodeAddress(state.account), encodeAddress(farm.vaultAddress), encodeUint(farm.vaultId)
    ])
    const txHash = await window.ethereum.request({method: 'eth_sendTransaction', params: [{from: state.account, to: RIPE.teller, data}]})
    state.action.txHash = txHash
    renderActionDialog()
    setStatus(`${isDeposit ? 'Deposit' : 'Withdrawal'} submitted for ${farm.symbol}.`)
    window.setTimeout(refreshUserBalances, 8000)
  } catch (error) {
    button.disabled = false
    button.textContent = `${isDeposit ? 'Deposit' : 'Withdraw'} ${farm.symbol}`
    setStatus(`${isDeposit ? 'Deposit' : 'Withdrawal'} failed: ${error.message || 'request rejected'}`, true)
  }
}

function bindUi () {
  document.getElementById('ripe-connect').addEventListener('click', async () => {
    if (state.account) await refreshUserBalances()
    else await connectWallet()
  })
  document.getElementById('ripe-zero-apr-toggle').addEventListener('click', () => {
    state.showZeroAprAssets = !state.showZeroAprAssets
    renderFarms()
  })
  if (!window.ethereum?.on) return
  window.ethereum.on('accountsChanged', async accounts => {
    state.account = accounts?.[0] || null
    renderWallet()
    if (state.account && await currentChainId() === ROBINHOOD_CHAIN_ID) await refreshUserBalances()
    else renderFarms()
  })
  window.ethereum.on('chainChanged', async chainId => {
    if (chainId !== ROBINHOOD_CHAIN_ID) {
      state.account = null
      renderWallet()
      renderFarms()
      setStatus('Switch to Robinhood Chain to use farm actions.', true)
    } else {
      await restoreWallet()
    }
  })
}

function pricePerToken0 (slot0Result, token0Decimals, token1Decimals) {
  const sqrtPriceX96 = Number(decodeUint(slot0Result))
  if (!Number.isFinite(sqrtPriceX96) || sqrtPriceX96 <= 0) return NaN
  const price = (sqrtPriceX96 / 2 ** 96) ** 2 * 10 ** (token0Decimals - token1Decimals)
  return Number.isFinite(price) && price > 0 ? price : NaN
}

function dexPriceCall (route) {
  if (route.kind === 'curve') {
    return {
      to: route.pool,
      data: encodeCall(SELECTORS.getCurveDy, [
        encodeUint(route.inputIndex), encodeUint(route.outputIndex), encodeUint(10n ** BigInt(route.token0Decimals))
      ]),
      allowFailure: true
    }
  }
  if (route.kind === 'v4') {
    return {to: DEX.stateViewV4, data: `${SELECTORS.getV4Slot0}${route.poolId.slice(2)}`, allowFailure: true}
  }
  return {to: route.pool, data: SELECTORS.slot0, allowFailure: true}
}

function dexLiquidityCall (route) {
  if (route.kind === 'curve') return {to: route.pool, data: `${SELECTORS.curveBalance}${encodeUint(0)}`, allowFailure: true}
  if (route.kind === 'v4') return {to: DEX.stateViewV4, data: `${SELECTORS.getV4Liquidity}${route.poolId.slice(2)}`, allowFailure: true}
  return {to: route.pool, data: SELECTORS.liquidity, allowFailure: true}
}

async function readDexPrices () {
  setLoading('Reading live UP33 DEX prices and liquidity…')
  const routeCalls = DEX.routes.flatMap(route => [
    dexPriceCall(route),
    dexLiquidityCall(route)
  ])
  const lpEntries = Object.entries(DEX.lpTokens)
  const curveLpEntries = Object.entries(DEX.curveLpTokens)
  const reads = await multicallResults([
    ...routeCalls,
    ...lpEntries.flatMap(([pair]) => [
      {to: pair, data: SELECTORS.getReserves, allowFailure: true},
      {to: pair, data: SELECTORS.totalSupply, allowFailure: true}
    ]),
    ...curveLpEntries.flatMap(([pool]) => [
      {to: pool, data: `${SELECTORS.curveBalance}${encodeUint(0)}`, allowFailure: true},
      {to: pool, data: `${SELECTORS.curveBalance}${encodeUint(1)}`, allowFailure: true},
      {to: pool, data: SELECTORS.totalSupply, allowFailure: true}
    ]),
    ...DEX.conversions.map(conversion => ({
      to: conversion.converter,
      data: encodeCall(SELECTORS.convertToAssets, [encodeUint(10n ** BigInt(conversion.tokenDecimals))]),
      allowFailure: true
    }))
  ])
  const routes = DEX.routes.map((route, index) => {
    const slot0 = reads[index * 2]
    const liquidity = reads[index * 2 + 1]
    if (!slot0?.success || !liquidity?.success || decodeUint(liquidity.data) === 0n) return null
    const price = route.kind === 'curve'
      ? unitsToNumber(decodeUint(slot0.data), route.token1Decimals)
      : pricePerToken0(slot0.data, route.token0Decimals, route.token1Decimals)
    return Number.isFinite(price) ? {...route, price} : null
  }).filter(Boolean)

  // Resolve the small price graph from the USDG anchor. This supports direct
  // USDG pools and paths such as AI → PONS → USDG without any price service.
  const prices = new Map([[DEX.usdg.toLowerCase(), 1]])
  for (let pass = 0; pass < routes.length; pass++) {
    routes.forEach(route => {
      const token0 = route.token0.toLowerCase()
      const token1 = route.token1.toLowerCase()
      const price0 = prices.get(token0)
      const price1 = prices.get(token1)
      // route.price is units of token1 per one token0. Therefore a known
      // token0 USD value prices token1 by division, while a known token1
      // USD value prices token0 by multiplication.
      if (price0 && !price1) prices.set(token1, price0 / route.price)
      if (price1 && !price0) prices.set(token0, price1 * route.price)
    })
  }
  const lpReadStart = routeCalls.length
  lpEntries.forEach(([pair, lp], index) => {
    const reserves = reads[lpReadStart + index * 2]
    const totalSupply = reads[lpReadStart + index * 2 + 1]
    const token0Price = prices.get(lp.token0.toLowerCase())
    const token1Price = prices.get(lp.token1.toLowerCase())
    if (!reserves?.success || !totalSupply?.success || !token0Price || !token1Price) return
    const [reserve0, reserve1] = decodeReserves(reserves.data)
    const supply = unitsToNumber(decodeUint(totalSupply.data), lp.decimals)
    if (supply <= 0) return
    const value = unitsToNumber(reserve0, lp.token0Decimals) * token0Price
      + unitsToNumber(reserve1, lp.token1Decimals) * token1Price
    if (Number.isFinite(value) && value > 0) prices.set(pair.toLowerCase(), value / supply)
  })
  const curveLpReadStart = lpReadStart + lpEntries.length * 2
  curveLpEntries.forEach(([pool, lp], index) => {
    const balance0 = reads[curveLpReadStart + index * 3]
    const balance1 = reads[curveLpReadStart + index * 3 + 1]
    const totalSupply = reads[curveLpReadStart + index * 3 + 2]
    const token0Price = prices.get(lp.token0.toLowerCase())
    const token1Price = prices.get(lp.token1.toLowerCase())
    if (!balance0?.success || !balance1?.success || !totalSupply?.success || !token0Price || !token1Price) return
    const supply = unitsToNumber(decodeUint(totalSupply.data), lp.decimals)
    if (supply <= 0) return
    const value = unitsToNumber(decodeUint(balance0.data), lp.token0Decimals) * token0Price
      + unitsToNumber(decodeUint(balance1.data), lp.token1Decimals) * token1Price
    if (Number.isFinite(value) && value > 0) prices.set(pool.toLowerCase(), value / supply)
  })
  const conversionReadStart = curveLpReadStart + curveLpEntries.length * 3
  DEX.conversions.forEach((conversion, index) => {
    const result = reads[conversionReadStart + index]
    const underlyingPrice = prices.get(conversion.underlying.toLowerCase())
    if (!result?.success || !underlyingPrice) return
    const assetsPerShare = unitsToNumber(decodeUint(result.data), conversion.underlyingDecimals)
    if (Number.isFinite(assetsPerShare) && assetsPerShare > 0) {
      prices.set(conversion.token.toLowerCase(), underlyingPrice * assetsPerShare)
    }
  })
  return prices
}

async function readRipeAssets (assetCount) {
  setLoading(`Discovering ${assetCount} Ripe assets from MissionControl…`)
  const assetAddresses = (await multicall([...Array(assetCount).keys()].map(index => ({
    to: RIPE.missionControl,
    data: encodeCall(SELECTORS.assets, [encodeUint(index)])
  })))).map(decodeAddress)

  setLoading(`Reading configuration for ${assetCount} onchain assets…`)
  const configs = (await multicall(assetAddresses.map(address => ({
    to: RIPE.missionControl,
    data: encodeCall(SELECTORS.assetConfig, [encodeAddress(address)])
  })))).map(decodeAssetConfig)
  const vaultIds = [...new Set(configs.filter(config => config.vaultIds.length && (config.canDeposit || config.canWithdraw)).map(config => config.vaultIds[0]))]
  setLoading(`Reading ${vaultIds.length} Ripe vault registries…`)
  const vaultReads = await multicall(vaultIds.flatMap(vaultId => [
    {to: RIPE.vaultBook, data: encodeCall(SELECTORS.getAddr, [encodeUint(vaultId)])},
    {to: RIPE.vaultBook, data: encodeCall(SELECTORS.getAddrDescription, [encodeUint(vaultId)])}
  ]))
  const vaults = new Map(vaultIds.map((vaultId, index) => [vaultId, {
    address: decodeAddress(vaultReads[index * 2]),
    description: decodeString(vaultReads[index * 2 + 1])
  }]))
  const candidates = assetAddresses.map((tokenAddress, index) => ({tokenAddress, config: configs[index]})).filter(({config}) => {
    const vault = config.vaultIds.length && vaults.get(config.vaultIds[0])
    return vault && (config.canDeposit || config.canWithdraw)
  })

  setLoading(`Reading balances for ${candidates.length} enabled Ripe assets…`)
  const farmReads = await multicall(candidates.flatMap(({tokenAddress, config}) => {
    const vaultAddress = vaults.get(config.vaultIds[0]).address
    return [
      {to: tokenAddress, data: SELECTORS.symbol},
      {to: tokenAddress, data: SELECTORS.decimals},
      {to: vaultAddress, data: encodeCall(SELECTORS.getTotalAmountForVault, [encodeAddress(tokenAddress)])}
    ]
  }))
  const farmData = candidates.map(({tokenAddress, config}, index) => {
    const vaultId = config.vaultIds[0]
    const vaultAddress = vaults.get(vaultId).address
    const totalBalance = decodeUint(farmReads[index * 3 + 2])
    return {
      tokenAddress,
      symbol: decodeString(farmReads[index * 3]),
      decimals: Number(decodeUint(farmReads[index * 3 + 1])),
      vaultAddress,
      vaultId,
      vaultDescription: vaults.get(vaultId).description,
      community: COMMUNITY_VAULT_DESCRIPTIONS.has(vaults.get(vaultId).description),
      totalBalance: totalBalance.toString(),
      stakersPointsAlloc: config.stakersPointsAlloc,
      voterPointsAlloc: config.voterPointsAlloc,
      perUserDepositLimit: config.perUserDepositLimit.toString(),
      globalDepositLimit: config.globalDepositLimit.toString(),
      minDepositBalance: config.minDepositBalance.toString(),
      canDeposit: config.canDeposit,
      canWithdraw: config.canWithdraw
    }
  })

  return farmData
}

async function main () {
  bindUi()
  renderWallet()
  setStatus('Reading Ripe’s onchain protocol and community-vault configuration…')
  setLoading('Reading Ripe emissions and farm configuration…')
  const [assetCountResult, rewardsResult] = await multicall([
    {to: RIPE.missionControl, data: SELECTORS.numAssets},
    {to: RIPE.missionControl, data: SELECTORS.getRewardsConfig}
  ])
  const [farms, prices] = await Promise.all([
    readRipeAssets(Number(decodeUint(assetCountResult))),
    readDexPrices().catch(() => new Map())
  ])
  if (!farms.length) throw new Error('Ripe has no enabled assets on Robinhood Chain')
  state.ripePrice = prices.get(RIPE.ripeToken.toLowerCase()) || NaN
  const rewardsConfig = decodeRewardsConfig(rewardsResult)
  state.farms = farms.map(farm => {
    const tokenAddress = farm.tokenAddress.toLowerCase()
    const price = prices.get(DEX.priceAliases[tokenAddress] || tokenAddress) || NaN
    const tvl = price > 0 ? unitsToNumber(farm.totalBalance, farm.decimals) * price : NaN
    const annualRewards = annualRipeRewards(farm, rewardsConfig)
    const apy = tvl > 0 && state.ripePrice > 0 ? unitsToNumber(annualRewards, 18) * state.ripePrice / tvl * 100 : NaN
    return {...farm, price, tvl, annualRipeRewards: annualRewards, apy}
  }).sort((left, right) => (Number.isFinite(right.apy) ? right.apy : -Infinity) - (Number.isFinite(left.apy) ? left.apy : -Infinity))
  state.protocolAssets = state.farms.filter(farm => !farm.community)
  state.communityFarms = state.farms.filter(farm => farm.community)
  const pricedFarms = state.farms.filter(farm => Number.isFinite(farm.tvl) && farm.tvl > 0)
  const pricedProtocolAssets = state.protocolAssets.filter(farm => Number.isFinite(farm.tvl) && farm.tvl > 0)
  const pricedCommunityFarms = state.communityFarms.filter(farm => Number.isFinite(farm.tvl) && farm.tvl > 0)
  state.pricedFarmCount = pricedFarms.length
  state.pricedFarmTvl = pricedFarms.reduce((total, farm) => total + farm.tvl, 0)
  state.pricedProtocolTvl = pricedProtocolAssets.reduce((total, farm) => total + farm.tvl, 0)
  state.pricedCommunityTvl = pricedCommunityFarms.reduce((total, farm) => total + farm.tvl, 0)
  renderOverview()
  renderFarms()
  setLoading()
  setStatus('Live Ripe protocol assets, community farms, and UP33 DEX spot valuations · updated just now')
  await restoreWallet()
}

main().catch(error => {
  setLoading()
  setStatus(`Unable to load onchain Ripe farms: ${error.message}`, true)
  document.getElementById('ripe-protocol-assets').innerHTML = '<div class="ripe-loading">Unable to load onchain Ripe asset data. <button class="ripe-action-button" type="button" onclick="location.reload()">[ retry ]</button></div>'
})
})()
