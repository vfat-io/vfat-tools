const fs = require('fs')
const path = require('path')

const jsDir = path.join(__dirname, '..', 'dist', 'js')
const localhostPattern = /\b(?:https?|wss?):\/\/(?:localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1\])(?::\d+)?/ig

if (!fs.existsSync(jsDir)) {
  console.error(`Missing JS output directory: ${jsDir}`)
  process.exit(1)
}

const files = fs.readdirSync(jsDir)
  .filter(file => file.endsWith('.js'))
  .filter(file => !/^vendor(?:[.-]|$)/.test(file))

const failures = []

function isBundledEthersDefaultUrl(contents, match) {
  if (match[0] !== 'http://localhost:8545' && match[0] !== 'ws://localhost:8546') {
    return false
  }

  // Ethers includes these inert defaultUrl() fallbacks in every browser build.
  // They are not selected when a provider is constructed with an explicit RPC;
  // avoid treating dependency implementation detail as a configured endpoint.
  const before = contents.slice(Math.max(0, match.index - 48), match.index)
  return /static defaultUrl\(\)\{return["']$/.test(before)
}

for (const file of files) {
  const fullPath = path.join(jsDir, file)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const matches = [...contents.matchAll(localhostPattern)]
    // WalletConnect/Reown declares localhost:* as an allowed-origin pattern;
    // that is not a fetchable loopback endpoint. Keep rejecting actual local
    // URLs, including numeric ports, paths, and websocket endpoints.
    .filter(match => contents.slice(match.index + match[0].length, match.index + match[0].length + 2) !== ':*')
    .filter(match => !isBundledEthersDefaultUrl(contents, match))
    .map(match => match[0])

  if (matches.length > 0) {
    failures.push({ file, matches: [...new Set(matches)] })
  }
}

if (failures.length > 0) {
  console.error('Production app bundles must not reference local or loopback endpoints.')
  for (const failure of failures) {
    console.error(`${failure.file}: ${failure.matches.join(', ')}`)
  }
  process.exit(1)
}
