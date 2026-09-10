/* StonkFun on Solana: LaunchLab curve state, curve math, direct wallet. */

document.addEventListener('DOMContentLoaded', function () { StonkfunPage.start().catch(StonkfunPage.fatal) })

const StonkfunPage = (function () {
  const chain = { rpc: 'https://solana-rpc.publicnode.com', walletChain: 'solana:mainnet' }

  const programs = {
    launchpad: 'LanMV9sAd7wArD4vJFi2qDdfnVhFxYSUg6eADduJ3uj',
    clmm: 'CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK',
    token: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    token2022: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb',
    associatedToken: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    metadata: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
    system: '11111111111111111111111111111111',
    computeBudget: 'ComputeBudget111111111111111111111111111111'
  }

  // Every StonkFun launch points at one of these two platform configurations on
  // Raydium's LaunchLab program.
  const platformConfigs = [
    '4E876qZTE9FJMrBzgVtBrSrzz2TLivB5Y5QXPjB4gZL7',
    '6BwHHDg3u1854jC8PDLXvR4spTcLNaoBxLJNGC4nTESt'
  ]

  const usdcMint = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
  const wrappedSolMint = 'So11111111111111111111111111111111111111112'

  // A launch's pool address is derived from its two mints, so pairing a token
  // mint with each of these recovers the pool without an indexed query. The
  // list leads the lookup; anything quoted outside it is found from the mint's
  // own transaction history instead.
  const quoteMints = [
    'A7bdiYdS5GjqGFtxf17ppRHtDKPkkRqbKtR27dxvQXaS', 'So11111111111111111111111111111111111111112',
    'XsoCS1TfEyfFhfvj8EtZ528L3CaKBDBRqRapnBbDF2W', 'Xsc9qvGR1efVDFGLrVsmkzv3qi45LTBjeUKSPmx9qEh',
    'PreweJYECqtQwBtpxHL171nL2K6umo692gTm7Q3rpgF', 'Xs3oZwbHvqis4NYcf4YKWmEia2eC84wSiVrcYcTqpH8',
    'NKEda5nHhNGgjrE9nDdMvaEmkmJ96qqxzBVZEcKmjSg', '4sWNB8zGWHkh6UnmwiEtzNxL4XrN7uK9tosbESbJFfVs',
    'XsbEhLAtcf6HdfpFZ5xEMdqW8nfAvcsP5bdudRLJzJp', 'EicWvteVi2fWepEzS3FYWsnuPoP6caZfjnKqNvydLjCH',
    '6GmAFSYs4gk3FDao5FzzySQpPZaWsa4rUJHacpMpUNgx', 'DoGEV7LASBkQbibMc5k5vKnTZoMg423GpJ5QtJEGfm7R',
    'XsqE9cRRpzxcGKDXj1BJ7Xmg4GRhZoyY1KpmGSxAWT2', 'Xsv9hRk1z5ystj9MhnA7Lq4vjSsLwzL2nxrwmwtD3re',
    '3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh', 'Pren1FvFX6J3E4kXhJuCiAD5aDmGEb7qJRncwA8Lkhw',
    'XspzcW1PRtgf6Wj92HCiZdjzKCyFekVD8P5Ueh3dRMX', 'XsvNBAYkrDRNhA7wPHQfX3ZUXZyZLdnCQDfHZ56bzpg',
    'XsDoVfqeBukxuZHWhdvWHBhgEHjGNst4MLodqsJHzoB', 'WXMRyRZhsa19ety5erZhHg4N3xj3EVN92u94422teJp',
    'Xs8S1uUs1zvS2p7iwtsG3b6fkhpvmwz4GYU3gWAmWHZ', '6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN',
    '98sMhvDwXj1RQi5c5Mndm3vPe9cBqPrbLaufMXFNMh5g', '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
    'Xsa62P5mvPszXL1krVUnU5ar38bBSVcWAB6fmPCo5Zu', 'XsCPL9dNWBMvFtTmwcCA5v3xWPSMEBCszbQdiLLq6aN',
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 'Xs7ZdzSHLU9ftNJsii5fCeJhoRWSC32SQGzGQtePxNu',
    'pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn', 'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL',
    'taoC6xyv2v8tDLcev4uaGUgV4vdQsWJrGft2kcBRrBY', 'HTZsLG4zqaNvWMwXSLHH3GG5KyJpKwpBRsKVdMG6hvzP',
    'XsoBhf2ufR8fTyNSjqfU71DYGaE6Z3SUGAidpzriAA4', '9cRCn9rGT8V2imeM2BaKs13yhMEais3ruM3rPvTGpump',
    'Xsf9mBktVB9BSU5kf4nHxPq5hCBJ2j2ui3ecFGxPRGc', 'Xs3eBt7uRfJX8QUs4suhyU8p2M6DoUDrJyWBa8LLZsg',
    '2zCo6bUowJMvr89ajxuWsPadAqJ2F9akCkxumNsSdgsL', 'RDDTGbhHwVXfyCvQMXzzowKjf5qrYBZAnehoXW83ooh',
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump', 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    'XsaBXg8dU5cPM6ehmVctMkVqoiRG2ZjMo1cyBJ3AykQ', 'poNSfquKq512ApeYjVghwViSun4x1MhCqHVH2Paq4jN',
    'SKRbvo6Gf7GondiT3BbTfuRDPqLWei4j2Qy2NPGZhW3', 'SPHRp8cZaSQBTp1KMNP4V1X821SXhXWt4Q2yLdyHzju',
    'PEAQjk7SRS6rXHVFFmpRr7zrC4g5ZuEebpwTxvaLr3b', 'XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ'
  ]

  // Raydium concentrated-liquidity fee tiers. A pool address is derived from a
  // tier and its two mints, so these give a mint's USD price against USDC.
  const clmmConfigs = [
    '4BLNHtVe942GSs4teSZqGX24xwKNkqU7bGgNn3iUiUpw', 'E64NGkDLLCdQ2yFNPcavaKptrEgmiQaNykUuLC1Qgwyp',
    'HfERMT5DRA6C1TAqecrJQFpmkf3wsWTMncqnj3RDg5aw', 'A1BBtTYJd4i3xU8D6Tc2FzU6ZN4oXZWXKZnCxwbHXr8x',
    'DrdecJVzkaRsf1TQu1g7iFncaokikVTHqpzPjenjRySY', '9WjDVMHWCirG9jkchbetHTnSzdXbAPnD9bsoGRcz1xUw',
    'FMrUDGjEe1izXPbn8SZPNjMfB5JvvhVq5ymmpZDebB5R', '47Nq74YtwjVeTQF6KFKRKU4cY1Vd5AXBHpYRkubkDLZi',
    'Y6YhgJbt9FRk3JVjwdZtsioVCJwCKhy1hum8HMDYyB1', '9iFER3bpjf1PTTCQCfTRu17EJgvsxo9pVyA9QWwEuX4x'
  ]

  const poolDiscriminator = [247, 237, 227, 245, 215, 195, 222, 70]
  const buyExactInDiscriminator = [250, 234, 13, 123, 213, 156, 19, 236]
  const sellExactInDiscriminator = [149, 39, 222, 155, 211, 124, 152, 26]
  const claimVestedDiscriminator = [49, 33, 104, 30, 189, 157, 79, 35]

  const feeRateDenominator = 1000000n
  const accountBatchSize = 10
  const rpcMinimumInterval = 90
  const pricedAssetLimit = 12
  const solRentBuffer = 12000000n
  const ladderSteps = 10

  // ---------------------------------------------------------------- encoding

  const base58Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
  const base58Map = (function () {
    const map = {}
    for (let index = 0; index < base58Alphabet.length; index += 1) map[base58Alphabet[index]] = index
    return map
  })()
  const hexTable = (function () {
    const table = new Array(256)
    for (let index = 0; index < 256; index += 1) table[index] = index.toString(16).padStart(2, '0')
    return table
  })()

  function encodeBase58 (bytes) {
    let value = 0n
    for (let index = 0; index < bytes.length; index += 1) value = value * 256n + BigInt(bytes[index])
    let output = ''
    while (value > 0n) { output = base58Alphabet[Number(value % 58n)] + output; value /= 58n }
    for (let index = 0; index < bytes.length && bytes[index] === 0; index += 1) output = '1' + output
    return output || '1'
  }

  function decodeBase58 (text) {
    let value = 0n
    for (let index = 0; index < text.length; index += 1) {
      const digit = base58Map[text[index]]
      if (digit === undefined) throw new Error('Not a Solana address: ' + text)
      value = value * 58n + BigInt(digit)
    }
    const output = []
    while (value > 0n) { output.unshift(Number(value % 256n)); value /= 256n }
    for (let index = 0; index < text.length && text[index] === '1'; index += 1) output.unshift(0)
    return Uint8Array.from(output)
  }

  const isAddress = function (text) { return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(text) && decodeBase58(text).length === 32 }

  function decodeBase64 (text) {
    const binary = atob(text)
    const output = new Uint8Array(binary.length)
    for (let index = 0; index < binary.length; index += 1) output[index] = binary.charCodeAt(index)
    return output
  }

  function encodeBase64 (bytes) {
    let binary = ''
    for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index])
    return btoa(binary)
  }

  function toHex (bytes, start, end) {
    let output = ''
    const stop = end === undefined ? bytes.length : end
    for (let index = start === undefined ? 0 : start; index < stop; index += 1) output += hexTable[bytes[index]]
    return output
  }

  const sha256Constants = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ])
  const sha256Words = new Uint32Array(64)

  function sha256 (chunks) {
    let total = 0
    for (let index = 0; index < chunks.length; index += 1) total += chunks[index].length
    const withPadding = ((total + 9 + 63) >> 6) << 6
    const message = new Uint8Array(withPadding)
    let cursor = 0
    for (let index = 0; index < chunks.length; index += 1) { message.set(chunks[index], cursor); cursor += chunks[index].length }
    message[total] = 0x80
    const view = new DataView(message.buffer)
    view.setUint32(withPadding - 4, (total << 3) >>> 0, false)
    view.setUint32(withPadding - 8, Math.floor(total / 536870912), false)
    let h0 = 0x6a09e667; let h1 = 0xbb67ae85; let h2 = 0x3c6ef372; let h3 = 0xa54ff53a
    let h4 = 0x510e527f; let h5 = 0x9b05688c; let h6 = 0x1f83d9ab; let h7 = 0x5be0cd19
    for (let block = 0; block < withPadding; block += 64) {
      for (let index = 0; index < 16; index += 1) sha256Words[index] = view.getUint32(block + index * 4, false)
      for (let index = 16; index < 64; index += 1) {
        const a = sha256Words[index - 15]; const b = sha256Words[index - 2]
        const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3)
        const s1 = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10)
        sha256Words[index] = (sha256Words[index - 16] + s0 + sha256Words[index - 7] + s1) >>> 0
      }
      let a = h0; let b = h1; let c = h2; let d = h3; let e = h4; let f = h5; let g = h6; let h = h7
      for (let index = 0; index < 64; index += 1) {
        const s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))
        const choose = (e & f) ^ (~e & g)
        const temp1 = (h + s1 + choose + sha256Constants[index] + sha256Words[index]) >>> 0
        const s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))
        const majority = (a & b) ^ (a & c) ^ (b & c)
        const temp2 = (s0 + majority) >>> 0
        h = g; g = f; f = e; e = (d + temp1) >>> 0; d = c; c = b; b = a; a = (temp1 + temp2) >>> 0
      }
      h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0
      h4 = (h4 + e) >>> 0; h5 = (h5 + f) >>> 0; h6 = (h6 + g) >>> 0; h7 = (h7 + h) >>> 0
    }
    const digest = new Uint8Array(32)
    const digestView = new DataView(digest.buffer)
    const words = [h0, h1, h2, h3, h4, h5, h6, h7]
    for (let index = 0; index < 8; index += 1) digestView.setUint32(index * 4, words[index], false)
    return digest
  }

  // Ed25519 point decompression, used only to reject on-curve candidates while
  // deriving program addresses.
  const fieldPrime = (1n << 255n) - 19n
  const curveD = 37095705934669439343138083508754565189542113879843219016388785533085940283555n

  function modularPower (base, exponent, modulus) {
    let result = 1n
    let value = base % modulus
    let power = exponent
    while (power > 0n) {
      if (power & 1n) result = result * value % modulus
      value = value * value % modulus
      power >>= 1n
    }
    return result
  }

  function isOnCurve (bytes) {
    let y = 0n
    for (let index = 31; index >= 0; index -= 1) y = (y << 8n) | BigInt(bytes[index])
    const sign = y >> 255n
    y &= (1n << 255n) - 1n
    if (y >= fieldPrime) return false
    const ySquared = y * y % fieldPrime
    const numerator = (ySquared - 1n + fieldPrime) % fieldPrime
    const denominator = (curveD * ySquared + 1n) % fieldPrime
    const cubed = denominator * denominator % fieldPrime * denominator % fieldPrime
    const seventh = cubed * cubed % fieldPrime * denominator % fieldPrime
    let x = numerator * cubed % fieldPrime * modularPower(numerator * seventh % fieldPrime, (fieldPrime - 5n) / 8n, fieldPrime) % fieldPrime
    const check = denominator * x % fieldPrime * x % fieldPrime
    if (check !== numerator % fieldPrime) {
      if (check !== (fieldPrime - numerator % fieldPrime) % fieldPrime) return false
      x = x * modularPower(2n, (fieldPrime - 1n) / 4n, fieldPrime) % fieldPrime
    }
    if (x === 0n && sign === 1n) return false
    return true
  }

  const derivationMarker = new Uint8Array([80, 114, 111, 103, 114, 97, 109, 68, 101, 114, 105, 118, 101, 100, 65, 100, 100, 114, 101, 115, 115])
  const derivedAddressCache = new Map()
  const addressBytesCache = new Map()

  function addressBytes (address) {
    let bytes = addressBytesCache.get(address)
    if (!bytes) { bytes = decodeBase58(address); addressBytesCache.set(address, bytes) }
    return bytes
  }

  function findProgramAddress (seeds, programId) {
    const programBytes = addressBytes(programId)
    for (let bump = 255; bump >= 0; bump -= 1) {
      const candidate = sha256(seeds.concat([Uint8Array.of(bump), programBytes, derivationMarker]))
      if (!isOnCurve(candidate)) return encodeBase58(candidate)
    }
    throw new Error('No program address for these seeds')
  }

  function cachedProgramAddress (key, seeds, programId) {
    const hit = derivedAddressCache.get(key)
    if (hit) return hit
    const derived = findProgramAddress(seeds, programId)
    derivedAddressCache.set(key, derived)
    return derived
  }

  const textBytes = function (text) { return new TextEncoder().encode(text) }

  function associatedTokenAddress (owner, tokenProgram, mint) {
    return cachedProgramAddress('ata:' + owner + ':' + tokenProgram + ':' + mint,
      [addressBytes(owner), addressBytes(tokenProgram), addressBytes(mint)], programs.associatedToken)
  }

  function metadataAddress (mint) {
    return cachedProgramAddress('meta:' + mint,
      [textBytes('metadata'), addressBytes(programs.metadata), addressBytes(mint)], programs.metadata)
  }

  const launchpadAddress = function (key, seeds) { return cachedProgramAddress(key, seeds, programs.launchpad) }
  const vaultAuthority = function () { return launchpadAddress('auth', [textBytes('vault_auth_seed')]) }
  // LaunchLab keeps one configuration per quote asset, curve type and index.
  const globalConfigAddress = function (quoteMint) {
    const index = new Uint8Array(2)
    return launchpadAddress('global:' + quoteMint, [textBytes('global_config'), addressBytes(quoteMint), Uint8Array.of(0), index])
  }
  const eventAuthority = function () { return launchpadAddress('event', [textBytes('__event_authority')]) }
  const poolAddress = function (baseMint, quoteMint) { return launchpadAddress('pool:' + baseMint + ':' + quoteMint, [textBytes('pool'), addressBytes(baseMint), addressBytes(quoteMint)]) }
  const platformFeeVault = function (config, quoteMint) { return launchpadAddress('pfv:' + config + ':' + quoteMint, [addressBytes(config), addressBytes(quoteMint)]) }
  const creatorFeeVault = function (creator, quoteMint) { return launchpadAddress('cfv:' + creator + ':' + quoteMint, [addressBytes(creator), addressBytes(quoteMint)]) }
  const vestingRecordAddress = function (pool, beneficiary) { return launchpadAddress('vest:' + pool + ':' + beneficiary, [textBytes('pool_vesting'), addressBytes(pool), addressBytes(beneficiary)]) }

  function clmmPoolAddress (config, mintZero, mintOne) {
    return cachedProgramAddress('clmm:' + config + ':' + mintZero + ':' + mintOne,
      [textBytes('pool'), addressBytes(config), addressBytes(mintZero), addressBytes(mintOne)], programs.clmm)
  }

  function compareAddresses (left, right) {
    const a = addressBytes(left); const b = addressBytes(right)
    for (let index = 0; index < 32; index += 1) { if (a[index] !== b[index]) return a[index] - b[index] }
    return 0
  }

  // ------------------------------------------------------------- rpc client

  const rpcQueue = { nextAt: 0, requests: 0 }
  const sleep = function (milliseconds) { return new Promise(function (resolve) { setTimeout(resolve, milliseconds) }) }

  async function rpc (method, params) {
    const attempts = 4
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const wait = Math.max(0, rpcQueue.nextAt - Date.now())
      rpcQueue.nextAt = Date.now() + wait + rpcMinimumInterval
      if (wait > 0) await sleep(wait)
      rpcQueue.requests += 1
      let response
      try {
        response = await fetch(chain.rpc, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: rpcQueue.requests, method: method, params: params })
        })
      } catch (error) {
        if (attempt === attempts - 1) throw error
        await sleep(700 * (attempt + 1)); continue
      }
      if (response.status === 429 || response.status >= 500) {
        if (attempt === attempts - 1) throw new Error('The Solana RPC is rate limiting this browser. Try again shortly.')
        await sleep(1000 * (attempt + 1)); continue
      }
      const payload = await response.json()
      if (payload.error) {
        const code = payload.error.code
        if ((code === 429 || code === -32005) && attempt < attempts - 1) { await sleep(1000 * (attempt + 1)); continue }
        throw new Error(payload.error.message || 'Solana RPC error ' + code)
      }
      return payload.result
    }
    throw new Error('The Solana RPC did not answer')
  }

  async function getAccounts (addresses, dataSlice) {
    const results = []
    for (let index = 0; index < addresses.length; index += accountBatchSize) {
      const config = { encoding: 'base64', commitment: 'confirmed' }
      if (dataSlice) config.dataSlice = dataSlice
      const page = await rpc('getMultipleAccounts', [addresses.slice(index, index + accountBatchSize), config])
      for (let inner = 0; inner < page.value.length; inner += 1) results.push(page.value[inner])
    }
    return results
  }

  // -------------------------------------------------------------- decoders

  function reader (bytes) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    return {
      u8: function (offset) { return bytes[offset] },
      u16: function (offset) { return view.getUint16(offset, true) },
      u32: function (offset) { return view.getUint32(offset, true) },
      number: function (offset) { return view.getUint32(offset, true) + view.getUint32(offset + 4, true) * 4294967296 },
      u64: function (offset) { return view.getBigUint64(offset, true) },
      u128: function (offset) { return view.getBigUint64(offset, true) + (view.getBigUint64(offset + 8, true) << 64n) },
      key: function (offset) { return encodeBase58(bytes.subarray(offset, offset + 32)) },
      text: function (offset, length) { return new TextDecoder().decode(bytes.subarray(offset, offset + length)).replace(/\0+$/, '').trim() }
    }
  }

  function isLaunchpadPool (account) {
    if (!account || account.owner !== programs.launchpad) return false
    const bytes = decodeBase64(account.data[0])
    if (bytes.length < 429) return false
    for (let index = 0; index < 8; index += 1) { if (bytes[index] !== poolDiscriminator[index]) return false }
    return true
  }

  function decodePool (address, bytes) {
    const read = reader(bytes)
    return {
      address: address,
      status: read.u8(17),
      baseDecimals: read.u8(18),
      quoteDecimals: read.u8(19),
      migrateType: read.u8(20),
      supply: read.u64(21),
      totalBaseSell: read.u64(29),
      virtualBase: read.u64(37),
      virtualQuote: read.u64(45),
      realBase: read.u64(53),
      realQuote: read.u64(61),
      totalQuoteFundRaising: read.u64(69),
      quoteProtocolFee: read.u64(77),
      platformFee: read.u64(85),
      migrateFee: read.u64(93),
      vesting: {
        totalLockedAmount: read.u64(101),
        cliffPeriod: read.u64(109),
        unlockPeriod: read.u64(117),
        startTime: read.u64(125),
        allocatedShareAmount: read.u64(133)
      },
      globalConfig: read.key(141),
      platformConfig: read.key(173),
      baseMint: read.key(205),
      quoteMint: read.key(237),
      baseVault: read.key(269),
      quoteVault: read.key(301),
      creator: read.key(333),
      tokenProgramFlag: read.u8(365)
    }
  }

  function decodePlatformConfig (bytes) {
    const read = reader(bytes)
    return { feeWallet: read.key(16), feeRate: read.number(104), creatorFeeRate: read.number(720), name: read.text(112, 64) }
  }

  function decodeGlobalConfig (bytes) {
    const read = reader(bytes)
    return { curveType: read.u8(16), tradeFeeRate: read.number(27) }
  }

  function decodeTokenAccount (bytes) {
    if (!bytes || bytes.length < 72) return null
    const read = reader(bytes)
    return { mint: read.key(0), owner: read.key(32), amount: read.u64(64) }
  }

  function decodeVestingRecord (bytes) {
    if (!bytes || bytes.length < 96) return null
    const read = reader(bytes)
    return { pool: read.key(16), beneficiary: read.key(48), claimedAmount: read.u64(80), tokenShareAmount: read.u64(88) }
  }

  // Token-2022 keeps a mint's name and symbol in the mint account itself.
  // Legacy SPL mints keep them in a separate Metaplex metadata account.
  function decodeMint (address, account) {
    if (!account) return null
    const bytes = decodeBase64(account.data[0])
    const info = { address: address, decimals: bytes[44], tokenProgram: account.owner, symbol: '', name: '', transferFee: null }
    if (bytes.length <= 165) return info
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    let cursor = 166
    while (cursor + 4 <= bytes.length) {
      const type = view.getUint16(cursor, true)
      const length = view.getUint16(cursor + 2, true)
      cursor += 4
      if (cursor + length > bytes.length) break
      if (type === 1 && length >= 108) {
        // TransferFeeConfig: two authorities, the withheld total, then the
        // fee that applied in the older epoch and the one that applies now.
        const older = cursor + 72
        const newer = cursor + 90
        info.transferFee = {
          olderEpoch: view.getBigUint64(older, true),
          olderMaximum: view.getBigUint64(older + 8, true),
          olderBasisPoints: view.getUint16(older + 16, true),
          newerEpoch: view.getBigUint64(newer, true),
          newerMaximum: view.getBigUint64(newer + 8, true),
          newerBasisPoints: view.getUint16(newer + 16, true)
        }
      }
      if (type === 19) {
        let inner = cursor + 64
        const readString = function () {
          const size = view.getUint32(inner, true)
          inner += 4
          const text = new TextDecoder().decode(bytes.subarray(inner, inner + size))
          inner += size
          return text
        }
        info.name = readString(); info.symbol = readString()
      }
      cursor += length
      if (length === 0 && type === 0) break
    }
    return info
  }

  function decodeMetaplex (bytes) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    let cursor = 65
    const readString = function () {
      const size = view.getUint32(cursor, true)
      cursor += 4
      const text = new TextDecoder().decode(bytes.subarray(cursor, cursor + size)).replace(/\0+/g, '').trim()
      cursor += size
      return text
    }
    const name = readString()
    return { name: name, symbol: readString() }
  }

  function decodeClmmSlice (bytes) {
    const read = reader(bytes)
    return {
      decimalsZero: read.u8(233 - 73),
      decimalsOne: read.u8(234 - 73),
      liquidity: read.u128(237 - 73),
      sqrtPriceX64: read.u128(253 - 73)
    }
  }

  // ------------------------------------------------------------ curve math

  function ceilDivide (value, numerator, denominator) {
    if (value === 0n || numerator === 0n) return 0n
    return (value * numerator + denominator - 1n) / denominator
  }

  function totalFeeRate () {
    if (!state.globalConfig || !state.platformConfig) return 0n
    return BigInt(state.globalConfig.tradeFeeRate + state.platformConfig.feeRate + state.platformConfig.creatorFeeRate)
  }

  const decimalScale = function (pool) { return Math.pow(10, pool.baseDecimals - pool.quoteDecimals) }

  function curvePrice (pool) {
    const base = Number(pool.virtualBase - pool.realBase)
    if (!(base > 0)) return NaN
    return Number(pool.virtualQuote + pool.realQuote) / base * decimalScale(pool)
  }

  // Constant product keeps virtualBase * virtualQuote invariant, so the price
  // at any raised amount follows from the quote side alone.
  function priceAtRaise (pool, raised) {
    const constant = Number(pool.virtualBase) * Number(pool.virtualQuote)
    if (!(constant > 0)) return NaN
    const quote = Number(pool.virtualQuote) + raised
    return quote * quote / constant * decimalScale(pool)
  }

  function curveProgress (pool) {
    const target = Number(pool.totalQuoteFundRaising)
    if (!(target > 0)) return 0
    return Math.min(1, Number(pool.realQuote) / target)
  }

  // A Token-2022 mint can withhold a share of every transfer, so the amount
  // that reaches the curve is smaller than the amount sent, and the amount a
  // buyer keeps is smaller than the amount the curve pays out.
  function transferFee (mint, amount) {
    const config = mintInfo(mint).transferFee
    if (!config || amount <= 0n) return 0n
    const current = state.epoch !== null && BigInt(state.epoch) >= config.newerEpoch
      ? { basisPoints: config.newerBasisPoints, maximum: config.newerMaximum }
      : { basisPoints: config.olderBasisPoints, maximum: config.olderMaximum }
    if (!current.basisPoints) return 0n
    const fee = ceilDivide(amount, BigInt(current.basisPoints), 10000n)
    return fee > current.maximum ? current.maximum : fee
  }

  function quoteBuy (pool, amountIn) {
    const sent = amountIn - transferFee(pool.quoteMint, amountIn)
    const fee = ceilDivide(sent, totalFeeRate(), feeRateDenominator)
    const net = sent - fee
    if (net <= 0n) return { amountOut: 0n, received: 0n, fee: fee, netIn: 0n, capped: false }
    const base = pool.virtualBase - pool.realBase
    const quote = pool.virtualQuote + pool.realQuote
    let amountOut = net * base / (quote + net)
    const remaining = pool.totalBaseSell - pool.realBase
    let capped = false
    if (amountOut > remaining) { amountOut = remaining; capped = true }
    return {
      amountOut: amountOut,
      received: amountOut - transferFee(pool.baseMint, amountOut),
      fee: fee,
      netIn: net,
      capped: capped
    }
  }

  function quoteSell (pool, amountIn) {
    const sent = amountIn - transferFee(pool.baseMint, amountIn)
    const base = pool.virtualBase - pool.realBase
    const quote = pool.virtualQuote + pool.realQuote
    const gross = sent * quote / (base + sent)
    const fee = ceilDivide(gross, totalFeeRate(), feeRateDenominator)
    const amountOut = gross - fee
    return {
      amountOut: amountOut,
      received: amountOut - transferFee(pool.quoteMint, amountOut),
      fee: fee,
      netIn: sent,
      capped: false
    }
  }

  // ------------------------------------------------------------------ state

  const state = {
    slot: null,
    epoch: null,
    platformConfig: null,
    globalConfig: null,
    assets: [],
    mints: new Map(),
    prices: new Map(),
    solPrice: NaN,
    priced: { assets: 0, total: 0 },
    launch: null,
    lookupError: '',
    position: null,
    status: '',
    statusKind: '',
    wallet: null,
    walletChoice: 0,
    account: null,
    solBalance: 0n,
    trade: { side: 'buy', amount: '', slippage: 1, amountIn: 0n, minimumOut: 0n, quoted: null },
    sending: false,
    spinner: null,
    spinnerFrame: 0
  }

  // ------------------------------------------------------------- formatting

  const byId = function (id) { return document.getElementById(id) }

  const errorText = function (error) {
    return String(error && (error.message || error.reason) || error).replace(/^Error: /, '').slice(0, 400)
  }

  const safeText = function (value, maximum) {
    const text = String(value === undefined || value === null ? '' : value).replace(/[\r\n\t|]/g, ' ').replace(/\s+/g, ' ').trim()
    return text ? text.slice(0, maximum || 40) : ''
  }

  const shortKey = function (value) { return value ? value.slice(0, 4) + '…' + value.slice(-4) : '-' }

  function unitsNumber (amount, decimals) {
    if (amount === undefined || amount === null) return NaN
    return Number(amount) / Math.pow(10, decimals)
  }

  function toBaseUnits (text, decimals) {
    const cleaned = String(text || '').trim().replace(/,/g, '')
    if (!/^\d*\.?\d*$/.test(cleaned) || cleaned === '' || cleaned === '.') return null
    const parts = cleaned.split('.')
    const fraction = (parts[1] || '').slice(0, decimals).padEnd(decimals, '0')
    // Babel rewrites the exponent operator to Math.pow, which cannot take a
    // bigint, so build the scale from its digits instead.
    const scale = BigInt('1' + '0'.repeat(decimals))
    try { return BigInt(parts[0] || '0') * scale + BigInt(fraction || '0') } catch (error) { return null }
  }

  function compact (value, digits) {
    if (!Number.isFinite(value)) return '-'
    const sign = value < 0 ? '-' : ''
    const size = Math.abs(value)
    if (size >= 1e9) return sign + (size / 1e9).toFixed(digits === undefined ? 2 : digits) + 'b'
    if (size >= 1e6) return sign + (size / 1e6).toFixed(digits === undefined ? 2 : digits) + 'm'
    if (size >= 1e3) return sign + (size / 1e3).toFixed(digits === undefined ? 2 : digits) + 'k'
    if (size >= 1) return sign + size.toFixed(digits === undefined ? 2 : digits)
    if (size > 0) return sign + size.toPrecision(3)
    return '0'
  }

  const usd = function (value) { return Number.isFinite(value) && value > 0 ? '$' + compact(value) : '—' }
  const percent = function (value) { return Number.isFinite(value) ? (value >= 100 ? value.toFixed(0) : value.toFixed(value >= 10 ? 1 : 2)) + '%' : '—' }
  const count = function (value) { return Number(value).toLocaleString('en-US') }

  function amountText (amount, decimals, digits) {
    const value = unitsNumber(amount, decimals)
    if (!Number.isFinite(value)) return '-'
    if (value === 0) return '0'
    if (value < 0.0001) return value.toExponential(2)
    return compact(value, digits)
  }

  function priceText (value) {
    if (!Number.isFinite(value) || value <= 0) return '—'
    if (value >= 1000) return value.toFixed(2)
    if (value >= 1) return value.toFixed(4)
    if (value >= 0.00001) return value.toFixed(8).replace(/0+$/, '')
    return value.toExponential(3)
  }

  function progressBar (fraction) {
    const filled = Math.max(0, Math.min(20, Math.round(fraction * 20)))
    return '[' + '#'.repeat(filled) + '-'.repeat(20 - filled) + ']'
  }

  function duration (seconds) {
    const value = Number(seconds)
    if (!Number.isFinite(value) || value <= 0) return 'none'
    if (value >= 86400) return (value / 86400).toFixed(value >= 864000 ? 0 : 1) + ' days'
    if (value >= 3600) return (value / 3600).toFixed(1) + ' hours'
    return Math.round(value / 60) + ' minutes'
  }

  // ---------------------------------------------------------------- elements

  function element (tag, options) {
    const node = document.createElement(tag)
    const config = options || {}
    if (config.text !== undefined) node.textContent = config.text
    if (config.className) node.className = config.className
    if (config.id) node.id = config.id
    if (config.type) node.type = config.type
    if (config.disabled) node.disabled = true
    return node
  }

  function append (parent) {
    for (let index = 1; index < arguments.length; index += 1) { if (arguments[index]) parent.appendChild(arguments[index]) }
    return parent
  }

  function actionButton (label, handler, disabled) {
    const node = element('button', { type: 'button', text: '[ ' + label + ' ]', className: 'stonk-action', disabled: disabled || state.sending })
    node.addEventListener('click', function () {
      Promise.resolve().then(handler).catch(function (error) { console.error('StonkFun action failed', error); setStatus(errorText(error), 'error') })
    })
    return node
  }

  function linkButton (label, handler) {
    const node = element('button', { type: 'button', text: '[ ' + label + ' ]', className: 'stonk-link' })
    node.addEventListener('click', function () {
      Promise.resolve().then(handler).catch(function (error) { console.error('StonkFun', error); setStatus(errorText(error), 'error') })
    })
    return node
  }

  function table (headers, rows, className) {
    const node = element('table', { className: 'stonk-table' + (className ? ' ' + className : '') })
    const head = element('thead')
    const headRow = element('tr')
    headers.forEach(function (label) { append(headRow, element('th', { text: label })) })
    append(head, headRow)
    append(node, head)
    const body = element('tbody')
    rows.forEach(function (cells) {
      const row = element('tr')
      cells.forEach(function (cell) {
        const td = element('td', { className: cell && cell.className })
        if (cell && cell.node) append(td, cell.node)
        else if (cell && cell.nodes) cell.nodes.forEach(function (child) { append(td, child) })
        else td.textContent = cell === undefined || cell === null || cell === '' ? '-' : cell
        append(row, td)
      })
      append(body, row)
    })
    append(node, body)
    return node
  }

  function stacked (primary, secondary) {
    const wrap = element('span')
    append(wrap, element('span', { text: String(primary), className: 'stonk-name' }))
    if (secondary) append(wrap, element('span', { text: String(secondary), className: 'stonk-sub' }))
    return wrap
  }

  // ------------------------------------------------------------- token meta

  function mintInfo (address) {
    return state.mints.get(address) || { address: address, decimals: null, symbol: '', name: '', tokenProgram: programs.token }
  }

  function mintLabel (address) {
    const info = state.mints.get(address)
    const symbol = info && safeText(info.symbol, 14)
    return symbol || shortKey(address)
  }

  async function loadMints (addresses) {
    const unique = []
    const seen = new Set()
    addresses.forEach(function (address) {
      if (!address || state.mints.has(address) || seen.has(address)) return
      seen.add(address)
      unique.push(address)
    })
    if (!unique.length) return
    const accounts = await getAccounts(unique)
    const needMetaplex = []
    unique.forEach(function (address, index) {
      const info = decodeMint(address, accounts[index])
      if (!info) return
      state.mints.set(address, info)
      if (!info.symbol) needMetaplex.push(address)
    })
    if (!needMetaplex.length) return
    const metadataAccounts = await getAccounts(needMetaplex.map(metadataAddress))
    needMetaplex.forEach(function (address, index) {
      const account = metadataAccounts[index]
      if (!account) return
      try {
        const parsed = decodeMetaplex(decodeBase64(account.data[0]))
        const info = state.mints.get(address)
        if (info && parsed.symbol) { info.symbol = parsed.symbol; info.name = parsed.name }
      } catch (error) { /* a malformed metadata account leaves the mint unnamed */ }
    })
  }

  // ------------------------------------------------------------ price graph

  async function resolvePrices (mints, against, multiplier) {
    const candidates = []
    mints.forEach(function (mint) {
      const ordered = compareAddresses(mint, against) < 0 ? [mint, against] : [against, mint]
      clmmConfigs.forEach(function (config) {
        candidates.push({ address: clmmPoolAddress(config, ordered[0], ordered[1]), mint: mint, mintIsZero: ordered[0] === mint })
      })
    })
    const accounts = await getAccounts(candidates.map(function (candidate) { return candidate.address }), { offset: 73, length: 196 })
    const deepest = new Map()
    accounts.forEach(function (account, index) {
      if (!account || !account.data) return
      const bytes = decodeBase64(account.data[0])
      if (bytes.length < 196) return
      const pool = decodeClmmSlice(bytes)
      if (pool.liquidity <= 0n) return
      const candidate = candidates[index]
      const oneForZero = Math.pow(Number(pool.sqrtPriceX64) / Math.pow(2, 64), 2) * Math.pow(10, pool.decimalsZero - pool.decimalsOne)
      const price = candidate.mintIsZero ? oneForZero : 1 / oneForZero
      if (!Number.isFinite(price) || price <= 0) return
      const current = deepest.get(candidate.mint)
      if (!current || pool.liquidity > current.liquidity) deepest.set(candidate.mint, { liquidity: pool.liquidity, price: price })
    })
    deepest.forEach(function (entry, mint) { state.prices.set(mint, entry.price * multiplier) })
  }

  async function loadPrices (mints) {
    state.prices.set(usdcMint, 1)
    const wanted = []
    mints.forEach(function (mint) { if (mint && mint !== usdcMint && !state.prices.has(mint) && wanted.indexOf(mint) === -1) wanted.push(mint) })
    if (!Number.isFinite(state.solPrice) && wanted.indexOf(wrappedSolMint) === -1) wanted.push(wrappedSolMint)
    if (!wanted.length) return
    await resolvePrices(wanted, usdcMint, 1)
    if (state.prices.has(wrappedSolMint)) state.solPrice = state.prices.get(wrappedSolMint)
    const unpriced = wanted.filter(function (mint) { return !state.prices.has(mint) })
    if (unpriced.length && Number.isFinite(state.solPrice)) await resolvePrices(unpriced, wrappedSolMint, state.solPrice)
  }

  const quotePrice = function (mint) { const value = state.prices.get(mint); return Number.isFinite(value) ? value : NaN }

  function quoteValue (amount, decimals, mint) {
    const price = quotePrice(mint)
    if (!Number.isFinite(price)) return NaN
    return unitsNumber(amount, decimals) * price
  }

  // --------------------------------------------------------------- lookup

  // A launch's pool sits at a program address derived from its two mints, so
  // pairing the token with each quote asset finds it. A launch quoted outside
  // that list is found from the token's own recent transactions instead.
  async function poolFromMint (mint) {
    const candidates = quoteMints.map(function (quote) { return poolAddress(mint, quote) })
    const accounts = await getAccounts(candidates)
    for (let index = 0; index < accounts.length; index += 1) {
      if (isLaunchpadPool(accounts[index])) return decodePool(candidates[index], decodeBase64(accounts[index].data[0]))
    }
    return null
  }

  async function poolFromHistory (mint) {
    const signatures = await rpc('getSignaturesForAddress', [mint, { limit: 10 }])
    for (let index = 0; index < signatures.length && index < 6; index += 1) {
      if (signatures[index].err) continue
      const transaction = await rpc('getTransaction', [signatures[index].signature, { maxSupportedTransactionVersion: 0, encoding: 'jsonParsed' }])
      if (!transaction) continue
      const instructions = transaction.transaction.message.instructions.slice()
      const inner = transaction.meta && transaction.meta.innerInstructions
      if (inner) inner.forEach(function (group) { instructions.push.apply(instructions, group.instructions) })
      for (let position = 0; position < instructions.length; position += 1) {
        const instruction = instructions[position]
        if (instruction.programId !== programs.launchpad || !instruction.accounts || instruction.accounts.length < 6) continue
        const account = await rpc('getAccountInfo', [instruction.accounts[4], { encoding: 'base64', commitment: 'confirmed' }])
        if (isLaunchpadPool(account.value)) return decodePool(instruction.accounts[4], decodeBase64(account.value.data[0]))
      }
    }
    return null
  }

  // Every trade touches the platform configuration it was launched under, so
  // its newest transaction leads back to a curve trading right now.
  async function newestTradedPool () {
    for (let index = 0; index < platformConfigs.length; index += 1) {
      const pool = await poolFromHistory(platformConfigs[index])
      if (pool) return pool
    }
    throw new Error('No recent StonkFun trade found.')
  }

  async function resolveLaunch (input) {
    const text = String(input || '').trim()
    const match = text.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/g)
    const address = (match || []).filter(isAddress).pop()
    if (!address) throw new Error('Enter a token mint or pool address.')
    const direct = await rpc('getAccountInfo', [address, { encoding: 'base64', commitment: 'confirmed' }])
    if (isLaunchpadPool(direct.value)) return decodePool(address, decodeBase64(direct.value.data[0]))
    const derived = await poolFromMint(address)
    if (derived) return derived
    const historical = await poolFromHistory(address)
    if (historical) return historical
    throw new Error('No StonkFun launch found for ' + shortKey(address) + '.')
  }

  const loadLaunch = function (input) { return loadLaunchWith(function () { return resolveLaunch(input) }) }

  async function loadLaunchWith (resolver) {
    setStatus('', '')
    state.lookupError = ''
    setLoading(true, 'Reading the launch…')
    try {
      const pool = await resolver()
      state.launch = pool
      state.trade = { side: 'buy', amount: '', slippage: 1, amountIn: 0n, minimumOut: 0n, quoted: null }
      renderAll()
      await loadMints([pool.baseMint, pool.quoteMint])
      const accounts = await getAccounts([pool.globalConfig, pool.platformConfig])
      if (accounts[0]) state.globalConfig = decodeGlobalConfig(decodeBase64(accounts[0].data[0]))
      if (accounts[1]) state.platformConfig = decodePlatformConfig(decodeBase64(accounts[1].data[0]))
      renderAll()
      await loadPrices([pool.quoteMint])
      renderAll()
      if (state.account) await loadPosition()
      const field = byId('stonk-lookup')
      if (field) field.value = pool.baseMint
      if (window.location.hash.slice(1) !== pool.baseMint) window.location.hash = pool.baseMint
    } catch (error) {
      state.launch = null
      state.position = null
      state.lookupError = errorText(error)
      renderAll()
    } finally {
      setLoading(false)
    }
  }

  // ------------------------------------------------------------ quote menu

  async function loadQuoteAssets () {
    state.assets = quoteMints.slice(0, pricedAssetLimit).map(function (mint) {
      return { mint: mint, fees: 0n, decimals: null }
    })
    await loadMints(state.assets.map(function (asset) { return asset.mint }))
    state.assets.forEach(function (asset) { asset.decimals = mintInfo(asset.mint).decimals })
    renderQuoteAssets()

    const vaults = []
    state.assets.forEach(function (asset) {
      platformConfigs.forEach(function (config) { vaults.push({ asset: asset, address: platformFeeVault(config, asset.mint) }) })
    })
    const accounts = await getAccounts(vaults.map(function (entry) { return entry.address }), { offset: 0, length: 72 })
    accounts.forEach(function (account, index) {
      if (!account || !account.data) return
      const parsed = decodeTokenAccount(decodeBase64(account.data[0]))
      if (parsed) vaults[index].asset.fees += parsed.amount
    })
    renderQuoteAssets()

    state.priced.total = state.assets.length
    await loadPrices(state.assets.map(function (asset) { return asset.mint }))
    state.priced.assets = state.assets.filter(function (asset) { return state.prices.has(asset.mint) }).length
    renderAll()
  }

  // -------------------------------------------------------------- rendering

  function setStatus (text, kind) {
    state.status = text || ''
    state.statusKind = kind || ''
    const node = byId('stonk-status')
    if (!node) return
    node.textContent = state.status
    node.hidden = !state.status
    if (state.statusKind) node.setAttribute('data-kind', state.statusKind)
    else node.removeAttribute('data-kind')
  }

  function setLoading (loading, text) {
    const node = byId('stonk-loading')
    const label = byId('stonk-loading-text')
    if (label && text) label.textContent = text
    if (node) node.hidden = !loading
    if (loading && !state.spinner) {
      state.spinner = setInterval(function () {
        state.spinnerFrame = (state.spinnerFrame + 1) % 4
        const spin = byId('stonk-loading-spin')
        if (spin) spin.textContent = '[' + '.'.repeat(state.spinnerFrame + 1).padEnd(4, ' ') + ']'
      }, 320)
    }
    if (!loading && state.spinner) { clearInterval(state.spinner); state.spinner = null }
  }

  function renderOverview () {
    const node = byId('stonk-overview')
    if (!node) return
    let fees = 0
    let complete = true
    state.assets.forEach(function (asset) {
      const value = quoteValue(asset.fees, asset.decimals, asset.mint)
      if (Number.isFinite(value)) fees += value
      else if (asset.fees > 0n) complete = false
    })
    const lines = []
    lines.push('SLOT     : ' + (state.slot === null ? '—' : count(state.slot)))
    if (state.globalConfig && state.platformConfig) {
      lines.push('FEE      : ' + (state.globalConfig.tradeFeeRate / 10000) + '% protocol · ' + (state.platformConfig.feeRate / 10000) + '% platform · ' + (state.platformConfig.creatorFeeRate / 10000) + '% creator')
    }
    lines.push('QUOTES   : ' + state.assets.length + ' assets · ' + state.priced.assets + '/' + state.priced.total + ' priced')
    lines.push('FEES HELD: ' + (fees > 0 ? usd(fees) : '—') + (complete ? '' : ' · partial'))
    node.textContent = lines.join('\n')
    node.hidden = false
  }

  function renderQuoteAssets () {
    const host = byId('stonk-quotes')
    if (!host) return
    host.textContent = ''
    if (!state.assets.length) { append(host, element('p', { className: 'stonk-empty', text: 'Reading quote assets…' })); return }
    const rows = state.assets.map(function (asset) {
      const price = quotePrice(asset.mint)
      return [
        { node: stacked(mintLabel(asset.mint), safeText(mintInfo(asset.mint).name, 30)) },
        Number.isFinite(price) ? '$' + priceText(price) : '—',
        asset.decimals === null ? '—' : amountText(asset.fees, asset.decimals, 3),
        usd(quoteValue(asset.fees, asset.decimals, asset.mint))
      ]
    })
    append(host, table(['QUOTE ASSET', 'PRICE', 'FEES HELD', 'FEES HELD USD'], rows, 'stonk-quotes-table'))
  }

  function renderLaunch () {
    const host = byId('stonk-launch')
    if (!host) return
    host.textContent = ''
    if (state.lookupError) { append(host, element('p', { className: 'stonk-empty', text: state.lookupError })); return }
    const pool = state.launch
    if (!pool) {
      const empty = element('p', { className: 'stonk-empty', text: 'No launch loaded. ' })
      append(empty, linkButton('newest trade', function () { return loadLaunchWith(newestTradedPool) }))
      append(host, empty)
      return
    }

    const baseSymbol = mintLabel(pool.baseMint)
    const quoteSymbol = mintLabel(pool.quoteMint)
    const price = curvePrice(pool)
    const quoteUsd = quotePrice(pool.quoteMint)
    const supply = unitsNumber(pool.supply, pool.baseDecimals)
    const progress = curveProgress(pool)
    const graduationPrice = priceAtRaise(pool, Number(pool.totalQuoteFundRaising))

    const summary = element('pre', { className: 'stonk-launch-summary' })
    const lines = []
    lines.push('TOKEN    : ' + baseSymbol + ' · ' + safeText(mintInfo(pool.baseMint).name, 40))
    lines.push('QUOTE    : ' + quoteSymbol + (Number.isFinite(quoteUsd) ? ' · $' + priceText(quoteUsd) : ''))
    lines.push('STATUS   : ' + (pool.status === 2 ? 'migrated to ' + (pool.migrateType === 1 ? 'Raydium CPMM' : 'Raydium AMM') : pool.status === 1 ? 'funded, awaiting migration' : 'funding'))
    lines.push('RAISED   : ' + progressBar(progress) + ' ' + percent(progress * 100))
    lines.push('           ' + amountText(pool.realQuote, pool.quoteDecimals, 3) + ' of ' + amountText(pool.totalQuoteFundRaising, pool.quoteDecimals, 3) + ' ' + quoteSymbol +
      (Number.isFinite(quoteUsd) ? ' · ' + usd(quoteValue(pool.realQuote, pool.quoteDecimals, pool.quoteMint)) : ''))
    lines.push('PRICE    : ' + priceText(price) + ' ' + quoteSymbol + (Number.isFinite(price * quoteUsd) ? ' · $' + priceText(price * quoteUsd) : ''))
    lines.push('MCAP     : ' + (Number.isFinite(price * supply * quoteUsd) ? usd(price * supply * quoteUsd) : compact(price * supply) + ' ' + quoteSymbol))
    lines.push('END PRICE: ' + priceText(graduationPrice) + ' ' + quoteSymbol + (Number.isFinite(graduationPrice * quoteUsd) ? ' · $' + priceText(graduationPrice * quoteUsd) : ''))
    lines.push('END MCAP : ' + (Number.isFinite(graduationPrice * supply * quoteUsd) ? usd(graduationPrice * supply * quoteUsd) : compact(graduationPrice * supply) + ' ' + quoteSymbol))
    lines.push('SOLD     : ' + amountText(pool.realBase, pool.baseDecimals, 3) + ' of ' + amountText(pool.totalBaseSell, pool.baseDecimals, 3) + ' ' + baseSymbol)
    lines.push('SUPPLY   : ' + compact(supply) + ' ' + baseSymbol)
    if (pool.vesting.totalLockedAmount > 0n) {
      lines.push('VESTING  : ' + amountText(pool.vesting.totalLockedAmount, pool.baseDecimals, 3) + ' ' + baseSymbol +
        ' · ' + duration(pool.vesting.cliffPeriod) + ' cliff · ' + duration(pool.vesting.unlockPeriod) + ' unlock')
    }
    lines.push('POOL     : ' + pool.address)
    lines.push('CREATOR  : ' + pool.creator)
    summary.textContent = lines.join('\n')
    append(host, summary)

    if (pool.status === 0) append(host, renderTrade(pool))
    append(host, element('h2', { className: 'stonk-subheading', text: 'Curve ladder' }))
    append(host, renderLadder(pool))
    append(host, renderPosition(pool))
  }

  function renderLadder (pool) {
    const wrap = element('div', { className: 'stonk-table-wrap' })
    const target = Number(pool.totalQuoteFundRaising)
    const supply = unitsNumber(pool.supply, pool.baseDecimals)
    const quoteUsd = quotePrice(pool.quoteMint)
    const quoteSymbol = mintLabel(pool.quoteMint)
    const reached = curveProgress(pool)
    const rows = []
    for (let step = 0; step <= ladderSteps; step += 1) {
      const fraction = step / ladderSteps
      const raised = target * fraction
      const price = priceAtRaise(pool, raised)
      // Rounding leaves a fraction of a base unit at the start of the curve.
      const raw = Number(pool.virtualBase) - Number(pool.virtualBase) * Number(pool.virtualQuote) / (Number(pool.virtualQuote) + raised)
      const sold = raw < 1 ? 0 : raw
      rows.push([
        percent(fraction * 100) + (fraction <= reached ? ' ✓' : ''),
        amountText(raised, pool.quoteDecimals, 3) + ' ' + quoteSymbol,
        priceText(price),
        Number.isFinite(price * quoteUsd) ? '$' + priceText(price * quoteUsd) : '—',
        compact(sold / Math.pow(10, pool.baseDecimals)),
        Number.isFinite(price * supply * quoteUsd) ? usd(price * supply * quoteUsd) : compact(price * supply) + ' ' + quoteSymbol
      ])
    }
    append(wrap, table(['RAISED', 'QUOTE IN', 'PRICE', 'PRICE USD', 'TOKENS SOLD', 'MARKET CAP'], rows, 'stonk-ladder-table'))
    return wrap
  }

  function renderTrade (pool) {
    const wrap = element('div', { className: 'stonk-trade' })
    const baseSymbol = mintLabel(pool.baseMint)
    const quoteSymbol = mintLabel(pool.quoteMint)
    const side = state.trade.side
    const inputDecimals = side === 'buy' ? pool.quoteDecimals : pool.baseDecimals
    const inputSymbol = side === 'buy' ? quoteSymbol : baseSymbol
    const outputDecimals = side === 'buy' ? pool.baseDecimals : pool.quoteDecimals
    const outputSymbol = side === 'buy' ? baseSymbol : quoteSymbol

    append(wrap, element('h2', { className: 'stonk-subheading', text: 'Trade the curve' }))

    const tabs = element('p', { className: 'stonk-filter' })
    append(tabs, document.createTextNode('SIDE : ' + (side === 'buy' ? 'buying ' + baseSymbol : 'selling ' + baseSymbol) + ' '))
    append(tabs, linkButton(side === 'buy' ? 'sell instead' : 'buy instead', function () {
      state.trade.side = side === 'buy' ? 'sell' : 'buy'
      state.trade.amount = ''
      state.trade.quoted = null
      renderLaunch()
      return Promise.resolve()
    }))
    append(wrap, tabs)

    const amountRow = element('div', { className: 'stonk-input' })
    append(amountRow, element('label', { text: inputSymbol + ' in' }))
    const amountField = element('input')
    amountField.type = 'text'
    amountField.inputMode = 'decimal'
    amountField.placeholder = '0.0'
    amountField.value = state.trade.amount
    append(amountRow, amountField)
    append(wrap, amountRow)

    const slippageRow = element('div', { className: 'stonk-input' })
    append(slippageRow, element('label', { text: 'Slippage %' }))
    const slippageField = element('input')
    slippageField.type = 'text'
    slippageField.inputMode = 'decimal'
    slippageField.value = String(state.trade.slippage)
    append(slippageRow, slippageField)
    append(wrap, slippageRow)

    const preview = element('pre', { className: 'stonk-preview', text: 'Enter an amount.' })
    append(wrap, preview)

    const actions = element('div', { className: 'stonk-dialog-actions' })
    if (state.account) {
      append(actions, actionButton(side === 'buy' ? 'buy ' + baseSymbol : 'sell ' + baseSymbol, function () { return submitTrade() }))
    } else {
      append(actions, element('span', { text: 'Connect a wallet to trade.' }))
    }
    append(wrap, actions)

    function update () {
      const slippage = Number(slippageField.value)
      state.trade.slippage = Number.isFinite(slippage) && slippage >= 0 && slippage < 100 ? slippage : 1
      state.trade.amount = amountField.value
      const amount = toBaseUnits(amountField.value, inputDecimals)
      if (!amount || amount <= 0n) {
        state.trade.amountIn = 0n
        state.trade.quoted = null
        preview.textContent = 'Enter an amount.'
        return
      }
      const quoted = side === 'buy' ? quoteBuy(pool, amount) : quoteSell(pool, amount)
      const minimum = quoted.amountOut * BigInt(Math.round((100 - state.trade.slippage) * 100)) / 10000n
      state.trade.amountIn = amount
      state.trade.minimumOut = minimum
      state.trade.quoted = quoted

      const after = {
        virtualBase: pool.virtualBase,
        virtualQuote: pool.virtualQuote,
        baseDecimals: pool.baseDecimals,
        quoteDecimals: pool.quoteDecimals,
        realBase: side === 'buy' ? pool.realBase + quoted.amountOut : pool.realBase - quoted.netIn,
        realQuote: side === 'buy' ? pool.realQuote + quoted.netIn : pool.realQuote - quoted.amountOut - quoted.fee
      }
      const before = curvePrice(pool)
      const next = curvePrice(after)
      const inUnits = unitsNumber(amount, inputDecimals)
      const outUnits = unitsNumber(quoted.received, outputDecimals)
      const average = side === 'buy' ? inUnits / outUnits : outUnits / inUnits
      const lines = []
      lines.push('RECEIVE  : ' + amountText(quoted.received, outputDecimals, 4) + ' ' + outputSymbol)
      lines.push('MINIMUM  : ' + amountText(minimum, outputDecimals, 4) + ' ' + outputSymbol)
      lines.push('AVERAGE  : ' + priceText(average) + ' ' + quoteSymbol + ' per ' + baseSymbol)
      lines.push('NEW PRICE: ' + priceText(next) + ' ' + quoteSymbol + ' · ' + percent(Math.abs(next / before - 1) * 100) + ' move')
      lines.push('FEE      : ' + amountText(quoted.fee, pool.quoteDecimals, 6) + ' ' + quoteSymbol)
      if (quoted.amountOut !== quoted.received) {
        lines.push('MINT FEE : ' + amountText(quoted.amountOut - quoted.received, outputDecimals, 6) + ' ' + outputSymbol)
      }
      if (quoted.capped) lines.push('FILLS    : the remaining curve · graduates the launch')
      preview.textContent = lines.join('\n')
    }

    amountField.addEventListener('input', update)
    slippageField.addEventListener('input', update)
    if (state.trade.amount) update()
    return wrap
  }

  function renderPosition (pool) {
    const wrap = element('div')
    if (!state.account) return wrap
    append(wrap, element('h2', { className: 'stonk-subheading', text: 'Your position' }))
    const position = state.position
    if (!position || position.pool !== pool.address) {
      append(wrap, element('p', { className: 'stonk-empty', text: 'Reading wallet…' }))
      return wrap
    }
    const price = curvePrice(pool)
    const amount = unitsNumber(position.balance, pool.baseDecimals)
    const rows = [[
      mintLabel(pool.baseMint),
      compact(amount),
      Number.isFinite(price * amount) ? priceText(price * amount) + ' ' + mintLabel(pool.quoteMint) : '—',
      usd(price * amount * quotePrice(pool.quoteMint)),
      compact(unitsNumber(position.quoteBalance, pool.quoteDecimals)) + ' ' + mintLabel(pool.quoteMint)
    ]]
    append(wrap, table(['TOKEN', 'BALANCE', 'CURVE VALUE', 'USD', 'QUOTE HELD'], rows, 'stonk-position-table'))
    if (position.vesting && position.vesting.tokenShareAmount > position.vesting.claimedAmount) {
      const remaining = position.vesting.tokenShareAmount - position.vesting.claimedAmount
      const vestingRows = [[
        amountText(position.vesting.tokenShareAmount, pool.baseDecimals, 3),
        amountText(position.vesting.claimedAmount, pool.baseDecimals, 3),
        amountText(remaining, pool.baseDecimals, 3),
        { nodes: [actionButton('claim vested', function () { return claimVested(pool) })], className: 'stonk-actions' }
      ]]
      append(wrap, element('h2', { className: 'stonk-subheading', text: 'Vested allocation' }))
      append(wrap, table(['ALLOCATED', 'CLAIMED', 'REMAINING', ''], vestingRows, 'stonk-vesting-table'))
    }
    return wrap
  }

  function renderWalletStatus () {
    const node = byId('stonk-wallet-status')
    const connect = byId('stonk-connect')
    if (node) {
      const name = state.wallet && state.wallet.name ? state.wallet.name + ' ' : ''
      node.textContent = state.account
        ? 'Connected ' + name + shortKey(state.account) + ' · ' + compact(unitsNumber(state.solBalance, 9), 3) + ' SOL'
        : 'Not connected'
    }
    if (connect) connect.textContent = state.account ? '[ refresh wallet ]' : '[ connect wallet ]'
  }

  function renderAll () {
    renderOverview()
    renderQuoteAssets()
    renderLaunch()
    renderWalletStatus()
  }

  // ----------------------------------------------------------------- wallet

  const standardWallets = []

  function registerStandardWallet (wallet) {
    if (!wallet || !wallet.features) return
    if (!wallet.features['solana:signAndSendTransaction'] || !wallet.features['standard:connect']) return
    if (!(wallet.chains || []).some(function (entry) { return entry === chain.walletChain })) return
    if (standardWallets.some(function (existing) { return existing.name === wallet.name })) return
    standardWallets.push(wallet)
  }

  function discoverWallets () {
    window.addEventListener('wallet-standard:register-wallet', function (event) {
      try { event.detail(function (wallet) { registerStandardWallet(wallet) }) } catch (error) { /* a wallet that fails to register is simply not offered */ }
    })
    window.dispatchEvent(new CustomEvent('wallet-standard:app-ready', {
      detail: { register: function (wallet) { registerStandardWallet(wallet); return function () {} } }
    }))
  }

  function injectedProvider () {
    const candidates = [window.phantom && window.phantom.solana, window.solflare, window.backpack, window.solana]
    for (let index = 0; index < candidates.length; index += 1) {
      const provider = candidates[index]
      if (provider && typeof provider.connect === 'function' && typeof provider.request === 'function') return provider
    }
    return null
  }

  function bindProviderEvents (provider) {
    if (!provider.on || provider.stonkfunBound) return
    provider.stonkfunBound = true
    provider.on('accountChanged', function (key) {
      state.account = key ? key.toString() : null
      state.position = null
      if (!state.account) state.wallet = null
      renderAll()
      if (state.account) loadWallet().catch(function (error) { setStatus(errorText(error), 'error') })
    })
    provider.on('disconnect', function () {
      state.wallet = null
      state.account = null
      state.position = null
      renderAll()
    })
  }

  async function adoptSilentConnection () {
    const provider = injectedProvider()
    if (!provider) return
    try {
      const result = await provider.connect({ onlyIfTrusted: true })
      const key = (result && result.publicKey) || provider.publicKey
      if (!key) return
      state.wallet = { kind: 'injected', provider: provider }
      state.account = key.toString()
      bindProviderEvents(provider)
    } catch (error) { /* no standing approval for this origin */ }
  }

  async function connectWallet () {
    if (state.account) { await loadWallet(); return }
    const provider = injectedProvider()
    if (!provider) { await connectStandardWallet(); return }
    const result = await provider.connect()
    const key = (result && result.publicKey) || provider.publicKey
    if (!key) throw new Error('The wallet did not return an account.')
    state.wallet = { kind: 'injected', provider: provider }
    state.account = key.toString()
    bindProviderEvents(provider)
    await loadWallet()
  }

  async function connectStandardWallet (advance) {
    if (!standardWallets.length) throw new Error('No Solana wallet is available in this browser.')
    if (advance) state.walletChoice = (state.walletChoice + 1) % standardWallets.length
    const wallet = standardWallets[state.walletChoice % standardWallets.length]
    const result = await wallet.features['standard:connect'].connect()
    const account = (result && result.accounts && result.accounts[0]) || (wallet.accounts && wallet.accounts[0])
    if (!account) throw new Error('The wallet did not return an account.')
    state.wallet = { kind: 'standard', wallet: wallet, standardAccount: account, name: wallet.name }
    state.account = account.address
    await loadWallet()
  }

  async function loadWallet () {
    if (!state.account) { renderAll(); return }
    const lamports = await rpc('getBalance', [state.account, { commitment: 'confirmed' }])
    state.solBalance = BigInt(lamports.value)
    renderWalletStatus()
    await loadPosition()
  }

  async function loadPosition () {
    const pool = state.launch
    if (!pool || !state.account) { state.position = null; renderAll(); return }
    const baseProgram = (pool.tokenProgramFlag & 1) ? programs.token2022 : programs.token
    const quoteProgram = (pool.tokenProgramFlag & 2) ? programs.token2022 : programs.token
    const addresses = [
      associatedTokenAddress(state.account, baseProgram, pool.baseMint),
      associatedTokenAddress(state.account, quoteProgram, pool.quoteMint),
      vestingRecordAddress(pool.address, state.account)
    ]
    const accounts = await getAccounts(addresses)
    const base = accounts[0] && decodeTokenAccount(decodeBase64(accounts[0].data[0]))
    const quote = accounts[1] && decodeTokenAccount(decodeBase64(accounts[1].data[0]))
    const vesting = accounts[2] && accounts[2].owner === programs.launchpad ? decodeVestingRecord(decodeBase64(accounts[2].data[0])) : null
    state.position = {
      pool: pool.address,
      balance: base ? base.amount : 0n,
      quoteBalance: quote ? quote.amount : 0n,
      vesting: vesting
    }
    renderAll()
  }

  // ------------------------------------------------------------ transactions

  const accountMeta = function (address, writable, signer) { return { address: address, writable: writable, signer: signer } }

  function encodeLength (value) {
    const output = []
    let remaining = value
    for (;;) {
      const byte = remaining & 0x7f
      remaining >>= 7
      if (remaining === 0) { output.push(byte); break }
      output.push(byte | 0x80)
    }
    return output
  }

  function buildMessage (payer, instructions, blockhash) {
    const metas = new Map()
    const record = function (meta) {
      const existing = metas.get(meta.address)
      if (!existing) { metas.set(meta.address, { address: meta.address, writable: meta.writable, signer: meta.signer }); return }
      existing.writable = existing.writable || meta.writable
      existing.signer = existing.signer || meta.signer
    }
    record(accountMeta(payer, true, true))
    instructions.forEach(function (instruction) {
      instruction.keys.forEach(record)
      record(accountMeta(instruction.programId, false, false))
    })
    const all = Array.from(metas.values())
    const writableSigners = all.filter(function (meta) { return meta.signer && meta.writable })
    const readonlySigners = all.filter(function (meta) { return meta.signer && !meta.writable })
    const writableOthers = all.filter(function (meta) { return !meta.signer && meta.writable })
    const readonlyOthers = all.filter(function (meta) { return !meta.signer && !meta.writable })
    const ordered = writableSigners.concat(readonlySigners, writableOthers, readonlyOthers)
    const indexOf = new Map()
    ordered.forEach(function (meta, index) { indexOf.set(meta.address, index) })

    const bytes = []
    const push = function (source) { for (let index = 0; index < source.length; index += 1) bytes.push(source[index]) }
    bytes.push(writableSigners.length + readonlySigners.length)
    bytes.push(readonlySigners.length)
    bytes.push(readonlyOthers.length)
    push(encodeLength(ordered.length))
    ordered.forEach(function (meta) { push(addressBytes(meta.address)) })
    push(decodeBase58(blockhash))
    push(encodeLength(instructions.length))
    instructions.forEach(function (instruction) {
      bytes.push(indexOf.get(instruction.programId))
      push(encodeLength(instruction.keys.length))
      instruction.keys.forEach(function (meta) { bytes.push(indexOf.get(meta.address)) })
      push(encodeLength(instruction.data.length))
      push(instruction.data)
    })
    return { bytes: Uint8Array.from(bytes), signatureCount: writableSigners.length + readonlySigners.length }
  }

  function serializeTransaction (message) {
    const prefix = encodeLength(message.signatureCount)
    const output = new Uint8Array(prefix.length + message.signatureCount * 64 + message.bytes.length)
    output.set(prefix, 0)
    output.set(message.bytes, prefix.length + message.signatureCount * 64)
    return output
  }

  function instructionData (discriminator, values) {
    const output = new Uint8Array(discriminator.length + values.length * 8)
    output.set(discriminator, 0)
    const view = new DataView(output.buffer)
    values.forEach(function (value, index) { view.setBigUint64(discriminator.length + index * 8, BigInt(value), true) })
    return output
  }

  function computeBudgetInstructions (units, microLamports) {
    const limit = new Uint8Array(5)
    limit[0] = 2
    new DataView(limit.buffer).setUint32(1, units, true)
    const price = new Uint8Array(9)
    price[0] = 3
    new DataView(price.buffer).setBigUint64(1, BigInt(microLamports), true)
    return [
      { programId: programs.computeBudget, keys: [], data: limit },
      { programId: programs.computeBudget, keys: [], data: price }
    ]
  }

  function createAssociatedTokenAccount (payer, owner, mint, tokenProgram) {
    return {
      programId: programs.associatedToken,
      keys: [
        accountMeta(payer, true, true),
        accountMeta(associatedTokenAddress(owner, tokenProgram, mint), true, false),
        accountMeta(owner, false, false),
        accountMeta(mint, false, false),
        accountMeta(programs.system, false, false),
        accountMeta(tokenProgram, false, false)
      ],
      data: Uint8Array.of(1)
    }
  }

  function transferLamports (from, to, lamports) {
    const data = new Uint8Array(12)
    const view = new DataView(data.buffer)
    view.setUint32(0, 2, true)
    view.setBigUint64(4, BigInt(lamports), true)
    return { programId: programs.system, keys: [accountMeta(from, true, true), accountMeta(to, true, false)], data: data }
  }

  const syncNative = function (account) {
    return { programId: programs.token, keys: [accountMeta(account, true, false)], data: Uint8Array.of(17) }
  }

  const closeTokenAccount = function (account, destination, owner) {
    return {
      programId: programs.token,
      keys: [accountMeta(account, true, false), accountMeta(destination, true, false), accountMeta(owner, false, true)],
      data: Uint8Array.of(9)
    }
  }

  function tradeInstruction (pool, side, amountIn, minimumOut, userBase, userQuote) {
    const baseProgram = (pool.tokenProgramFlag & 1) ? programs.token2022 : programs.token
    const quoteProgram = (pool.tokenProgramFlag & 2) ? programs.token2022 : programs.token
    return {
      programId: programs.launchpad,
      keys: [
        accountMeta(state.account, true, true),
        accountMeta(vaultAuthority(), false, false),
        accountMeta(pool.globalConfig, false, false),
        accountMeta(pool.platformConfig, false, false),
        accountMeta(pool.address, true, false),
        accountMeta(userBase, true, false),
        accountMeta(userQuote, true, false),
        accountMeta(pool.baseVault, true, false),
        accountMeta(pool.quoteVault, true, false),
        accountMeta(pool.baseMint, false, false),
        accountMeta(pool.quoteMint, false, false),
        accountMeta(baseProgram, false, false),
        accountMeta(quoteProgram, false, false),
        accountMeta(eventAuthority(), false, false),
        accountMeta(programs.launchpad, false, false),
        accountMeta(programs.system, false, false),
        accountMeta(platformFeeVault(pool.platformConfig, pool.quoteMint), true, false),
        accountMeta(creatorFeeVault(pool.creator, pool.quoteMint), true, false)
      ],
      data: instructionData(side === 'buy' ? buyExactInDiscriminator : sellExactInDiscriminator, [amountIn, minimumOut, 0])
    }
  }

  function simulationError (simulated) {
    if (!simulated.err) return null
    const logs = simulated.logs || []
    const failure = logs.filter(function (line) { return /Error|failed|insufficient|exceeded/i.test(line) }).pop()
    const detail = simulated.err.InstructionError && simulated.err.InstructionError[1]
    const code = detail && detail.Custom !== undefined ? ' (code ' + detail.Custom + ')' : ''
    return (failure ? failure.replace(/^Program log: /, '') : JSON.stringify(simulated.err)) + code
  }

  async function sendInstructions (instructions) {
    if (!state.wallet) throw new Error('Connect a wallet first.')
    const blockhash = await rpc('getLatestBlockhash', [{ commitment: 'confirmed' }])
    const message = buildMessage(state.account, instructions, blockhash.value.blockhash)
    const serialized = serializeTransaction(message)
    const simulated = await rpc('simulateTransaction', [encodeBase64(serialized), {
      encoding: 'base64', sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed'
    }])
    const failure = simulationError(simulated.value)
    if (failure) throw new Error(failure)

    let signature
    if (state.wallet.kind === 'standard') {
      const output = await state.wallet.wallet.features['solana:signAndSendTransaction'].signAndSendTransaction({
        account: state.wallet.standardAccount, chain: chain.walletChain, transaction: serialized
      })
      signature = encodeBase58(output[0].signature)
    } else {
      const response = await state.wallet.provider.request({
        method: 'signAndSendTransaction', params: { message: encodeBase58(message.bytes) }
      })
      signature = typeof response === 'string' ? response : response.signature
    }
    await confirmSignature(signature, blockhash.value)
    return signature
  }

  async function confirmSignature (signature, blockhash) {
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const statuses = await rpc('getSignatureStatuses', [[signature], { searchTransactionHistory: false }])
      const entry = statuses.value[0]
      if (entry) {
        if (entry.err) throw new Error('The transaction failed onchain: ' + JSON.stringify(entry.err))
        if (entry.confirmationStatus === 'confirmed' || entry.confirmationStatus === 'finalized') return
      }
      if (blockhash && attempt > 0 && attempt % 6 === 0) {
        const height = await rpc('getBlockHeight', [{ commitment: 'confirmed' }])
        if (height > blockhash.lastValidBlockHeight) throw new Error('The transaction expired before it was confirmed.')
      }
      await sleep(1100)
    }
    throw new Error('The transaction was not confirmed in time.')
  }

  // -------------------------------------------------------------- actions

  async function refreshLaunch () {
    if (!state.launch) return
    const account = await rpc('getAccountInfo', [state.launch.address, { encoding: 'base64', commitment: 'confirmed' }])
    if (isLaunchpadPool(account.value)) state.launch = decodePool(state.launch.address, decodeBase64(account.value.data[0]))
    renderAll()
  }

  async function submitTrade () {
    const pool = state.launch
    if (!pool) throw new Error('Load a launch first.')
    if (!state.trade.amountIn || state.trade.amountIn <= 0n) throw new Error('Enter an amount first.')
    const side = state.trade.side
    const baseProgram = (pool.tokenProgramFlag & 1) ? programs.token2022 : programs.token
    const quoteProgram = (pool.tokenProgramFlag & 2) ? programs.token2022 : programs.token
    const userBase = associatedTokenAddress(state.account, baseProgram, pool.baseMint)
    const userQuote = associatedTokenAddress(state.account, quoteProgram, pool.quoteMint)
    const nativeQuote = pool.quoteMint === wrappedSolMint

    const instructions = computeBudgetInstructions(260000, 20000)
    instructions.push(createAssociatedTokenAccount(state.account, state.account, pool.baseMint, baseProgram))
    instructions.push(createAssociatedTokenAccount(state.account, state.account, pool.quoteMint, quoteProgram))
    if (nativeQuote && side === 'buy') {
      const held = state.position ? state.position.quoteBalance : 0n
      if (held < state.trade.amountIn) {
        instructions.push(transferLamports(state.account, userQuote, state.trade.amountIn - held))
        instructions.push(syncNative(userQuote))
      }
    }
    instructions.push(tradeInstruction(pool, side, state.trade.amountIn, state.trade.minimumOut, userBase, userQuote))
    if (nativeQuote && side === 'sell') instructions.push(closeTokenAccount(userQuote, state.account, state.account))

    state.sending = true
    setStatus('Confirm the transaction in your wallet…', '')
    try {
      const signature = await sendInstructions(instructions)
      setStatus((side === 'buy' ? 'Bought ' : 'Sold ') + mintLabel(pool.baseMint) + ' · ' + shortKey(signature), 'success')
      state.trade.amount = ''
      state.trade.amountIn = 0n
      await refreshLaunch()
      await loadWallet()
    } finally {
      state.sending = false
    }
  }

  async function claimVested (pool) {
    const baseProgram = (pool.tokenProgramFlag & 1) ? programs.token2022 : programs.token
    const instructions = computeBudgetInstructions(160000, 20000)
    instructions.push({
      programId: programs.launchpad,
      keys: [
        accountMeta(state.account, true, true),
        accountMeta(vaultAuthority(), false, false),
        accountMeta(pool.address, true, false),
        accountMeta(vestingRecordAddress(pool.address, state.account), true, false),
        accountMeta(pool.baseVault, true, false),
        accountMeta(associatedTokenAddress(state.account, baseProgram, pool.baseMint), true, false),
        accountMeta(pool.baseMint, false, false),
        accountMeta(baseProgram, false, false),
        accountMeta(programs.system, false, false),
        accountMeta(programs.associatedToken, false, false)
      ],
      data: Uint8Array.from(claimVestedDiscriminator)
    })
    state.sending = true
    setStatus('Confirm the claim in your wallet…', '')
    try {
      const signature = await sendInstructions(instructions)
      setStatus('Claimed ' + mintLabel(pool.baseMint) + ' · ' + shortKey(signature), 'success')
      await loadWallet()
    } finally {
      state.sending = false
    }
  }

  // ------------------------------------------------------------------ start

  async function start () {
    discoverWallets()
    const form = byId('stonk-lookup-form')
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        const field = byId('stonk-lookup')
        loadLaunch(field ? field.value : '').catch(function (error) { setStatus(errorText(error), 'error') })
      })
    }
    const newest = byId('stonk-newest')
    if (newest) {
      newest.addEventListener('click', function () {
        loadLaunchWith(newestTradedPool).catch(function (error) { setStatus(errorText(error), 'error') })
      })
    }
    const connect = byId('stonk-connect')
    if (connect) connect.addEventListener('click', function () { connectWallet().catch(function (error) { setStatus(errorText(error), 'error') }) })
    const other = byId('stonk-other-wallet')
    if (other) {
      other.addEventListener('click', function () {
        connectStandardWallet(Boolean(state.account)).catch(function (error) { setStatus(errorText(error), 'error') })
      })
    }
    window.addEventListener('hashchange', function () {
      const hash = window.location.hash.slice(1)
      if (hash && isAddress(hash) && (!state.launch || state.launch.baseMint !== hash)) {
        const field = byId('stonk-lookup')
        if (field) field.value = hash
        loadLaunch(hash).catch(function (error) { setStatus(errorText(error), 'error') })
      }
    })

    await adoptSilentConnection()
    renderAll()
    setLoading(true, 'Reading StonkFun…')
    const epochInfo = await rpc('getEpochInfo', [{ commitment: 'confirmed' }])
    state.slot = epochInfo.absoluteSlot
    state.epoch = epochInfo.epoch
    const configs = await getAccounts(platformConfigs.concat([globalConfigAddress(wrappedSolMint)]))
    if (configs[0]) state.platformConfig = decodePlatformConfig(decodeBase64(configs[0].data[0]))
    if (configs[2]) state.globalConfig = decodeGlobalConfig(decodeBase64(configs[2].data[0]))
    renderAll()

    const hash = window.location.hash.slice(1)
    if (hash && isAddress(hash)) {
      const field = byId('stonk-lookup')
      if (field) field.value = hash
      await loadLaunch(hash)
    }
    setLoading(false)
    if (state.account) await loadWallet()
    await loadQuoteAssets()
  }

  function fatal (error) {
    console.error('StonkFun page failed', error)
    setLoading(false)
    setStatus(errorText(error), 'error')
  }

  return { start: start, fatal: fatal }
})()
