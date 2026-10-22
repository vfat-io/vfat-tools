const fs = require('fs')
const path = require('path')

require('dotenv').config()

// The WalletConnect project id and the Ethereum RPC URL are inlined into the
// app bundle at build time by webpack's DefinePlugin. When the project id is
// missing, getAppKit() is folded down to an unconditional `return null` and
// every page that connects a wallet through AppKit renders "Wallet connector
// is unavailable" with no connect option at all. When the RPC URL is missing,
// the published wallet networks are built with an empty endpoint. Both
// failures are invisible in the build log, so assert them here instead.

const projectId = process.env.REOWN_PROJECT_ID
const ethereumNodeUrl = process.env.ETHEREUM_NODE_URL

const missingEnv = []
if (!projectId || !String(projectId).trim()) missingEnv.push('REOWN_PROJECT_ID')
if (!ethereumNodeUrl || !String(ethereumNodeUrl).trim()) missingEnv.push('ETHEREUM_NODE_URL')

if (missingEnv.includes('REOWN_PROJECT_ID')) {
  console.error('REOWN_PROJECT_ID is not set, so the published site would have no wallet connector.')
}
if (missingEnv.includes('ETHEREUM_NODE_URL')) {
  console.error('ETHEREUM_NODE_URL is not set, so the published wallet networks would have an empty RPC URL.')
}
if (missingEnv.length > 0) {
  console.error('Set the missing values in .env (see the deployment notes) before building for production.')
  process.exit(1)
}

const jsDir = path.join(__dirname, '..', 'dist', 'js')

if (!fs.existsSync(jsDir)) {
  console.error(`Missing JS output directory: ${jsDir}`)
  process.exit(1)
}

const appBundles = fs.readdirSync(jsDir)
  .filter(file => /^app(?:[.-]|$)/.test(file) && file.endsWith('.js'))

if (appBundles.length === 0) {
  console.error(`No app bundle found in ${jsDir}; run the JS build first.`)
  process.exit(1)
}

const seen = { REOWN_PROJECT_ID: false, ETHEREUM_NODE_URL: false }
let configured = false

for (const file of appBundles) {
  const contents = fs.readFileSync(path.join(jsDir, file), 'utf8')
  const hasProjectId = contents.includes(projectId)
  const hasEthereumNodeUrl = contents.includes(ethereumNodeUrl)
  if (hasProjectId) seen.REOWN_PROJECT_ID = true
  if (hasEthereumNodeUrl) seen.ETHEREUM_NODE_URL = true
  if (hasProjectId && hasEthereumNodeUrl) configured = true
}

if (!configured) {
  const absent = Object.entries(seen).filter(([, present]) => !present).map(([name]) => name)
  if (absent.length === 1) {
    console.error(`${absent[0]} is set but did not reach the app bundle.`)
  } else if (absent.length > 1) {
    console.error(`${absent.join(' and ')} are set but did not reach the app bundle.`)
  } else {
    console.error('REOWN_PROJECT_ID and ETHEREUM_NODE_URL must both be in the same app bundle.')
  }
  console.error(`Checked: ${appBundles.join(', ')}`)
  process.exit(1)
}
