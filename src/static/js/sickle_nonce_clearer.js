(function () {
  'use strict'

  const state = {
    provider: null,
    account: '',
    latest: null,
    pending: null,
    busy: false
  }

  const byId = function (id) { return document.getElementById(id) }

  function errorText (error) {
    return error?.data?.message || error?.error?.message || error?.shortMessage || error?.message || String(error)
  }

  function setStatus (message, kind) {
    const status = byId('sickle-nonce-status')
    if (!status) return
    status.textContent = message
    if (kind) status.dataset.kind = kind
    else delete status.dataset.kind
  }

  function setBusy (busy) {
    state.busy = busy
    byId('sickle-nonce-refresh').disabled = busy
    byId('sickle-nonce-input').disabled = busy || state.latest === null
    byId('sickle-nonce-boost').disabled = busy
    byId('sickle-nonce-submit').disabled = busy || state.latest === null
  }

  function injectedProvider () {
    if (!window.ethereum) return null
    if (window.ethereum.providers && window.ethereum.providers.length) {
      return window.ethereum.providers.find(function (provider) { return provider.isRabby }) ||
        window.ethereum.providers.find(function (provider) { return provider.isMetaMask }) ||
        window.ethereum.providers[0]
    }
    return window.ethereum
  }

  function connectedProvider () {
    if (window.sickleWalletProvider && typeof window.sickleWalletProvider.request === 'function') {
      return window.sickleWalletProvider
    }
    if (typeof walletProvider !== 'undefined' && walletProvider && typeof walletProvider.request === 'function') {
      return walletProvider
    }
    if (window.store?.accountState?.isConnected && window.store?.eip155?.request) {
      return window.store.eip155
    }
    return injectedProvider()
  }

  function targetNetwork () {
    if (typeof pageNetwork === 'function') {
      try {
        const network = pageNetwork()
        if (network?.chainId) return network
      } catch (error) {
        console.warn('Unable to read the Sickle page network', error)
      }
    }

    const root = byId('sickle-nonce-clearer')
    return {
      chainId: root.dataset.fallbackChainId,
      chainName: root.dataset.fallbackChainName || 'this page network',
      nativeCurrency: { symbol: root.dataset.fallbackNativeSymbol || 'native token' }
    }
  }

  function parseQuantity (value, label) {
    if (typeof value !== 'string' || !/^0x[0-9a-f]+$/i.test(value)) {
      throw new Error('The wallet returned an invalid ' + label + '.')
    }
    return BigInt(value)
  }

  function hexQuantity (value) {
    return '0x' + value.toString(16)
  }

  function sameChain (first, second) {
    try {
      return parseQuantity(first, 'chain ID') === parseQuantity(second, 'chain ID')
    } catch (error) {
      return false
    }
  }

  function shortAddress (address) {
    return address ? address.slice(0, 8) + '\u2026' + address.slice(-6) : 'not connected'
  }

  function isEoaCode (code) {
    return code === '0x' || code === '0x0' || /^0xef0100[0-9a-f]{40}$/i.test(code)
  }

  function resetWalletState () {
    state.provider = null
    state.account = ''
    state.latest = null
    state.pending = null
    byId('sickle-nonce-account').textContent = 'not connected'
    byId('sickle-nonce-latest').textContent = '-'
    byId('sickle-nonce-pending').textContent = '-'
    byId('sickle-nonce-input').value = ''
    setBusy(false)
  }

  async function refresh () {
    if (state.busy) return
    resetWalletState()
    setStatus('Checking wallet and nonces...')

    const provider = connectedProvider()
    if (!provider) {
      setStatus('No browser wallet found. Connect a wallet above first.', 'error')
      return
    }

    try {
      const results = await Promise.all([
        provider.request({ method: 'eth_accounts' }),
        provider.request({ method: 'eth_chainId' })
      ])
      const accounts = results[0]
      const chainId = results[1]
      const network = targetNetwork()

      if (!accounts || !accounts[0]) {
        setStatus('Connect the wallet above, then refresh.', 'error')
        return
      }

      state.account = accounts[0]
      byId('sickle-nonce-account').textContent = shortAddress(state.account)

      if (!network.chainId || !sameChain(chainId, network.chainId)) {
        setStatus('Switch your wallet to ' + network.chainName + ' using the control above.', 'error')
        return
      }

      const walletState = await Promise.all([
        provider.request({ method: 'eth_getTransactionCount', params: [state.account, 'latest'] }),
        provider.request({ method: 'eth_getTransactionCount', params: [state.account, 'pending'] }),
        provider.request({ method: 'eth_getCode', params: [state.account, 'latest'] })
      ])
      const latest = parseQuantity(walletState[0], 'confirmed nonce')
      const pending = parseQuantity(walletState[1], 'pending nonce')

      if (!isEoaCode(walletState[2])) {
        setStatus('Contract wallets use a different nonce system; this helper only supports regular wallets.', 'error')
        return
      }

      state.provider = provider
      state.latest = latest
      state.pending = pending < latest ? latest : pending
      byId('sickle-nonce-latest').textContent = latest.toString()
      byId('sickle-nonce-pending').textContent = state.pending.toString()
      byId('sickle-nonce-input').value = latest.toString()
      byId('sickle-nonce-input').min = latest.toString()
      byId('sickle-nonce-input').max = (state.pending > latest ? state.pending - 1n : latest).toString()
      setBusy(false)

      if (state.pending > latest) {
        const count = state.pending - latest
        setStatus(count.toString() + ' pending transaction' + (count === 1n ? '' : 's') + ' detected. Nonce ' + latest.toString() + ' is the oldest blocker.')
      } else {
        setStatus('No pending transaction is visible to this wallet node. Nonce ' + latest.toString() + ' can still replace a dropped transaction, or it will create a new self-transfer.')
      }
    } catch (error) {
      resetWalletState()
      setStatus('Could not read wallet nonces: ' + errorText(error), 'error')
    }
  }

  function bumped (value, boost) {
    return (value * (100n + boost) + 99n) / 100n
  }

  function maxBigInt (first, second) {
    return first > second ? first : second
  }

  async function feeFields (provider, boost) {
    const results = await Promise.all([
      provider.request({ method: 'eth_gasPrice' }),
      provider.request({ method: 'eth_getBlockByNumber', params: ['latest', false] })
    ])
    const gasPrice = parseQuantity(results[0], 'gas price')
    const block = results[1]

    if (!block || !block.baseFeePerGas) {
      const boostedGasPrice = bumped(gasPrice, boost)
      return { fields: { gasPrice: hexQuantity(boostedGasPrice) }, display: boostedGasPrice }
    }

    const baseFee = parseQuantity(block.baseFeePerGas, 'base fee')
    let priorityFee = gasPrice > baseFee ? gasPrice - baseFee : 0n
    try {
      priorityFee = parseQuantity(await provider.request({ method: 'eth_maxPriorityFeePerGas' }), 'priority fee')
    } catch (error) {
      // Some EIP-1559 chains do not implement eth_maxPriorityFeePerGas.
    }
    const boostedPriorityFee = bumped(priorityFee, boost)
    const currentMaxFee = maxBigInt(gasPrice, baseFee * 2n + priorityFee)
    const maxFee = maxBigInt(bumped(currentMaxFee, boost), baseFee + boostedPriorityFee)
    return {
      fields: {
        maxFeePerGas: hexQuantity(maxFee),
        maxPriorityFeePerGas: hexQuantity(boostedPriorityFee)
      },
      display: maxFee
    }
  }

  function formatGwei (wei) {
    const whole = wei / 1000000000n
    const fraction = (wei % 1000000000n) / 10000000n
    return whole.toString() + '.' + fraction.toString().padStart(2, '0') + ' gwei'
  }

  function readForm () {
    const nonceValue = byId('sickle-nonce-input').value.trim()
    const boostValue = byId('sickle-nonce-boost').value.trim()
    if (!/^\d+$/.test(nonceValue)) throw new Error('Enter a whole-number nonce.')
    if (!/^\d+$/.test(boostValue)) throw new Error('Enter a whole-number fee boost.')

    const nonce = BigInt(nonceValue)
    const boost = BigInt(boostValue)
    const highestReplacement = state.pending > state.latest ? state.pending - 1n : state.latest
    if (nonce < state.latest || nonce > highestReplacement) {
      throw new Error('Choose a nonce from ' + state.latest.toString() + ' to ' + highestReplacement.toString() + '.')
    }
    if (boost < 10n || boost > 500n) throw new Error('Choose a fee boost from 10% to 500%.')
    return { nonce, boost }
  }

  async function waitForReceipt (provider, hash) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const receipt = await provider.request({ method: 'eth_getTransactionReceipt', params: [hash] })
      if (receipt) return receipt
      await new Promise(function (resolve) { window.setTimeout(resolve, 3000) })
    }
    return null
  }

  async function clearNonce () {
    if (state.busy || !state.provider || state.latest === null) return

    let confirmedMessage = ''
    try {
      const form = readForm()
      if (state.pending === state.latest && !window.confirm('No pending transaction was detected. Send a new 0-value self-transfer at nonce ' + form.nonce.toString() + ' anyway?')) return

      setBusy(true)
      const currentWallet = await Promise.all([
        state.provider.request({ method: 'eth_accounts' }),
        state.provider.request({ method: 'eth_chainId' }),
        state.provider.request({ method: 'eth_getTransactionCount', params: [state.account, 'latest'] })
      ])
      if (!currentWallet[0] || !currentWallet[0][0] || currentWallet[0][0].toLowerCase() !== state.account.toLowerCase()) {
        throw new Error('The connected wallet account changed. Refresh and try again.')
      }
      if (!sameChain(currentWallet[1], targetNetwork().chainId)) {
        throw new Error('The connected network changed. Switch back, refresh, and try again.')
      }
      if (parseQuantity(currentWallet[2], 'confirmed nonce') > form.nonce) {
        throw new Error('Nonce ' + form.nonce.toString() + ' has already confirmed. Refresh the nonce list.')
      }

      setStatus('Simulating the 0-value self-transfer...')
      const call = { from: state.account, to: state.account, value: '0x0', data: '0x' }
      await state.provider.request({ method: 'eth_call', params: [call, 'latest'] })
      const gasEstimate = parseQuantity(await state.provider.request({ method: 'eth_estimateGas', params: [call] }), 'gas estimate')
      const fees = await feeFields(state.provider, form.boost)
      const transaction = Object.assign({}, call, fees.fields, {
        nonce: hexQuantity(form.nonce),
        gas: hexQuantity(maxBigInt(21000n, bumped(gasEstimate, 20n)))
      })

      setStatus('Waiting for wallet confirmation (maximum fee about ' + formatGwei(fees.display) + ')...')
      const hash = await state.provider.request({ method: 'eth_sendTransaction', params: [transaction] })
      setStatus('Replacement submitted: ' + hash.slice(0, 10) + '\u2026 Waiting for confirmation.')
      const receipt = await waitForReceipt(state.provider, hash)

      if (!receipt) {
        setStatus('Replacement submitted but is still pending: ' + hash, 'error')
      } else if (parseQuantity(receipt.status, 'receipt status') !== 1n) {
        setStatus('Replacement transaction failed: ' + hash, 'error')
      } else {
        confirmedMessage = 'Nonce ' + form.nonce.toString() + ' cleared: ' + hash
      }
    } catch (error) {
      const message = errorText(error)
      const hint = /underpriced|fee too low|replacement/i.test(message)
        ? ' Increase the fee boost and try again.'
        : ''
      setStatus('Could not clear the nonce: ' + message + hint, 'error')
    } finally {
      setBusy(false)
    }

    if (confirmedMessage) {
      await refresh()
      setStatus(confirmedMessage, 'success')
    }
  }

  function bindProviderEvents (provider) {
    if (!provider || typeof provider.on !== 'function') return
    provider.on('accountsChanged', function () { refresh() })
    provider.on('chainChanged', function () { refresh() })
  }

  function start () {
    const root = byId('sickle-nonce-clearer')
    if (!root) return
    const network = targetNetwork()
    byId('sickle-nonce-chain').textContent = network.chainName
    byId('sickle-nonce-symbol').textContent = network.nativeCurrency?.symbol || 'native token'
    byId('sickle-nonce-refresh').addEventListener('click', refresh)
    byId('sickle-nonce-submit').addEventListener('click', clearNonce)
    root.addEventListener('toggle', function () {
      if (root.open && !state.busy) refresh()
    })
    bindProviderEvents(injectedProvider())
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
