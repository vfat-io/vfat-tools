const { ethers } = require('ethers')

// ERC-20 sweeping for the Sickle recovery pages. The vfat API is only used to
// suggest which tokens a Sickle may hold: every balance shown is read onchain,
// read again right before signing, and the host preflights the transaction.
// The API lists whitelisted tokens only, so a token can always be added by
// address (a stranded LP token is usually not listed).
const balancesApi = 'https://api.vfat.io/v4/balances'
const apiTimeout = 8000
const maxApiTokens = 200
const nativeSentinel = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const erc20Interface = new ethers.utils.Interface([
  'function balanceOf(address) view returns(uint256)',
  'function decimals() view returns(uint8)',
  'function symbol() view returns(string)'
])
const bytes32SymbolInterface = new ethers.utils.Interface(['function symbol() view returns(bytes32)'])
const sweepInterface = new ethers.utils.Interface(['function sweepTokens(address[] tokens)'])

function shortAddress (address) { return address.slice(0, 6) + '…' + address.slice(-4) }
function decodeSymbol (result, address) {
  if (result && result.success) {
    try { return erc20Interface.decodeFunctionResult('symbol', result.returnData)[0].slice(0, 32) } catch (error) {}
    try { return ethers.utils.parseBytes32String(bytes32SymbolInterface.decodeFunctionResult('symbol', result.returnData)[0]).slice(0, 32) } catch (error) {}
  }
  return shortAddress(address)
}

async function fetchApiTokens (chainId, sickle) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null
  const timer = controller ? window.setTimeout(function () { controller.abort() }, apiTimeout) : null
  try {
    // No custom headers, so the cross-origin GET needs no preflight.
    const response = await window.fetch(balancesApi + '?addresses=' + sickle, controller ? { signal: controller.signal } : {})
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const balances = await response.json()
    if (!Array.isArray(balances)) throw new Error('Unexpected response.')
    const tokens = new Set()
    balances.forEach(function (balance) {
      if (!balance || Number(balance.chainId) !== chainId || !ethers.utils.isAddress(balance.address)) return
      const address = balance.address.toLowerCase()
      if (address === nativeSentinel) return
      tokens.add(ethers.utils.getAddress(address))
    })
    return Array.from(tokens).slice(0, maxApiTokens)
  } finally {
    if (timer) window.clearTimeout(timer)
  }
}

/**
 * options: {
 *   chainId: number, sweep: address,
 *   aggregate(calls): host multicall, [{ target, data }] -> [{ success, returnData }]
 *   sickle(), account(): current addresses
 *   disabled(): true while the host cannot send
 *   send(transaction): the host's preflighted send
 *   fail(error): report an error
 *   render(): re-render the host page
 * }
 */
module.exports = function createErc20Sweep (options) {
  const state = {
    sickle: '',
    tokens: [],
    selected: new Set(),
    manual: new Map(),
    loading: false,
    apiState: '',
    input: '',
    note: '',
    busy: false,
    inputFocused: false,
    generation: 0
  }

  function current () { return state.sickle && options.sickle() && state.sickle.toLowerCase() === options.sickle().toLowerCase() }
  function manualTokens () { return Array.from(state.manual.get(state.sickle.toLowerCase()) || []) }
  function rememberManual (token) {
    const key = state.sickle.toLowerCase()
    if (!state.manual.has(key)) state.manual.set(key, new Set())
    state.manual.get(key).add(token)
  }

  async function readTokens (sickle, tokens) {
    const calls = []
    tokens.forEach(function (token) {
      calls.push({ target: token, data: erc20Interface.encodeFunctionData('balanceOf', [sickle]) })
      calls.push({ target: token, data: erc20Interface.encodeFunctionData('decimals') })
      calls.push({ target: token, data: erc20Interface.encodeFunctionData('symbol') })
    })
    const results = await options.aggregate(calls)
    return tokens.map(function (token, index) {
      const balance = results[index * 3]
      const decimals = results[index * 3 + 1]
      if (!balance || !balance.success || !decimals || !decimals.success) return { address: token, valid: false }
      try {
        return {
          address: token,
          valid: true,
          balance: erc20Interface.decodeFunctionResult('balanceOf', balance.returnData)[0],
          decimals: erc20Interface.decodeFunctionResult('decimals', decimals.returnData)[0],
          symbol: decodeSymbol(results[index * 3 + 2], token)
        }
      } catch (error) {
        return { address: token, valid: false }
      }
    })
  }
  function amount (token) { return ethers.utils.formatUnits(token.balance, token.decimals) + ' ' + token.symbol }

  async function load (sickle) {
    if (!state.sickle || state.sickle.toLowerCase() !== sickle.toLowerCase()) {
      state.selected = new Set()
      state.input = ''
      state.note = ''
    }
    const generation = ++state.generation
    state.sickle = sickle
    state.tokens = []
    state.loading = true
    state.apiState = ''
    let apiTokens = []
    try {
      apiTokens = await fetchApiTokens(options.chainId, sickle)
      state.apiState = apiTokens.length ? 'listed' : 'empty'
    } catch (error) {
      state.apiState = 'failed'
    }
    try {
      const seen = new Set()
      const candidates = apiTokens.concat(manualTokens()).filter(function (token) {
        const key = token.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      const tokens = await readTokens(sickle, candidates)
      if (generation !== state.generation || !current()) return
      state.tokens = tokens.filter(function (token) { return token.valid && !token.balance.isZero() })
      const held = new Set(state.tokens.map(function (token) { return token.address.toLowerCase() }))
      state.selected.forEach(function (token) { if (!held.has(token)) state.selected.delete(token) })
    } finally {
      if (generation === state.generation) state.loading = false
    }
  }

  async function addManual () {
    const sickle = state.sickle
    const input = state.input.trim()
    if (!ethers.utils.isAddress(input)) throw new Error('Enter a token contract address (0x…).')
    const token = ethers.utils.getAddress(input)
    state.busy = true
    state.note = 'Reading ' + shortAddress(token) + ' onchain…'
    options.render()
    try {
      const result = (await readTokens(sickle, [token]))[0]
      if (!current() || state.sickle !== sickle) return
      if (!result.valid) {
        state.note = shortAddress(token) + ' did not answer balanceOf/decimals; it does not look like an ERC-20 on this chain.'
        return
      }
      rememberManual(token)
      state.input = ''
      state.tokens = state.tokens.filter(function (held) { return held.address.toLowerCase() !== token.toLowerCase() })
      if (result.balance.isZero()) {
        state.note = 'Your Sickle holds 0 ' + result.symbol + ' (' + shortAddress(token) + '); nothing to sweep.'
        return
      }
      state.tokens.push(result)
      state.selected.add(token.toLowerCase())
      state.note = 'Onchain balance: ' + amount(result) + '.'
    } finally {
      state.busy = false
      options.render()
    }
  }

  async function sweepTokens (tokens) {
    if (!tokens.length) throw new Error('Select at least one token.')
    // Pin the Sickle and account shown to the user; the Sweep contract resolves
    // the Sickle from msg.sender, so a wallet switch must abort, not redirect.
    const sickle = state.sickle
    const account = options.account()
    const generation = state.generation
    function unchanged () {
      return generation === state.generation && current() && state.sickle === sickle &&
        String(options.account() || '').toLowerCase() === String(account || '').toLowerCase()
    }
    state.busy = true
    state.note = ''
    options.render()
    try {
      // Re-read right before signing so the prompt shows what will move now.
      const fresh = (await readTokens(sickle, tokens.map(function (token) { return token.address })))
        .filter(function (token) { return token.valid && !token.balance.isZero() })
      if (!unchanged()) throw new Error('Wallet or Sickle changed; check the balances again.')
      if (!fresh.length) throw new Error('Nothing to sweep: these balances are now 0 onchain.')
      const lines = fresh.map(function (token) { return amount(token) + ' (' + token.address + ')' })
      if (!window.confirm('Sweep from Sickle ' + sickle + ' to ' + account + ':\n\n' + lines.join('\n'))) return
      if (!unchanged()) throw new Error('Wallet or Sickle changed; check the balances again.')
      const data = sweepInterface.encodeFunctionData('sweepTokens', [fresh.map(function (token) { return token.address })])
      try {
        await options.send({ from: account, to: options.sweep, data })
      } catch (error) {
        if (fresh.length > 1 && !(error && error.code === 4001)) state.note = 'If one token blocks transfers, sweep the tokens one at a time.'
        throw error
      }
    } finally {
      state.busy = false
      options.render()
    }
  }

  function button (label, handler) {
    const element = document.createElement('button')
    element.type = 'button'
    element.className = 'sickle-action'
    element.textContent = label
    element.disabled = state.busy || options.disabled()
    element.addEventListener('click', function () {
      handler().catch(function (error) { state.busy = false; options.fail(error); options.render() })
    })
    return element
  }
  function line (parent, text, bold) {
    const element = document.createElement(bold ? 'b' : 'span')
    element.textContent = text
    parent.appendChild(element)
    parent.appendChild(document.createTextNode('\n'))
  }

  function render (parent) {
    if (!current()) return
    line(parent, 'ERC-20 tokens', true)
    if (state.loading) {
      line(parent, 'Reading token balances…')
    } else if (state.tokens.length) {
      state.tokens.forEach(function (token) {
        const label = document.createElement('label')
        label.className = 'sickle-erc20-token'
        const box = document.createElement('input')
        box.type = 'checkbox'
        box.checked = state.selected.has(token.address.toLowerCase())
        box.disabled = state.busy
        box.addEventListener('change', function () {
          if (box.checked) state.selected.add(token.address.toLowerCase())
          else state.selected.delete(token.address.toLowerCase())
        })
        label.appendChild(box)
        label.appendChild(document.createTextNode(' ' + amount(token) + ' · ' + token.address))
        parent.appendChild(label)
        parent.appendChild(document.createTextNode('\n'))
      })
      parent.appendChild(button('Sweep selected erc20 tokens', function () {
        return sweepTokens(state.tokens.filter(function (token) { return state.selected.has(token.address.toLowerCase()) }))
      }))
      parent.appendChild(document.createTextNode('  '))
      parent.appendChild(button('Sweep all erc20 tokens', function () { return sweepTokens(state.tokens.slice()) }))
      parent.appendChild(document.createTextNode('\n'))
    } else {
      line(parent, 'No token balances found.')
    }
    if (state.apiState === 'failed') line(parent, 'Token list unavailable (vfat API did not answer). Add tokens by address below.')
    else if (state.apiState) line(parent, 'The token list only knows indexed tokens. Add any other token by address.')

    const form = document.createElement('form')
    form.className = 'sickle-erc20-form'
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = '0x… token address'
    input.spellcheck = false
    input.autocomplete = 'off'
    input.setAttribute('aria-label', 'Token address')
    input.value = state.input
    input.disabled = state.busy || state.loading
    input.addEventListener('input', function () { state.input = input.value })
    // The host re-renders while history scans run. Keep the caret in the field
    // across those re-renders; a real blur leaves the old input attached.
    input.addEventListener('focus', function () { state.inputFocused = true })
    input.addEventListener('blur', function () {
      window.setTimeout(function () { if (input.isConnected) state.inputFocused = false }, 0)
    })
    const submit = document.createElement('button')
    submit.type = 'submit'
    submit.className = 'sickle-action'
    submit.textContent = '[ check token ]'
    submit.disabled = state.busy || state.loading
    form.appendChild(document.createTextNode('Add token: '))
    form.appendChild(input)
    form.appendChild(document.createTextNode(' '))
    form.appendChild(submit)
    form.addEventListener('submit', function (event) {
      event.preventDefault()
      addManual().catch(function (error) { state.busy = false; options.fail(error); options.render() })
    })
    parent.appendChild(form)
    if (state.inputFocused && !input.disabled) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
    if (state.note) line(parent, state.note)
    parent.appendChild(document.createTextNode('\n'))
  }

  return { load, render }
}
