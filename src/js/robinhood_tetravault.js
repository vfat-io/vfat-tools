/* TETRAVAULT (TETRA) on Robinhood Chain: onchain reads and direct wallet transactions only.
 *
 * No price API and no router. Every number below is read from Robinhood Chain
 * (4663). TETRA trades against USDG in a Uniswap v4 pool whose hook owns the
 * liquidity, so the dollar price is the pool's own spot price in USDG. The
 * reserve (SPY / GLD / USO / WETH plus USDG cash) is valued by the protocol's
 * own Mark contract from onchain pools. Where a read fails the page says so
 * rather than guessing.
 */
const { ethers } = require('ethers')

document.addEventListener('DOMContentLoaded', function () { Tetra.start().catch(Tetra.fatal) })

const Tetra = (function () {
  const chain = {
    id: '0x1237', number: 4663, name: 'Robinhood Chain',
    rpc: 'https://rpc.mainnet.chain.robinhood.com',
    explorer: 'https://robinhoodchain.blockscout.com',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  }

  /* Fixed contract identifiers (all verified on Blockscout). Everything derived from them is read live. */
  const addresses = {
    tetra:      '0x7E187fE67ae04c1B1738f01B424656390E45E1C9',   // VaultToken (TETRA)
    staking:    '0x046fb87B3de0668124f918F216987092755E0004',   // Staking
    controller: '0x5070d85615F50324976e4b988FF5b5D04003d81b',   // Controller (epochs, emissions)
    reserve:    '0x6681f24a6347772D9e0F861717C35cf462f6f194',   // Reserve (basket + cash)
    hook:       '0x8EE7f46b728628bBf007802A8B3Cc04e594f68CC',   // VaultHook (Uniswap v4, TETRA/USDG)
    bond:       '0xEDb0E9BFcD36C1da04Cf0DD17d41B3B1e7D8C11f',   // BondDepository
  }

  const ABI = {
    erc20: [
      'function balanceOf(address) view returns (uint256)',
      'function totalSupply() view returns (uint256)',
      'function allowance(address,address) view returns (uint256)',
      'function approve(address,uint256) returns (bool)',
    ],
    staking: [
      'function totalActive() view returns (uint256)',
      'function totalPending() view returns (uint256)',
      'function totalCooling() view returns (uint256)',
      'function totalVesting() view returns (uint256)',
      'function totalStaked() view returns (uint256)',
      'function COOLDOWN() view returns (uint256)',
      'function unitsOf(address) view returns (uint256)',
      'function earningOf(address) view returns (uint256)',
      'function earned(address) view returns (uint256)',
      'function free(address) view returns (uint256)',
      'function cooling(address) view returns (uint256)',
      'function coolingEnds(address) view returns (uint256)',
      'function stakeStart(address) view returns (uint256)',
      'function loyaltyBps(address) view returns (uint256)',
      'function autoCompound(address) view returns (bool)',
      'function stake(uint256)',
      'function requestUnstake(uint256)',
      'function withdraw()',
      'function claim() returns (uint256)',
      'function setAutoCompound(bool)',
    ],
    controller: [
      'function launchTime() view returns (uint256)',
      'function epoch() view returns (uint256)',
      'function epochEnds() view returns (uint256)',
      'function snapEpoch() view returns (uint256)',
      'function EPOCH() view returns (uint256)',
      'function WARMUP_EPOCHS() view returns (uint256)',
      'function MAX_EMIT_BPS() view returns (uint256)',
      'function totalEmitted() view returns (uint256)',
      'function previewEmission() view returns (uint256,uint256)',
      'function bondsOpen() view returns (bool)',
      'function tick()',
    ],
    reserve: [
      'function reserveValueLow() view returns (uint256)',
      'function circulating() view returns (uint256)',
      'function backingLowE18() view returns (uint256)',
      'function redeemOpen() view returns (bool)',
    ],
    hook: [
      'function vaultPriceSpotE18() view returns (uint256)',
      'function protocolPoolAmounts() view returns (uint256,uint256)',
      'function currentTaxBps() view returns (uint256)',
      'function lockUntil() view returns (uint256)',
      'function lockBurned() view returns (bool)',
    ],
    bond: [
      'function bondPriceE18() view returns (uint256)',
      'function discountBps() view returns (uint256)',
      'function maxBondUsdg() view returns (uint256)',
    ],
  }

  const state = {
    app: null, loading: null, message: '', messageType: 'info',
    provider: null, signer: null, account: null,
    vault: null, wallet: null, busy: false,
  }

  /* ── plumbing ─────────────────────────────────────────────────────── */

  function e (tag, opts) {
    const node = document.createElement(tag)
    if (!opts) return node
    if (opts.id) node.id = opts.id
    if (opts.className) node.className = opts.className
    if (opts.text != null) node.textContent = opts.text
    if (opts.onClick) node.addEventListener('click', opts.onClick)
    return node
  }
  function section (title) {
    const node = e('section')
    node.appendChild(e('h2', { text: title }))
    return node
  }
  function fatal (err) {
    setLoading(null)
    setStatus((err && err.message) || String(err), 'error')
    render()
  }
  function setStatus (msg, kind) { state.message = msg; state.messageType = kind || 'info'; render() }
  function setLoading (msg) {
    if (!state.loading) return
    state.loading.hidden = !msg
    const text = document.getElementById('tetra-loading-text')
    if (msg && text) text.textContent = msg
  }

  /* Read-only provider. The page must be fully useful with no wallet at all. */
  function reader () {
    if (!state.provider) state.provider = new ethers.providers.StaticJsonRpcProvider(chain.rpc, { chainId: chain.number, name: 'robinhood' })
    return state.provider
  }
  function contract (address, abi, withSigner) {
    return new ethers.Contract(address, abi, withSigner && state.signer ? state.signer : reader())
  }

  function toNum (bn, decimals) {
    if (bn == null) return NaN
    return Number(ethers.utils.formatUnits(bn, decimals == null ? 18 : decimals))
  }
  function fmt (n, dp) {
    if (!isFinite(n)) return '—'
    return n.toLocaleString(undefined, { maximumFractionDigits: dp == null ? 2 : dp })
  }
  function usd (n) { return isFinite(n) ? '$' + fmt(n, 0) : 'unpriced' }
  function price (n) { return isFinite(n) && n > 0 ? '$' + n.toPrecision(4) : 'unpriced' }
  function when (ts) { return new Date(ts * 1000).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' }
  function left (secs) {
    if (secs <= 0) return 'now'
    const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60)
    return (h > 0 ? h + 'h ' : '') + m + 'm'
  }

  /* ── reads ────────────────────────────────────────────────────────── */

  /* TETRA is paired with USDG in a full-range v4 pool whose liquidity belongs to
     the hook (locked). vaultPriceSpotE18() is USD per TETRA in 1e18 straight from
     the pool's slot0; protocolPoolAmounts() returns (TETRA, USDG) in the pool.
     The reserve is valued by the protocol's Mark contract (USDG, 6 decimals). */
  async function readVault () {
    const staking = contract(addresses.staking, ABI.staking)
    const controller = contract(addresses.controller, ABI.controller)
    const reserve = contract(addresses.reserve, ABI.reserve)
    const hook = contract(addresses.hook, ABI.hook)
    const bond = contract(addresses.bond, ABI.bond)
    const tetra = contract(addresses.tetra, ABI.erc20)

    const [
      totalActive, totalPending, totalCooling, totalVesting, totalStaked, cooldown,
      launchTime, epoch, epochEnds, snapEpoch, epochSecs, warmup, maxEmitBps, emitted, preview, bondsOpen,
      reserveLow, circulating, backingLow, redeemOpen,
      spot, poolAmounts, taxBps, lockUntil, lockBurned,
      supply,
    ] = await Promise.all([
      staking.totalActive(), staking.totalPending(), staking.totalCooling(), staking.totalVesting(), staking.totalStaked(), staking.COOLDOWN(),
      controller.launchTime(), controller.epoch(), controller.epochEnds(), controller.snapEpoch(), controller.EPOCH(),
      controller.WARMUP_EPOCHS(), controller.MAX_EMIT_BPS(), controller.totalEmitted(), controller.previewEmission(), controller.bondsOpen(),
      reserve.reserveValueLow(), reserve.circulating(), reserve.backingLowE18(), reserve.redeemOpen(),
      hook.vaultPriceSpotE18(), hook.protocolPoolAmounts(), hook.currentTaxBps(), hook.lockUntil(), hook.lockBurned(),
      tetra.totalSupply(),
    ])

    /* Bond views revert while bonds are closed or before launch; keep the page up without them. */
    let bondPrice = NaN, bondDiscountBps = NaN, bondRoom = NaN
    try {
      const [p, d, m] = await Promise.all([bond.bondPriceE18(), bond.discountBps(), bond.maxBondUsdg()])
      bondPrice = toNum(p); bondDiscountBps = Number(d.toString()); bondRoom = toNum(m, 6)
    } catch (err) { /* bond quote unavailable right now */ }

    const tetraUsd = toNum(spot)
    const poolTetra = toNum(poolAmounts[0])
    const poolUsdg = toNum(poolAmounts[1], 6)

    /* Every TETRA the controller mints goes to active stakers at a 6h epoch close,
       and only when the reserve's backing per token grew. Annualising the realised
       average since the launch-day warm-up is honest; projecting the 1% cap is not. */
    const epochs = Number(epoch.toString())
    const warmupEpochs = Number(warmup.toString())
    const paidEpochs = Math.max(epochs - warmupEpochs, 0)
    const secondsPerEpoch = Number(epochSecs.toString())
    const epochsPerYear = secondsPerEpoch > 0 ? (365 * 24 * 3600) / secondsPerEpoch : NaN
    const mintedTotal = toNum(emitted)
    const perEpoch = paidEpochs > 0 ? mintedTotal / paidEpochs : NaN
    const stakedEarning = toNum(totalStaked)
    const apr = stakedEarning > 0 && isFinite(perEpoch) && isFinite(epochsPerYear)
      ? (perEpoch * epochsPerYear) / stakedEarning * 100
      : NaN
    const nextMint = toNum(preview[0])
    const nextPct = stakedEarning > 0 ? nextMint / stakedEarning * 100 : NaN

    const backing = toNum(backingLow)
    const now = Math.floor(Date.now() / 1000)

    return {
      tetraUsd, poolTetra, poolUsdg,
      activeTetra: toNum(totalActive), pendingTetra: toNum(totalPending), coolingTetra: toNum(totalCooling), vestingTetra: toNum(totalVesting),
      stakedEarning, supply: toNum(supply), circulating: toNum(circulating),
      reserveUsd: toNum(reserveLow, 6), backing, premium: backing > 0 ? tetraUsd / backing : NaN, redeemOpen,
      launched: Number(launchTime.toString()) > 0, epochs, epochEnds: Number(epochEnds.toString()), epochDue: Number(snapEpoch.toString()) < epochs,
      secondsPerEpoch, paidEpochs, mintedTotal, perEpoch, apr, nextMint, nextPct, growthE18: toNum(preview[1]),
      maxEmitBps: Number(maxEmitBps.toString()), taxBps: Number(taxBps.toString()), cooldown: Number(cooldown.toString()),
      bondsOpen, bondPrice, bondDiscountBps, bondRoom,
      lockUntil: Number(lockUntil.toString()), lockBurned, now,
    }
  }

  async function readWallet () {
    if (!state.account) return null
    const staking = contract(addresses.staking, ABI.staking)
    const tetra = contract(addresses.tetra, ABI.erc20)
    const [balance, allowance, units, earning, earned, free, cooling, coolingEnds, stakeStart, loyalty, auto] = await Promise.all([
      tetra.balanceOf(state.account),
      tetra.allowance(state.account, addresses.staking),
      staking.unitsOf(state.account), staking.earningOf(state.account), staking.earned(state.account),
      staking.free(state.account), staking.cooling(state.account), staking.coolingEnds(state.account),
      staking.stakeStart(state.account), staking.loyaltyBps(state.account), staking.autoCompound(state.account),
    ])
    return {
      balance: toNum(balance), allowanceRaw: allowance,
      units: toNum(units), earning: toNum(earning), earned: toNum(earned), free: toNum(free),
      cooling: toNum(cooling), coolingEnds: Number(coolingEnds.toString()),
      stakeStart: Number(stakeStart.toString()), loyaltyBps: Number(loyalty.toString()), auto: auto,
    }
  }

  /* ── wallet ───────────────────────────────────────────────────────── */

  async function connect () {
    if (!window.ethereum) throw new Error('No injected wallet found in this browser.')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const current = await window.ethereum.request({ method: 'eth_chainId' })
    if (current !== chain.id) await switchNetwork()
    const web3 = new ethers.providers.Web3Provider(window.ethereum, 'any')
    state.signer = web3.getSigner()
    state.account = ethers.utils.getAddress(accounts[0])
    window.ethereum.removeListener && window.ethereum.removeListener('accountsChanged', onAccounts)
    window.ethereum.on && window.ethereum.on('accountsChanged', onAccounts)
    window.ethereum.on && window.ethereum.on('chainChanged', function () { location.reload() })
    await refreshWallet()
  }
  function onAccounts (accounts) {
    state.account = accounts && accounts[0] ? ethers.utils.getAddress(accounts[0]) : null
    if (!state.account) { state.signer = null; state.wallet = null; render(); return }
    refreshWallet().catch(fatal)
  }
  async function switchNetwork () {
    try {
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    } catch (err) {
      if (!err || err.code !== 4902) throw err
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chain.id, chainName: chain.name,
          rpcUrls: [chain.rpc], blockExplorerUrls: [chain.explorer],
          nativeCurrency: chain.nativeCurrency,
        }],
      })
      await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: chain.id }] })
    }
  }
  async function refreshWallet () { state.wallet = await readWallet(); render() }

  /* ── actions ──────────────────────────────────────────────────────── */

  function amountField (id) {
    const node = document.getElementById(id)
    const raw = node && node.value ? node.value.trim() : ''
    if (!raw) throw new Error('Enter an amount first.')
    let parsed
    try { parsed = ethers.utils.parseUnits(raw, 18) } catch (err) { throw new Error('That is not a valid amount.') }
    if (parsed.lte(0)) throw new Error('Amount must be greater than zero.')
    return parsed
  }
  async function guard (label, fn) {
    if (state.busy) return
    state.busy = true
    try {
      setStatus(label + '…', 'info')
      const tx = await fn()
      if (tx && tx.wait) { setStatus('Waiting for confirmation…', 'info'); await tx.wait() }
      setStatus(label + ' confirmed.', 'ok')
      await Promise.all([refreshVault(), refreshWallet()])
    } catch (err) {
      setStatus((err && (err.data && err.data.message || err.reason || err.message)) || String(err), 'error')
    } finally { state.busy = false; render() }
  }
  async function doStake () {
    const amount = amountField('tetra-stake-amount')
    const token = contract(addresses.tetra, ABI.erc20, true)
    if (!state.wallet || state.wallet.allowanceRaw.lt(amount)) {
      await guard('Approving TETRA', function () { return token.approve(addresses.staking, ethers.constants.MaxUint256) })
      if (state.messageType === 'error') return
    }
    await guard('Staking', function () { return contract(addresses.staking, ABI.staking, true).stake(amount) })
  }
  async function doUnstake () {
    const amount = amountField('tetra-unstake-amount')
    await guard('Requesting unstake', function () { return contract(addresses.staking, ABI.staking, true).requestUnstake(amount) })
  }
  async function doWithdraw () {
    await guard('Withdrawing', function () { return contract(addresses.staking, ABI.staking, true).withdraw() })
  }
  async function doClaim () {
    await guard('Claiming', function () { return contract(addresses.staking, ABI.staking, true).claim() })
  }
  async function doAuto (on) {
    await guard(on ? 'Turning auto-compound on' : 'Turning auto-compound off', function () { return contract(addresses.staking, ABI.staking, true).setAutoCompound(on) })
  }
  async function doTick () {
    /* Permissionless: anyone may close a due epoch. It pays nothing to the
       caller beyond gas, and does nothing when the epoch is not due. */
    await guard('Closing the epoch', function () { return contract(addresses.controller, ABI.controller, true).tick() })
  }

  /* ── render ───────────────────────────────────────────────────────── */

  function table (rows) {
    const width = rows.reduce(function (w, r) { return Math.max(w, r[0].length) }, 0)
    return rows.map(function (r) { return r[0].padEnd(width + 2, ' ') + r[1] }).join('\n')
  }
  function pre (text, className) {
    const node = e('pre', { text: text })
    if (className) node.className = className
    return node
  }

  function render () {
    if (!state.app) return
    state.app.textContent = ''
    state.app.appendChild(renderStatus())
    state.app.appendChild(renderVault())
    state.app.appendChild(renderWalletSection())
  }
  function renderStatus () {
    const node = pre(state.message || '')
    node.id = 'tetra-status'
    node.dataset.kind = state.messageType
    return node
  }

  function renderVault () {
    const node = section('Vault')
    const v = state.vault
    if (!v) { node.appendChild(pre('Reading TETRAVAULT contracts…')); return node }
    const priced = isFinite(v.tetraUsd) && v.tetraUsd > 0
    node.appendChild(pre(table([
      ['TVL staked', priced ? usd(v.stakedEarning * v.tetraUsd) : 'unpriced'],
      ['TVL in the pool', priced ? usd(v.poolUsdg + v.poolTetra * v.tetraUsd) : 'unpriced'],
      ['reserve (backing)', usd(v.reserveUsd)],
      ['TETRA price', price(v.tetraUsd)],
      ['backing per TETRA', price(v.backing)],
      ['price / backing', isFinite(v.premium) ? v.premium.toFixed(2) + 'x' : '—'],
      ['', ''],
      ['TETRA staked (earning)', fmt(v.stakedEarning) + ' TETRA'],
      ['TETRA staked (waiting)', fmt(Math.max(v.activeTetra + v.pendingTetra - v.stakedEarning, 0)) + ' TETRA'],
      ['TETRA cooling down', fmt(v.coolingTetra) + ' TETRA'],
      ['TETRA vesting (bonds)', fmt(v.vestingTetra) + ' TETRA'],
      ['TETRA total supply', fmt(v.supply)],
      ['circulating (ex pool)', fmt(v.circulating)],
      ['share of circulating staked', v.circulating > 0 ? fmt(v.stakedEarning / v.circulating * 100) + '%' : '—'],
      ['pool reserves (locked)', fmt(v.poolTetra) + ' TETRA / ' + fmt(v.poolUsdg) + ' USDG'],
      ['LP lock', v.lockBurned ? 'burned (permanent)' : 'until ' + when(v.lockUntil)],
      ['swap tax now', (v.taxBps / 100).toFixed(2) + '%'],
      ['', ''],
      ['epochs elapsed', String(v.epochs)],
      ['epoch length', (v.secondsPerEpoch / 3600).toFixed(2) + ' h'],
      ['next close', v.launched ? when(v.epochEnds) + ' (in ' + left(v.epochEnds - v.now) + ')' : 'not launched'],
      ['TETRA minted to stakers', fmt(v.mintedTotal)],
      ['mean mint per paid epoch', fmt(v.perEpoch)],
      ['realised APR', isFinite(v.apr) ? fmt(v.apr) + '%' : '—'],
      ['next close would pay', fmt(v.nextMint) + ' TETRA' + (isFinite(v.nextPct) ? ' (' + v.nextPct.toFixed(2) + '% of stake)' : '')],
      ['epoch mint cap', (v.maxEmitBps / 100).toFixed(2) + '% of circulating'],
      ['epoch due now', v.epochDue ? 'yes (anyone can close it)' : 'no'],
      ['', ''],
      ['bonds', v.bondsOpen ? 'open' : 'closed'],
      ['bond price', price(v.bondPrice) + (isFinite(v.bondDiscountBps) && v.bondDiscountBps > 0 ? ' (' + (v.bondDiscountBps / 100).toFixed(1) + '% under the pool)' : '')],
      ['bond room this epoch', isFinite(v.bondRoom) ? usd(v.bondRoom) : '—'],
      ['redeem to basket', v.redeemOpen ? 'open' : 'paused'],
    ])))
    node.appendChild(pre(
      'APR is the REALISED average: total TETRA minted to stakers divided by\n' +
      'epochs since the launch-day warm-up, annualised over the earning stake.\n' +
      'Emissions are not fixed — an epoch pays only when the reserve\'s backing per\n' +
      'TETRA grew (33% of the growth, capped at 1% of circulating), so some epochs\n' +
      'pay nothing. Treat this as a trailing figure, not a rate.\n' +
      'A new stake waits for the next full epoch before earning; rewards scale with\n' +
      'holding time (50% under 1 day, 75% under 2 days, 100% after); unstaking cools\n' +
      'down for ' + (v.cooldown / 3600).toFixed(0) + ' h.\n' +
      (priced
        ? 'Dollar figures use the pool\'s own spot price and the reserve\'s onchain valuation.\nNo price API is used.'
        : 'The pool price could not be read, so no dollar figure is shown.\nEverything above is still live in TETRA.')))
    const tick = e('button', { className: 'tetra-action', text: '[ close the epoch ]', onClick: function () { doTick().catch(fatal) } })
    tick.disabled = !state.signer || state.busy || !v.epochDue
    node.appendChild(tick)
    return node
  }

  function input (id, label) {
    const l = e('label', { className: 'tetra-form-label', text: label })
    const i = e('input'); i.id = id; i.inputMode = 'decimal'; i.placeholder = '0.0'
    l.appendChild(i); return l
  }

  function renderWalletSection () {
    const node = section('Wallet')
    if (!state.account) {
      node.appendChild(e('button', { className: 'tetra-action', text: '[ connect wallet ]', onClick: function () { connect().catch(fatal) } }))
      node.appendChild(pre('Everything above is read without a wallet. Connect only to stake, unstake, withdraw or claim.'))
      return node
    }
    const w = state.wallet
    node.appendChild(pre(state.account))
    if (!w) { node.appendChild(pre('Reading your position…')); return node }
    const now = Math.floor(Date.now() / 1000)
    const coolingLeft = w.cooling > 0 && w.coolingEnds > now
    const held = w.stakeStart > 0 ? now - w.stakeStart : 0
    node.appendChild(pre(table([
      ['TETRA in wallet', fmt(w.balance)],
      ['staked (all)', fmt(w.units)],
      ['staked (earning)', fmt(w.earning)],
      ['free to unstake', fmt(w.free)],
      ['vesting from bonds', fmt(w.units - w.free > 0 ? w.units - w.free : 0)],
      ['cooling down', fmt(w.cooling) + (w.cooling > 0 ? (coolingLeft ? ' (until ' + when(w.coolingEnds) + ')' : ' (ready to withdraw)') : '')],
      ['claimable now', fmt(w.earned)],
      ['loyalty', (w.loyaltyBps / 100).toFixed(0) + '%' + (w.stakeStart > 0 ? ' (held ' + (held / 86400).toFixed(1) + ' days)' : '')],
      ['mode', w.auto ? 'auto-compound' : 'claim'],
    ])))

    node.appendChild(input('tetra-stake-amount', 'stake TETRA'))
    const stakeBtn = e('button', { className: 'tetra-action', text: '[ stake ]', onClick: function () { doStake().catch(fatal) } })
    stakeBtn.disabled = state.busy
    node.appendChild(stakeBtn)
    node.appendChild(pre('A new stake waits until the next full epoch, then earns. Adding to a stake moves the loyalty clock by the stake-weighted average.'))

    const autoBtn = e('button', { className: 'tetra-action', text: w.auto ? '[ switch to claim mode ]' : '[ switch to auto-compound ]', onClick: function () { doAuto(!w.auto).catch(fatal) } })
    autoBtn.disabled = state.busy
    node.appendChild(autoBtn)
    node.appendChild(pre('Auto-compound restakes each payout for you once the stake is 2 days old (100% loyalty). Claim mode leaves rewards claimable.'))

    node.appendChild(input('tetra-unstake-amount', 'unstake TETRA'))
    const unstakeBtn = e('button', { className: 'tetra-action', text: '[ request unstake ]', onClick: function () { doUnstake().catch(fatal) } })
    unstakeBtn.disabled = state.busy || !(w.free > 0)
    node.appendChild(unstakeBtn)
    node.appendChild(pre('Unstaked TETRA cools down for 6 h, then can be withdrawn. Unstaking everything resets the loyalty clock.'))

    const wdBtn = e('button', { className: 'tetra-action', text: '[ withdraw ' + fmt(w.cooling) + ' TETRA ]', onClick: function () { doWithdraw().catch(fatal) } })
    wdBtn.disabled = state.busy || !(w.cooling > 0) || coolingLeft
    node.appendChild(wdBtn)

    const claimBtn = e('button', { className: 'tetra-action', text: '[ claim ' + fmt(w.earned) + ' TETRA ]', onClick: function () { doClaim().catch(fatal) } })
    claimBtn.disabled = state.busy || !(w.earned > 0)
    node.appendChild(claimBtn)
    return node
  }

  /* ── lifecycle ────────────────────────────────────────────────────── */

  async function refreshVault () { state.vault = await readVault() }

  async function start () {
    state.app = document.getElementById('tetra-app')
    state.loading = document.getElementById('tetra-loading')
    setLoading('Reading TETRAVAULT contracts on Robinhood Chain…')
    render()
    await refreshVault()
    setLoading(null)
    setStatus('Live from Robinhood Chain.', 'ok')
    if (window.ethereum && window.ethereum.selectedAddress) await connect().catch(function () { /* stay read-only */ })
    render()
    setInterval(function () {
      if (document.hidden) return
      refreshVault().then(render).catch(function () { /* transient RPC, keep the last good read */ })
    }, 60000)
  }

  return { start: start, fatal: fatal }
})()
